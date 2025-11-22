'use server'
import MainProjects from "../../../ui/components/main-projects";
import Footer from "@/app/ui/footer";
import HomeHero from "@/app/ui/components/home-hero";

export default async function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Main Content */}
      <main className="flex flex-col gap-8 font-[family-name:var(--font-geist-sans)]">

        {/* {/* Image Carousel */}
        <section id="#home">
          <HomeHero />
        </section> 

        {/* About Us Section */}
        <section id="#main-projects">
          <MainProjects />
        </section>

        {/* Projects
        <section id="#projects">
          <Projects />
        </section> */}
      </main>

      <footer className="mt-8">
        <Footer />
      </footer>
    </div>
  );
}
