
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Bell, LogOut, Settings, User, Home, Briefcase, Mail, Users, HelpCircle, Info, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? isDark 
            ? "bg-[#181818]/90 backdrop-blur-lg border-b border-white/10 shadow-sm py-3" 
            : "bg-white/80 backdrop-blur-lg shadow-sm py-3"
          : isDark 
            ? "bg-transparent py-5 border-b border-white/5" 
            : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className={cn(
              "text-2xl font-bold",
              isDark ? "text-white" : "text-loommify-primary"
            )}>
              Loommify
            </span>
          </Link>
          
          <nav className="ml-10 hidden md:flex space-x-1">
            {/* Left Menu - Common for all users */}
            <NavLink to="/" label="Accueil" icon={<Home className="h-4 w-4" />} active={location.pathname === "/"} />
            <NavLink to="/projects" label="Offres" icon={<Briefcase className="h-4 w-4" />} active={location.pathname.startsWith("/projects")} />
            
            {isAuthenticated && (
              <NavLink 
                to="/freelance" 
                label="Freelance" 
                icon={<Users className="h-4 w-4" />}
                active={location.pathname.startsWith("/freelance")} 
              />
            )}
            
            <NavLink 
              to="/how-it-works" 
              label="Comment ça marche" 
              icon={<HelpCircle className="h-4 w-4" />}
              active={location.pathname === "/how-it-works"} 
            />
            <NavLink 
              to="/about" 
              label="À propos" 
              icon={<Info className="h-4 w-4" />}
              active={location.pathname === "/about"} 
            />
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* Right Menu - For Business Users */}
              {user?.role === "business" && (
                <Button asChild className="hidden md:flex">
                  <Link to="/dashboard/post-project">
                    <Send className="mr-2 h-4 w-4" />
                    Soumettre une offre
                  </Link>
                </Button>
              )}
              
              {/* Messages Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  isDark ? "text-white hover:bg-white/10" : "text-loommify-primary hover:bg-loommify-primary/10"
                )} 
                asChild
              >
                <Link to="/messages">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
              
              {/* Notifications Button with PopOver */}
              <NotificationsPopover>
                <Bell className={cn(
                  "h-5 w-5",
                  isDark ? "text-white hover:text-loommify-primary" : "text-foreground hover:text-loommify-primary"
                )} />
              </NotificationsPopover>
              
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className={cn(
                        isDark ? "bg-loommify-primary/20 text-white" : "bg-loommify-primary/10 text-loommify-primary"
                      )}>
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
                    <Link to="/parametres" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className={cn(
                  isDark && "text-white hover:bg-white/10"
                )} 
                asChild
              >
                <Link to="/login">Se connecter</Link>
              </Button>
              <Button 
                className={cn(
                  isDark && "bg-white text-[#181818] hover:bg-white/90"
                )} 
                asChild
              >
                <Link to="/signup">S'inscrire</Link>
              </Button>
            </div>
          )}
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className={cn(
                    isDark && "text-white hover:bg-white/10"
                  )}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <span className={cn(
                      "text-xl font-bold",
                      isDark ? "text-white" : "text-loommify-primary"
                    )}>
                      Loommify
                    </span>
                    <SheetTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  
                  <nav className="flex flex-col space-y-4 py-8">
                    {/* Mobile Left Menu - Common for all users */}
                    <MobileNavLink to="/" label="Accueil" icon={<Home className="h-5 w-5 mr-2" />} />
                    <MobileNavLink to="/projects" label="Offres" icon={<Briefcase className="h-5 w-5 mr-2" />} />
                    
                    {isAuthenticated && (
                      <MobileNavLink to="/freelance" label="Freelance" icon={<Users className="h-5 w-5 mr-2" />} />
                    )}
                    
                    <MobileNavLink to="/how-it-works" label="Comment ça marche" icon={<HelpCircle className="h-5 w-5 mr-2" />} />
                    <MobileNavLink to="/about" label="À propos" icon={<Info className="h-5 w-5 mr-2" />} />
                    
                    {/* Mobile Right Menu - Authenticated Users */}
                    {isAuthenticated ? (
                      <>
                        {user?.role === "business" && (
                          <MobileNavLink to="/dashboard/post-project" label="Soumettre une offre" icon={<Send className="h-5 w-5 mr-2" />} />
                        )}
                        
                        <MobileNavLink to="/messages" label="Messages" icon={<Mail className="h-5 w-5 mr-2" />} />
                        <MobileNavLink to="/notifications" label="Notifications" icon={<Bell className="h-5 w-5 mr-2" />} />
                        <MobileNavLink to="/dashboard" label="Mon Compte" icon={<User className="h-5 w-5 mr-2" />} />
                        <MobileNavLink to="/parametres" label="Paramètres" icon={<Settings className="h-5 w-5 mr-2" />} />
                        
                        <Button 
                          variant="outline" 
                          className={cn(
                            "w-full mt-4", 
                            isDark 
                              ? "text-red-400 border-red-500/20 hover:bg-red-500/10" 
                              : "text-red-500 border-red-500/20 hover:bg-red-500/10"
                          )}
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Déconnexion
                        </Button>
                      </>
                    ) : (
                      <div className="mt-auto space-y-4 py-4">
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          asChild
                        >
                          <Link to="/login">Se connecter</Link>
                        </Button>
                        <Button 
                          className={cn(
                            "w-full",
                            isDark && "bg-white text-[#181818] hover:bg-white/90"
                          )} 
                          asChild
                        >
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
  icon?: React.ReactNode;
}

const NavLink = ({ to, label, icon, active }: NavLinkProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
        active 
          ? isDark
            ? "text-white bg-white/10" 
            : "text-loommify-primary bg-loommify-primary/10"
          : isDark
            ? "text-gray-300 hover:text-white hover:bg-white/10" 
            : "text-foreground hover:text-loommify-primary hover:bg-loommify-primary/5"
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
};

const MobileNavLink = ({ to, label, icon }: NavLinkProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <Link
      to={to}
      className={cn(
        "px-2 py-3 text-lg font-medium transition-colors flex items-center",
        isDark
          ? "text-gray-300 hover:text-white" 
          : "hover:text-loommify-primary"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};
