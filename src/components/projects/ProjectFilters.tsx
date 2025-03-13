
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
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { X, Check, Trash2 } from "lucide-react";
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
    <div className="flex flex-col gap-4">
      {/* Filter sections using accordions */}
      <Accordion type="multiple" defaultValue={["budget", "category", "sort"]}>
        {/* Budget Filter Section */}
        <AccordionItem value="budget">
          <AccordionTrigger className="py-3">Tarif / jour</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="px-2">
                <Slider 
                  value={budgetRange} 
                  max={100} 
                  step={1} 
                  onValueChange={setBudgetRange}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{getBudgetValue(budgetRange[0])}€ et -</span>
                <span>{getBudgetValue(budgetRange[1])}€ et +</span>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="super" />
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
              <div className="flex items-center space-x-2">
                <Checkbox id="exp-0-2" />
                <Label htmlFor="exp-0-2" className="text-sm">
                  0-2 ans <span className="text-muted-foreground text-xs">(17)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="exp-3-7" />
                <Label htmlFor="exp-3-7" className="text-sm">
                  3-7 ans <span className="text-muted-foreground text-xs">(77)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="exp-8-15" />
                <Label htmlFor="exp-8-15" className="text-sm">
                  8-15 ans <span className="text-muted-foreground text-xs">(57)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="exp-16-plus" />
                <Label htmlFor="exp-16-plus" className="text-sm">
                  16 ans et + <span className="text-muted-foreground text-xs">(13)</span>
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Speciality Section */}
        <AccordionItem value="speciality">
          <AccordionTrigger className="py-3">Spécialité</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="react" />
                <Label htmlFor="react" className="text-sm">
                  React.js <span className="text-muted-foreground text-xs">(144)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="node" />
                <Label htmlFor="node" className="text-sm">
                  Node.js <span className="text-muted-foreground text-xs">(96)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="css3" />
                <Label htmlFor="css3" className="text-sm">
                  CSS3 <span className="text-muted-foreground text-xs">(89)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="html5" />
                <Label htmlFor="html5" className="text-sm">
                  HTML5 <span className="text-muted-foreground text-xs">(87)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="php" />
                <Label htmlFor="php" className="text-sm">
                  PHP <span className="text-muted-foreground text-xs">(63)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="wordpress" />
                <Label htmlFor="wordpress" className="text-sm">
                  WordPress <span className="text-muted-foreground text-xs">(50)</span>
                </Label>
              </div>
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
              <div className="flex items-center space-x-2">
                <Checkbox id="frontend" />
                <Label htmlFor="frontend" className="text-sm">
                  Développeur Web Front-end <span className="text-muted-foreground text-xs">(133)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="backend" />
                <Label htmlFor="backend" className="text-sm">
                  Développeur Web Back-end <span className="text-muted-foreground text-xs">(125)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mobile" />
                <Label htmlFor="mobile" className="text-sm">
                  Développeur Mobile <span className="text-muted-foreground text-xs">(57)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cms" />
                <Label htmlFor="cms" className="text-sm">
                  Développeur CMS <span className="text-muted-foreground text-xs">(44)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="software-eng" />
                <Label htmlFor="software-eng" className="text-sm">
                  Ingénieur logiciel <span className="text-muted-foreground text-xs">(44)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="web-integrator" />
                <Label htmlFor="web-integrator" className="text-sm">
                  Intégrateur Web <span className="text-muted-foreground text-xs">(44)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="webdesigner" />
                <Label htmlFor="webdesigner" className="text-sm">
                  Webdesigner <span className="text-muted-foreground text-xs">(13)</span>
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Duration Section */}
        <AccordionItem value="duration">
          <AccordionTrigger className="py-3">Durée estimée</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
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
          </AccordionContent>
        </AccordionItem>

        {/* Location Section */}
        <AccordionItem value="location">
          <AccordionTrigger className="py-3">Localisation</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Select>
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
                <Checkbox id="remote-only" />
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
            <Select defaultValue="newest">
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
      {(activeFilters.length > 0 || budgetRange[0] > 0 || budgetRange[1] < 100) && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="cursor-pointer flex items-center gap-1">
              {filter} <X className="h-3 w-3" onClick={() => handleRemoveFilter(filter)} />
            </Badge>
          ))}
          {(budgetRange[0] > 0 || budgetRange[1] < 100) && (
            <Badge variant="secondary" className="cursor-pointer flex items-center gap-1">
              {getBudgetValue(budgetRange[0])}€ - {getBudgetValue(budgetRange[1])}€{budgetRange[1] === 100 ? "+" : ""} <X className="h-3 w-3" onClick={() => setBudgetRange([0, 100])} />
            </Badge>
          )}
        </div>
      )}
      
      {/* Apply & Reset buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <Button variant="default" className="w-full">
          Appliquer les filtres
        </Button>
        
        {(activeFilters.length > 0 || budgetRange[0] > 0 || budgetRange[1] < 100) && (
          <Button variant="outline" size="sm" className="w-full" onClick={handleResetFilters}>
            <Trash2 className="h-4 w-4 mr-2" />
            Réinitialiser les filtres
          </Button>
        )}
      </div>
    </div>
  );
};
