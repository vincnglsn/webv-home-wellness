import { getSql } from "@/lib/db";

export type Review = {
  id: number;
  display_name: string;
  rating: number;
  body: string;
  created_at: string;
};

export type ReviewSummary = { count: number; average: number };

export async function getPublishedReviews(slug: string): Promise<Review[]> {
  const sql = getSql();
  return (await sql`
    select id, display_name, rating, body, created_at
    from reviews
    where product_slug = ${slug} and status = 'published'
    order by created_at desc
  `) as unknown as Review[];
}

export function summarize(reviews: Review[]): ReviewSummary | null {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return { count: reviews.length, average: Math.round((total / reviews.length) * 10) / 10 };
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

// L'avis n'est accepte que si la commande existe, que l'e-mail correspond et que
// le produit figure dans la commande ; un seul avis par produit et par commande.
export async function submitReview(input: {
  orderId: number;
  email: string;
  slug: string;
  displayName: string;
  rating: number;
  body: string;
}): Promise<SubmitResult> {
  const sql = getSql();

  const eligible = (await sql`
    select o.id
    from orders o
    join order_items i on i.order_id = o.id
    where o.id = ${input.orderId}
      and lower(o.customer_email) = lower(${input.email})
      and i.product_slug = ${input.slug}
    limit 1
  `) as unknown as { id: number }[];

  if (eligible.length === 0) {
    return {
      ok: false,
      status: 404,
      error: "Aucune commande contenant ce produit ne correspond à ces informations.",
    };
  }

  const inserted = (await sql`
    insert into reviews (product_slug, order_id, display_name, rating, body)
    values (${input.slug}, ${input.orderId}, ${input.displayName}, ${input.rating}, ${input.body})
    on conflict (order_id, product_slug) do nothing
    returning id
  `) as unknown as { id: number }[];

  if (inserted.length === 0) {
    return {
      ok: false,
      status: 409,
      error: "Vous avez déjà donné votre avis sur ce produit pour cette commande.",
    };
  }
  return { ok: true };
}
