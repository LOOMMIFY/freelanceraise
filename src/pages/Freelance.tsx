
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { User, Search, Clock, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for freelancers
const MOCK_FREELANCERS = [
  {
    id: "1",
    name: "Sophie Dupont",
    avatar: "https://i.pravatar.cc/150?img=1",
    xp: 4325,
    lastActive: "2023-10-05",
    yearsExperience: 5,
    skills: ["React", "TypeScript", "Node.js"],
    responseTime: "Rapide",
    completedProjects: 27,
    rating: 4.8
  },
  {
    id: "2",
    name: "Thomas Martin",
    avatar: "https://i.pravatar.cc/150?img=2",
    xp: 3150,
    lastActive: "2023-10-09",
    yearsExperience: 3,
    skills: ["Vue.js", "JavaScript", "PHP"],
    responseTime: "Moyen",
    completedProjects: 19,
    rating: 4.5
  },
  {
    id: "3",
    name: "Julie Bernard",
    avatar: "https://i.pravatar.cc/150?img=3",
    xp: 5720,
    lastActive: "2023-10-10",
    yearsExperience: 7,
    skills: ["Angular", "Java", "Spring Boot"],
    responseTime: "Rapide",
    completedProjects: 42,
    rating: 4.9
  },
  {
    id: "4",
    name: "Alexandre Petit",
    avatar: "https://i.pravatar.cc/150?img=4",
    xp: 2890,
    lastActive: "2023-10-07",
    yearsExperience: 2,
    skills: ["WordPress", "CSS", "JavaScript"],
    responseTime: "Lent",
    completedProjects: 15,
    rating: 4.1
  },
  {
    id: "5",
    name: "Émilie Dubois",
    avatar: "https://i.pravatar.cc/150?img=5",
    xp: 6340,
    lastActive: "2023-10-10",
    yearsExperience: 8,
    skills: ["Python", "Django", "React"],
    responseTime: "Très rapide",
    completedProjects: 54,
    rating: 5.0
  },
  {
    id: "6",
    name: "Lucas Moreau",
    avatar: "https://i.pravatar.cc/150?img=6",
    xp: 3980,
    lastActive: "2023-10-08",
    yearsExperience: 4,
    skills: ["UI/UX Design", "Figma", "Adobe XD"],
    responseTime: "Moyen",
    completedProjects: 31,
    rating: 4.7
  },
  {
    id: "7",
    name: "Camille Lefebvre",
    avatar: "https://i.pravatar.cc/150?img=7",
    xp: 4570,
    lastActive: "2023-10-09",
    yearsExperience: 6,
    skills: ["Swift", "iOS", "Flutter"],
    responseTime: "Rapide",
    completedProjects: 38,
    rating: 4.6
  },
  {
    id: "8",
    name: "Antoine Rousseau",
    avatar: "https://i.pravatar.cc/150?img=8",
    xp: 3250,
    lastActive: "2023-10-06",
    yearsExperience: 3,
    skills: ["Laravel", "PHP", "MySQL"],
    responseTime: "Moyen",
    completedProjects: 23,
    rating: 4.3
  }
];

// Filter options for activity period
const ACTIVITY_PERIODS = [
  { value: "5ans", label: "5 ans" },
  { value: "2ans", label: "2 ans" },
  { value: "1an", label: "1 an" },
  { value: "6mois", label: "6 mois" },
  { value: "1mois", label: "1 mois" },
];

const FreelancePage = () => {
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [activityPeriod, setActivityPeriod] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    activity: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const freelancersPerPage = 6;

  // Fetch freelancers with React Query (using mock data for now)
  const { data: freelancers, isLoading } = useQuery({
    queryKey: ['freelancers', appliedFilters],
    queryFn: async () => {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock data based on applied filters
      let results = [...MOCK_FREELANCERS];
      
      if (appliedFilters.search) {
        results = results.filter(freelancer => 
          freelancer.name.toLowerCase().includes(appliedFilters.search.toLowerCase())
        );
      }
      
      if (appliedFilters.activity) {
        // Convert activity filter to date threshold
        const now = new Date();
        let threshold = new Date();
        
        switch (appliedFilters.activity) {
          case "5ans":
            threshold.setFullYear(now.getFullYear() - 5);
            break;
          case "2ans":
            threshold.setFullYear(now.getFullYear() - 2);
            break;
          case "1an":
            threshold.setFullYear(now.getFullYear() - 1);
            break;
          case "6mois":
            threshold.setMonth(now.getMonth() - 6);
            break;
          case "1mois":
            threshold.setMonth(now.getMonth() - 1);
            break;
          default:
            break;
        }
        
        // Filter by last active date
        if (appliedFilters.activity) {
          results = results.filter(freelancer => {
            const lastActive = new Date(freelancer.lastActive);
            return lastActive >= threshold;
          });
        }
      }
      
      return results;
    },
    initialData: MOCK_FREELANCERS
  });

  // Apply filters
  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchTerm,
      activity: activityPeriod
    });
    setCurrentPage(1);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setActivityPeriod("");
    setAppliedFilters({
      search: "",
      activity: ""
    });
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastFreelancer = currentPage * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = freelancers.slice(indexOfFirstFreelancer, indexOfLastFreelancer);
  const totalPages = Math.ceil(freelancers.length / freelancersPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Annuaire Freelance | Loommify</title>
      </Helmet>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar with filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-4 sticky top-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filtres
            </h2>

            <Accordion type="single" collapsible defaultValue="activity">
              <AccordionItem value="activity">
                <AccordionTrigger className="py-2">
                  <span className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Période d'activité
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Select
                      value={activityPeriod}
                      onValueChange={setActivityPeriod}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une période" />
                      </SelectTrigger>
                      <SelectContent>
                        {ACTIVITY_PERIODS.map((period) => (
                          <SelectItem key={period.value} value={period.value}>
                            {period.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Applied filters */}
            {(appliedFilters.search || appliedFilters.activity) && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Filtres appliqués</h3>
                <div className="flex flex-wrap gap-2">
                  {appliedFilters.search && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Recherche: {appliedFilters.search}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          setSearchTerm("");
                          setAppliedFilters({
                            ...appliedFilters,
                            search: ""
                          });
                        }}
                      />
                    </Badge>
                  )}
                  {appliedFilters.activity && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Activité: {ACTIVITY_PERIODS.find(p => p.value === appliedFilters.activity)?.label}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          setActivityPeriod("");
                          setAppliedFilters({
                            ...appliedFilters,
                            activity: ""
                          });
                        }}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Apply & Reset buttons */}
            <div className="mt-4 space-y-2">
              <Button 
                variant="default" 
                className="w-full" 
                onClick={handleApplyFilters}
              >
                Appliquer
              </Button>
              
              {(searchTerm || activityPeriod) && (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleResetFilters}
                >
                  Réinitialiser
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h1 className="text-2xl font-bold mb-4">Annuaire des Freelances</h1>
            
            {/* Search bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un freelance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
              />
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-muted-foreground">
              {freelancers.length} freelance{freelancers.length > 1 ? "s" : ""} trouvé{freelancers.length > 1 ? "s" : ""}
            </div>

            {/* Freelancer grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gray-200" />
                        <div className="space-y-2">
                          <div className="h-4 w-24 bg-gray-200 rounded" />
                          <div className="h-3 w-16 bg-gray-200 rounded" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="h-9 w-full bg-gray-200 rounded" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : freelancers.length === 0 ? (
              <div className="text-center py-8">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">Aucun freelance trouvé</h3>
                <p className="mt-1 text-gray-500">
                  Essayez d'ajuster vos filtres ou votre recherche
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFreelancers.map((freelancer) => (
                  <Card key={freelancer.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                          <AvatarFallback>
                            {freelancer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{freelancer.name}</h3>
                          <div className="text-sm text-yellow-600 font-semibold flex items-center">
                            {freelancer.xp} XP
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-1">
                        {freelancer.skills.slice(0, 3).map((skill, i) => (
                          <Badge variant="outline" key={i} className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link to={`/freelance/${freelancer.id}`}>
                          Voir Profil
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {freelancers.length > freelancersPerPage && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(prev => Math.max(prev - 1, 1));
                          }}
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }).map((_, i) => {
                      // Show current page, first, last, and pages around current
                      const pageNum = i + 1;
                      const isCurrentPage = pageNum === currentPage;
                      const shouldShow = 
                        pageNum === 1 || 
                        pageNum === totalPages || 
                        Math.abs(pageNum - currentPage) <= 1;
                      
                      if (shouldShow) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink 
                              href="#" 
                              isActive={isCurrentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(pageNum);
                              }}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        (pageNum === 2 && currentPage > 3) || 
                        (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      
                      return null;
                    })}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(prev => Math.min(prev + 1, totalPages));
                          }}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancePage;
