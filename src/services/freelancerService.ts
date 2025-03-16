
// Mock data for freelancers
export const MOCK_FREELANCERS = [
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

// Type definitions
export type Portfolio = {
  id: string;
  title: string;
  description: string;
};

export type Freelancer = {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  lastActive: string;
  yearsExperience: number;
  skills: string[];
  responseTime: string;
  completedProjects: number;
  rating: number;
  location: string;
  hourlyRate: number;
  bio: string;
  portfolio: Portfolio[];
};

// Service functions
export const getFreelancerById = async (id: string): Promise<Freelancer> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find freelancer by ID
  const found = MOCK_FREELANCERS.find(f => f.id === id);
  
  if (!found) {
    throw new Error("Freelancer not found");
  }
  
  return found;
};

export const getAllFreelancers = async (): Promise<Freelancer[]> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_FREELANCERS;
};
