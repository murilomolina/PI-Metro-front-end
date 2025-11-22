import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  }

  // gera id único
  const id = crypto.randomBytes(4).toString("hex");

  const home = "/home/murilo/uploads";
  await fs.mkdir(home, { recursive: true });

  const inputPath = path.join(home, `${id}-input.png`);
  const jsonPath  = path.join(home, `${id}.json`);

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(inputPath, bytes);

  const jsonData = {
    id,
    input: inputPath,
    output: path.join(home, `${id}-output.png`),
    detected: false
  };

  await writeFile(jsonPath, JSON.stringify(jsonData, null, 2));

  return NextResponse.json({ ok: true, id });
}
