
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { useState } from "react";

export const ProjectFilters = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState([0, 100]);

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const handleResetFilters = () => {
    setActiveFilters([]);
    setBudgetRange([0, 100]);
  };

  // Convert slider value to actual budget amount
  const getBudgetValue = (value: number) => {
    // Map 0-100 to 0-5000
    return Math.round(value * 50);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Domain Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Domaine</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un domaine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dev">Développement Web</SelectItem>
              <SelectItem value="design">Graphisme</SelectItem>
              <SelectItem value="writing">Rédaction & Traduction</SelectItem>
              <SelectItem value="marketing">Marketing & Réseaux sociaux</SelectItem>
              <SelectItem value="business">Business & Finance</SelectItem>
              <SelectItem value="other">Autres</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Budget</label>
          <div className="px-2">
            <Slider 
              value={budgetRange} 
              max={100} 
              step={1} 
              onValueChange={setBudgetRange}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{getBudgetValue(budgetRange[0])}€</span>
            <span>{getBudgetValue(budgetRange[1])}€{budgetRange[1] === 100 ? "+" : ""}</span>
          </div>
        </div>

        {/* Time Estimation Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Durée estimée</label>
          <Select>
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

        {/* Location Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Localisation</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une localisation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="paris">Paris</SelectItem>
              <SelectItem value="lyon">Lyon</SelectItem>
              <SelectItem value="marseille">Marseille</SelectItem>
              <SelectItem value="bordeaux">Bordeaux</SelectItem>
              <SelectItem value="lille">Lille</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox id="remote" />
            <Label htmlFor="remote" className="text-sm">
              Projets remote uniquement
            </Label>
          </div>
        </div>
      </div>

      {/* Active filters */}
      <div className="flex flex-wrap items-center gap-2">
        {activeFilters.length > 0 && (
          <>
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="cursor-pointer flex items-center gap-1">
                {filter} <X className="h-3 w-3" onClick={() => handleRemoveFilter(filter)} />
              </Badge>
            ))}
          </>
        )}
        {(activeFilters.length > 0 || budgetRange[0] > 0 || budgetRange[1] < 100) && (
          <>
            {budgetRange[0] > 0 || budgetRange[1] < 100 && (
              <Badge variant="secondary" className="cursor-pointer flex items-center gap-1">
                {getBudgetValue(budgetRange[0])}€ - {getBudgetValue(budgetRange[1])}€{budgetRange[1] === 100 ? "+" : ""} <X className="h-3 w-3" onClick={() => setBudgetRange([0, 100])} />
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="ml-auto" onClick={handleResetFilters}>
              Réinitialiser les filtres
            </Button>
          </>
        )}
      </div>
      
      {/* Apply filters button */}
      <div className="flex justify-end mt-2">
        <Button variant="default">
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};
