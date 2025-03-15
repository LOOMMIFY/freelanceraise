
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRoleSelector } from "@/components/auth/UserRoleSelector";
import { FreelancerSignupForm } from "@/components/auth/FreelancerSignupForm";
import { BusinessSignupForm } from "@/components/auth/BusinessSignupForm";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { selectedRole, setSelectedRole } = useAuth();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleFreelancerSubmit = async (formData: any) => {
    try {
      // Handle freelancer signup logic
      console.log("Freelancer signup:", formData);
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte freelance a été créé avec succès !",
      });
      
      // Redirect to dashboard or home
      navigate("/");
    } catch (error) {
      setError("L'inscription a échoué. Veuillez réessayer.");
      console.error(error);
    }
  };

  const handleBusinessSubmit = async (formData: any, mode: 'create' | 'join') => {
    try {
      // Handle business signup logic
      console.log("Business signup:", formData, "Mode:", mode);
      
      toast({
        title: "Inscription réussie",
        description: mode === 'create' 
          ? "Votre entreprise a été créée avec succès !" 
          : "Vous avez rejoint l'entreprise avec succès !",
      });
      
      // Redirect to dashboard or home
      navigate("/");
    } catch (error) {
      setError("L'inscription a échoué. Veuillez réessayer.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-loommify-light">
      {/* Header with back button */}
      <header className="pt-6 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Link>
            </Button>
            <div className="text-sm">
              Déjà membre?{" "}
              <Link to="/login" className="text-loommify-primary font-medium hover:underline">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border p-8 md:p-12 animate-scale-in">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">Créer votre compte</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Rejoignez Loommify pour accéder à un écosystème de talents et d'opportunités. Choisissez votre profil pour commencer.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm flex items-start max-w-md mx-auto">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!selectedRole ? (
            <div className="space-y-10">
              <UserRoleSelector selectedRole={selectedRole} onChange={setSelectedRole} />
              
              <div className="flex flex-col items-center justify-center space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  En vous inscrivant, vous acceptez nos{" "}
                  <Link to="/terms" className="text-loommify-primary hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et notre{" "}
                  <Link to="/privacy" className="text-loommify-primary hover:underline">
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  Inscription en tant que {selectedRole === "freelancer" ? "Freelance" : "Entreprise"}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedRole(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Changer de profil
                </Button>
              </div>
              
              {selectedRole === "freelancer" ? (
                <FreelancerSignupForm onSubmit={handleFreelancerSubmit} />
              ) : (
                <BusinessSignupForm onSubmit={handleBusinessSubmit} />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Signup;
