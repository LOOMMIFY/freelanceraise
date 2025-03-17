
import { User } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Award, Briefcase, Building, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProfileHeaderProps {
  user: User | null;
  xp: number;
  location?: string;
  jobTitle?: string;
  badges?: string[];
  isOwnProfile?: boolean;
}

export const ProfileHeader = ({ 
  user, 
  xp, 
  location = "Paris, France", 
  jobTitle, 
  badges = [], 
  isOwnProfile = false 
}: ProfileHeaderProps) => {
  return (
    <div className="p-6 border-b">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user?.avatar} alt={user?.name || 'Utilisateur'} />
          <AvatarFallback className="bg-[#8F3985] text-white text-2xl">
            {user?.name?.split(' ').map(n => n[0]).join('') || '?'}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user?.name || 'Utilisateur'}</h1>
            <Badge className="ml-2" variant="outline">
              {user?.role === 'freelancer' ? (
                <UserIcon className="mr-1 h-3 w-3" />
              ) : (
                <Building className="mr-1 h-3 w-3" />
              )}
              {user?.role === 'freelancer' ? 'Freelance' : 'Entreprise'}
            </Badge>
          </div>
          
          {jobTitle && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">{jobTitle}</p>
          )}
          
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {location}
          </div>
          
          <div className="flex items-center mt-2">
            <Badge variant="secondary" className="bg-[#8F3985]/10 text-[#8F3985] border-[#8F3985]/20">
              <Award className="mr-1 h-4 w-4" />
              {xp} XP
            </Badge>
            {badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="ml-2">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="w-full md:w-auto mt-4 md:mt-0">
          {isOwnProfile ? (
            <Button asChild>
              <Link to="/dashboard/profil/edit">
                Modifier mon profil
              </Link>
            </Button>
          ) : (
            <Button>
              Envoyer un message
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
