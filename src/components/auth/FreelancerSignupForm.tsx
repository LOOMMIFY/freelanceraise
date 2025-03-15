
import { useState } from "react";
import { AtSign, Camera, Lock, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SkillSelector } from "@/components/common/SkillSelector";
import { useAuth } from "@/context/AuthContext";

interface FreelancerSignupFormProps {
  onSubmit: (formData: any) => void;
}

export const FreelancerSignupForm = ({ onSubmit }: FreelancerSignupFormProps) => {
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    skills: [] as string[],
    portfolio: "",
    profileImage: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (skills: string[]) => {
    setFormData((prev) => ({ ...prev, skills }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, profileImage: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit form data to the auth system
      await signup(
        {
          name: formData.fullName,
          email: formData.email,
          role: "freelancer",
        }, 
        formData.password
      );
      
      // Call the parent's onSubmit handler with all form data
      onSubmit({
        ...formData,
        profileImageUrl: formData.profileImage ? URL.createObjectURL(formData.profileImage) : null,
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <div className="relative">
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Jean Dupont"
                className="pl-10"
                required
                disabled={isLoading}
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email professionnel</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="jean.dupont@exemple.fr"
                className="pl-10"
                required
                disabled={isLoading}
              />
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="pl-10"
                required
                disabled={isLoading}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <div className="relative">
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+33 6 12 34 56 78"
                className="pl-10"
                required
                disabled={isLoading}
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Domaine d'expertise</Label>
          <SkillSelector selectedSkills={formData.skills} onChange={handleSkillsChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio (liens séparés par des virgules)</Label>
          <Textarea
            id="portfolio"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            placeholder="https://monportfolio.fr, https://github.com/username"
            className="resize-none h-20"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profileImage">Photo de profil</Label>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
              {formData.profileImage ? (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <Input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="max-w-sm"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-loommify-primary hover:bg-loommify-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Création du compte..." : "Créer mon compte Freelance"}
      </Button>
    </form>
  );
};
