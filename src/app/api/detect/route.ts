import { NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  const jsonPath = `/home/ubuntu/uploads/${id}.json`;
  console.log(`${id}`);

  try {
    const raw = await fs.readFile(jsonPath, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ detected: false });
  }
}
