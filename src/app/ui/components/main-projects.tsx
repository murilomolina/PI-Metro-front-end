import React from 'react';
// import Link from 'next/link';
import Image from 'next/image';

const MainProjects = () => {
  return (
    <>
      {/* First Section */}
      <section
        id="main-projects"
        className="py-20 px-6 md:px-16 bg-gradient-to-br from-gray-900 via-blue-700 to-black text-white mb-4"
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative h-72 md:h-96 rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
            <Image
              src={"https://imgs.search.brave.com/ifU-pkEFZofAqy7MEMvfV_46u_wbU5aqmUW3XBG0_mU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tb251/di5jb20uYnIvd3At/Y29udGVudC91cGxv/YWRzL2VsZW1lbnRv/ci90aHVtYnMvbW9u/aXRvcmFtZW50by1v/YnJhcy10aW1lbGFw/c2Utdm1zLXFzMWdp/c2c5dXRmc2cwOGF0/bHR3cXV1eXB1Nmdj/MmU1OG0wNHQ5cTAz/ay5qcGc"}
              alt="Projeto 1"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 text-transparent bg-clip-text drop-shadow-lg">
              Análise detalhada da obra
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-lg mx-auto md:mx-0">
              Nossa inteligência artificial realiza uma análise detalhada das imagens da obra, identificando estruturas, materiais, progresso da construção e possíveis inconsistências, fornecendo informações precisas para tomada de decisões rápidas e eficientes.
            </p>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section
        id="main-projects"
        className="py-20 px-6 md:px-16 bg-gradient-to-br from-gray-900 via-blue-700 to-black text-white"
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-12 md:gap-20">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative h-72 md:h-96 rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
            <Image
              src={"https://imgs.search.brave.com/4EGKPTu5fJ5OpPPDx2tabIn0gV1zbmpW-Xe7h2Lchk8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iaW1j/b3JuZXIuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIyLzA1/L0V4YW1wbGUtLmJp/bS1maWxlLW9mLWEt/c3RlZWwtc3RydWN0/dXJlLTEwMjR4NTQ2/LnBuZw"}
              alt="Projeto 2"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 text-transparent bg-clip-text drop-shadow-lg">
              Visualização de arquivos BIM
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-lg mx-auto md:mx-0">
              Visualize modelos BIM diretamente no navegador, permitindo uma análise detalhada do projeto, identificação de conflitos e colaboração eficiente entre equipes.
            </p>

            {/* <Link
              href="#projetos"
              className="inline-block px-8 py-3 rounded-lg text-md font-semibold bg-blue-600 bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Saiba Mais
            </Link> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProjects;
