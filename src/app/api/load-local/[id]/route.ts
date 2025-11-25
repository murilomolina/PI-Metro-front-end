import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
    const { id } = await context.params;

    // Caminho correto: /home/ubuntu/uploads/{id}-output.png
    const filename = `${id}-output.png`;
    const imagePath = path.join("/home/ubuntu/uploads", filename);
    // console.log(`Carregando imagem de: ${imagePath}`);

    // Verifica se existe
    if (!fs.existsSync(imagePath)) {
      return NextResponse.json(
        { error: "Arquivo não encontrado" },
        { status: 404 }
      );
    }

    // Lê a imagem
    const fileBuffer = fs.readFileSync(imagePath);

    const mime = "image/png"; // sempre PNG

    const readableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(fileBuffer);
        controller.close();
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });


  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao carregar a imagem" },
      { status: 500 }
    );
  }
}
