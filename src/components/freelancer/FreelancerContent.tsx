
import { FreelancerBio } from "./FreelancerBio";
import { FreelancerSkills } from "./FreelancerSkills";
import { FreelancerPortfolio } from "./FreelancerPortfolio";
import { FreelancerInfo } from "./FreelancerInfo";
import { Freelancer } from "@/services/freelancerService";

interface FreelancerContentProps {
  freelancer: Freelancer;
}

export const FreelancerContent = ({ freelancer }: FreelancerContentProps) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Bio and skills */}
        <div className="md:col-span-2 space-y-6">
          <FreelancerBio freelancer={freelancer} />
          <FreelancerSkills freelancer={freelancer} />
          <FreelancerPortfolio freelancer={freelancer} />
        </div>

        {/* Right column - Statistics and details */}
        <div>
          <FreelancerInfo freelancer={freelancer} />
        </div>
      </div>
    </div>
  );
};
