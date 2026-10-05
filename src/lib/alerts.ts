// Alerte opérationnelle : toujours journalisée, et envoyée en plus vers un
// webhook entrant (Slack, Discord, etc.) si ALERT_WEBHOOK_URL est défini.
export async function sendAlert(message: string): Promise<void> {
  console.error(`[ALERTE boutique] ${message}`);
  const url = process.env.ALERT_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // "text" pour Slack, "content" pour Discord.
      body: JSON.stringify({ text: message, content: message }),
    });
  } catch (err) {
    console.error("Échec de l'envoi de l'alerte", err);
  }
}
