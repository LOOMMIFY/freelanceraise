
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <Card className={cn(
      "transition-all hover:shadow-md",
      viewMode === "list" && "flex flex-row items-start"
    )}>
      <div className={cn(
        "flex-1",
        viewMode === "list" && "flex flex-row items-center gap-6 p-6"
      )}>
        <CardHeader className={viewMode === "list" ? "flex-1 p-0" : undefined}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {company.name}
                {company.verified && (
                  <Badge variant="secondary" className="ml-2">
                    Vérifié
                  </Badge>
                )}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className={viewMode === "list" ? "flex-1 p-0" : undefined}>
          <div className="mt-2 space-y-2">
            <div className="text-lg font-medium text-loommify-primary">
              {budget.min}€ - {budget.max}€
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{estimatedTime}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                {proposals} proposition{proposals > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </CardContent>

        {viewMode === "list" && (
          <Button className="ml-auto">Voir le projet</Button>
        )}
      </div>

      {viewMode === "grid" && (
        <CardFooter className="pt-4">
          <Button className="w-full">Voir le projet</Button>
        </CardFooter>
      )}
    </Card>
  );
};
