
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, Trophy, Briefcase, Mail } from 'lucide-react';

interface XpProgressSectionProps {
  xp: number;
  badges: {
    name: string;
    icon: React.ReactNode;
    description: string;
  }[];
}

export const XpProgressSection = ({ xp, badges }: XpProgressSectionProps) => {
  // Calculate level based on XP
  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 1000) + 1;
  };

  // Calculate progress to next level
  const calculateProgress = (xp: number) => {
    const currentLevel = calculateLevel(xp);
    const levelBaseXP = (currentLevel - 1) * 1000;
    const progress = ((xp - levelBaseXP) / 1000) * 100;
    return Math.min(progress, 100);
  };

  const level = calculateLevel(xp);
  const nextLevel = level + 1;
  const progressToNextLevel = calculateProgress(xp);

  return (
    <div className="p-6 border-b">
      <h2 className="text-xl font-semibold mb-4">Progression et Badges</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium">Niveau {level}</span>
            <span className="text-sm text-muted-foreground">{xp} XP / {level * 1000 + 1000} XP</span>
          </div>
          <Progress value={progressToNextLevel} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {Math.round(1000 - (xp % 1000))} XP restants pour atteindre le niveau {nextLevel}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3">Badges obtenus</h3>
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              {badges.map((badge, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className="py-1.5 px-3 gap-1.5 bg-[#8F3985]/10 text-[#8F3985] border-[#8F3985]/20">
                      {badge.icon}
                      {badge.name}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
