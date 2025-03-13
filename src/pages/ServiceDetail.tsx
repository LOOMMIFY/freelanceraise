
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Clock, Check, MessageSquare, ShoppingCart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Sample service data
const SERVICE = {
  id: 1,
  title: "Développement site web vitrine",
  description: "Je crée un site web vitrine professionnel et responsive pour votre entreprise. Le site sera développé avec les dernières technologies web pour garantir des performances optimales et une expérience utilisateur de qualité.",
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  category: "Développement Web",
  freelancer: {
    id: 1,
    name: "Sophie Dubois",
    avatar: "/placeholder.svg",
    rating: 4.8,
    reviews: 32,
    bio: "Développeuse web full-stack avec 5 ans d'expérience spécialisée dans React et Node.js."
  },
  packages: [
    {
      name: "Basique",
      price: 450,
      deliveryTime: "3 jours",
      description: "Site one-page responsive",
      features: [
        "1 page",
        "Design responsive",
        "Formulaire de contact",
        "1 révision"
      ]
    },
    {
      name: "Standard",
      price: 850,
      deliveryTime: "7 jours",
      description: "Site multi-pages avec fonctionnalités de base",
      features: [
        "5 pages",
        "Design responsive",
        "Formulaire de contact",
        "SEO de base",
        "3 révisions"
      ]
    },
    {
      name: "Premium",
      price: 1500,
      deliveryTime: "14 jours",
      description: "Site complet avec fonctionnalités avancées",
      features: [
        "10 pages",
        "Design responsive",
        "Formulaire de contact",
        "SEO avancé",
        "Optimisation des performances",
        "5 révisions",
        "Maintenance 1 mois"
      ]
    }
  ],
  faq: [
    {
      question: "Le site sera-t-il compatible avec tous les navigateurs ?",
      answer: "Oui, le site sera compatible avec les navigateurs modernes comme Chrome, Firefox, Safari et Edge."
    },
    {
      question: "Puis-je modifier le contenu moi-même par la suite ?",
      answer: "Oui, je vous fournirai un accès à un CMS simple pour que vous puissiez modifier le contenu vous-même."
    },
    {
      question: "Comment se déroule le processus de développement ?",
      answer: "Après votre commande, je vous enverrai un questionnaire pour recueillir vos besoins. Ensuite, je vous proposerai une maquette, puis je développerai le site après votre validation."
    }
  ]
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPackage, setSelectedPackage] = useState("standard");
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Find the selected package
  const currentPackage = SERVICE.packages.find(
    pkg => pkg.name.toLowerCase() === selectedPackage
  ) || SERVICE.packages[1]; // Default to Standard
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Breadcrumbs */}
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Link to="/services" className="hover:underline">Services</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to={`/services?category=${SERVICE.category}`} className="hover:underline">
                  {SERVICE.category}
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium truncate">{SERVICE.title}</span>
              </div>
              
              {/* Service Title */}
              <div>
                <Badge className="mb-3 bg-[#25283D]/10 text-[#25283D]">
                  {SERVICE.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-4">{SERVICE.title}</h1>
                
                <div className="flex items-center flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={SERVICE.freelancer.avatar} alt={SERVICE.freelancer.name} />
                      <AvatarFallback>{getInitials(SERVICE.freelancer.name)}</AvatarFallback>
                    </Avatar>
                    <Link
                      to={`/freelancers/${SERVICE.freelancer.id}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {SERVICE.freelancer.name}
                    </Link>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span>{SERVICE.freelancer.rating.toFixed(1)}</span>
                    <span className="mx-1">·</span>
                    <span>{SERVICE.freelancer.reviews} avis</span>
                  </div>
                </div>
              </div>
              
              {/* Image Gallery */}
              <div className="rounded-lg overflow-hidden border">
                <Carousel>
                  <CarouselContent>
                    {SERVICE.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={image}
                            alt={`${SERVICE.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
              
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>À propos de ce service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {SERVICE.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Questions fréquentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {SERVICE.faq.map((item, index) => (
                      <div key={index}>
                        <h3 className="font-medium mb-1">{item.question}</h3>
                        <p className="text-sm text-muted-foreground">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Freelancer Info */}
              <Card>
                <CardHeader>
                  <CardTitle>À propos du freelance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={SERVICE.freelancer.avatar} alt={SERVICE.freelancer.name} />
                      <AvatarFallback>{getInitials(SERVICE.freelancer.name)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-semibold mb-1">{SERVICE.freelancer.name}</h3>
                      <div className="flex items-center text-sm mb-2">
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                        <span>{SERVICE.freelancer.rating.toFixed(1)}</span>
                        <span className="mx-1">·</span>
                        <span>{SERVICE.freelancer.reviews} avis</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {SERVICE.freelancer.bio}
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/freelancers/${SERVICE.freelancer.id}`}>
                          Voir le profil
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Sidebar */}
            <div className="space-y-6">
              <div className="sticky top-28">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Sélectionnez un forfait</CardTitle>
                    <CardDescription>
                      Choisissez le forfait qui correspond à vos besoins
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <Tabs value={selectedPackage} onValueChange={setSelectedPackage} className="w-full">
                      <TabsList className="grid grid-cols-3 mb-4">
                        {SERVICE.packages.map((pkg, index) => (
                          <TabsTrigger
                            key={index}
                            value={pkg.name.toLowerCase()}
                            className="text-xs sm:text-sm"
                          >
                            {pkg.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {SERVICE.packages.map((pkg, index) => (
                        <TabsContent key={index} value={pkg.name.toLowerCase()} className="pt-2">
                          <div className="mb-4">
                            <div className="text-2xl font-bold text-[#8F3985] mb-1">
                              {pkg.price}€
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Livraison en {pkg.deliveryTime}</span>
                            </div>
                            <p className="text-sm mb-4">{pkg.description}</p>
                            
                            <div className="space-y-2">
                              {pkg.features.map((feature, i) => (
                                <div key={i} className="flex items-start">
                                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                  <span className="text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 mt-6">
                            <Button className="w-full bg-[#8F3985] hover:bg-[#8F3985]/90">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Commander
                            </Button>
                            <Button variant="outline" className="w-full">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contacter le freelance
                            </Button>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
                
                <div className="mt-6 text-sm text-center text-muted-foreground">
                  <p>Satisfait ou remboursé sous 7 jours</p>
                  <p>Paiement sécurisé</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Comparison Table (for larger screens) */}
          <div className="mt-16 hidden md:block">
            <h2 className="text-2xl font-bold mb-6">Comparez les forfaits</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/4">Fonctionnalités</TableHead>
                      {SERVICE.packages.map((pkg, index) => (
                        <TableHead key={index} className="text-center">
                          <div className="font-bold">{pkg.name}</div>
                          <div className="text-[#8F3985] font-bold">{pkg.price}€</div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Délai de livraison</TableCell>
                      {SERVICE.packages.map((pkg, index) => (
                        <TableCell key={index} className="text-center">
                          {pkg.deliveryTime}
                        </TableCell>
                      ))}
                    </TableRow>
                    {SERVICE.packages[2].features.map((feature, i) => (
                      <TableRow key={i}>
                        <TableCell>{feature}</TableCell>
                        {SERVICE.packages.map((pkg, j) => (
                          <TableCell key={j} className="text-center">
                            {pkg.features[i] ? (
                              <Check className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell></TableCell>
                      {SERVICE.packages.map((pkg, index) => (
                        <TableCell key={index} className="text-center">
                          <Button
                            className={index === 1 ? "bg-[#8F3985] hover:bg-[#8F3985]/90" : ""}
                            variant={index === 1 ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedPackage(pkg.name.toLowerCase())}
                          >
                            Sélectionner
                          </Button>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
