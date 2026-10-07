import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

// L'accès admin est protégé par un mot de passe unique défini dans la variable
// d'environnement ADMIN_PASSWORD. Sans cette variable, l'espace admin est fermé.
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function sessionToken(): string {
  return createHmac("sha256", process.env.ADMIN_PASSWORD ?? "").update("admin-session-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function passwordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(
    createHmac("sha256", "cmp").update(candidate).digest("hex"),
    createHmac("sha256", "cmp").update(expected).digest("hex")
  );
}

export async function isAdmin(): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  return Boolean(value) && safeEqual(value as string, sessionToken());
}

export async function startAdminSession(): Promise<void> {
  (await cookies()).set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
}

export async function endAdminSession(): Promise<void> {
  (await cookies()).delete({ name: COOKIE_NAME, path: "/admin" });
}
