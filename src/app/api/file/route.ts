import { NextResponse } from "next/server";
import { readFile } from "fs/promises";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  try {
    const buffer = await readFile(filePath);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png"
      }
    });
  } catch (err) {
    return NextResponse.json({ error: "File not found ", err }, { status: 404 });
  }
}
