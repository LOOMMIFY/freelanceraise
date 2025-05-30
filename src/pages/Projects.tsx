
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters, ProjectFiltersState } from "@/components/projects/ProjectFilters";
import { ProjectSort } from "@/components/projects/ProjectSort";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader
} from "@/components/ui/sheet";
import { Filter, LayoutGrid, List, Search } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "sonner";

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
    category: ["frontend", "backend"],
    tags: ["react", "node"]
  },
  {
    id: 2,
    title: "Création d'une identité visuelle complète",
    budget: { min: 800, max: 1500 },
    estimatedTime: "1 semaine",
    location: "Lyon, France",
    proposals: 7,
    company: { name: "StartUp Innovante", verified: true },
    category: ["webdesign"],
    tags: ["illustrator", "photoshop"]
  },
  {
    id: 3,
    title: "Rédaction de contenu SEO pour site web",
    budget: { min: 300, max: 600 },
    estimatedTime: "3 jours",
    location: "À distance",
    proposals: 12,
    company: { name: "Marketing Digital", verified: false },
    category: ["content"],
    tags: ["seo", "writing"]
  },
  {
    id: 4,
    title: "Développement d'une application mobile iOS",
    budget: { min: 4000, max: 8000 },
    estimatedTime: "1 mois",
    location: "Bordeaux, France",
    proposals: 5,
    company: { name: "AppFactory", verified: true },
    category: ["mobile"],
    tags: ["swift", "ios"]
  },
  {
    id: 5,
    title: "Animation de réseaux sociaux",
    budget: { min: 500, max: 900 },
    estimatedTime: "Contrat mensuel",
    location: "À distance",
    proposals: 9,
    company: { name: "Social Media Pro", verified: false },
    category: ["marketing"],
    tags: ["social media", "content"]
  },
  {
    id: 6,
    title: "Intégration WordPress avec WooCommerce",
    budget: { min: 1200, max: 2500 },
    estimatedTime: "2 semaines",
    location: "Toulouse, France",
    proposals: 4,
    company: { name: "Web Agency Plus", verified: true },
    category: ["cms", "integrator"],
    tags: ["wordpress", "woocommerce"]
  },
];

const Projects = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS);
  const [activeFilters, setActiveFilters] = useState<ProjectFiltersState | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Redirect if user is not authenticated
  if (!isAuthenticated) {
    toast.error("Vous devez être connecté pour accéder aux Offres.");
    return <Navigate to="/login" replace />;
  }

  const handleFilterChange = (filters: ProjectFiltersState) => {
    setActiveFilters(filters);
    
    // Apply filters to projects
    let filtered = [...PROJECTS];
    
    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(project => 
        project.category.some(cat => filters.category.includes(cat))
      );
    }
    
    // Apply speciality/tags filter
    if (filters.speciality.length > 0) {
      filtered = filtered.filter(project => 
        project.tags.some(tag => filters.speciality.includes(tag))
      );
    }
    
    // Apply budget filter
    const minBudget = filters.budgetRange[0] * 50; // Convert slider value to actual budget
    const maxBudget = filters.budgetRange[1] * 50;
    
    if (minBudget > 0 || maxBudget < 5000) {
      filtered = filtered.filter(project => 
        project.budget.max >= minBudget && project.budget.min <= maxBudget
      );
    }
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(project => 
        project.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Apply remote only filter
    if (filters.remoteOnly) {
      filtered = filtered.filter(project => 
        project.location.toLowerCase().includes("à distance")
      );
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case "budget-high":
        filtered.sort((a, b) => b.budget.max - a.budget.max);
        break;
      case "proposals-low":
        filtered.sort((a, b) => a.proposals - b.proposals);
        break;
      // For other sort options, we would need more data
      // For now, leave newest as default (no change)
      default:
        break;
    }
    
    setFilteredProjects(filtered);
  };

  const handleSearch = () => {
    if (activeFilters) {
      handleFilterChange({
        ...activeFilters,
        search: searchTerm
      });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col projects-page ${isDark ? 'dark' : ''}`}>
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Offres disponibles</h1>
            <p className={`text-muted-foreground ${isDark ? 'text-gray-300' : ''}`}>
              Trouvez des opportunités qui correspondent à vos compétences et proposez vos services
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Filters - Vertical layout (desktop) / Sheet (mobile) */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className={`rounded-lg border p-4 sticky top-28 filter-menu ${isDark ? 'bg-[#25283D]' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium text-lg">Filtres</h2>
                </div>
                <ProjectFilters onFilterChange={handleFilterChange} />
              </div>
            </div>
            
            {/* Mobile filter button */}
            <div className="fixed bottom-6 right-6 z-50 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className={`rounded-full shadow-lg h-14 w-14 p-0 ${isDark ? 'bg-[#8F3985]' : ''}`}>
                    <Filter className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className={`w-full sm:max-w-md overflow-y-auto ${isDark ? 'bg-[#181818] border-[#333]' : ''}`}>
                  <SheetHeader>
                    <SheetTitle className={isDark ? 'text-white' : ''}>Filtres</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <ProjectFilters onFilterChange={handleFilterChange} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Main content area */}
            <div className="lg:col-span-9">
              <div className={`rounded-lg border p-4 mb-6 ${isDark ? 'bg-[#25283D] border-[#333]' : 'bg-white'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h2 className="font-medium">{filteredProjects.length} offres disponibles</h2>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="hidden md:flex relative flex-1 max-w-xs">
                      <Input
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`pr-10 ${isDark ? 'bg-[#181818] text-white border-[#333]' : ''}`}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`absolute right-0 top-0 h-full ${isDark ? 'text-white hover:bg-[#333]' : ''}`}
                        onClick={handleSearch}
                      >
                        <Search className={`h-4 w-4 project-icon ${isDark ? 'text-white' : ''}`} />
                      </Button>
                    </div>
                    
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
                        <LayoutGrid className={`h-4 w-4 project-icon ${isDark ? 'text-white' : ''}`} />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className={`h-4 w-4 project-icon ${isDark ? 'text-white' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {filteredProjects.length > 0 ? (
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
                  : "space-y-6"
                }>
                  {filteredProjects.map((project) => (
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
              ) : (
                <div className={`text-center py-12 rounded-lg border ${isDark ? 'bg-[#25283D] border-[#333] text-white' : 'bg-white'}`}>
                  <h3 className="text-lg font-medium mb-2">Aucune offre ne correspond à vos critères</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-muted-foreground'}`}>Essayez de modifier vos filtres pour voir plus de résultats.</p>
                </div>
              )}
              
              {filteredProjects.length > 0 && (
                <div className="mt-10 flex justify-center pagination">
                  <nav className="flex items-center gap-1">
                    <Button variant="outline" size="icon" disabled className={isDark ? 'text-white border-[#333]' : ''}>
                      &lt;
                    </Button>
                    <Button variant="default" size="icon" className={isDark ? 'bg-[#8F3985]' : ''}>
                      1
                    </Button>
                    <Button variant="outline" size="icon" className={isDark ? 'text-white border-[#333]' : ''}>
                      2
                    </Button>
                    <Button variant="outline" size="icon" className={isDark ? 'text-white border-[#333]' : ''}>
                      3
                    </Button>
                    <Button variant="outline" size="icon" className={isDark ? 'text-white border-[#333]' : ''}>
                      &gt;
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
