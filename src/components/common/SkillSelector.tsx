
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// List of common skills (this could be fetched from an API in a real app)
const AVAILABLE_SKILLS = [
  "JavaScript", "TypeScript", "React", "Vue.js", "Angular", "Node.js", "Express",
  "PHP", "Laravel", "Python", "Django", "Ruby", "Ruby on Rails", "Java", "Spring",
  "C#", ".NET", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes",
  "HTML", "CSS", "SASS", "Tailwind CSS", "Bootstrap", "UI/UX Design", "Figma",
  "Adobe XD", "Photoshop", "Illustrator", "SEO", "Content Writing", "Marketing",
  "Product Management", "Project Management", "Agile", "Scrum", "Data Analysis"
];

interface SkillSelectorProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
  maxSkills?: number;
}

export const SkillSelector = ({ selectedSkills, onChange, maxSkills = 10 }: SkillSelectorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      const suggestions = AVAILABLE_SKILLS
        .filter(skill => 
          skill.toLowerCase().includes(value.toLowerCase()) && 
          !selectedSkills.includes(skill)
        )
        .slice(0, 5);
      setSuggestedSkills(suggestions);
    } else {
      setSuggestedSkills([]);
    }
  };

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (
      trimmedSkill &&
      !selectedSkills.includes(trimmedSkill) &&
      selectedSkills.length < maxSkills
    ) {
      const newSkills = [...selectedSkills, trimmedSkill];
      onChange(newSkills);
      setInputValue("");
      setSuggestedSkills([]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    onChange(newSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      if (suggestedSkills.length > 0) {
        addSkill(suggestedSkills[0]);
      } else {
        addSkill(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && selectedSkills.length > 0) {
      removeSkill(selectedSkills[selectedSkills.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      <div 
        className={cn(
          "flex flex-wrap gap-2 p-3 border rounded-md bg-background transition-all min-h-[80px]",
          isFocused ? "ring-2 ring-ring ring-offset-1" : "",
          selectedSkills.length >= maxSkills ? "opacity-70" : ""
        )}
      >
        {selectedSkills.map(skill => (
          <Badge 
            key={skill} 
            variant="secondary"
            className="pl-3 h-7 text-sm bg-loommify-primary/10 text-loommify-primary hover:bg-loommify-primary/20"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 rounded-full hover:bg-loommify-primary/20 p-1"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Retirer {skill}</span>
            </button>
          </Badge>
        ))}
        
        {selectedSkills.length < maxSkills && (
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              // Small delay to allow clicking on suggestions
              setTimeout(() => setSuggestedSkills([]), 200);
            }}
            placeholder={selectedSkills.length === 0 ? "Ajoutez vos compétences..." : ""}
            className="flex-1 min-w-[160px] border-0 focus-visible:ring-0 p-0 h-7 text-sm"
          />
        )}
      </div>
      
      {suggestedSkills.length > 0 && (
        <div className="bg-background rounded-md border shadow-md p-1 animate-fade-in">
          <ul>
            {suggestedSkills.map(skill => (
              <li key={skill}>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-loommify-primary/10 transition-colors"
                  onClick={() => addSkill(skill)}
                >
                  {skill}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        {selectedSkills.length}/{maxSkills} compétences sélectionnées
      </p>
    </div>
  );
};
