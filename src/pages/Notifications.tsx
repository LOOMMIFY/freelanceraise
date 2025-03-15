
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Bell } from "lucide-react";

const Notifications = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Notifications</h1>
          
          <div className="bg-white rounded-lg border min-h-[400px] flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 bg-loommify-primary/10 rounded-full flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-loommify-primary" />
            </div>
            <h2 className="text-xl font-medium mb-2">Vous êtes à jour !</h2>
            <p className="text-muted-foreground text-center">
              Vous n'avez pas de nouvelles notifications.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notifications;
