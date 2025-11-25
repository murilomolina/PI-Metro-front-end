'use client';

import { useEffect, useState } from 'react';
import {loadUserID} from '@/lib/loadUserID';
import Image from 'next/image';

export default function DashboardHome() {
  const [percent, setPercent] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function load() {

      const id = await loadUserID();

      const res = await fetch(`/api/load-detected-tag?id=${id}`);
      const data = await res.json();

      setTimeout(() => setPercent(data.value), 500);

      // seta a URL local da imagem servida pela API
      setImageUrl(`/api/load-local/${id}`);
    }

    load();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-400 text-center">
        Bem-vindo ao seu Dashboard
      </h1>

      <p className="text-gray-300 text-lg md:text-xl mb-8 text-center max-w-2xl">
        Aqui você terá acesso a informações gráficas e estatísticas dos projetos analisados em andamento aqui!
      </p>

      {/* GRÁFICO ÚNICO DE PROGRESSO */}
      <div className="w-full max-w-xl mt-6 p-6 bg-gray-800 rounded-2xl shadow-md">
        <div className="flex justify-between mb-2">
          <span className="text-gray-200 font-semibold">Progresso Geral</span>
          <span className="text-gray-400">{percent}%</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden">
          <div
            className="h-5 bg-blue-500 transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* EXIBIR IMAGEM LOCAL */}
      {imageUrl ? (
        <div className="mt-10">
          <h2 className="text-gray-200 text-xl mb-3 font-semibold">Última análise</h2>

          <img
            src={`${imageUrl}?noCache=${Date.now()}`}
            alt="Imagem carregada da API"
            width={400}
            height={400}
            className="rounded-xl shadow-lg max-w-sm border border-gray-600"
          />
        </div>
      ) : (
    <p className="text-gray-400 italic">Faça uma análise antes</p>
  )}
    </div>
  );
}
