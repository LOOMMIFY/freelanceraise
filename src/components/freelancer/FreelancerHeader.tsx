
import { Link } from "react-router-dom";
import { ArrowLeft, Award, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Freelancer } from "@/services/freelancerService";

interface FreelancerHeaderProps {
  freelancer: Freelancer;
  renderRating: (rating: number) => React.ReactNode;
}

export const FreelancerHeader = ({ freelancer, renderRating }: FreelancerHeaderProps) => {
  return (
    <>
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/freelance">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'annuaire
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
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
      </div>
    </>
  );
};
