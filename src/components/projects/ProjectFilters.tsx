
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { X, Trash2, Search } from "lucide-react";
import { useState, useEffect } from "react";

export interface ProjectFiltersProps {
  onFilterChange?: (filters: ProjectFiltersState) => void;
}

export interface ProjectFiltersState {
  search: string;
  category: string[];
  budgetRange: number[];
  experience: string[];
  speciality: string[];
  duration: string;
  location: string;
  remoteOnly: boolean;
  sortBy: string;
}

const initialFilters: ProjectFiltersState = {
  search: "",
  category: [],
  budgetRange: [0, 100],
  experience: [],
  speciality: [],
  duration: "",
  location: "",
  remoteOnly: false,
  sortBy: "newest"
};

export const ProjectFilters = ({ onFilterChange }: ProjectFiltersProps) => {
  const [filters, setFilters] = useState<ProjectFiltersState>(initialFilters);
  const [activeAccordions, setActiveAccordions] = useState<string[]>(["budget", "category", "sort"]);
  const [searchInput, setSearchInput] = useState("");

  // Convert slider value to actual budget amount
  const getBudgetValue = (value: number) => {
    // Map 0-100 to 0-5000
    return Math.round(value * 50);
  };

  const updateFilter = <K extends keyof ProjectFiltersState>(
    key: K, 
    value: ProjectFiltersState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = <K extends keyof ProjectFiltersState>(
    key: K, 
    value: string
  ) => {
    if (Array.isArray(filters[key])) {
      const currentArray = filters[key] as string[];
      if (currentArray.includes(value)) {
        updateFilter(key, currentArray.filter(item => item !== value) as ProjectFiltersState[K]);
      } else {
        updateFilter(key, [...currentArray, value] as ProjectFiltersState[K]);
      }
    }
  };

  const handleSearch = () => {
    updateFilter("search", searchInput);
  };

  const handleCheckboxChange = (filterType: "category" | "experience" | "speciality", value: string) => {
    toggleArrayFilter(filterType, value);
  };

  const handleRemoveFilter = (key: keyof ProjectFiltersState, value?: string) => {
    if (value && Array.isArray(filters[key])) {
      // Remove specific value from array
      const newValues = (filters[key] as string[]).filter(item => item !== value);
      updateFilter(key, newValues as ProjectFiltersState[typeof key]);
    } else if (key === "budgetRange") {
      // Reset budget range
      updateFilter("budgetRange", initialFilters.budgetRange);
    } else if (key === "remoteOnly") {
      // Reset remote only
      updateFilter("remoteOnly", false);
    } else {
      // Reset scalar value
      updateFilter(key, initialFilters[key]);
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchInput("");
  };

  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  // Track active filters for display
  const getActiveFilters = () => {
    const active: { key: keyof ProjectFiltersState; label: string; value?: string }[] = [];
    
    // Check search
    if (filters.search) {
      active.push({ key: "search", label: `Recherche: ${filters.search}` });
    }
    
    // Check categories
    filters.category.forEach(cat => {
      active.push({ key: "category", label: cat, value: cat });
    });
    
    // Check experience
    filters.experience.forEach(exp => {
      active.push({ key: "experience", label: exp, value: exp });
    });
    
    // Check speciality
    filters.speciality.forEach(spec => {
      active.push({ key: "speciality", label: spec, value: spec });
    });
    
    // Check budget
    if (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 100) {
      active.push({ 
        key: "budgetRange", 
        label: `${getBudgetValue(filters.budgetRange[0])}€ - ${getBudgetValue(filters.budgetRange[1])}€${filters.budgetRange[1] === 100 ? "+" : ""}` 
      });
    }
    
    // Check duration
    if (filters.duration) {
      active.push({ key: "duration", label: `Durée: ${filters.duration}` });
    }
    
    // Check location
    if (filters.location) {
      active.push({ key: "location", label: `Lieu: ${filters.location}` });
    }
    
    // Check remote only
    if (filters.remoteOnly) {
      active.push({ key: "remoteOnly", label: "À distance uniquement" });
    }
    
    // Check sort
    if (filters.sortBy !== "newest") {
      const sortLabels: Record<string, string> = {
        "budget-high": "Budget le plus élevé",
        "deadline": "Date limite proche",
        "proposals-low": "Moins de propositions"
      };
      active.push({ key: "sortBy", label: `Tri: ${sortLabels[filters.sortBy] || filters.sortBy}` });
    }
    
    return active;
  };

  // Call onFilterChange whenever filters change
  useEffect(() => {
    applyFilters();
  }, [filters]);

  const activeFilters = getActiveFilters();
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Search Field */}
      <div className="relative">
        <Input
          placeholder="Rechercher un projet..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pr-10"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-0 h-full"
          onClick={handleSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter sections using accordions */}
      <Accordion 
        type="multiple" 
        value={activeAccordions}
        onValueChange={setActiveAccordions}
      >
        {/* Budget Filter Section */}
        <AccordionItem value="budget">
          <AccordionTrigger className="py-3">Tarif / jour</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="px-2">
                <Slider 
                  value={filters.budgetRange} 
                  max={100} 
                  step={1} 
                  onValueChange={(value) => updateFilter("budgetRange", value)}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{getBudgetValue(filters.budgetRange[0])}€ et -</span>
                <span>{getBudgetValue(filters.budgetRange[1])}€ et +</span>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="super" 
                    checked={filters.category.includes("super")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        toggleArrayFilter("category", "super");
                      } else {
                        handleRemoveFilter("category", "super");
                      }
                    }}
                  />
                  <Label htmlFor="super" className="text-sm flex items-center gap-2">
                    <span className="text-yellow-500 text-xs">★ Supermatlar</span>
                    <span className="text-muted-foreground text-xs">(11)</span>
                  </Label>
                </div>
                <div className="text-xs text-muted-foreground ml-6">
                  Travaillez avec des freelances reconnus par la communauté
                </div>
                <a href="#" className="text-xs text-primary block ml-6">En savoir plus</a>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience Level Section */}
        <AccordionItem value="experience">
          <AccordionTrigger className="py-3">Niveau d'expérience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "exp-0-2", label: "0-2 ans", value: "0-2", count: 17 },
                { id: "exp-3-7", label: "3-7 ans", value: "3-7", count: 77 },
                { id: "exp-8-15", label: "8-15 ans", value: "8-15", count: 57 },
                { id: "exp-16-plus", label: "16 ans et +", value: "16+", count: 13 }
              ].map(item => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={filters.experience.includes(item.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        toggleArrayFilter("experience", item.value);
                      } else {
                        handleRemoveFilter("experience", item.value);
                      }
                    }}
                  />
                  <Label htmlFor={item.id} className="text-sm">
                    {item.label} <span className="text-muted-foreground text-xs">({item.count})</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Speciality Section */}
        <AccordionItem value="speciality">
          <AccordionTrigger className="py-3">Spécialité</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "react", label: "React.js", value: "react", count: 144 },
                { id: "node", label: "Node.js", value: "node", count: 96 },
                { id: "css3", label: "CSS3", value: "css3", count: 89 },
                { id: "html5", label: "HTML5", value: "html5", count: 87 },
                { id: "php", label: "PHP", value: "php", count: 63 },
                { id: "wordpress", label: "WordPress", value: "wordpress", count: 50 }
              ].map(item => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item.id}
                    checked={filters.speciality.includes(item.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        toggleArrayFilter("speciality", item.value);
                      } else {
                        handleRemoveFilter("speciality", item.value);
                      }
                    }}
                  />
                  <Label htmlFor={item.id} className="text-sm">
                    {item.label} <span className="text-muted-foreground text-xs">({item.count})</span>
                  </Label>
                </div>
              ))}
              <div className="mt-2">
                <a href="#" className="text-xs text-primary">Voir plus (3)</a>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Category Section */}
        <AccordionItem value="category">
          <AccordionTrigger className="py-3">Catégorie</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "frontend", label: "Développeur Web Front-end", value: "frontend", count: 133 },
                { id: "backend", label: "Développeur Web Back-end", value: "backend", count: 125 },
                { id: "mobile", label: "Développeur Mobile", value: "mobile", count: 57 },
                { id: "cms", label: "Développeur CMS", value: "cms", count: 44 },
                { id: "software-eng", label: "Ingénieur logiciel", value: "software", count: 44 },
                { id: "web-integrator", label: "Intégrateur Web", value: "integrator", count: 44 },
                { id: "webdesigner", label: "Webdesigner", value: "webdesign", count: 13 }
              ].map(item => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item.id}
                    checked={filters.category.includes(item.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        toggleArrayFilter("category", item.value);
                      } else {
                        handleRemoveFilter("category", item.value);
                      }
                    }}
                  />
                  <Label htmlFor={item.id} className="text-sm">
                    {item.label} <span className="text-muted-foreground text-xs">({item.count})</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Duration Section */}
        <AccordionItem value="duration">
          <AccordionTrigger className="py-3">Durée estimée</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select
                value={filters.duration}
                onValueChange={(value) => updateFilter("duration", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1w">&lt;1 semaine</SelectItem>
                  <SelectItem value="2w">1-2 semaines</SelectItem>
                  <SelectItem value="1m">1 mois</SelectItem>
                  <SelectItem value="1m+">&gt;1 mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Location Section */}
        <AccordionItem value="location">
          <AccordionTrigger className="py-3">Localisation</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Select
                value={filters.location}
                onValueChange={(value) => updateFilter("location", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">À distance</SelectItem>
                  <SelectItem value="paris">Paris</SelectItem>
                  <SelectItem value="lyon">Lyon</SelectItem>
                  <SelectItem value="marseille">Marseille</SelectItem>
                  <SelectItem value="bordeaux">Bordeaux</SelectItem>
                  <SelectItem value="lille">Lille</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox 
                  id="remote-only"
                  checked={filters.remoteOnly}
                  onCheckedChange={(checked) => updateFilter("remoteOnly", !!checked)}
                />
                <Label htmlFor="remote-only" className="text-sm">
                  Projets à distance uniquement
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sort Section */}
        <AccordionItem value="sort">
          <AccordionTrigger className="py-3">Trier par</AccordionTrigger>
          <AccordionContent>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => updateFilter("sortBy", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="budget-high">Budget le plus élevé</SelectItem>
                <SelectItem value="deadline">Date limite proche</SelectItem>
                <SelectItem value="proposals-low">Moins de propositions</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {activeFilters.map((filter, index) => (
            <Badge 
              key={`${filter.key}-${index}`} 
              variant="secondary" 
              className="cursor-pointer flex items-center gap-1"
            >
              {filter.label}
              <X 
                className="h-3 w-3" 
                onClick={() => handleRemoveFilter(filter.key, filter.value)}
              />
            </Badge>
          ))}
        </div>
      )}
      
      {/* Apply & Reset buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <Button variant="default" className="w-full" onClick={applyFilters}>
          Appliquer les filtres
        </Button>
        
        {hasActiveFilters && (
          <Button variant="outline" size="sm" className="w-full" onClick={resetFilters}>
            <Trash2 className="h-4 w-4 mr-2" />
            Réinitialiser les filtres
          </Button>
        )}
      </div>
    </div>
  );
};
