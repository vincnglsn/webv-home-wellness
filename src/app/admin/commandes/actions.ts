"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { payPendingSupplierOrders } from "@/lib/fulfillment";

export async function payNow() {
  if (!(await isAdmin())) redirect("/admin/avis");
  const result = await payPendingSupplierOrders();
  revalidatePath("/admin/commandes");
  redirect(`/admin/commandes?payees=${result.paid}&essayees=${result.checked}`);
}
