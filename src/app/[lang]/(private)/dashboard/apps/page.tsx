import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <>
      <div className="flex md:max-h-screen sm:max-h-screen items-center justify-center transition-all p-4">
        <div className="rounded-2xl bg-gray-800 shadow-2xl p-4 sm:p-6 md:p-8 w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl animate-fade-in">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">
              Olá, <span className="font-bold text-blue-400">{session?.user.name}</span>!
            </h1>
            <p className="text-md sm:text-lg text-gray-300 mt-2">
              Escolha um aplicativo para continuar.
            </p>
          </div>

          {/* Grid container for cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1 */}
            <Link
              href="/dashboard/apps/obras"
              className="group flex flex-col items-center justify-between bg-gradient-to-tl from-blue-500 to-blue-900 text-white rounded-xl shadow-lg hover:scale-105 transition-all p-4 sm:p-6 space-y-3 sm:space-y-4 backdrop-blur-md"
            >
              <Image className="object-contain h-16 sm:h-24" src='/assets/images/logo.png' alt="APP" width={150} height={150} />
              <h2 className="text-md sm:text-lg font-semibold tracking-wide text-white">Análise de obra</h2>
            </Link>

            {/* Card 2 */}
            <Link
              href="/dashboard/apps/bim"
              className="group flex flex-col items-center justify-between bg-gradient-to-tl from-blue-900 to-blue-500 text-white rounded-xl shadow-lg hover:scale-105 transition-all p-4 sm:p-6 space-y-3 sm:space-y-4 backdrop-blur-md"
            >
              <Image className="object-contain h-16 sm:h-24" src='/assets/images/logo.png' alt="Cam" quality={100} width={150} height={150} />
              <h2 className="text-md sm:text-lg font-semibold tracking-wide text-white">Visualizador BIM</h2>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}
