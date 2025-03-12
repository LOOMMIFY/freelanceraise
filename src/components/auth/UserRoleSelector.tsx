
import { useState } from 'react';
import { Check, Briefcase, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserRole = 'freelancer' | 'business' | null;

interface UserRoleSelectorProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

export const UserRoleSelector = ({ selectedRole, onChange }: UserRoleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mx-auto">
      <RoleCard
        title="Freelancer"
        description="Je propose mes services"
        icon={<User className="w-6 h-6" />}
        isSelected={selectedRole === 'freelancer'}
        onClick={() => onChange('freelancer')}
      />
      <RoleCard
        title="Entreprise"
        description="Je recherche un freelance"
        icon={<Briefcase className="w-6 h-6" />}
        isSelected={selectedRole === 'business'}
        onClick={() => onChange('business')}
      />
    </div>
  );
};

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const RoleCard = ({ title, description, icon, isSelected, onClick }: RoleCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 animate-scale-in",
        isSelected 
          ? "border-loommify-primary bg-loommify-primary/5 highlight-border" 
          : "border-border hover:border-loommify-primary/50 hover:bg-loommify-primary/5"
      )}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 rounded-full bg-loommify-primary text-white p-1">
          <Check className="w-4 h-4" />
        </div>
      )}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={cn(
          "p-3 rounded-full",
          isSelected ? "bg-loommify-primary/20 text-loommify-primary" : "bg-muted text-muted-foreground"
        )}>
          {icon}
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
