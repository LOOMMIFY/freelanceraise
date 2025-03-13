
import { useState } from "react";
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
import { X, Check, Trash2, Star } from "lucide-react";

export const FreelancerFilters = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [rateRange, setRateRange] = useState([10, 200]);

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const handleResetFilters = () => {
    setActiveFilters([]);
    setRateRange([10, 200]);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filter sections using accordions */}
      <Accordion type="multiple" defaultValue={["expertise", "experience", "rate", "sort"]}>
        {/* Expertise Filter Section */}
        <AccordionItem value="expertise">
          <AccordionTrigger className="py-3">Domaine d'expertise</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="dev-web" />
                <Label htmlFor="dev-web" className="text-sm">
                  Développement Web <span className="text-muted-foreground text-xs">(98)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="design" />
                <Label htmlFor="design" className="text-sm">
                  Design UI/UX <span className="text-muted-foreground text-xs">(64)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing" />
                <Label htmlFor="marketing" className="text-sm">
                  Marketing Digital <span className="text-muted-foreground text-xs">(42)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="redaction" />
                <Label htmlFor="redaction" className="text-sm">
                  Rédaction & Traduction <span className="text-muted-foreground text-xs">(37)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dev-mobile" />
                <Label htmlFor="dev-mobile" className="text-sm">
                  Développement Mobile <span className="text-muted-foreground text-xs">(29)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="social-media" />
                <Label htmlFor="social-media" className="text-sm">
                  Social Media <span className="text-muted-foreground text-xs">(25)</span>
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience Level Section */}
        <AccordionItem value="experience">
          <AccordionTrigger className="py-3">Expérience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="junior" />
                <Label htmlFor="junior" className="text-sm">
                  Débutant (0-2 ans) <span className="text-muted-foreground text-xs">(45)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="intermediate" />
                <Label htmlFor="intermediate" className="text-sm">
                  Intermédiaire (3-5 ans) <span className="text-muted-foreground text-xs">(87)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="senior" />
                <Label htmlFor="senior" className="text-sm">
                  Senior (6-9 ans) <span className="text-muted-foreground text-xs">(62)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="expert" />
                <Label htmlFor="expert" className="text-sm">
                  Expert (10+ ans) <span className="text-muted-foreground text-xs">(31)</span>
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Hourly Rate Section */}
        <AccordionItem value="rate">
          <AccordionTrigger className="py-3">Tarif horaire</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="px-2">
                <Slider 
                  value={rateRange} 
                  max={200} 
                  step={5} 
                  onValueChange={setRateRange}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{rateRange[0]}€/h</span>
                <span>{rateRange[1]}€/h</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Skills Section */}
        <AccordionItem value="skills">
          <AccordionTrigger className="py-3">Compétences</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="react" />
                <Label htmlFor="react" className="text-sm">
                  React.js <span className="text-muted-foreground text-xs">(56)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="node" />
                <Label htmlFor="node" className="text-sm">
                  Node.js <span className="text-muted-foreground text-xs">(43)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="figma" />
                <Label htmlFor="figma" className="text-sm">
                  Figma <span className="text-muted-foreground text-xs">(39)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="wordpress" />
                <Label htmlFor="wordpress" className="text-sm">
                  WordPress <span className="text-muted-foreground text-xs">(34)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="photoshop" />
                <Label htmlFor="photoshop" className="text-sm">
                  Photoshop <span className="text-muted-foreground text-xs">(28)</span>
                </Label>
              </div>
              <div className="mt-2">
                <a href="#" className="text-xs text-primary">Voir plus (12)</a>
              </div>
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
                  <SelectValue placeholder="Sélectionnez un pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="belgium">Belgique</SelectItem>
                  <SelectItem value="switzerland">Suisse</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une ville" />
                </SelectTrigger>
                <SelectContent>
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
                  À distance uniquement
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Availability Section */}
        <AccordionItem value="availability">
          <AccordionTrigger className="py-3">Disponibilité</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="available-now" />
                <Label htmlFor="available-now" className="text-sm">
                  Disponible maintenant <span className="text-muted-foreground text-xs">(124)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="available-part-time" />
                <Label htmlFor="available-part-time" className="text-sm">
                  Disponible à temps partiel <span className="text-muted-foreground text-xs">(86)</span>
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sort Section */}
        <AccordionItem value="sort">
          <AccordionTrigger className="py-3">Trier par</AccordionTrigger>
          <AccordionContent>
            <Select defaultValue="rating">
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Meilleure note</SelectItem>
                <SelectItem value="experience-desc">Plus d'expérience</SelectItem>
                <SelectItem value="hourly-rate-asc">Tarif horaire croissant</SelectItem>
                <SelectItem value="hourly-rate-desc">Tarif horaire décroissant</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Active filters */}
      {(activeFilters.length > 0 || rateRange[0] > 10 || rateRange[1] < 200) && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="cursor-pointer flex items-center gap-1">
              {filter} <X className="h-3 w-3" onClick={() => handleRemoveFilter(filter)} />
            </Badge>
          ))}
          {(rateRange[0] > 10 || rateRange[1] < 200) && (
            <Badge variant="secondary" className="cursor-pointer flex items-center gap-1">
              {rateRange[0]}€/h - {rateRange[1]}€/h <X className="h-3 w-3" onClick={() => setRateRange([10, 200])} />
            </Badge>
          )}
        </div>
      )}
      
      {/* Apply & Reset buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <Button variant="default" className="w-full bg-[#8F3985] hover:bg-[#8F3985]/90">
          Appliquer les filtres
        </Button>
        
        {(activeFilters.length > 0 || rateRange[0] > 10 || rateRange[1] < 200) && (
          <Button variant="outline" size="sm" className="w-full" onClick={handleResetFilters}>
            <Trash2 className="h-4 w-4 mr-2" />
            Réinitialiser les filtres
          </Button>
        )}
      </div>
    </div>
  );
};
