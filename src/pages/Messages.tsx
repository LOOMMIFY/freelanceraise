
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Messages = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-6xl">
          <h1 className="text-3xl font-bold mb-6">Messages</h1>
          
          <div className="bg-white rounded-lg border min-h-[400px] flex flex-col items-center justify-center p-8">
            <p className="text-muted-foreground text-center mb-4">
              Vous n'avez pas encore de messages.
            </p>
            <Button asChild>
              <a href="/projects">Parcourir les projets</a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
