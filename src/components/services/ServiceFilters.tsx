
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export const ServiceFilters = () => {
  const [priceRange, setPriceRange] = useState<number[]>([50, 5000]);
  
  const categories = [
    "Développement Web",
    "Développement Mobile",
    "Design & Graphisme",
    "Marketing Digital",
    "Rédaction & Traduction",
    "Audio & Vidéo",
    "Business & Finance",
    "Animation 3D",
    "Intelligence Artificielle",
    "Autres"
  ];
  
  const deliveryTimes = [
    { value: "1", label: "24 heures" },
    { value: "3", label: "3 jours" },
    { value: "7", label: "1 semaine" },
    { value: "14", label: "2 semaines" },
    { value: "30", label: "1 mois" },
    { value: "31", label: "Plus d'un mois" }
  ];
  
  const ratings = [
    { value: "5", label: "5 étoiles uniquement" },
    { value: "4", label: "4 étoiles et plus" },
    { value: "3", label: "3 étoiles et plus" },
    { value: "0", label: "Tous les services" }
  ];
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const handleReset = () => {
    setPriceRange([50, 5000]);
    // Reset other filters
  };
  
  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["categorie", "prix", "delai"]}>
        {/* Catégorie Filter */}
        <AccordionItem value="categorie">
          <AccordionTrigger className="py-3 text-base">Catégorie</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox id={`category-${index}`} />
                  <Label
                    htmlFor={`category-${index}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Prix Filter */}
        <AccordionItem value="prix">
          <AccordionTrigger className="py-3 text-base">Prix</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[50, 5000]}
                min={50}
                max={5000}
                step={50}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="my-5"
              />
              <div className="flex items-center justify-between">
                <div className="bg-muted px-3 py-1 rounded text-sm">
                  {priceRange[0]}€
                </div>
                <div className="bg-muted px-3 py-1 rounded text-sm">
                  {priceRange[1]}€
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Délai de livraison Filter */}
        <AccordionItem value="delai">
          <AccordionTrigger className="py-3 text-base">Délai de livraison</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Toutes les durées" />
                </SelectTrigger>
                <SelectContent>
                  {deliveryTimes.map((time, index) => (
                    <SelectItem key={index} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Avis Filter */}
        <AccordionItem value="avis">
          <AccordionTrigger className="py-3 text-base">Avis</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tous les avis" />
                </SelectTrigger>
                <SelectContent>
                  {ratings.map((rating, index) => (
                    <SelectItem key={index} value={rating.value}>
                      {rating.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="flex gap-2 pt-2">
        <Button className="flex-1 bg-[#8F3985] hover:bg-[#8F3985]/90">
          Appliquer
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleReset}
        >
          Réinitialiser
        </Button>
      </div>
    </div>
  );
};
