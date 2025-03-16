
import { Calendar, CheckCircle, Clock, Award } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Freelancer } from "@/services/freelancerService";

interface FreelancerInfoProps {
  freelancer: Freelancer;
}

export const FreelancerInfo = ({ freelancer }: FreelancerInfoProps) => {
  return (
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
  );
};
