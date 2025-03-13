
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Check, X, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface FreelancerCardProps {
  id: number;
  name: string;
  avatar: string;
  expertise: string[];
  experience: number;
  hourlyRate: number;
  location: string;
  available: boolean;
  rating: number;
  skills: string[];
}

export const FreelancerCard = ({
  id,
  name,
  avatar,
  expertise,
  experience,
  hourlyRate,
  location,
  available,
  rating,
  skills,
}: FreelancerCardProps) => {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="transition-all hover:shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg leading-tight truncate mb-1">{name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span>{rating} / 5</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {location}
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="text-lg font-medium text-[#8F3985]">
                  {hourlyRate}€/h
                </div>
                <div className={`text-sm mt-1 flex items-center ${available ? 'text-green-600' : 'text-red-500'}`}>
                  {available ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      <span>Actif</span>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      <span>Indisponible</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">Expertise</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {expertise.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
              
              <p className="text-sm font-medium mb-1">Compétences</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 5).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {skills.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{skills.length - 5}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CardFooter className="bg-gray-50 border-t p-4">
        <div className="w-full flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">{experience}</span> an{experience > 1 ? 's' : ''} d'expérience
          </div>
          <Button className="bg-[#8F3985] hover:bg-[#8F3985]/90" asChild>
            <Link to={`/freelancers/${id}`}>Voir le profil</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
