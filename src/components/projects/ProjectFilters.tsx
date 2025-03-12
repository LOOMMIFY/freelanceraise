
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export const ProjectFilters = () => {
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
            </SelectContent>
          </Select>
        </div>

        {/* Budget Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Budget</label>
          <div className="px-2">
            <Slider defaultValue={[0, 100]} max={100} step={1} />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0€</span>
            <span>5000€+</span>
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
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="cursor-pointer">
          Remote ×
        </Badge>
        <Badge variant="secondary" className="cursor-pointer">
          1000€ - 5000€ ×
        </Badge>
        <Button variant="ghost" size="sm" className="ml-auto">
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
};
