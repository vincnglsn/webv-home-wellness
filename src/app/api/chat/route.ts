import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chat/prompt";
import { CHAT_TOOLS, runChatTool, type ChatProductCard } from "@/lib/chat/tools";

export const maxDuration = 60;

const MODEL = process.env.CHAT_MODEL || "claude-opus-5-5";
const MAX_TOOL_ROUNDS = 6;
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

type ChatTurn = { role: "user" | "assistant"; content: string };

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
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: FALLBACK_REPLY, products: [] }, { status: 503 });
  }

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
  if (entry.chat.length >= 30) {
    return NextResponse.json(
      { reply: "Vous avez posé beaucoup de questions d'affilée, merci de réessayer dans quelques minutes.", products: [] },
      { status: 429 }
    );
  }
  entry.chat.push(now);
  hits.set(ip, entry);
  if (hits.size > 5000) hits.clear();

  const client = new Anthropic();
  const cards = new Map<string, ChatProductCard>();
  const messages: Anthropic.Beta.BetaMessageParam[] = history.map((t) => ({
    role: t.role,
    content: t.content,
  }));

  try {
    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const response = await client.beta.messages.create({
        model: MODEL,
        max_tokens: 2000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        system: SYSTEM_PROMPT,
        output_config: { effort: "low" },
        tools: CHAT_TOOLS as Anthropic.Beta.BetaTool[],
        messages,
      });

      if (response.stop_reason === "refusal") {
        return NextResponse.json({
          reply: "Je ne peux pas répondre à cette demande. Pour toute autre question sur nos produits ou votre commande, je reste disponible.",
          products: [],
        });
      }

      if (response.stop_reason !== "tool_use") {
        const text = response.content
          .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
          .map((b) => b.text)
          .join("\n")
          .trim();
        return NextResponse.json({
          reply: text || FALLBACK_REPLY,
          products: Array.from(cards.values()),
        });
      }

      // Les blocs de réflexion doivent être renvoyés tels quels pendant la boucle d'outils.
      messages.push({ role: "assistant", content: response.content });

      const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type !== "tool_use") continue;
        const { content, isError } = await runChatTool(
          block.name,
          (block.input ?? {}) as Record<string, unknown>,
          {
            cards,
            allowOrderLookup: () => {
              if (entry.orders.length >= 8) return false;
              entry.orders.push(Date.now());
              return true;
            },
          }
        );
        results.push({ type: "tool_result", tool_use_id: block.id, content, is_error: isError });
      }
      messages.push({ role: "user", content: results });
    }
    return NextResponse.json({ reply: FALLBACK_REPLY, products: Array.from(cards.values()) });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      console.error("[chat] limite de débit Anthropic", error.message);
    } else if (error instanceof Anthropic.APIError) {
      console.error(`[chat] erreur API ${error.status}`, error.message);
    } else {
      console.error("[chat] erreur inattendue", error);
    }
    return NextResponse.json({ reply: FALLBACK_REPLY, products: [] }, { status: 502 });
  }
}
