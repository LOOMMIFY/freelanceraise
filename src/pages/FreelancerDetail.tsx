
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Star, User, Mail, ArrowLeft, Award, Link, Briefcase, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFreelancerById } from "@/services/freelancerService";
import { FreelancerHeader } from "@/components/freelancer/FreelancerHeader";
import { FreelancerContent } from "@/components/freelancer/FreelancerContent";
import { StarRating } from "@/components/ui/star-rating";
import { Link as RouterLink } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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

  // Calculate freelancer level based on XP
  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 1000) + 1;
  };

  // Calculate progress to next level
  const calculateProgress = (xp: number) => {
    const currentLevel = calculateLevel(xp);
    const levelBaseXP = (currentLevel - 1) * 1000;
    const progress = ((xp - levelBaseXP) / 1000) * 100;
    return Math.min(progress, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 pt-28">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !freelancer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 pt-28 text-center">
          <User className="mx-auto h-16 w-16 text-gray-400" />
          <h1 className="mt-4 text-2xl font-bold">Freelance introuvable</h1>
          <p className="mt-2 text-gray-500">
            Le profil que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button asChild className="mt-6">
            <RouterLink to="/freelance">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'annuaire
            </RouterLink>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const level = calculateLevel(freelancer.xp);
  const nextLevel = level + 1;
  const progressToNextLevel = calculateProgress(freelancer.xp);

  // Define badges based on freelancer attributes
  const badges = [
    { name: "Expert", icon: <Trophy className="h-4 w-4" />, condition: freelancer.rating >= 4.5 },
    { name: "Projets terminés", icon: <Briefcase className="h-4 w-4" />, condition: freelancer.completedProjects > 20 },
    { name: "Réponse rapide", icon: <Mail className="h-4 w-4" />, condition: freelancer.responseTime === "Rapide" || freelancer.responseTime === "Très rapide" }
  ].filter(badge => badge.condition);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-28">
        <Helmet>
          <title>{freelancer.name} | Profil Freelance | Loommify</title>
        </Helmet>

        <FreelancerHeader freelancer={freelancer} renderRating={renderRating} />
        
        <div className="bg-white dark:bg-card rounded-lg shadow mt-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Progression et Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">Niveau {level}</span>
                  <span className="text-sm text-muted-foreground">{freelancer.xp} XP / {level * 1000 + 1000} XP</span>
                </div>
                <Progress value={progressToNextLevel} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(1000 - (freelancer.xp % 1000))} XP restants pour atteindre le niveau {nextLevel}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-3">Badges obtenus</h3>
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="py-1.5 px-3 gap-1.5 bg-[#8F3985]/10 text-[#8F3985] border-[#8F3985]/20">
                      {badge.icon}
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <FreelancerContent freelancer={freelancer} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FreelancerDetail;
