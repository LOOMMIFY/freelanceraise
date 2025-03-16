
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export const StarRating = ({ rating, maxRating = 5, className = "" }: StarRatingProps) => {
  return (
    <div className={`flex ${className}`}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
        />
      ))}
    </div>
  );
};
