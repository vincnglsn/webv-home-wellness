import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSql } from "@/lib/db";
import { fulfillOrder } from "@/lib/fulfillment";
import { sendAlert } from "@/lib/alerts";

// Stripe signe le corps brut de la requête : il ne faut donc jamais parser le
// JSON avant vérification, sous peine d'invalider la signature.
export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook non configuré (signature ou secret manquant)" },
      { status: 400 }
    );
  }

  const rawBody = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signature invalide";
    return NextResponse.json({ error: `Webhook signature invalide : ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const mode = event.livemode ? "live" : "test";
    try {
      const orderId = await recordOrder(stripe, session, mode);
      await fulfillOrder(orderId);
    } catch (err) {
      // Réponse 500 : Stripe rejoue l'événement. recordOrder et fulfillOrder
      // sont idempotents, un rejeu ne crée donc ni doublon ni double commande.
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      await sendAlert(`Traitement du paiement ${session.id} (${mode}) en erreur : ${message}`);
      return NextResponse.json({ error: "Traitement de la commande échoué" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

// Enregistre la commande et ses lignes en une seule instruction SQL (donc
// atomique) et renvoie son id, y compris si elle existait déjà.
async function recordOrder(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
  mode: "test" | "live"
): Promise<number> {
  const sql = getSql();

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ["data.price.product"],
  });

  const items = lineItems.data.map((item) => {
    const product =
      item.price?.product && typeof item.price.product === "object"
        ? (item.price.product as Stripe.Product)
        : null;
    return {
      slug: product?.metadata?.slug ?? null,
      name: item.description ?? product?.name ?? "Produit",
      unit_amount_cents: item.price?.unit_amount ?? 0,
      quantity: item.quantity ?? 1,
      currency: (item.price?.currency ?? "eur").toUpperCase(),
    };
  });

  await sql`
    with new_order as (
      insert into orders (
        stripe_checkout_session_id, stripe_payment_intent_id, status, mode,
        amount_total_cents, currency, customer_email, customer_phone, shipping_address
      )
      values (
        ${session.id},
        ${typeof session.payment_intent === "string" ? session.payment_intent : null},
        'paid',
        ${mode},
        ${session.amount_total ?? 0},
        ${(session.currency ?? "eur").toUpperCase()},
        ${session.customer_details?.email ?? null},
        ${session.customer_details?.phone ?? null},
        ${
          session.collected_information?.shipping_details
            ? JSON.stringify(session.collected_information.shipping_details)
            : null
        }
      )
      on conflict (stripe_checkout_session_id) do nothing
      returning id
    )
    insert into order_items (order_id, product_slug, name, unit_amount_cents, quantity, currency)
    select new_order.id, i.slug, i.name, i.unit_amount_cents, i.quantity, i.currency
    from new_order,
      jsonb_to_recordset(${JSON.stringify(items)}::jsonb) as i(
        slug text, name text, unit_amount_cents integer, quantity integer, currency text
      )
  `;

  const rows = (await sql`
    select id from orders where stripe_checkout_session_id = ${session.id} limit 1
  `) as unknown as { id: number }[];
  if (!rows[0]) throw new Error(`Commande introuvable après enregistrement (${session.id})`);
  return rows[0].id;
}
