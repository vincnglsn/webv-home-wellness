import { getSql } from "@/lib/db";
import { createCjOrder, getCjOrderDetail } from "@/lib/cjdropshipping";
import { sendAlert } from "@/lib/alerts";

type OrderRow = {
  id: number;
  stripe_checkout_session_id: string;
  mode: string;
  customer_email: string | null;
  customer_phone: string | null;
  shipping_address: {
    name?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      state?: string | null;
      postal_code?: string | null;
      country?: string | null;
    };
  } | null;
};

type ItemRow = { product_slug: string | null; quantity: number };

type ProductSupplierRow = {
  slug: string;
  cj_variant_id: string | null;
  cj_sku: string | null;
  cj_from_country_code: string;
  cj_logistic_name: string;
};

type SupplierOrderRow = {
  id: number;
  order_number: string | null;
  status: string;
};

async function recordFailure(
  orderId: number,
  orderNumber: string,
  isSandbox: boolean,
  message: string
) {
  const sql = getSql();
  const existing = (await sql`
    select id from supplier_orders
    where order_id = ${orderId} and order_number = ${orderNumber} and status = 'failed'
    limit 1
  `) as unknown as { id: number }[];

  if (existing[0]) {
    await sql`
      update supplier_orders
      set error_message = ${message}, updated_at = now()
      where id = ${existing[0].id}
    `;
  } else {
    await sql`
      insert into supplier_orders (order_id, provider, status, error_message, is_sandbox, order_number)
      values (${orderId}, 'cjdropshipping', 'failed', ${message}, ${isSandbox}, ${orderNumber})
    `;
  }
  await sendAlert(
    `Commande #${orderId} (${isSandbox ? "test" : "LIVE"}) : échec de l'envoi chez CJdropshipping (${orderNumber}) — ${message}`
  );
}

