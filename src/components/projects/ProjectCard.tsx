
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

interface ProjectCardProps {
  title: string;
  budget: {
    min: number;
    max: number;
  };
  estimatedTime: string;
  location: string;
  proposals: number;
  company: {
    name: string;
    verified: boolean;
  };
  viewMode: "grid" | "list";
}

export const ProjectCard = ({
  title,
  budget,
  estimatedTime,
  location,
  proposals,
  company,
  viewMode,
}: ProjectCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card className={cn(
      "transition-all hover:shadow-md",
      viewMode === "list" && "flex flex-row items-start",
      isDark && "bg-[#25283D] border-[#333]"
    )}>
      <div className={cn(
        "flex-1",
        viewMode === "list" && "flex flex-row items-center gap-6 p-6"
      )}>
        <CardHeader className={viewMode === "list" ? "flex-1 p-0" : undefined}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-semibold leading-none tracking-tight ${isDark ? 'text-white' : ''}`}>{title}</h3>
              <p className={`text-sm mt-1 flex items-center ${
                isDark ? 'text-gray-300' : 'text-muted-foreground'
              }`}>
                {company.name}
                {company.verified && (
                  <span className="inline-flex items-center ml-2">
                    <CheckCircle className="h-3 w-3 text-loommify-secondary mr-1" />
                    <span className="text-xs">Vérifié</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className={viewMode === "list" ? "flex-1 p-0" : undefined}>
          <div className="mt-2 space-y-2 card-content">
            <div className={`text-lg font-medium ${isDark ? 'text-[#61C177]' : 'text-loommify-primary'}`}>
              {budget.min}€ - {budget.max}€
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className={isDark ? 'bg-[#333] text-white' : ''}>{estimatedTime}</Badge>
              <div className={`flex items-center text-sm ${
                isDark ? 'text-gray-300' : 'text-muted-foreground'
              }`}>
                <MapPin className={`mr-1 h-4 w-4 ${isDark ? 'text-gray-300' : ''}`} />
                {location}
              </div>
              <div className={`flex items-center text-sm ${
                isDark ? 'text-gray-300' : 'text-muted-foreground'
              }`}>
                <Users className={`mr-1 h-4 w-4 ${isDark ? 'text-gray-300' : ''}`} />
                {proposals} proposition{proposals > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </CardContent>

        {viewMode === "list" && (
          <Button className={`ml-auto ${isDark ? 'bg-[#8F3985] hover:bg-[#A6509D]' : ''}`} asChild>
            <Link to="/projects/1">Voir le projet</Link>
          </Button>
        )}
      </div>

      {viewMode === "grid" && (
        <CardFooter className="pt-4">
          <Button className={`w-full ${isDark ? 'bg-[#8F3985] hover:bg-[#A6509D]' : ''}`} asChild>
            <Link to="/projects/1">Voir le projet</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
