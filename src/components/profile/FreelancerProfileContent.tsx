
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { StarRating } from "@/components/ui/star-rating";
import { User } from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FreelancerProfileContentProps {
  user: User | null;
  skills?: string[];
  portfolio?: {
    id: string;
    title: string;
    description: string;
  }[];
  bio?: string;
}

export const FreelancerProfileContent = ({ 
  user, 
  skills = ["React", "TypeScript", "Node.js", "Tailwind CSS", "UI/UX", "API Integration"], 
  portfolio = [
    { id: "1", title: "Site e-commerce", description: "Création d'une boutique en ligne complète avec gestion de panier et paiement." },
    { id: "2", title: "Application mobile", description: "Développement d'une application de suivi fitness avec synchronisation cloud." }
  ],
  bio = "Développeur full-stack avec 5 ans d'expérience, spécialisé dans les applications React et Node.js. Passionné par la création d'interfaces utilisateurs intuitives et d'APIs performantes."
}: FreelancerProfileContentProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Bio and skills */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">À propos</h2>
            <p className="text-gray-700 dark:text-gray-300">{bio}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} className="py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.map((project) => (
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
                <div className="text-sm font-medium">Évaluation</div>
                <div className="flex items-center">
                  <StarRating rating={4.8} className="mr-2" />
                  <span>4.8</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <div className="text-sm font-medium">Projets terminés</div>
                <span>24</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <div className="text-sm font-medium">Taux horaire</div>
                <span>60€/h</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div className="text-sm font-medium">Disponibilité</div>
                <div className="flex items-center">
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={setIsAvailable}
                    className="mr-2"
                  />
                  <Label htmlFor="availability">
                    {isAvailable ? 'Disponible' : 'Non disponible'}
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/dashboard/edit">
                  Modifier mon profil
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                Exporter mon CV
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
