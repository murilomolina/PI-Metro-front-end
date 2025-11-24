'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Obras() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const [uploadId, setUploadId] = useState<string | null>(null);

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResultImage(null);
    }
  }

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setProcessing(true);

    const res = await fetch("/api/upload-local", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    //  PEGA O id
    setUploadId(data.id);
  }

  // 🔄 Verifica o JSON apenas do uploadId atual
  useEffect(() => {
    if (!processing || !uploadId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/detect?id=${uploadId}`);

      let data;
      try {
        data = await res.json();
      } catch {
        return; // JSON ainda não existe ele ignora
      }

      if (data.detected === true) {
        setProcessing(false);

        setResultImage(`/api/file?path=${encodeURIComponent(data.output)}`);

        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [processing, uploadId]);


  return (
  <div className="max-h-screen flex flex-col justify-start items-center gap-6 p-6">
    <h1 className="text-3xl text-white font-bold">Análise de Obra pela IA</h1>

    {/* Container que junta preview + resultado lado a lado */}
    <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-start">

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
        <label className="block text-white text-sm font-medium mb-2">
          Selecione uma imagem:
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleSelect}
          className="w-full text-white file:bg-blue-500 file:hover:bg-indigo-600 file:transition-colors file:border-none file:px-4 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-blue-700"
        />

        {preview && (
          <div className="mt-6">
            <p className="text-white mb-2">Pré-visualização:</p>
            <Image
              src={preview}
              alt="preview"
              width={500}
              height={500}
              className="w-full rounded-xl shadow-lg border border-white/20"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          className="mt-6 w-full bg-blue-500 hover:bg-indigo-600 transition-colors text-white font-semibold py-2 rounded-xl"
        >
          Enviar imagem
        </button>

        {processing && (
          <div className="text-center text-white animate-pulse mt-4">
            <p className="text-lg">A IA está analisando a imagem…</p>
          </div>
        )}
      </div>

      {resultImage && (
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
          <h2 className="text-xl text-white font-semibold mb-4 text-center">
            Resultado da IA
          </h2>

          <Image
            src={resultImage}
            alt="Resultado"
            width={500}
            height={500}
            className="w-full rounded-xl shadow-xl border border-white/20"
          />
        </div>
      )}

    </div>
  </div>
);
}
