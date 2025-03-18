
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AtSign, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formError, setFormError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email) {
      setFormError("Veuillez entrer votre email");
      return;
    }
    
    if (!formData.password) {
      setFormError("Veuillez entrer votre mot de passe");
      return;
    }
    
    try {
      await login(formData.email, formData.password);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Loommify !",
      });
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
      setFormError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
      });
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      theme === "light" ? "bg-loommify-light" : "bg-background"
    )}>
      {/* Header with back button */}
      <header className="pt-6 px-4">
        <div className="container mx-auto max-w-md">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className={cn(
            "rounded-2xl shadow-lg border p-8 animate-scale-in",
            theme === "light" ? "bg-white" : "bg-card"
          )}>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Connexion</h1>
              <p className="text-muted-foreground">
                Bienvenue sur Loommify
              </p>
            </div>

            {formError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm flex items-start dark:bg-red-950/50 dark:text-red-400">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.fr"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link to="/forgot-password" className="text-sm text-loommify-primary hover:underline">
                    Mot de passe oublié?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe" 
                  checked={formData.rememberMe} 
                  onCheckedChange={handleCheckboxChange}
                  disabled={isLoading}
                />
                <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
                  Se souvenir de moi
                </Label>
              </div>

              <Button 
                type="submit" 
                className={cn(
                  "w-full hover:bg-loommify-primary/90", 
                  theme === "dark" ? "bg-[#8F3985] text-white" : "bg-loommify-primary"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className={cn(
                    "px-2 text-muted-foreground",
                    theme === "light" ? "bg-white" : "bg-card"
                  )}>Ou continuer avec</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="w-full" disabled={isLoading}>
                  <img src="/google.svg" alt="Google" className="h-4 w-4 mr-2" />
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full" disabled={isLoading}>
                  <img src="/linkedin.svg" alt="LinkedIn" className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Pas encore membre?{" "}
                <Link to="/signup" className="text-loommify-primary font-medium hover:underline">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
