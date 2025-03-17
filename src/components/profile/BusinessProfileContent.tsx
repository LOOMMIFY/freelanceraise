
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/context/AuthContext";
import { Link as ExternalLink, Globe, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { StarRating } from "@/components/ui/star-rating";

interface BusinessProfileContentProps {
  user: User | null;
  industry?: string;
  description?: string;
  website?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  completedProjects?: {
    id: string;
    title: string;
    description: string;
    freelancer?: string;
    freelancerId?: string;
  }[];
  openProjects?: {
    id: string;
    title: string;
    description: string;
  }[];
}

export const BusinessProfileContent = ({ 
  user, 
  industry = "Technologie",
  description = "Notre entreprise est spécialisée dans le développement de solutions numériques innovantes pour améliorer l'expérience utilisateur et optimiser les processus métier.",
  website = "https://example.com",
  socialLinks = [
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Twitter", url: "https://twitter.com" }
  ],
  completedProjects = [
    { id: "1", title: "Refonte site web", description: "Refonte complète du site vitrine avec intégration CMS.", freelancer: "Sophie Dupont", freelancerId: "1" },
    { id: "2", title: "Application métier", description: "Développement d'un outil interne de gestion de projet.", freelancer: "Thomas Martin", freelancerId: "2" }
  ],
  openProjects = [
    { id: "1", title: "Design application mobile", description: "Recherche d'un designer UI/UX pour créer l'interface de notre nouvelle application mobile." },
    { id: "2", title: "Développement API", description: "Besoin d'un développeur back-end pour créer une API RESTful." }
  ]
}: BusinessProfileContentProps) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Company info and projects */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">À propos de l'entreprise</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
            
            <div className="flex items-center text-sm space-x-4">
              <div className="flex items-center">
                <Badge variant="outline">{industry}</Badge>
              </div>
              
              <a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-blue-600 hover:underline"
              >
                <Globe className="h-4 w-4 mr-1" />
                Site web
              </a>
              
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-blue-600 hover:underline"
                >
                  {link.platform === "LinkedIn" ? (
                    <Linkedin className="h-4 w-4 mr-1" />
                  ) : link.platform === "Twitter" ? (
                    <Twitter className="h-4 w-4 mr-1" />
                  ) : (
                    <ExternalLink className="h-4 w-4 mr-1" />
                  )}
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Projets terminés</h2>
            <div className="grid grid-cols-1 gap-4">
              {completedProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    
                    {project.freelancer && (
                      <div className="mt-2 text-sm">
                        Réalisé par: 
                        <Link 
                          to={`/freelance/${project.freelancerId}`}
                          className="ml-1 text-blue-600 hover:underline"
                        >
                          {project.freelancer}
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Projets ouverts</h2>
              <Button>
                Publier un projet
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {openProjects.length > 0 ? (
                openProjects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      <div className="mt-3">
                        <Button size="sm" variant="outline">
                          Voir les détails
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <p className="text-muted-foreground">Aucun projet ouvert pour le moment</p>
                  <Button className="mt-3">
                    Créer votre premier projet
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Statistics and actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <div className="text-sm font-medium">Évaluation</div>
                <div className="flex items-center">
                  <StarRating rating={4.6} className="mr-2" />
                  <span>4.6</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <div className="text-sm font-medium">Projets publiés</div>
                <span>12</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <div className="text-sm font-medium">Missions terminées</div>
                <span>8</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div className="text-sm font-medium">Freelances embauchés</div>
                <span>5</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                Modifier le profil entreprise
              </Button>
              <Button variant="outline" className="w-full">
                Publier un projet
              </Button>
              <Button variant="outline" className="w-full">
                Rechercher des freelances
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
