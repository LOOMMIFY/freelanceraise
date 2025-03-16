
import { Badge } from "@/components/ui/badge";
import { Freelancer } from "@/services/freelancerService";

interface FreelancerSkillsProps {
  freelancer: Freelancer;
}

export const FreelancerSkills = ({ freelancer }: FreelancerSkillsProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Compétences</h2>
      <div className="flex flex-wrap gap-2">
        {freelancer.skills.map((skill, index) => (
          <Badge key={index} className="py-1">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};
