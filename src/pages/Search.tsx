
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Search as SearchIcon, Grid, List as ListIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectSort } from "@/components/projects/ProjectSort";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Search Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Recherchez un projet (ex: Développement site web, Rédaction SEO, Logo...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-4">
            <ProjectSort />
            <div className="flex items-center gap-2 border rounded-md p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-accent" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-accent" : ""}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ProjectFilters />

        {/* Results Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {/* Example projects - replace with real data */}
          <ProjectCard
            title="Développement site e-commerce"
            budget={{ min: 1000, max: 5000 }}
            estimatedTime="1-2 semaines"
            location="Remote"
            proposals={12}
            company={{
              name: "TechCorp",
              verified: true
            }}
            viewMode={viewMode}
          />
          <ProjectCard
            title="Création logo et charte graphique"
            budget={{ min: 500, max: 1500 }}
            estimatedTime="<1 semaine"
            location="Paris"
            proposals={5}
            company={{
              name: "DesignStudio",
              verified: false
            }}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
