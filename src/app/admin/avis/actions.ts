"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  endAdminSession,
  isAdmin,
  passwordMatches,
  startAdminSession,
} from "@/lib/admin-auth";
import { setReviewStatus } from "@/lib/reviews";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    // Ralentit les essais répétés.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    redirect("/admin/avis?erreur=1");
  }
  await startAdminSession();
  redirect("/admin/avis");
}

export async function logout() {
  await endAdminSession();
  redirect("/admin/avis");
}

export async function moderate(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/avis");
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!Number.isInteger(id) || id <= 0) return;
  if (status !== "published" && status !== "rejected" && status !== "pending") return;
  const slug = await setReviewStatus(id, status);
  revalidatePath("/admin/avis");
  if (slug) revalidatePath(`/produits/${slug}`);
}
