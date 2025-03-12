
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-loommify-primary/5 pt-16 pb-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-loommify-primary mb-6">Loommify</h3>
            <p className="text-muted-foreground mb-6">
              La plateforme qui connecte les freelances et les entreprises dans un environnement transparent et équitable.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook size={18} />} label="Facebook" />
              <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="#" icon={<Instagram size={18} />} label="Instagram" />
              <SocialLink href="#" icon={<Linkedin size={18} />} label="LinkedIn" />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Pour les Freelances</h4>
            <ul className="space-y-3">
              <FooterLink href="/freelancers/how-it-works" label="Comment ça marche" />
              <FooterLink href="/freelancers/find-projects" label="Trouver des projets" />
              <FooterLink href="/freelancers/create-profile" label="Créer votre profil" />
              <FooterLink href="/freelancers/pricing" label="Tarification" />
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Pour les Entreprises</h4>
            <ul className="space-y-3">
              <FooterLink href="/businesses/post-project" label="Publier un projet" />
              <FooterLink href="/businesses/find-freelancers" label="Trouver des freelances" />
              <FooterLink href="/businesses/how-it-works" label="Comment ça marche" />
              <FooterLink href="/businesses/testimonials" label="Témoignages" />
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Ressources</h4>
            <ul className="space-y-3">
              <FooterLink href="/about" label="À propos" />
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/support" label="Support" />
              <FooterLink href="/contact" label="Contact" />
            </ul>
          </div>
        </div>
        
        <div className="border-t border-loommify-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Loommify. Tous droits réservés.
          </p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-loommify-primary transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-loommify-primary transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/legal" className="text-sm text-muted-foreground hover:text-loommify-primary transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink = ({ href, label }: FooterLinkProps) => (
  <li>
    <Link 
      to={href} 
      className="text-muted-foreground hover:text-loommify-primary transition-colors"
    >
      {label}
    </Link>
  </li>
);

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-white p-2 rounded-full text-loommify-primary hover:bg-loommify-primary hover:text-white transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);
