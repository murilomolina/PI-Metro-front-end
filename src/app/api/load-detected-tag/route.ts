import { NextRequest, NextResponse } from 'next/server';
import fs from "fs/promises";

async function LoadDetectedTag(id: string) {
  try {
    const raw = await fs.readFile(`/home/ubuntu/uploads/${id}.json`, "utf-8");
    const data = JSON.parse(raw);

    const tagValues: Record<string, number> = {
      machine: 10,
      pillar: 20,
      building: 50,
      window: 90,
    };

    const detectedValues = Object.entries(data)
      .filter(([key, value]) => value === true && key in tagValues)
      .map(([key]) => tagValues[key]);

    if (detectedValues.length === 0) return 0;

    return Math.max(...detectedValues);
  } catch (error) {
    console.error("Erro em LoadDetectedTag:", error);
    return 0;
  }
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });

  const value = await LoadDetectedTag(id);
  return NextResponse.json({ value });
}
