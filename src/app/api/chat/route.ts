import { NextRequest, NextResponse } from "next/server";
import { answer, type ChatTurn } from "@/lib/chat/engine";

const MAX_HISTORY = 20;
const MAX_MESSAGE_CHARS = 1000;

const FALLBACK_REPLY =
  "Je rencontre un souci technique. Vous pouvez nous écrire à contact@whatelsebyvinc.com, nous répondons sous 48h ouvrées.";

// Limitation par IP en mémoire : suffisante contre l'abus basique, mais
// propre à chaque instance serverless (pas un quota global).
const WINDOW_MS = 10 * 60_000;
const hits = new Map<string, { chat: number[]; orders: number[] }>();

function recent(timestamps: number[], now: number): number[] {
  return timestamps.filter((t) => now - t < WINDOW_MS);
}

function clientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function parseHistory(body: unknown): ChatTurn[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw)) return null;
  const turns: ChatTurn[] = [];
  for (const m of raw.slice(-MAX_HISTORY)) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") {
      return null;
    }
    const content = m.content.trim().slice(0, MAX_MESSAGE_CHARS);
    if (content) turns.push({ role: m.role, content });
  }
  while (turns.length > 0 && turns[0].role !== "user") turns.shift();
  if (turns.length === 0 || turns[turns.length - 1].role !== "user") return null;
  return turns;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }
  const history = parseHistory(body);
  if (!history) {
    return NextResponse.json({ error: "Messages invalides" }, { status: 400 });
  }

  const ip = clientIp(request);
  const now = Date.now();
  const entry = hits.get(ip) ?? { chat: [], orders: [] };
  entry.chat = recent(entry.chat, now);
  entry.orders = recent(entry.orders, now);
  if (entry.chat.length >= 60) {
    return NextResponse.json(
      { reply: "Vous avez posé beaucoup de questions d'affilée, merci de réessayer dans quelques minutes.", products: [], suggestions: [] },
      { status: 429 }
    );
  }
  entry.chat.push(now);
  hits.set(ip, entry);
  if (hits.size > 5000) hits.clear();

  try {
    const result = await answer(history, () => {
      if (entry.orders.length >= 8) return false;
      entry.orders.push(Date.now());
      return true;
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[chat] erreur", error);
    return NextResponse.json({ reply: FALLBACK_REPLY, products: [], suggestions: [] }, { status: 500 });
  }
}
