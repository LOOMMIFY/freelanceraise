import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Save, User, Key, Bell, Globe } from "lucide-react";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("utilisateur@example.com");
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSaveChanges = () => {
    setIsEditing(false);
    // Here you would typically save the email to your backend
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 container max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
        
        {/* Personal Information Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Informations Personnelles
            </CardTitle>
            <CardDescription>
              Gérez vos informations personnelles et vos préférences de compte
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Adresse e-mail
              </label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Annuler" : "Modifier"}
                </Button>
              </div>
            </div>
            
            <div>
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => alert("Fonctionnalité à venir")}>
                <Key className="mr-2 h-4 w-4" />
                Modifier le mot de passe
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Theme Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
              Mode d'affichage
            </CardTitle>
            <CardDescription>
              Personnalisez l'apparence de l'interface
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Thème sombre</p>
                <p className="text-sm text-muted-foreground">
                  Mode actuel: {theme === "dark" ? "Sombre" : "Clair"}
                </p>
              </div>
              
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Other Settings Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Autres Paramètres
            </CardTitle>
            <CardDescription>
              Options supplémentaires pour personnaliser votre expérience
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Langue</p>
                <p className="text-sm text-muted-foreground">
                  Français
                </p>
              </div>
              
              <Button variant="outline" size="sm" disabled>
                <Globe className="mr-2 h-4 w-4" />
                Changer (Bientôt disponible)
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Gérer vos préférences de notification
                </p>
              </div>
              
              <Button variant="outline" size="sm" disabled>
                Configurer (Bientôt disponible)
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="px-8" onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder les modifications
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
