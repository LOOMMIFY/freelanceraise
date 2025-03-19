
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Mail, Phone, Linkedin, Facebook, Instagram } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      console.log("Form data submitted:", data);
      
      // In a real application, this would be an API call:
      // await fetch("/api/contact", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   headers: { "Content-Type": "application/json" },
      // });
      
      // For demo purposes, we'll just wait 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      form.reset();
      
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès !",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer plus tard.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-[#181818] text-[#EAEAEA]" : "bg-white text-[#25283D]"}`}>
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nous Contacter</h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
              Besoin d'aide ? Envoyez-nous un message et nous vous répondrons rapidement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className={`${theme === "dark" ? "bg-[#25283D] border-[#333]" : ""}`}>
              <CardContent className="flex flex-col items-center text-center p-6">
                <Mail className={`w-12 h-12 mb-4 ${theme === "dark" ? "text-loommify-secondary" : "text-loommify-primary"}`} />
                <h3 className="font-medium text-lg mb-2">Email</h3>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-3`}>
                  Envoyez-nous un email à tout moment
                </p>
                <a 
                  href="mailto:contact@loommify.com" 
                  className={`font-medium ${theme === "dark" ? "text-loommify-secondary hover:text-loommify-secondary/80" : "text-loommify-primary hover:text-loommify-primary/80"}`}
                >
                  contact@loommify.com
                </a>
              </CardContent>
            </Card>

            <Card className={`${theme === "dark" ? "bg-[#25283D] border-[#333]" : ""}`}>
              <CardContent className="flex flex-col items-center text-center p-6">
                <Phone className={`w-12 h-12 mb-4 ${theme === "dark" ? "text-loommify-secondary" : "text-loommify-primary"}`} />
                <h3 className="font-medium text-lg mb-2">Téléphone</h3>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-3`}>
                  Appelez-nous du Lundi au Vendredi
                </p>
                <a 
                  href="tel:+33123456789" 
                  className={`font-medium ${theme === "dark" ? "text-loommify-secondary hover:text-loommify-secondary/80" : "text-loommify-primary hover:text-loommify-primary/80"}`}
                >
                  +33 1 23 45 67 89
                </a>
              </CardContent>
            </Card>

            <Card className={`${theme === "dark" ? "bg-[#25283D] border-[#333]" : ""}`}>
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className={`w-12 h-12 mb-4 flex items-center justify-center ${theme === "dark" ? "text-loommify-secondary" : "text-loommify-primary"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path></svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Réseaux sociaux</h3>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-4`}>
                  Suivez-nous sur les réseaux sociaux
                </p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-br from-loommify-primary/10 to-loommify-secondary/10 rounded-xl p-6 md:p-10">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              
              {submitSuccess && (
                <Alert className={`mb-6 ${theme === "dark" ? "bg-loommify-secondary/20 text-white border-loommify-secondary/50" : "bg-loommify-secondary/20 border-loommify-secondary/50"}`}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={theme === "dark" ? "text-white" : ""}>Nom complet</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Entrez votre nom complet" 
                              className={theme === "dark" ? "bg-[#25283D] text-white border-[#444]" : ""} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={theme === "dark" ? "text-white" : ""}>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Entrez votre adresse email" 
                              className={theme === "dark" ? "bg-[#25283D] text-white border-[#444]" : ""} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={theme === "dark" ? "text-white" : ""}>Sujet</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Entrez le sujet de votre message" 
                            className={theme === "dark" ? "bg-[#25283D] text-white border-[#444]" : ""} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={theme === "dark" ? "text-white" : ""}>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Entrez votre message ici..." 
                            className={`min-h-[150px] ${theme === "dark" ? "bg-[#25283D] text-white border-[#444]" : ""}`} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className={`w-full md:w-auto px-8 ${theme === "dark" ? "bg-[#8F3985] hover:bg-[#A6509D]" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
