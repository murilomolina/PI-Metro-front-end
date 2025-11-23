'use client';

export default  function DashboardHome() {

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-400 text-center">
        Bem-vindo ao seu Dashboard
      </h1>

      <p className="text-gray-300 text-lg md:text-xl mb-8 text-center max-w-2xl">
        Em breve, você terá acesso a informações gráficas e estatísticas dos projetos em andamento aqui!
        
      </p>

      <div className="flex space-x-4 mt-6">
        <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-6 h-6 md:w-8 md:h-8 bg-indigo-600 rounded-full animate-bounce delay-300"></div>
      </div>

      <p className="mt-12 text-gray-400 italic text-center max-w-lg">
        Estamos felizes em ter você aqui!
      </p>
    </div>
  );
}
