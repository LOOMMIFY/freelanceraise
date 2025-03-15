
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Comment ça marche</h1>
          
          <div className="grid gap-12">
            {/* Pour les Freelances */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="text-loommify-primary">👨‍💻</span>
                <span className="ml-2">Pour les Freelances</span>
              </h2>
              
              <div className="grid gap-8 md:grid-cols-3">
                <div className="bg-white p-6 rounded-lg border">
                  <div className="w-10 h-10 bg-loommify-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="font-semibold text-loommify-primary">1</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Créez votre profil</h3>
                  <p className="text-muted-foreground mb-4">
                    Présentez vos compétences, votre expérience et définissez vos tarifs.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Portfolio professionnel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Mise en avant de vos compétences</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg border">
                  <div className="w-10 h-10 bg-loommify-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="font-semibold text-loommify-primary">2</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Trouvez des projets</h3>
                  <p className="text-muted-foreground mb-4">
                    Parcourez les offres et candidatez sur les projets qui vous intéressent.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Filtres de recherche avancés</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Notifications personnalisées</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg border">
                  <div className="w-10 h-10 bg-loommify-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="font-semibold text-loommify-primary">3</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Collaborez efficacement</h3>
                  <p className="text-muted-foreground mb-4">
                    Échangez, contractualisez et recevez vos paiements en toute sécurité.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Messagerie intégrée</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Paiements sécurisés</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild>
                  <Link to="/signup">S'inscrire en tant que Freelance</Link>
                </Button>
              </div>
            </section>
            
            {/* Pour les Entreprises */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="text-loommify-primary">🏢</span>
                <span className="ml-2">Pour les Entreprises</span>
              </h2>
              
              <div className="grid gap-8 md:grid-cols-3">
                <div className="bg-white p-6 rounded-lg border">
                  <div className="w-10 h-10 bg-loommify-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="font-semibold text-loommify-primary">1</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Publiez votre projet</h3>
                  <p className="text-muted-foreground mb-4">
                    Décrivez votre besoin, budget et délais pour attirer les meilleurs talents.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Formulaire intuitif</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Diffusion optimisée</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg border">
                  <div className="w-10 h-10 bg-loommify-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="font-semibold text-loommify-primary">2</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Recevez des propositions</h3>
                  <p className="text-muted-foreground mb-4">
                    Évaluez les candidatures et choisissez le freelance qui correspond le mieux.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Profils vérifiés</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Système d'évaluation</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg border">
                  <div className="w-10 h-10 bg-loommify-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="font-semibold text-loommify-primary">3</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Gérez vos projets</h3>
                  <p className="text-muted-foreground mb-4">
                    Suivez l'avancement, communiquez et validez les livrables en toute simplicité.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Tableau de bord intuitif</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <span className="text-sm">Factures automatisées</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild>
                  <Link to="/signup">S'inscrire en tant qu'Entreprise</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
