// app/api/storage/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET() {
  const bucket = "test"; // seu bucket
  const folder = "metro/photos/obra_1"; // pasta onde estão as imagens

  const { data: files, error } = await supabase.storage
    .from(bucket)
    .list(folder, { limit: 100, sortBy: { column: "name", order: "asc" } });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const blobs = files.map((f) => {
    const objectPath = `${folder}/${f.name}`; // caminho relativo ao bucket
    const publicData = supabase.storage.from(bucket).getPublicUrl(objectPath);
    return {
      pathname: objectPath,
      url: publicData?.data?.publicUrl ?? null,
    };
  });

  return NextResponse.json({ blobs });
}
