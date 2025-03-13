
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  id: number;
  title: string;
  freelancerId: number;
  freelancerName: string;
  freelancerAvatar: string;
  price: number;
  deliveryTime: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
}

export const ServiceCard = ({
  id,
  title,
  freelancerId,
  freelancerName,
  freelancerAvatar,
  price,
  deliveryTime,
  rating,
  reviews,
  category,
  description,
}: ServiceCardProps) => {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="transition-all hover:shadow-md overflow-hidden flex flex-col h-full">
      <div className="p-4 md:p-6 flex-1">
        <Badge className="mb-3 bg-[#25283D]/10 text-[#25283D] hover:bg-[#25283D]/20 hover:text-[#25283D]">
          {category}
        </Badge>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center mb-4">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={freelancerAvatar} alt={freelancerName} />
            <AvatarFallback>{getInitials(freelancerName)}</AvatarFallback>
          </Avatar>
          <Link
            to={`/freelancers/${freelancerId}`}
            className="text-sm font-medium hover:underline"
          >
            {freelancerName}
          </Link>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
          <span>{rating.toFixed(1)}</span>
          <span className="mx-1">·</span>
          <span>{reviews} avis</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>Livraison en {deliveryTime}</span>
        </div>
      </div>
      
      <CardFooter className="bg-gray-50 border-t p-4 mt-auto">
        <div className="w-full flex items-center justify-between">
          <div className="text-[#8F3985] font-semibold text-lg">
            {price}€
          </div>
          <Button className="bg-[#8F3985] hover:bg-[#8F3985]/90" asChild>
            <Link to={`/services/${id}`}>Voir le service</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
