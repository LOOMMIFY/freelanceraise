
// Mock data for businesses
export const MOCK_BUSINESSES = [
  {
    id: "1",
    name: "TechNova Solutions",
    logo: "https://i.pravatar.cc/150?img=11",
    xp: 5820,
    industry: "Technologie",
    location: "Paris, France",
    founded: "2015",
    employeeCount: "50-100",
    website: "https://technova-example.com",
    badges: ["Entreprise Active", "Paiements Vérifiés", "Top Employeur"],
    rating: 4.7,
    completedProjects: 42,
    description: "TechNova Solutions est une entreprise innovante spécialisée dans le développement de solutions numériques sur mesure. Notre équipe d'experts combine créativité et expertise technique pour répondre aux défis les plus complexes de nos clients.",
    openProjects: [
      { id: "op1", title: "Développement d'une application mobile e-commerce", description: "Nous recherchons un développeur mobile expérimenté pour créer une application e-commerce complète pour iOS et Android." },
      { id: "op2", title: "Refonte de site web corporate", description: "Projet de modernisation de notre site web avec intégration d'un CMS personnalisé et amélioration de l'UX." }
    ],
    pastProjects: [
      { id: "pp1", title: "Plateforme de gestion de données", description: "Développement d'une solution de gestion de données pour une entreprise du secteur financier.", freelancer: "Sophie Dupont", freelancerId: "1" },
      { id: "pp2", title: "Application web progressive", description: "Création d'une PWA pour un service de livraison à domicile.", freelancer: "Thomas Martin", freelancerId: "2" },
      { id: "pp3", title: "Système d'authentification sécurisé", description: "Mise en place d'un système d'authentification multi-facteurs pour une plateforme sensible.", freelancer: "Julie Bernard", freelancerId: "3" }
    ]
  },
  {
    id: "2",
    name: "DesignCraft Studio",
    logo: "https://i.pravatar.cc/150?img=12",
    xp: 3740,
    industry: "Design & Création",
    location: "Lyon, France",
    founded: "2018",
    employeeCount: "10-20",
    website: "https://designcraft-example.com",
    badges: ["Entreprise Active", "Top Employeur"],
    rating: 4.5,
    completedProjects: 28,
    description: "DesignCraft Studio est une agence créative spécialisée dans le design UI/UX, l'identité de marque et la création graphique. Nous proposons des solutions visuelles innovantes et sur mesure pour aider nos clients à se démarquer.",
    openProjects: [
      { id: "op1", title: "Création d'identité visuelle complète", description: "Recherche d'un designer graphique pour développer l'identité visuelle d'une nouvelle marque de cosmétiques bio." }
    ],
    pastProjects: [
      { id: "pp1", title: "Refonte UI/UX application mobile", description: "Refonte complète de l'interface utilisateur d'une application mobile de fitness.", freelancer: "Lucas Moreau", freelancerId: "6" },
      { id: "pp2", title: "Identité visuelle startup fintech", description: "Création de logo, charte graphique et supports de communication pour une startup du secteur financier.", freelancer: "Alexandre Petit", freelancerId: "4" }
    ]
  },
  {
    id: "3",
    name: "DataSense Analytics",
    logo: "https://i.pravatar.cc/150?img=13",
    xp: 4920,
    industry: "Data & Intelligence Artificielle",
    location: "Toulouse, France",
    founded: "2016",
    employeeCount: "20-50",
    website: "https://datasense-example.com",
    badges: ["Entreprise Active", "Paiements Vérifiés"],
    rating: 4.8,
    completedProjects: 35,
    description: "DataSense Analytics est une entreprise spécialisée dans l'analyse de données et le développement de solutions d'intelligence artificielle. Nous aidons les organisations à exploiter la puissance de leurs données pour prendre des décisions stratégiques éclairées.",
    openProjects: [
      { id: "op1", title: "Développement d'un modèle prédictif", description: "Recherche d'un data scientist pour développer un modèle d'apprentissage automatique permettant de prédire les comportements clients." },
      { id: "op2", title: "Tableau de bord de visualisation de données", description: "Création d'un dashboard interactif pour visualiser des KPIs complexes de manière intuitive." },
      { id: "op3", title: "Optimisation d'algorithmes de ML", description: "Amélioration des performances de nos algorithmes existants de machine learning." }
    ],
    pastProjects: [
      { id: "pp1", title: "Système de recommandation e-commerce", description: "Développement d'un système de recommandation personnalisé pour une plateforme e-commerce.", freelancer: "Émilie Dubois", freelancerId: "5" },
      { id: "pp2", title: "Analyse prédictive maintenance industrielle", description: "Mise en place d'un système d'analyse prédictive pour anticiper les besoins de maintenance d'équipements industriels.", freelancer: "Julie Bernard", freelancerId: "3" }
    ]
  }
];

// Type definitions
export type Project = {
  id: string;
  title: string;
  description: string;
  freelancer?: string;
  freelancerId?: string;
};

export type Business = {
  id: string;
  name: string;
  logo: string;
  xp: number;
  industry: string;
  location: string;
  founded: string;
  employeeCount: string;
  website: string;
  badges: string[];
  rating: number;
  completedProjects: number;
  description: string;
  openProjects: Project[];
  pastProjects: Project[];
};

// Service functions
export const getBusinessById = async (id: string): Promise<Business> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find business by ID
  const found = MOCK_BUSINESSES.find(b => b.id === id);
  
  if (!found) {
    throw new Error("Business not found");
  }
  
  return found;
};

export const getAllBusinesses = async (): Promise<Business[]> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_BUSINESSES;
};
