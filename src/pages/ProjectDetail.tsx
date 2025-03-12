
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  Users,
  FileText,
  CheckCircle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProjectDetail = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project header */}
              <div>
                <h1 className="text-3xl font-bold">Développement site e-commerce</h1>
                <div className="flex items-center mt-2 space-x-2">
                  <Badge variant="secondary">Développement Web</Badge>
                  <Badge variant="secondary">E-commerce</Badge>
                  <Badge variant="secondary">React</Badge>
                </div>
              </div>
              
              <Separator />
              
              {/* Project details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="text-xl font-semibold text-loommify-primary">1000€ - 5000€</p>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Délai</p>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <p className="font-medium">1-2 semaines</p>
                  </div>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Localisation</p>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <p className="font-medium">Remote</p>
                  </div>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Propositions</p>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <p className="font-medium">12 reçues</p>
                  </div>
                </div>
              </div>
              
              {/* Project description */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Description du projet</h2>
                <div className="prose max-w-none">
                  <p>
                    Nous recherchons un développeur expérimenté pour créer un site e-commerce complet pour notre marque de vêtements éthiques. Le site devra inclure les fonctionnalités suivantes:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Catalogue de produits avec filtres (taille, couleur, catégorie)</li>
                    <li>Système de panier et paiement sécurisé (Stripe)</li>
                    <li>Gestion des comptes clients</li>
                    <li>Interface d'administration pour gérer les produits et commandes</li>
                    <li>Design responsive et optimisé pour mobile</li>
                    <li>Intégration avec notre système de gestion de stock existant</li>
                  </ul>
                  <p className="mt-4">
                    Nous souhaitons une solution moderne utilisant React.js pour le frontend et une API REST pour le backend. Le candidat idéal aura déjà réalisé des projets similaires et pourra fournir des exemples de son travail.
                  </p>
                </div>
              </div>
              
              {/* Competences requises */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Compétences requises</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge>HTML/CSS</Badge>
                  <Badge>JavaScript</Badge>
                  <Badge>React.js</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>MySQL</Badge>
                  <Badge>API REST</Badge>
                  <Badge>Stripe</Badge>
                  <Badge>Responsive Design</Badge>
                </div>
              </div>
              
              {/* Q&A Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Questions & Réponses</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Le design sera-t-il fourni ou faut-il le créer ?</AccordionTrigger>
                    <AccordionContent>
                      Nous avons déjà des maquettes Figma qui seront fournies au freelancer sélectionné. Des ajustements mineurs pourront être discutés.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Le projet inclut-il l'hébergement ?</AccordionTrigger>
                    <AccordionContent>
                      Non, nous avons déjà notre propre solution d'hébergement. Le freelancer devra simplement nous aider à déployer le site.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Quel est le nombre approximatif de produits ?</AccordionTrigger>
                    <AccordionContent>
                      Nous prévoyons environ 50-100 produits au lancement, avec environ 3-4 variantes (tailles/couleurs) par produit.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">À propos du client</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-loommify-primary text-white">TC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">TechCorp</p>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-loommify-secondary mr-1" />
                        <span className="text-sm text-muted-foreground">Entreprise vérifiée</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Membre depuis:</span>
                      <span>Janvier 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projets publiés:</span>
                      <span>12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taux de satisfaction:</span>
                      <span>4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Apply Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Postuler à ce projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="proposal">Votre proposition</Label>
                      <Textarea
                        id="proposal"
                        placeholder="Présentez votre expertise et comment vous aborderiez ce projet..."
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budget">Votre tarif (€)</Label>
                      <Input id="budget" type="number" placeholder="Proposez votre tarif" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="delay">Délai de livraison estimé</Label>
                      <Select>
                        <SelectTrigger id="delay">
                          <SelectValue placeholder="Choisir un délai" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1w">Moins d'une semaine</SelectItem>
                          <SelectItem value="2w">1-2 semaines</SelectItem>
                          <SelectItem value="3w">3-4 semaines</SelectItem>
                          <SelectItem value="1m+">Plus d'un mois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="attachments">Pièces jointes (facultatif)</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FileText className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Cliquez pour ajouter un CV, portfolio ou tout autre document
                            </p>
                          </div>
                          <input id="file-upload" type="file" className="hidden" />
                        </label>
                      </div>
                    </div>
                    
                    <Button className="w-full" type="submit">
                      Envoyer ma proposition
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
