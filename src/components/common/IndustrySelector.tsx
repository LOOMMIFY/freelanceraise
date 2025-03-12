
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// List of industries (could be fetched from an API in a real app)
const AVAILABLE_INDUSTRIES = [
  "Technologies de l'information", "E-commerce", "Finance", "Santé", "Éducation",
  "Marketing & Publicité", "Médias & Communication", "Immobilier", "Construction",
  "Automobile", "Transport & Logistique", "Alimentation", "Hôtellerie & Restauration",
  "Mode & Luxe", "Jeux Vidéo", "Énergie", "Environnement", "Agriculture", "Arts & Culture",
  "Sport & Loisirs"
];

interface IndustrySelectorProps {
  selectedIndustries: string[];
  onChange: (industries: string[]) => void;
  maxIndustries?: number;
}

export const IndustrySelector = ({ 
  selectedIndustries, 
  onChange, 
  maxIndustries = 5 
}: IndustrySelectorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestedIndustries, setSuggestedIndustries] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      const suggestions = AVAILABLE_INDUSTRIES
        .filter(industry => 
          industry.toLowerCase().includes(value.toLowerCase()) && 
          !selectedIndustries.includes(industry)
        )
        .slice(0, 5);
      setSuggestedIndustries(suggestions);
    } else {
      setSuggestedIndustries([]);
    }
  };

  const addIndustry = (industry: string) => {
    const trimmedIndustry = industry.trim();
    if (
      trimmedIndustry &&
      !selectedIndustries.includes(trimmedIndustry) &&
      selectedIndustries.length < maxIndustries
    ) {
      const newIndustries = [...selectedIndustries, trimmedIndustry];
      onChange(newIndustries);
      setInputValue("");
      setSuggestedIndustries([]);
    }
  };

  const removeIndustry = (industryToRemove: string) => {
    const newIndustries = selectedIndustries.filter(industry => industry !== industryToRemove);
    onChange(newIndustries);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      if (suggestedIndustries.length > 0) {
        addIndustry(suggestedIndustries[0]);
      } else {
        addIndustry(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && selectedIndustries.length > 0) {
      removeIndustry(selectedIndustries[selectedIndustries.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      <div 
        className={cn(
          "flex flex-wrap gap-2 p-3 border rounded-md bg-background transition-all min-h-[80px]",
          isFocused ? "ring-2 ring-ring ring-offset-1" : "",
          selectedIndustries.length >= maxIndustries ? "opacity-70" : ""
        )}
      >
        {selectedIndustries.map(industry => (
          <Badge 
            key={industry} 
            variant="secondary"
            className="pl-3 h-7 text-sm bg-loommify-secondary/10 text-loommify-secondary hover:bg-loommify-secondary/20"
          >
            {industry}
            <button
              type="button"
              onClick={() => removeIndustry(industry)}
              className="ml-1 rounded-full hover:bg-loommify-secondary/20 p-1"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Retirer {industry}</span>
            </button>
          </Badge>
        ))}
        
        {selectedIndustries.length < maxIndustries && (
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              // Small delay to allow clicking on suggestions
              setTimeout(() => setSuggestedIndustries([]), 200);
            }}
            placeholder={selectedIndustries.length === 0 ? "Ajoutez les secteurs d'activité..." : ""}
            className="flex-1 min-w-[160px] border-0 focus-visible:ring-0 p-0 h-7 text-sm"
          />
        )}
      </div>
      
      {suggestedIndustries.length > 0 && (
        <div className="bg-background rounded-md border shadow-md p-1 animate-fade-in">
          <ul>
            {suggestedIndustries.map(industry => (
              <li key={industry}>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-loommify-secondary/10 transition-colors"
                  onClick={() => addIndustry(industry)}
                >
                  {industry}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        {selectedIndustries.length}/{maxIndustries} secteurs sélectionnés
      </p>
    </div>
  );
};
