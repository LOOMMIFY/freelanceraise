
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FreelancerCard } from "@/components/freelancers/FreelancerCard";
import { FreelancerFilters } from "@/components/freelancers/FreelancerFilters";
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

// Sample freelancers data
const FREELANCERS = [
  {
    id: 1,
    name: "Sophie Dubois",
    avatar: "/placeholder.svg",
    expertise: ["Développement Web", "React.js", "Node.js"],
    experience: 5,
    hourlyRate: 65,
    location: "Paris, France",
    available: true,
    rating: 4.8,
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    name: "Thomas Laurent",
    avatar: "/placeholder.svg",
    expertise: ["Design UI/UX", "Webdesign", "Figma"],
    experience: 7,
    hourlyRate: 75,
    location: "Lyon, France",
    available: true,
    rating: 4.9,
    skills: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"]
  },
  {
    id: 3,
    name: "Emma Martin",
    avatar: "/placeholder.svg",
    expertise: ["Rédaction Web", "SEO", "Content Marketing"],
    experience: 3,
    hourlyRate: 45,
    location: "À distance",
    available: false,
    rating: 4.6,
    skills: ["SEO", "Content Marketing", "Copywriting", "WordPress"]
  },
  {
    id: 4,
    name: "Nicolas Bernard",
    avatar: "/placeholder.svg",
    expertise: ["Développement Mobile", "React Native", "Flutter"],
    experience: 6,
    hourlyRate: 85,
    location: "Bordeaux, France",
    available: true,
    rating: 4.7,
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"]
  },
  {
    id: 5,
    name: "Julie Moreau",
    avatar: "/placeholder.svg",
    expertise: ["Social Media", "Instagram", "TikTok"],
    experience: 4,
    hourlyRate: 55,
    location: "À distance",
    available: true,
    rating: 4.5,
    skills: ["Instagram", "Facebook", "TikTok", "Social Media Strategy", "Content Creation"]
  },
  {
    id: 6,
    name: "Antoine Leroy",
    avatar: "/placeholder.svg",
    expertise: ["Développement WordPress", "PHP", "MySQL"],
    experience: 8,
    hourlyRate: 70,
    location: "Toulouse, France",
    available: true,
    rating: 4.8,
    skills: ["WordPress", "PHP", "MySQL", "JavaScript", "HTML/CSS"]
  },
];

const Freelancers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Annuaire des Freelances</h1>
            <p className="text-muted-foreground">
              Trouvez des freelances qualifiés pour vos projets dans tous les domaines
            </p>
          </div>
          
          {/* Tabs and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <Tabs defaultValue="freelancers" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="freelancers">Freelances</TabsTrigger>
                <TabsTrigger value="services" asChild>
                  <Link to="/services">Services</Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un freelance..." 
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
                <FreelancerFilters />
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
                    <FreelancerFilters />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Main content area */}
            <div className="lg:col-span-9">
              {/* Results count and sorting */}
              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="font-medium">{FREELANCERS.length} freelances disponibles</h2>
                </div>
              </div>
              
              {/* Freelancer cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {FREELANCERS.map((freelancer) => (
                  <FreelancerCard 
                    key={freelancer.id}
                    id={freelancer.id}
                    name={freelancer.name}
                    avatar={freelancer.avatar}
                    expertise={freelancer.expertise}
                    experience={freelancer.experience}
                    hourlyRate={freelancer.hourlyRate}
                    location={freelancer.location}
                    available={freelancer.available}
                    rating={freelancer.rating}
                    skills={freelancer.skills}
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

export default Freelancers;
