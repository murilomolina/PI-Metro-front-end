'use server';

import { auth } from "@/auth";

export async function loadUserID() {
  const session = await auth();
  const id = session?.user?.email!.replace(/[@.]/g, "_");
  return id ?? null;
}
