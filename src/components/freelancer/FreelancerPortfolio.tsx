
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Freelancer } from "@/services/freelancerService";

interface FreelancerPortfolioProps {
  freelancer: Freelancer;
}

export const FreelancerPortfolio = ({ freelancer }: FreelancerPortfolioProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {freelancer.portfolio.map((project) => (
          <Card key={project.id}>
            <CardHeader className="p-4">
              <CardTitle className="text-base">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
              {project.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
