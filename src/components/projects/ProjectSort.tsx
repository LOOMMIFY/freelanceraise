
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProjectSort = () => {
  return (
    <Select defaultValue="newest">
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Trier par" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Plus récents</SelectItem>
        <SelectItem value="budget-high">Budget le plus élevé</SelectItem>
        <SelectItem value="deadline">Date limite proche</SelectItem>
        <SelectItem value="proposals-low">Moins de propositions</SelectItem>
      </SelectContent>
    </Select>
  );
};
