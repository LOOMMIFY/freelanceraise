
import { Freelancer } from "@/services/freelancerService";

interface FreelancerBioProps {
  freelancer: Freelancer;
}

export const FreelancerBio = ({ freelancer }: FreelancerBioProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">À propos</h2>
      <p className="text-gray-700">{freelancer.bio}</p>
    </div>
  );
};
