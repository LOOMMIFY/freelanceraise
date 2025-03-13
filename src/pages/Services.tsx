
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceFilters } from "@/components/services/ServiceFilters";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader
} from "@/components/ui/sheet";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

// Sample services data
const SERVICES = [
  {
    id: 1,
    title: "Développement site web vitrine",
    freelancerId: 1,
    freelancerName: "Sophie Dubois",
    freelancerAvatar: "/placeholder.svg",
    price: 450,
    deliveryTime: "3 jours",
    rating: 4.8,
    reviews: 32,
    category: "Développement Web",
    description: "Site web professionnel et responsive avec design moderne"
  },
  {
    id: 2,
    title: "Logo professionnel et charte graphique",
    freelancerId: 2,
    freelancerName: "Thomas Laurent",
    freelancerAvatar: "/placeholder.svg",
    price: 250,
    deliveryTime: "5 jours",
    rating: 4.9,
    reviews: 47,
    category: "Graphisme",
    description: "Logo personnalisé pour votre marque incluant fichiers sources"
  },
  {
    id: 3,
    title: "Rédaction de contenu SEO (5000 mots)",
    freelancerId: 3,
    freelancerName: "Emma Martin",
    freelancerAvatar: "/placeholder.svg",
    price: 180,
    deliveryTime: "7 jours",
    rating: 4.6,
    reviews: 19,
    category: "Rédaction",
    description: "Articles optimisés pour le référencement, recherche de mots-clés incluse"
  },
  {
    id: 4,
    title: "Création d'une application mobile",
    freelancerId: 4,
    freelancerName: "Nicolas Bernard",
    freelancerAvatar: "/placeholder.svg",
    price: 1500,
    deliveryTime: "21 jours",
    rating: 4.7,
    reviews: 23,
    category: "Développement Mobile",
    description: "Application native iOS et Android avec fonctionnalités personnalisées"
  },
  {
    id: 5,
    title: "Gestion des réseaux sociaux (1 mois)",
    freelancerId: 5,
    freelancerName: "Julie Moreau",
    freelancerAvatar: "/placeholder.svg",
    price: 350,
    deliveryTime: "30 jours",
    rating: 4.5,
    reviews: 15,
    category: "Marketing",
    description: "Création et programmation de contenu pour Instagram, Facebook et LinkedIn"
  },
  {
    id: 6,
    title: "WordPress personnalisé avec e-commerce",
    freelancerId: 6,
    freelancerName: "Antoine Leroy",
    freelancerAvatar: "/placeholder.svg",
    price: 900,
    deliveryTime: "14 jours",
    rating: 4.8,
    reviews: 38,
    category: "Développement Web",
    description: "Site WordPress avec WooCommerce, design responsive et optimisé"
  },
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Marketplace des Services</h1>
            <p className="text-muted-foreground">
              Explorez des services prêts à l'emploi proposés par nos freelances experts
            </p>
          </div>
          
          {/* Tabs and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <Tabs defaultValue="services" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="freelancers" asChild>
                  <Link to="/freelancers">Freelances</Link>
                </TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un service..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Filters - Vertical layout (desktop) / Sheet (mobile) */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="bg-white rounded-lg border p-4 sticky top-28">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium text-lg">Filtres</h2>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Réinitialiser
                  </Button>
                </div>
                <ServiceFilters />
              </div>
            </div>
            
            {/* Mobile filter button */}
            <div className="fixed bottom-6 right-6 z-50 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="rounded-full shadow-lg h-14 w-14 p-0">
                    <Filter className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filtres</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <ServiceFilters />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Main content area */}
            <div className="lg:col-span-9">
              {/* Results count and sorting */}
              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="font-medium">{SERVICES.length} services disponibles</h2>
                </div>
              </div>
              
              {/* Service cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {SERVICES.map((service) => (
                  <ServiceCard 
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    freelancerId={service.freelancerId}
                    freelancerName={service.freelancerName}
                    freelancerAvatar={service.freelancerAvatar}
                    price={service.price}
                    deliveryTime={service.deliveryTime}
                    rating={service.rating}
                    reviews={service.reviews}
                    category={service.category}
                    description={service.description}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-10">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
