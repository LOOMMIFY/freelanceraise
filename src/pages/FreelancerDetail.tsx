
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Star, User, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFreelancerById } from "@/services/freelancerService";
import { FreelancerHeader } from "@/components/freelancer/FreelancerHeader";
import { FreelancerContent } from "@/components/freelancer/FreelancerContent";
import { StarRating } from "@/components/ui/star-rating";
import { Link } from "react-router-dom";

const FreelancerDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch freelancer with React Query
  const { data: freelancer, isLoading, isError } = useQuery({
    queryKey: ['freelancer', id],
    queryFn: () => getFreelancerById(id as string)
  });

  // Generate star rating display
  const renderRating = (rating: number) => {
    return <StarRating rating={rating} />;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !freelancer) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <User className="mx-auto h-16 w-16 text-gray-400" />
        <h1 className="mt-4 text-2xl font-bold">Freelance introuvable</h1>
        <p className="mt-2 text-gray-500">
          Le profil que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Button asChild className="mt-6">
          <Link to="/freelance">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'annuaire
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{freelancer.name} | Profil Freelance | Loommify</title>
      </Helmet>

      <FreelancerHeader freelancer={freelancer} renderRating={renderRating} />
      
      <div className="bg-white rounded-lg shadow mt-6">
        <FreelancerContent freelancer={freelancer} />
      </div>
    </div>
  );
};

export default FreelancerDetail;
