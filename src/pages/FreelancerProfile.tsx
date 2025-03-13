
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, MessageSquare, Calendar, Briefcase, CheckCircle } from "lucide-react";

// Sample freelancer data - In a real app this would come from an API
const FREELANCER = {
  id: 1,
  name: "Sophie Dubois",
  title: "Développeuse Web Full Stack",
  avatar: "/placeholder.svg", 
  expertise: ["Développement Web", "React.js", "Node.js"],
  experience: 5,
  hourlyRate: 65,
  location: "Paris, France",
  available: true,
  rating: 4.8,
  skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB", "Express", "TypeScript", "Redux", "Git"],
  languages: [
    { name: "Français", level: "Langue maternelle" },
    { name: "Anglais", level: "Courant" },
    { name: "Espagnol", level: "Intermédiaire" }
  ],
  education: [
    { 
      degree: "Master en Développement Web", 
      school: "École Supérieure d'Informatique", 
      location: "Paris",
      year: "2018"
    },
    {
      degree: "Licence en Informatique", 
      school: "Université de Paris", 
      location: "Paris",
      year: "2016"
    }
  ],
  bio: "Développeuse web passionnée avec 5 ans d'expérience dans la création d'applications web modernes et réactives. Spécialisée dans les technologies JavaScript (React.js, Node.js) et le développement full stack. J'aime relever de nouveaux défis techniques et trouver des solutions innovantes pour mes clients.",
  projects: [
    {
      id: 1,
      title: "Plateforme e-commerce",
      description: "Création d'une plateforme e-commerce complète avec React, Node.js et MongoDB",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Application de gestion de projet",
      description: "Développement d'une application SaaS de gestion de projet avec tableaux kanban",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Site vitrine responsive",
      description: "Design et développement d'un site vitrine pour une agence de marketing",
      image: "/placeholder.svg"
    }
  ],
  services: [
    {
      id: 1,
      title: "Développement d'application web React",
      price: "À partir de 3000€",
      deliveryTime: "2-4 semaines"
    },
    {
      id: 2,
      title: "Création d'API REST avec Node.js",
      price: "À partir de 1500€",
      deliveryTime: "1-2 semaines" 
    },
    {
      id: 3,
      title: "Maintenance et amélioration de site web",
      price: "65€/heure",
      deliveryTime: "Selon besoins"
    }
  ],
  reviews: [
    {
      id: 1,
      client: "Martin Leroy",
      rating: 5,
      date: "10/05/2023",
      comment: "Sophie a fait un travail exceptionnel sur notre application web. Communication claire, respect des délais et qualité de code impressionnante. Je recommande vivement ses services !"
    },
    {
      id: 2,
      client: "Entreprise ABC",
      rating: 5,
      date: "22/03/2023",
      comment: "Très bonne prestation pour le développement de notre API. Sophie a su s'adapter à nos besoins et proposer des solutions techniques pertinentes."
    },
    {
      id: 3,
      client: "Laura Martin",
      rating: 4,
      date: "15/01/2023",
      comment: "Collaboration agréable et professionnelle. Bonne communication tout au long du projet. Quelques délais légèrement dépassés, mais le résultat final est excellent."
    }
  ]
};

const FreelancerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("profil");
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container">
          {/* Profile Header */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-8">
            <div className="relative">
              <div className="h-48 bg-gradient-to-r from-[#8F3985] to-[#25283D]"></div>
              <div className="absolute -bottom-16 left-8">
                <Avatar className="h-32 w-32 border-4 border-white">
                  <AvatarImage src={FREELANCER.avatar} alt={FREELANCER.name} />
                  <AvatarFallback className="text-2xl">{getInitials(FREELANCER.name)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <div className="pt-20 px-8 pb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{FREELANCER.name}</h1>
                  <p className="text-lg text-muted-foreground">{FREELANCER.title}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{FREELANCER.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{FREELANCER.rating} / 5</span>
                      <span className="text-sm text-muted-foreground ml-1">({FREELANCER.reviews.length} avis)</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{FREELANCER.experience} ans d'expérience</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-[#8F3985] hover:bg-[#8F3985]/90">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Envoyer un message
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Planifier un appel
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {FREELANCER.expertise.map((item, index) => (
                    <Badge key={index} className="bg-[#8F3985] hover:bg-[#8F3985]">{item}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-white border w-full justify-start rounded-lg p-0 h-auto">
              <TabsTrigger 
                value="profil" 
                className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#8F3985] data-[state=active]:shadow-none py-4"
              >
                Profil
              </TabsTrigger>
              <TabsTrigger 
                value="portfolio" 
                className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#8F3985] data-[state=active]:shadow-none py-4"
              >
                Portfolio
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#8F3985] data-[state=active]:shadow-none py-4"
              >
                Services
              </TabsTrigger>
              <TabsTrigger 
                value="avis" 
                className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#8F3985] data-[state=active]:shadow-none py-4"
              >
                Avis
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profil" className="space-y-8 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  {/* Bio Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>À propos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{FREELANCER.bio}</p>
                    </CardContent>
                  </Card>
                  
                  {/* Skills Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Compétences</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {FREELANCER.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Education Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Formation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {FREELANCER.education.map((edu, index) => (
                        <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">
                            {edu.school}, {edu.location} • {edu.year}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-8">
                  {/* Info Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tarif horaire</p>
                        <p className="font-medium text-lg">{FREELANCER.hourlyRate}€/h</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Disponibilité</p>
                        <div className={`flex items-center ${FREELANCER.available ? 'text-green-600' : 'text-red-500'}`}>
                          {FREELANCER.available ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              <span>Disponible actuellement</span>
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 mr-2" />
                              <span>Indisponible</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Langues</p>
                        <ul className="space-y-2">
                          {FREELANCER.languages.map((lang, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{lang.name}</span>
                              <span className="text-sm text-muted-foreground">{lang.level}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-8 mt-8">
              <h2 className="text-2xl font-bold mb-4">Projets récents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FREELANCER.projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Services Tab */}
            <TabsContent value="services" className="space-y-8 mt-8">
              <h2 className="text-2xl font-bold mb-4">Services proposés</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FREELANCER.services.map((service) => (
                  <Card key={service.id}>
                    <CardHeader>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>
                        <div className="font-medium text-lg text-[#8F3985] mt-2">{service.price}</div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground flex items-center mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Délai de livraison: {service.deliveryTime}</span>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button className="w-full bg-[#8F3985] hover:bg-[#8F3985]/90">
                        Commander
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Reviews Tab */}
            <TabsContent value="avis" className="space-y-8 mt-8">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">Avis clients</h2>
                <div className="flex items-center bg-yellow-50 text-yellow-800 px-3 py-1 rounded">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                  <span className="font-medium">{FREELANCER.rating}</span>
                  <span className="text-sm ml-1">/ 5</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {FREELANCER.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">{review.client}</CardTitle>
                          <CardDescription>{review.date}</CardDescription>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FreelancerProfile;
