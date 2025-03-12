
import { useState } from "react";
import { AtSign, Briefcase, Building2, Camera, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IndustrySelector } from "@/components/common/IndustrySelector";
import { cn } from "@/lib/utils";

type BusinessFormMode = "create" | "join";

export const BusinessSignupForm = () => {
  const [mode, setMode] = useState<BusinessFormMode>("create");
  const [formData, setFormData] = useState({
    businessName: "",
    siret: "",
    email: "",
    industries: [] as string[],
    website: "",
    token: "",
    profileImage: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIndustriesChange = (industries: string[]) => {
    setFormData((prev) => ({ ...prev, industries }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, profileImage: e.target.files![0] }));
    }
  };

  const formatToken = (value: string) => {
    // Remove non-alphanumeric characters
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    
    // Format into groups of 5 characters
    let formatted = "";
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 5 === 0) formatted += "-";
      formatted += cleaned[i];
    }
    
    return formatted.substring(0, 29); // XXXX-XXXX-XXXX-XXXX-XXXX (5 groups of 4 + 4 dashes)
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatToken(e.target.value);
    setFormData((prev) => ({ ...prev, token: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { mode, ...formData });
    // Implementation for form submission would go here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Type d'inscription</Label>
          <RadioGroup 
            defaultValue={mode} 
            onValueChange={(value) => setMode(value as BusinessFormMode)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <BusinessModeOption 
              value="create" 
              title="Créer une entreprise" 
              description="Enregistrer une nouvelle entreprise sur la plateforme"
              icon={<Building2 className="w-5 h-5" />}
              checked={mode === "create"}
            />
            <BusinessModeOption 
              value="join" 
              title="Rejoindre une entreprise" 
              description="Avec un token d'invitation"
              icon={<Briefcase className="w-5 h-5" />}
              checked={mode === "join"}
            />
          </RadioGroup>
        </div>

        {mode === "join" ? (
          <div className="space-y-2 py-4">
            <Label htmlFor="token">Token d'entreprise</Label>
            <div className="relative">
              <Input
                id="token"
                name="token"
                value={formData.token}
                onChange={handleTokenChange}
                placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"
                className="pl-10 font-mono tracking-wider"
                required
              />
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Entrez le token que votre administrateur vous a fourni
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Nom de l'entreprise</Label>
                <div className="relative">
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Ma Société SAS"
                    className="pl-10"
                    required
                  />
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siret">Numéro SIRET</Label>
                <Input
                  id="siret"
                  name="siret"
                  value={formData.siret}
                  onChange={handleInputChange}
                  placeholder="123 456 789 00012"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email de contact</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contact@masociete.fr"
                  className="pl-10"
                  required
                />
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Secteur d'activité</Label>
              <IndustrySelector selectedIndustries={formData.industries} onChange={handleIndustriesChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Site Web (optionnel)</Label>
              <div className="relative">
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.masociete.fr"
                  className="pl-10"
                />
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileImage">Logo de l'entreprise</Label>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                  {formData.profileImage ? (
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Logo preview"
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
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full bg-loommify-primary hover:bg-loommify-primary/90">
        {mode === "create" ? "Créer mon entreprise" : "Rejoindre l'entreprise"}
      </Button>
    </form>
  );
};

interface BusinessModeOptionProps {
  value: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
}

const BusinessModeOption = ({ value, title, description, icon, checked }: BusinessModeOptionProps) => {
  return (
    <Label
      htmlFor={value}
      className={cn(
        "flex items-start space-x-4 border-2 rounded-xl p-4 cursor-pointer transition-all",
        checked
          ? "border-loommify-primary bg-loommify-primary/5 highlight-border"
          : "border-border hover:border-loommify-primary/50"
      )}
    >
      <RadioGroupItem value={value} id={value} className="mt-1" />
      <div className="space-y-1">
        <div className="flex items-center">
          <span className="mr-2 text-loommify-primary">{icon}</span>
          <span className="font-medium">{title}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Label>
  );
};
