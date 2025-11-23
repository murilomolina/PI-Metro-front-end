'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const { error } = await supabase.from("user").insert({
        name,
        email,
        phone,
      });

      if (error) {
        console.error("Erro ao adicionar usuário:", error);
        setError("Erro ao adicionar o usuário. Verifique os dados.");
        return;
      }

      setSuccess("Usuário adicionado com sucesso!");
      setName("");
      setEmail("");
      setPhone("");

    } catch (err) {
      console.error("Erro inesperado:", err);
      setError("Erro inesperado ao adicionar usuário.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center h-full p-4">
      <div className="w-full max-w-xl bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r text-center from-blue-300 to-blue-500 bg-clip-text text-transparent">
          Adicionar Novo Usuário
        </h1>

        <p className="text mb-8">
          Registre novos usuários que poderão acessar o sistema.
          Preencha os dados abaixo para adicioná-los ao banco.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-300 mb-1">Nome*</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700
                         focus:ring-2 focus:ring-blue-500 outline-none text-gray-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">E-mail*</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700
                         focus:ring-2 focus:ring-blue-500 outline-none text-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Telefone</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700
                         focus:ring-2 focus:ring-blue-500 outline-none text-gray-100"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {success && (
            <div className="text-green-400 bg-green-900/20 p-3 rounded-xl text-center border border-green-700">
              {success}
            </div>
          )}

          {error && (
            <div className="text-red-400 bg-red-900/20 p-3 rounded-xl text-center border border-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-xl bg-gradient-to-r bg-blue-500 hover:bg-green-600 transition-colors
                       text-white font-bold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Adicionando..." : "Adicionar Usuário"}
          </button>
        </form>
      </div>
    </div>
  );
}
