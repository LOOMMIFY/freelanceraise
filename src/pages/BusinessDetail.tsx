
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Building, Mail, ArrowLeft, Award, ExternalLink, MapPin, Calendar, Users, Trophy, Briefcase, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBusinessById } from "@/services/businessService";
import { Link as RouterLink } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch business with React Query
  const { data: business, isLoading, isError } = useQuery({
    queryKey: ['business', id],
    queryFn: () => getBusinessById(id as string)
  });

  // Calculate business level based on XP
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

  if (isError || !business) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 pt-28 text-center">
          <Building className="mx-auto h-16 w-16 text-gray-400" />
          <h1 className="mt-4 text-2xl font-bold">Entreprise introuvable</h1>
          <p className="mt-2 text-gray-500">
            Le profil d'entreprise que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button asChild className="mt-6">
            <RouterLink to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </RouterLink>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const level = calculateLevel(business.xp);
  const nextLevel = level + 1;
  const progressToNextLevel = calculateProgress(business.xp);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-28">
        <Helmet>
          <title>{business.name} | Profil Entreprise | Loommify</title>
        </Helmet>

        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <RouterLink to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </RouterLink>
          </Button>
        </div>

        {/* Business Header */}
        <div className="bg-white dark:bg-card rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={business.logo} alt={business.name} />
                <AvatarFallback className="text-2xl">
                  {business.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{business.name}</h1>
                
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {business.location}
                </div>
                
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="bg-[#8F3985]/10 text-[#8F3985] border-[#8F3985]/20">
                    <Trophy className="mr-1 h-4 w-4" />
                    {business.industry}
                  </Badge>
                  <Badge variant="secondary" className="ml-2">
                    <Calendar className="mr-1 h-4 w-4" />
                    Depuis {business.founded}
                  </Badge>
                  <Badge variant="secondary" className="ml-2">
                    <Users className="mr-1 h-4 w-4" />
                    {business.employeeCount} employés
                  </Badge>
                </div>
                
                <div className="mt-4 flex items-center">
                  <div className="flex">
                    <StarRating rating={business.rating} />
                  </div>
                  <span className="ml-2 font-medium">{business.rating.toFixed(1)}</span>
                  <span className="ml-2 text-muted-foreground">({business.completedProjects} projets terminés)</span>
                </div>
              </div>
              
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <Button className="w-full md:w-auto bg-[#8F3985] hover:bg-[#8F3985]/80">
                  <Mail className="mr-2 h-4 w-4" />
                  Contacter l'entreprise
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Gamification Section */}
        <div className="bg-white dark:bg-card rounded-lg shadow mt-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Réputation et Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">Niveau {level}</span>
                  <span className="text-sm text-muted-foreground">{business.xp} XP / {level * 1000 + 1000} XP</span>
                </div>
                <Progress value={progressToNextLevel} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(1000 - (business.xp % 1000))} XP restants pour atteindre le niveau {nextLevel}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-3">Badges obtenus</h3>
                <div className="flex flex-wrap gap-2">
                  {business.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="py-1.5 px-3 gap-1.5 bg-[#8F3985]/10 text-[#8F3985] border-[#8F3985]/20">
                      {badge === "Entreprise Active" ? <Briefcase className="h-4 w-4" /> : 
                       badge === "Paiements Vérifiés" ? <CheckCircle className="h-4 w-4" /> : 
                       badge === "Top Employeur" ? <Trophy className="h-4 w-4" /> : 
                       <Award className="h-4 w-4" />}
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">À propos de l'entreprise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{business.description}</p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="text-[#8F3985]" asChild>
                    <a href={business.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visiter le site web
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Past Projects */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Projets récents</h2>
              <div className="grid grid-cols-1 gap-4">
                {business.pastProjects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      <div className="mt-2 text-sm flex items-center">
                        <span className="text-[#8F3985]">Réalisé par:</span>
                        <RouterLink 
                          to={`/freelance/${project.freelancerId}`} 
                          className="ml-2 text-[#8F3985] hover:underline"
                        >
                          {project.freelancer}
                        </RouterLink>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Open Projects */}
            <Card className="bg-[#25283D]/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-[#8F3985]" />
                  Projets ouverts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {business.openProjects.length > 0 ? (
                  business.openProjects.map((project) => (
                    <div key={project.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Aucun projet ouvert actuellement.</p>
                )}
                
                <Button className="w-full mt-4 bg-[#8F3985] hover:bg-[#8F3985]/80">
                  Proposer vos services
                </Button>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Vous avez un projet ou une question ? N'hésitez pas à contacter {business.name} directement.</p>
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer un message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessDetail;
