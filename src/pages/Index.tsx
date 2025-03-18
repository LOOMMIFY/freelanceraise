
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";

const Index = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className={cn("pt-32 pb-20 px-4", isDark && "bg-background")}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Connectez <span className="text-loommify-primary">talents</span> et <span className="text-loommify-secondary">opportunités</span> en toute transparence
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Loommify réunit freelances et entreprises dans un environnement sécurisé, équitable et transparent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={cn("bg-loommify-primary hover:bg-loommify-primary/90", isDark && "bg-[#8F3985] hover:bg-[#8F3985]/90")} asChild>
                <Link to="/signup">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className={cn(isDark && "border-white/20 hover:bg-white/10")} asChild>
                <Link to="/how-it-works">Comment ça marche</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-xl shadow-2xl border animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Loommify platform preview" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-loommify-primary text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg animate-fade-up">
              Plus de 10,000 freelances et entreprises nous font confiance
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={cn("py-20", isDark ? "bg-[#1A1F2C]/30" : "bg-loommify-primary/5")}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-loommify-primary text-sm font-medium uppercase tracking-wider">Fonctionnalités</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Pourquoi choisir Loommify?</h2>
            <p className="text-muted-foreground">
              Notre plateforme offre des outils puissants tant pour les freelances que pour les entreprises.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Projets vérifiés"
              description="Tous les projets sont vérifiés et les entreprises sont authentifiées pour garantir des opportunités légitimes."
              icon="🔍"
            />
            <FeatureCard
              title="Paiements sécurisés"
              description="Notre système d'entiercement protège à la fois les freelances et les entreprises pendant toute la durée du projet."
              icon="🔒"
            />
            <FeatureCard
              title="0% de commission"
              description="Nous ne prélevons aucune commission sur vos projets, vous gardez 100% de vos gains."
              icon="💰"
            />
            <FeatureCard
              title="Messagerie intégrée"
              description="Communiquez facilement avec vos clients ou prestataires directement sur la plateforme."
              icon="💬"
            />
            <FeatureCard
              title="Profils détaillés"
              description="Présentez vos compétences ou votre entreprise avec des profils complets et personnalisables."
              icon="👤"
            />
            <FeatureCard
              title="Support réactif"
              description="Notre équipe est disponible pour vous aider à tout moment en cas de questions ou de problèmes."
              icon="🌟"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-loommify-secondary text-sm font-medium uppercase tracking-wider">Processus</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Comment ça marche</h2>
            <p className="text-muted-foreground">
              Loommify simplifie la collaboration entre freelances et entreprises en quelques étapes simples.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <StepItem 
                number="01"
                title="Créez votre compte"
                description="Inscrivez-vous en tant que freelance ou entreprise et complétez votre profil."
              />
              <StepItem 
                number="02"
                title="Trouvez des opportunités"
                description="Parcourez les projets ou recherchez des freelances selon vos besoins."
              />
              <StepItem 
                number="03"
                title="Collaborez efficacement"
                description="Communiquez, partagez des fichiers et suivez l'avancement du projet."
              />
              <StepItem 
                number="04"
                title="Paiement sécurisé"
                description="Les fonds sont libérés uniquement lorsque le travail est approuvé."
              />
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                  alt="Collaboration between freelancer and business" 
                  className="w-full h-auto"
                />
              </div>
              <div className={cn(
                "absolute -bottom-6 -right-6 rounded-xl p-4 shadow-lg animate-fade-up",
                isDark ? "bg-card" : "bg-white"
              )}>
                <div className="text-loommify-primary font-bold text-xl">+10k</div>
                <div className="text-sm text-muted-foreground">Projets réussis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={cn("py-20", isDark ? "bg-[#1A1F2C]/30" : "bg-loommify-primary/5")}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-loommify-primary text-sm font-medium uppercase tracking-wider">Témoignages</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Ce que disent nos utilisateurs</h2>
            <p className="text-muted-foreground">
              Découvrez les expériences de freelances et d'entreprises qui utilisent Loommify.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Loommify a transformé ma façon de trouver des clients. La plateforme est intuitive et les paiements sont toujours à l'heure."
              name="Sophie Martin"
              role="Développeuse Web Freelance"
              avatar="https://randomuser.me/api/portraits/women/44.jpg"
              rating={5}
            />
            <TestimonialCard
              quote="En tant qu'entreprise, nous avons pu trouver des talents de qualité rapidement. Le processus de recrutement est simplifié et sécurisé."
              name="Thomas Dubois"
              role="Directeur Marketing, TechSolutions"
              avatar="https://randomuser.me/api/portraits/men/32.jpg"
              rating={4}
            />
            <TestimonialCard
              quote="La transparence de Loommify est rafraîchissante. Les conditions sont claires et je me sens respectée en tant que professionnelle."
              name="Élise Leroy"
              role="Designer UX/UI Freelance"
              avatar="https://randomuser.me/api/portraits/women/68.jpg"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className={cn(
            "rounded-2xl p-10 text-white text-center max-w-4xl mx-auto relative overflow-hidden",
            isDark ? "bg-[#8F3985]" : "bg-loommify-primary"
          )}>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à rejoindre Loommify?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Que vous soyez freelance ou entreprise, Loommify vous offre l'environnement idéal pour développer votre activité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-loommify-primary hover:bg-white/90" asChild>
                  <Link to="/signup">
                    S'inscrire gratuitement
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/how-it-works">En savoir plus</Link>
                </Button>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
              <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={cn(
      "rounded-xl p-6 shadow-sm border transition-transform hover:shadow-md hover:-translate-y-1 animate-fade-up",
      isDark ? "bg-card border-border" : "bg-white"
    )}>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface StepItemProps {
  number: string;
  title: string;
  description: string;
}

const StepItem = ({ number, title, description }: StepItemProps) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex items-start animate-fade-up">
      <div className={cn(
        "font-bold rounded-lg h-12 w-12 flex items-center justify-center mr-4 flex-shrink-0",
        theme === "dark" 
          ? "bg-loommify-primary/20 text-loommify-primary" 
          : "bg-loommify-primary/10 text-loommify-primary"
      )}>
        {number}
      </div>
      <div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

const TestimonialCard = ({ quote, name, role, avatar, rating }: TestimonialCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={cn(
      "rounded-xl p-6 shadow-sm border transition-all hover:shadow-md animate-fade-up",
      isDark ? "bg-card border-border" : "bg-white"
    )}>
      <div className="flex items-center mb-4">
        <div className="avatar-container avatar-sm mr-4">
          <img src={avatar} alt={name} className="avatar-image" />
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
      <StarRating rating={rating} className="mb-3" />
      <p className="italic text-muted-foreground">"{quote}"</p>
    </div>
  );
};

export default Index;
