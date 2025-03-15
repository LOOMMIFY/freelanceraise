
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Bell, LogOut, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-loommify-primary">Loommify</span>
          </Link>
          
          <nav className="ml-10 hidden md:flex space-x-1">
            <NavLink to="/" label="Accueil" active={location.pathname === "/"} />
            <NavLink to="/projects" label="Projets" active={location.pathname.startsWith("/projects")} />
            <NavLink to="/freelancers" label="Freelancers" active={location.pathname.startsWith("/freelancers")} />
            <NavLink to="/services" label="Services" active={location.pathname.startsWith("/services")} />
            
            {isAuthenticated && user?.role === "business" && (
              <NavLink 
                to="/dashboard/post-project" 
                label="Publier un Projet" 
                active={location.pathname === "/dashboard/post-project"} 
              />
            )}
            
            {isAuthenticated && user?.role === "freelancer" && (
              <>
                <NavLink 
                  to="/dashboard/freelancer" 
                  label="Mon Profil" 
                  active={location.pathname === "/dashboard/freelancer"} 
                />
                <NavLink 
                  to="/dashboard/services" 
                  label="Mes Services" 
                  active={location.pathname === "/dashboard/services"} 
                />
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="text-loommify-primary">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-loommify-primary relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-loommify-secondary rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-loommify-primary/10 text-loommify-primary">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Mon Compte</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Se connecter</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">S'inscrire</Link>
              </Button>
            </div>
          )}
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <span className="text-xl font-bold text-loommify-primary">Loommify</span>
                    <SheetTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  
                  <nav className="flex flex-col space-y-4 py-8">
                    <MobileNavLink to="/" label="Accueil" />
                    <MobileNavLink to="/projects" label="Projets" />
                    <MobileNavLink to="/freelancers" label="Freelancers" />
                    <MobileNavLink to="/services" label="Services" />
                    
                    {isAuthenticated ? (
                      <>
                        {user?.role === "business" && (
                          <MobileNavLink to="/dashboard/post-project" label="Publier un Projet" />
                        )}
                        
                        {user?.role === "freelancer" && (
                          <>
                            <MobileNavLink to="/dashboard/freelancer" label="Mon Profil" />
                            <MobileNavLink to="/dashboard/services" label="Mes Services" />
                          </>
                        )}
                        
                        <MobileNavLink to="/dashboard" label="Mon Compte" />
                        <MobileNavLink to="/dashboard/settings" label="Paramètres" />
                        
                        <Button 
                          variant="outline" 
                          className="w-full mt-4 text-red-500 border-red-500/20 hover:bg-red-500/10"
                          onClick={logout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Déconnexion
                        </Button>
                      </>
                    ) : (
                      <div className="mt-auto space-y-4 py-4">
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/login">Se connecter</Link>
                        </Button>
                        <Button className="w-full" asChild>
                          <Link to="/signup">S'inscrire</Link>
                        </Button>
                      </div>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  active?: boolean;
}

const NavLink = ({ to, label, active }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
      active 
        ? "text-loommify-primary bg-loommify-primary/10" 
        : "text-foreground hover:text-loommify-primary hover:bg-loommify-primary/5"
    )}
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label }: NavLinkProps) => (
  <Link
    to={to}
    className="px-2 py-3 text-lg font-medium hover:text-loommify-primary transition-colors"
  >
    {label}
  </Link>
);
