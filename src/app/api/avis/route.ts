import { NextRequest, NextResponse } from "next/server";
import { sendAlert } from "@/lib/alerts";
import { submitReview } from "@/lib/reviews";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  // Champ piège : un humain ne le remplit pas.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const orderId = Number(body.orderId);
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "";
  const text = typeof body.body === "string" ? body.body.trim() : "";
  const rating = Number(body.rating);

  if (!Number.isInteger(orderId) || orderId <= 0 || !email || !slug) {
    return NextResponse.json(
      { error: "Numéro de commande et e-mail requis" },
      { status: 400 }
    );
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Choisissez une note de 1 à 5" }, { status: 400 });
  }
  if (displayName.length < 2 || displayName.length > 40) {
    return NextResponse.json(
      { error: "Indiquez un prénom (2 à 40 caractères)" },
      { status: 400 }
    );
  }
  if (text.length < 10 || text.length > 1000) {
    return NextResponse.json(
      { error: "Votre avis doit faire entre 10 et 1000 caractères" },
      { status: 400 }
    );
  }

  try {
    const result = await submitReview({ orderId, email, slug, displayName, rating, body: text });
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    await sendAlert(`Nouvel avis à modérer : ${rating}/5 sur ${slug} (commande ${orderId}).`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'avis" }, { status: 500 });
  }
}
