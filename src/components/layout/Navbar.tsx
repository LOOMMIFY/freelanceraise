
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  const isAuthenticated = false; // This would come from your auth context/state

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
            <NavLink to="/projects" label="Projets" active={location.pathname === "/projects"} />
            <NavLink to="/freelancers" label="Freelancers" active={location.pathname === "/freelancers"} />
            <NavLink to="/services" label="Services" active={location.pathname === "/services"} />
            <NavLink to="/how-it-works" label="Comment ça marche" active={location.pathname === "/how-it-works"} />
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
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-loommify-primary/10 text-loommify-primary">
                  JD
                </AvatarFallback>
              </Avatar>
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
                    <MobileNavLink to="/projects" label="Projets" />
                    <MobileNavLink to="/freelancers" label="Freelancers" />
                    <MobileNavLink to="/services" label="Services" />
                    <MobileNavLink to="/how-it-works" label="Comment ça marche" />
                  </nav>
                  
                  <div className="mt-auto space-y-4 py-8">
                    {!isAuthenticated && (
                      <>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/login">Se connecter</Link>
                        </Button>
                        <Button className="w-full" asChild>
                          <Link to="/signup">S'inscrire</Link>
                        </Button>
                      </>
                    )}
                  </div>
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
