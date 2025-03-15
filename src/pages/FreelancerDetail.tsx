
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Mail, 
  MapPin, 
  Star, 
  User, 
  Award
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillSelector } from "@/components/common/SkillSelector";

// Import the same mock data from the Freelance page
// In a real app, this would be in a shared data service or API
const MOCK_FREELANCERS = [
  {
    id: "1",
    name: "Sophie Dupont",
    avatar: "https://i.pravatar.cc/150?img=1",
    xp: 4325,
    lastActive: "2023-10-05",
    yearsExperience: 5,
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Redux", "Next.js"],
    responseTime: "Rapide",
    completedProjects: 27,
    rating: 4.8,
    location: "Paris, France",
    hourlyRate: 65,
    bio: "Développeuse front-end passionnée avec 5 ans d'expérience dans la création d'applications web modernes et réactives. Spécialiste React et TypeScript avec une solide expérience dans l'écosystème JavaScript.",
    portfolio: [
      { id: "p1", title: "Refonte de site e-commerce", description: "Refonte complète du site d'un détaillant de mode" },
      { id: "p2", title: "Application dashboard", description: "Dashboard administratif pour une entreprise SaaS" },
      { id: "p3", title: "API et intégration", description: "Développement backend et API pour une application de gestion" }
    ]
  },
  {
    id: "2",
    name: "Thomas Martin",
    avatar: "https://i.pravatar.cc/150?img=2",
    xp: 3150,
    lastActive: "2023-10-09",
    yearsExperience: 3,
    skills: ["Vue.js", "JavaScript", "PHP", "Laravel", "MySQL", "CSS3", "HTML5"],
    responseTime: "Moyen",
    completedProjects: 19,
    rating: 4.5,
    location: "Lyon, France",
    hourlyRate: 55,
    bio: "Développeur full-stack spécialisé en PHP et Vue.js. Je crée des applications web performantes et fiables, avec une attention particulière à l'expérience utilisateur et la qualité du code.",
    portfolio: [
      { id: "p1", title: "CMS personnalisé", description: "Système de gestion de contenu sur mesure pour une agence" },
      { id: "p2", title: "Application SPA", description: "Single Page Application avec Vue.js pour une startup" }
    ]
  },
  {
    id: "3",
    name: "Julie Bernard",
    avatar: "https://i.pravatar.cc/150?img=3",
    xp: 5720,
    lastActive: "2023-10-10",
    yearsExperience: 7,
    skills: ["Angular", "Java", "Spring Boot", "PostgreSQL", "Docker", "Kubernetes", "CI/CD"],
    responseTime: "Rapide",
    completedProjects: 42,
    rating: 4.9,
    location: "Bordeaux, France",
    hourlyRate: 75,
    bio: "Ingénieure logiciel avec une expertise en développement backend Java/Spring et frontend Angular. Plus de 7 ans d'expérience dans la conception et le développement d'applications d'entreprise complexes.",
    portfolio: [
      { id: "p1", title: "Système bancaire", description: "Application bancaire sécurisée avec authentification multi-facteurs" },
      { id: "p2", title: "Microservices architecture", description: "Migration vers une architecture microservices pour une application d'entreprise" },
      { id: "p3", title: "DevOps automation", description: "Mise en place d'un pipeline CI/CD pour le déploiement continu" }
    ]
  },
  {
    id: "4",
    name: "Alexandre Petit",
    avatar: "https://i.pravatar.cc/150?img=4",
    xp: 2890,
    lastActive: "2023-10-07",
    yearsExperience: 2,
    skills: ["WordPress", "CSS", "JavaScript", "PHP", "SEO", "UI Design", "Elementor"],
    responseTime: "Lent",
    completedProjects: 15,
    rating: 4.1,
    location: "Lille, France",
    hourlyRate: 45,
    bio: "Spécialiste WordPress avec une approche axée sur l'optimisation SEO et le design. Je crée des sites professionnels, personnalisés et optimisés pour vos besoins spécifiques.",
    portfolio: [
      { id: "p1", title: "Site d'entreprise", description: "Site vitrine pour une PME locale" },
      { id: "p2", title: "Blog de voyage", description: "Blog WordPress personnalisé avec monétisation" }
    ]
  },
  {
    id: "5",
    name: "Émilie Dubois",
    avatar: "https://i.pravatar.cc/150?img=5",
    xp: 6340,
    lastActive: "2023-10-10",
    yearsExperience: 8,
    skills: ["Python", "Django", "React", "AWS", "Machine Learning", "Data Science", "PostgreSQL"],
    responseTime: "Très rapide",
    completedProjects: 54,
    rating: 5.0,
    location: "Toulouse, France",
    hourlyRate: 85,
    bio: "Développeuse expérimentée spécialisée en Python et applications web Django. Expertise complémentaire en science des données et intégration de modèles d'apprentissage automatique dans des applications web.",
    portfolio: [
      { id: "p1", title: "Plateforme de recommandation", description: "Système de recommandation basé sur l'apprentissage automatique" },
      { id: "p2", title: "Analyse de données", description: "Tableau de bord de visualisation de données pour une entreprise industrielle" },
      { id: "p3", title: "Chatbot IA", description: "Développement d'un chatbot intelligent pour le service client" }
    ]
  },
  {
    id: "6",
    name: "Lucas Moreau",
    avatar: "https://i.pravatar.cc/150?img=6",
    xp: 3980,
    lastActive: "2023-10-08",
    yearsExperience: 4,
    skills: ["UI/UX Design", "Figma", "Adobe XD", "Sketch", "HTML/CSS", "Prototyping", "Design Systems"],
    responseTime: "Moyen",
    completedProjects: 31,
    rating: 4.7,
    location: "Paris, France",
    hourlyRate: 70,
    bio: "Designer UI/UX créatif avec une forte sensibilité pour l'ergonomie et l'accessibilité. Je conçois des interfaces intuitives et esthétiques qui répondent aux besoins des utilisateurs.",
    portfolio: [
      { id: "p1", title: "Refonte e-commerce", description: "Refonte complète de l'expérience utilisateur d'un site e-commerce" },
      { id: "p2", title: "Application mobile", description: "Design complet d'une application mobile de fitness" },
      { id: "p3", title: "Design system", description: "Création d'un système de design cohérent pour une entreprise SaaS" }
    ]
  },
  {
    id: "7",
    name: "Camille Lefebvre",
    avatar: "https://i.pravatar.cc/150?img=7",
    xp: 4570,
    lastActive: "2023-10-09",
    yearsExperience: 6,
    skills: ["Swift", "iOS", "Flutter", "Firebase", "React Native", "Mobile UX", "App Store Optimization"],
    responseTime: "Rapide",
    completedProjects: 38,
    rating: 4.6,
    location: "Nice, France",
    hourlyRate: 75,
    bio: "Développeuse mobile expérimentée avec une expertise en iOS natif et solutions cross-platform. Je crée des applications mobiles performantes, intuitives et élégantes.",
    portfolio: [
      { id: "p1", title: "Application iOS", description: "Application de commerce en ligne pour iOS avec intégration de paiement" },
      { id: "p2", title: "Application cross-platform", description: "Application Flutter pour Android et iOS avec synchronisation cloud" },
      { id: "p3", title: "Application de santé", description: "Application de suivi de santé personnelle avec analyse de données" }
    ]
  },
  {
    id: "8",
    name: "Antoine Rousseau",
    avatar: "https://i.pravatar.cc/150?img=8",
    xp: 3250,
    lastActive: "2023-10-06",
    yearsExperience: 3,
    skills: ["Laravel", "PHP", "MySQL", "JavaScript", "jQuery", "Bootstrap", "REST API"],
    responseTime: "Moyen",
    completedProjects: 23,
    rating: 4.3,
    location: "Nantes, France",
    hourlyRate: 60,
    bio: "Développeur backend spécialisé en PHP/Laravel avec des compétences solides en conception de bases de données et APIs. Je développe des solutions robustes et évolutives.",
    portfolio: [
      { id: "p1", title: "Système de gestion", description: "Plateforme de gestion interne pour une entreprise de logistique" },
      { id: "p2", title: "API e-commerce", description: "API RESTful pour une application e-commerce" }
    ]
  }
];

const FreelancerDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch freelancer with React Query
  const { data: freelancer, isLoading, isError } = useQuery({
    queryKey: ['freelancer', id],
    queryFn: async () => {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find freelancer by ID
      const found = MOCK_FREELANCERS.find(f => f.id === id);
      
      if (!found) {
        throw new Error("Freelancer not found");
      }
      
      return found;
    }
  });

  // Generate star rating display
  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !freelancer) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <User className="mx-auto h-16 w-16 text-gray-400" />
        <h1 className="mt-4 text-2xl font-bold">Freelance introuvable</h1>
        <p className="mt-2 text-gray-500">
          Le profil que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Button asChild className="mt-6">
          <Link to="/freelance">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'annuaire
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{freelancer.name} | Profil Freelance | Loommify</title>
      </Helmet>

      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/freelance">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'annuaire
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Profile header */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
              <AvatarFallback className="text-2xl">
                {freelancer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{freelancer.name}</h1>
              
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {freelancer.location}
              </div>
              
              <div className="flex items-center mt-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  <Award className="mr-1 h-4 w-4" />
                  {freelancer.xp} XP
                </Badge>
                <Badge variant="secondary" className="ml-2">
                  {freelancer.yearsExperience} ans d'expérience
                </Badge>
              </div>
              
              <div className="mt-4 flex items-center">
                <div className="flex">
                  {renderRating(freelancer.rating)}
                </div>
                <span className="ml-2 font-medium">{freelancer.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <Button className="w-full md:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Envoyer un message
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Bio and stats */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">À propos</h2>
                <p className="text-gray-700">{freelancer.bio}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Compétences</h2>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, index) => (
                    <Badge key={index} className="py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {freelancer.portfolio.map((project) => (
                    <Card key={project.id}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                        {project.description}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Statistics and details */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Projets terminés
                    </div>
                    <span className="font-medium">{freelancer.completedProjects}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-blue-500" />
                      Temps de réponse
                    </div>
                    <Badge variant="outline">{freelancer.responseTime}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                      Dernière connexion
                    </div>
                    <span className="text-sm">
                      {new Date(freelancer.lastActive).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center text-sm">
                      <Award className="mr-2 h-4 w-4 text-yellow-500" />
                      Tarif horaire
                    </div>
                    <span className="font-medium">{freelancer.hourlyRate}€/h</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Contacter {freelancer.name.split(' ')[0]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer un message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetail;
