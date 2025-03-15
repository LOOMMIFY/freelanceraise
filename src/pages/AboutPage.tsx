
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">À propos de Loommify</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg">
              Loommify est une plateforme innovante qui connecte les freelances et les entreprises pour des collaborations efficaces et transparentes.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Notre mission</h2>
            <p>
              Notre mission est de créer un écosystème transparent où les freelances peuvent trouver des projets passionnants et où les entreprises peuvent accéder aux meilleurs talents indépendants, sans intermédiaires superflus.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Nos valeurs</h2>
            <ul className="space-y-2 list-disc pl-6">
              <li><strong>Transparence</strong> - Nous croyons que des relations de travail saines commencent par une communication transparente.</li>
              <li><strong>Qualité</strong> - Nous mettons en avant les talents qui délivrent un travail exceptionnel.</li>
              <li><strong>Communauté</strong> - Nous bâtissons un réseau de professionnels qui s'entraident et progressent ensemble.</li>
              <li><strong>Innovation</strong> - Nous évoluons constamment pour offrir les meilleurs outils à notre communauté.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Notre équipe</h2>
            <p>
              Loommify a été fondée par une équipe de professionnels passionnés par le monde du travail indépendant, ayant eux-mêmes évolué dans cet univers pendant des années.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Nous contacter</h2>
            <p>
              Pour toute question ou suggestion, n'hésitez pas à nous contacter à <a href="mailto:contact@loommify.com" className="text-primary hover:underline">contact@loommify.com</a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
