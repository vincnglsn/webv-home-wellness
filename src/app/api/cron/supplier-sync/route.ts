import { NextRequest, NextResponse } from "next/server";
import { retryUnfulfilledOrders, syncTracking } from "@/lib/fulfillment";
import { sendAlert } from "@/lib/alerts";

// Appelée périodiquement par Vercel Cron (cf. vercel.json), qui envoie
// automatiquement "Authorization: Bearer $CRON_SECRET".
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const retry = await retryUnfulfilledOrders();
    const tracking = await syncTracking();
    if (retry.stillFailing > 0) {
      await sendAlert(
        `${retry.stillFailing} commande(s) payée(s) toujours non transmise(s) à CJdropshipping après relance.`
      );
    }
    return NextResponse.json({ retry, tracking });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    await sendAlert(`Tâche de synchronisation fournisseur en erreur : ${message}`);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