// Transmet une commande payée à CJdropshipping. Idempotent : peut être rappelé
// sans risque (webhook rejoué, relance planifiée), les lots déjà transmis sont
// ignorés et les lots en échec sont retentés.
// Les articles sont regroupés par route logistique (pays d'expédition +
// transporteur) : un lot = une commande CJ.
export async function fulfillOrder(orderId: number): Promise<void> {
  const sql = getSql();

  const orders = (await sql`
    select id, stripe_checkout_session_id, mode, customer_email, customer_phone, shipping_address
    from orders where id = ${orderId} limit 1
  `) as unknown as OrderRow[];
  const order = orders[0];
  if (!order) return;

  const isSandbox = order.mode !== "live";
  const baseNumber = order.stripe_checkout_session_id;
  const address = order.shipping_address?.address;

  if (!address) {
    await recordFailure(orderId, baseNumber, isSandbox, "Adresse de livraison manquante");
    return;
  }

  const items = (await sql`
    select product_slug, quantity from order_items where order_id = ${orderId}
  `) as unknown as ItemRow[];

  const slugs = items.map((i) => i.product_slug).filter((s): s is string => Boolean(s));
  if (slugs.length === 0 || slugs.length !== items.length) {
    await recordFailure(orderId, baseNumber, isSandbox, "Produit non identifiable dans la commande");
    return;
  }

  const products = (await sql`
    select slug, cj_variant_id, cj_sku, cj_from_country_code, cj_logistic_name
    from products where slug = any(${slugs})
  `) as unknown as ProductSupplierRow[];
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  const missing = slugs.filter((slug) => {
    const p = bySlug.get(slug);
    return !p || (!p.cj_variant_id && !p.cj_sku);
  });
  if (missing.length > 0) {
    await recordFailure(
      orderId,
      baseNumber,
      isSandbox,
      `Produit(s) non reliés à CJdropshipping : ${missing.join(", ")}`
    );
    return;
  }

  const groups = new Map<
    string,
    { from: string; logistic: string; products: { vid?: string; sku?: string; quantity: number }[] }
  >();
  for (const item of items) {
    const p = bySlug.get(item.product_slug as string)!;
    const key = `${p.cj_from_country_code}|${p.cj_logistic_name}`;
    if (!groups.has(key)) {
      groups.set(key, { from: p.cj_from_country_code, logistic: p.cj_logistic_name, products: [] });
    }
    groups.get(key)!.products.push({
      vid: p.cj_variant_id ?? undefined,
      sku: p.cj_sku ?? undefined,
      quantity: item.quantity,
    });
  }

  const existing = (await sql`
    select id, order_number, status from supplier_orders where order_id = ${orderId}
  `) as unknown as SupplierOrderRow[];

  const multiple = groups.size > 1;
  let index = 0;
  for (const group of groups.values()) {
    index += 1;
    const orderNumber = multiple ? `${baseNumber}-${index}` : baseNumber;
    if (existing.some((e) => e.order_number === orderNumber && e.status !== "failed")) continue;
    // Anciennes lignes créées avant l'ajout de order_number : déjà transmises.
    if (!multiple && existing.some((e) => e.order_number === null && e.status !== "failed")) continue;

    try {
      const result = await createCjOrder({
        orderNumber,
        shippingCountryCode: address.country ?? "",
        shippingCountry: address.country ?? "",
        shippingProvince: address.state ?? address.city ?? "",
        shippingCity: address.city ?? "",
        shippingCustomerName: order.shipping_address?.name ?? "Client",
        shippingAddress: [address.line1, address.line2].filter(Boolean).join(" "),
        shippingZip: address.postal_code ?? undefined,
        shippingPhone: order.customer_phone ?? undefined,
        email: order.customer_email ?? undefined,
        fromCountryCode: group.from,
        logisticName: group.logistic,
        products: group.products,
        // En mode test Stripe, commande CJ sandbox : jamais de vrai débit tant
        // que le paiement client lui-même n'est pas réel.
        isSandbox,
      });

      const failed = (await sql`
        select id from supplier_orders
        where order_id = ${orderId} and order_number = ${orderNumber} and status = 'failed'
        limit 1
      `) as unknown as { id: number }[];

      if (failed[0]) {
        await sql`
          update supplier_orders
          set status = 'placed', provider_order_id = ${result.data.orderId},
              error_message = null, updated_at = now()
          where id = ${failed[0].id}
        `;
      } else {
        await sql`
          insert into supplier_orders (order_id, provider, provider_order_id, status, is_sandbox, order_number)
          values (${orderId}, 'cjdropshipping', ${result.data.orderId}, 'placed', ${isSandbox}, ${orderNumber})
        `;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur CJdropshipping inconnue";
      await recordFailure(orderId, orderNumber, isSandbox, message);
    }
  }
}

// Commandes payées dont aucune commande fournisseur n'a abouti (ou dont le
// traitement a été interrompu avant d'écrire quoi que ce soit).
export async function retryUnfulfilledOrders(): Promise<{ retried: number; stillFailing: number }> {
  const sql = getSql();
  const rows = (await sql`
    select o.id
    from orders o
    where o.created_at > now() - interval '14 days'
      and (
        not exists (select 1 from supplier_orders s where s.order_id = o.id)
        or exists (select 1 from supplier_orders s where s.order_id = o.id and s.status = 'failed')
      )
    order by o.id
    limit 50
  `) as unknown as { id: number }[];

  let stillFailing = 0;
  for (const { id } of rows) {
    await fulfillOrder(id);
    const left = (await sql`
      select 1 from supplier_orders where order_id = ${id} and status = 'failed' limit 1
    `) as unknown as unknown[];
    if (left.length > 0) stillFailing += 1;
  }
  return { retried: rows.length, stillFailing };
}

const CJ_SHIPPED = new Set(["SHIPPED", "DELIVERED", "COMPLETED"]);

// Rafraîchit statut et numéro de suivi des commandes transmises à CJ.
export async function syncTracking(): Promise<{ checked: number; updated: number }> {
  const sql = getSql();
  const rows = (await sql`
    select s.id, s.order_id, s.provider_order_id, s.status, s.tracking_number
    from supplier_orders s
    where s.provider_order_id is not null
      and s.status in ('placed', 'shipped')
      and s.created_at > now() - interval '60 days'
    order by s.id
    limit 40
  `) as unknown as {
    id: number;
    order_id: number;
    provider_order_id: string;
    status: string;
    tracking_number: string | null;
  }[];

  let updated = 0;
  for (const row of rows) {
    try {
      const { data } = await getCjOrderDetail(row.provider_order_id);
      const status = CJ_SHIPPED.has(String(data.orderStatus).toUpperCase()) ? "shipped" : "placed";
      const tracking = data.trackNumber || row.tracking_number;
      if (status !== row.status || tracking !== row.tracking_number) {
        await sql`
          update supplier_orders
          set status = ${status}, tracking_number = ${tracking}, updated_at = now()
          where id = ${row.id}
        `;
        if (status === "shipped") {
          await sql`update orders set status = 'shipped' where id = ${row.order_id}`;
        }
        updated += 1;
      }
    } catch (err) {
      // Une commande sandbox ou introuvable ne doit pas bloquer les autres.
      console.error(`Suivi CJ indisponible pour la commande fournisseur ${row.id}`, err);
    }
  }
  return { checked: rows.length, updated };
}
