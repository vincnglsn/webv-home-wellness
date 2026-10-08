// Client minimal pour l'API CJdropshipping v2 (docs :
// https://developers.cjdropshipping.com/en/api/api2/api/shopping.html).
// Le token d'accès (CJ-Access-Token) est obtenu une fois par l'utilisateur
// via /authentication/getAccessToken et stocké côté serveur — jamais généré
// ni saisi par du code automatisé.

const CJ_API_BASE = "https://developers.cjdropshipping.com/api2.0";

type CjOrderProduct = {
  vid?: string;
  sku?: string;
  quantity: number;
};

type CjCreateOrderInput = {
  orderNumber: string;
  shippingCountryCode: string;
  shippingCountry: string;
  shippingProvince: string;
  shippingCity: string;
  shippingCustomerName: string;
  shippingAddress: string;
  shippingZip?: string;
  shippingPhone?: string;
  email?: string;
  fromCountryCode: string;
  logisticName: string;
  products: CjOrderProduct[];
  isSandbox: boolean;
};

type CjApiResponse<T> = {
  code: number;
  result: boolean;
  message: string;
  data: T;
  requestId: string;
};

function getAccessToken(): string {
  const token = process.env.CJ_ACCESS_TOKEN;
  if (!token) {
    throw new Error("CJ_ACCESS_TOKEN is not set");
  }
  return token;
}

// CJdropshipping limite l'API à 1 appel par seconde (erreur 1600200 sinon) : on
// espace tous les appels, y compris ceux lancés en boucle par les tâches de
// relance et de suivi.
const CJ_MIN_INTERVAL_MS = 1500;
let nextCjSlot = 0;

async function throttleCj(): Promise<void> {
  const now = Date.now();
  const start = Math.max(now, nextCjSlot);
  nextCjSlot = start + CJ_MIN_INTERVAL_MS;
  if (start > now) await new Promise((resolve) => setTimeout(resolve, start - now));
}

const CJ_RATE_LIMIT_CODE = 1600200;

async function cjRequest<T>(path: string, init?: RequestInit): Promise<CjApiResponse<T>> {
  // Un appel refusé pour cause de limite de débit n'a pas été traité par CJ :
  // on peut le renvoyer sans risque de doublon.
  for (let attempt = 1; ; attempt += 1) {
    await throttleCj();
    const res = await fetch(`${CJ_API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "CJ-Access-Token": getAccessToken(),
        ...init?.headers,
      },
    });

    const body = (await res.json()) as CjApiResponse<T>;
    if (body.code === CJ_RATE_LIMIT_CODE && attempt < 3) continue;
    if (!res.ok || body.result === false) {
      throw new Error(`CJdropshipping API error (${body.code}): ${body.message}`);
    }
    return body;
  }
}

export async function createCjOrder(input: CjCreateOrderInput) {
  const body = {
    orderNumber: input.orderNumber,
    shippingCountryCode: input.shippingCountryCode,
    shippingCountry: input.shippingCountry,
    shippingProvince: input.shippingProvince,
    shippingCity: input.shippingCity,
    shippingCustomerName: input.shippingCustomerName,
    shippingAddress: input.shippingAddress,
    shippingZip: input.shippingZip,
    shippingPhone: input.shippingPhone,
    email: input.email,
    fromCountryCode: input.fromCountryCode,
    logisticName: input.logisticName,
    products: input.products,
    // 3 = déclarer avec l'IOSS de CJ (le paramètre de compte "Pas d'IOSS" par
    // défaut n'est apparemment pas repris automatiquement par cet endpoint).
    iossType: 3,
    iossNumber: "CJ-IOSS",
    // Une commande sandbox ne déclenche jamais de vrai paiement, de vraie
    // logistique ni de vrai débit : indispensable tant qu'on n'a pas validé
    // le flux de bout en bout.
    isSandbox: input.isSandbox ? 1 : 0,
  };

  return cjRequest<{
    orderId: string;
    orderNum: string;
    productAmount?: number | null;
    postageAmount?: number | null;
  }>("/v1/shopping/order/createOrderV3", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// Paie une commande CJ avec le solde du compte CJdropshipping. Pour une commande
// sandbox, CJ simule le paiement (aucun débit réel). Échoue si le solde est insuffisant.
export async function payCjOrderWithBalance(orderId: string) {
  return cjRequest<null>("/v1/shopping/pay/payBalance", {
    method: "POST",
    body: JSON.stringify({ orderId }),
  });
}

// Solde disponible du compte CJdropshipping (en dollars).
export async function getCjBalance(): Promise<number> {
  const res = await cjRequest<{ amount?: number }>("/v1/shopping/pay/getBalance");
  return Number(res.data?.amount ?? 0);
}

export type CjOrderDetail = {
  orderId: string;
  orderStatus: string;
  trackNumber?: string | null;
};

export async function getCjOrderDetail(orderId: string) {
  return cjRequest<CjOrderDetail>(
    `/v1/shopping/order/getOrderDetail?orderId=${encodeURIComponent(orderId)}`
  );
}
