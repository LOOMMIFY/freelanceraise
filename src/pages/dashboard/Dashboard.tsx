
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { XpProgressSection } from '@/components/profile/XpProgressSection';
import { FreelancerProfileContent } from '@/components/profile/FreelancerProfileContent';
import { BusinessProfileContent } from '@/components/profile/BusinessProfileContent';
import { Award, Trophy, Briefcase, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const { user } = useAuth();
  
  const isFreelancer = user?.role === 'freelancer';
  
  // Mock data - would come from API in a real app
  const xp = isFreelancer ? 2450 : 3280;
  const jobTitle = isFreelancer ? 'Développeur Full-Stack' : undefined;
  const location = 'Paris, France';
  
  // Define badges based on user role
  const badges = isFreelancer 
    ? [
        { name: "Expert", icon: <Trophy className="h-4 w-4" />, description: "A obtenu 5 évaluations 5 étoiles consécutives" },
        { name: "Projets terminés", icon: <Briefcase className="h-4 w-4" />, description: "A terminé plus de 20 projets avec succès" },
        { name: "Réponse rapide", icon: <Mail className="h-4 w-4" />, description: "Répond aux messages en moins de 2 heures" }
      ].filter(badge => true) // In a real app, we'd filter based on actual achievements
    : [
        { name: "Entreprise Active", icon: <Award className="h-4 w-4" />, description: "Publie régulièrement des projets sur la plateforme" },
        { name: "Paiements Vérifiés", icon: <Briefcase className="h-4 w-4" />, description: "A effectué plus de 10 paiements ponctuels" },
        { name: "Top Employeur", icon: <Trophy className="h-4 w-4" />, description: "A reçu d'excellentes évaluations des freelances" }
      ].filter(badge => true); // In a real app, we'd filter based on actual achievements
  
  return (
    <DashboardLayout title="Tableau de bord">
      <Helmet>
        <title>Tableau de bord | Loommify</title>
      </Helmet>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ProfileHeader 
          user={user}
          xp={xp}
          location={location}
          jobTitle={jobTitle}
          isOwnProfile={true}
        />
        
        <XpProgressSection 
          xp={xp} 
          badges={badges}
        />
        
        {isFreelancer ? (
          <FreelancerProfileContent user={user} />
        ) : (
          <BusinessProfileContent user={user} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
