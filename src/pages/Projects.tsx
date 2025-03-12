
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectSort } from "@/components/projects/ProjectSort";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

// Sample projects data
const PROJECTS = [
  {
    id: 1,
    title: "Développement d'un site e-commerce responsive",
    budget: { min: 2000, max: 5000 },
    estimatedTime: "1-2 semaines",
    location: "Paris, France",
    proposals: 3,
    company: { name: "Tech Solutions", verified: true },
  },
  {
    id: 2,
    title: "Création d'une identité visuelle complète",
    budget: { min: 800, max: 1500 },
    estimatedTime: "1 semaine",
    location: "Lyon, France",
    proposals: 7,
    company: { name: "StartUp Innovante", verified: true },
  },
  {
    id: 3,
    title: "Rédaction de contenu SEO pour site web",
    budget: { min: 300, max: 600 },
    estimatedTime: "3 jours",
    location: "À distance",
    proposals: 12,
    company: { name: "Marketing Digital", verified: false },
  },
  {
    id: 4,
    title: "Développement d'une application mobile iOS",
    budget: { min: 4000, max: 8000 },
    estimatedTime: "1 mois",
    location: "Bordeaux, France",
    proposals: 5,
    company: { name: "AppFactory", verified: true },
  },
  {
    id: 5,
    title: "Animation de réseaux sociaux",
    budget: { min: 500, max: 900 },
    estimatedTime: "Contrat mensuel",
    location: "À distance",
    proposals: 9,
    company: { name: "Social Media Pro", verified: false },
  },
  {
    id: 6,
    title: "Intégration WordPress avec WooCommerce",
    budget: { min: 1200, max: 2500 },
    estimatedTime: "2 semaines",
    location: "Toulouse, France",
    proposals: 4,
    company: { name: "Web Agency Plus", verified: true },
  },
];

const Projects = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Projets disponibles</h1>
            <p className="text-muted-foreground">
              Trouvez des opportunités qui correspondent à vos compétences et proposez vos services
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Filters - Now in a vertical layout */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border p-4 sticky top-28">
                <h2 className="font-medium text-lg mb-4">Filtres</h2>
                <ProjectFilters />
              </div>
            </div>
            
            {/* Main content area */}
            <div className="lg:col-span-9">
              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h2 className="font-medium">{PROJECTS.length} projets disponibles</h2>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-initial">
                      <ProjectSort />
                    </div>
                    
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
                : "space-y-6"
              }>
                {PROJECTS.map((project) => (
                  <ProjectCard 
                    key={project.id}
                    title={project.title}
                    budget={project.budget}
                    estimatedTime={project.estimatedTime}
                    location={project.location}
                    proposals={project.proposals}
                    company={project.company}
                    viewMode={viewMode}
                  />
                ))}
              </div>
              
              <div className="mt-10 flex justify-center">
                <nav className="flex items-center gap-1">
                  <Button variant="outline" size="icon" disabled>
                    &lt;
                  </Button>
                  <Button variant="default" size="icon">
                    1
                  </Button>
                  <Button variant="outline" size="icon">
                    2
                  </Button>
                  <Button variant="outline" size="icon">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    &gt;
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
