
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRoleSelector } from "@/components/auth/UserRoleSelector";
import { FreelancerSignupForm } from "@/components/auth/FreelancerSignupForm";
import { BusinessSignupForm } from "@/components/auth/BusinessSignupForm";

type UserRole = "freelancer" | "business" | null;

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

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
              
              {selectedRole === "freelancer" ? <FreelancerSignupForm /> : <BusinessSignupForm />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Signup;
