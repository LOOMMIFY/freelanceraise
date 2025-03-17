
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Form schema for freelancer
const freelancerFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Email invalide." }),
  jobTitle: z.string().min(2, { message: "Le titre du poste doit contenir au moins 2 caractères." }),
  location: z.string().min(2, { message: "La localisation doit contenir au moins 2 caractères." }),
  bio: z.string().min(10, { message: "La bio doit contenir au moins 10 caractères." }),
  hourlyRate: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Le taux horaire doit être un nombre.",
  }),
  skills: z.string()
});

// Form schema for business
const businessFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Email invalide." }),
  industry: z.string().min(2, { message: "L'industrie doit contenir au moins 2 caractères." }),
  location: z.string().min(2, { message: "La localisation doit contenir au moins 2 caractères." }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères." }),
  website: z.string().url({ message: "URL invalide." }).optional().or(z.literal('')),
  employeeCount: z.string()
});

const DashboardProfileEdit = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isFreelancer = user?.role === 'freelancer';
  
  // Use the appropriate schema based on user role
  const formSchema = isFreelancer ? freelancerFormSchema : businessFormSchema;
  
  // Define default values for the form
  const defaultValues = isFreelancer ? {
    name: user?.name || "",
    email: user?.email || "",
    jobTitle: "Développeur Full-Stack",
    location: "Paris, France",
    bio: "Développeur full-stack avec 5 ans d'expérience, spécialisé dans les applications React et Node.js. Passionné par la création d'interfaces utilisateurs intuitives et d'APIs performantes.",
    hourlyRate: "60",
    skills: "React, TypeScript, Node.js, Tailwind CSS, UI/UX, API Integration"
  } : {
    name: user?.name || "",
    email: user?.email || "",
    industry: "Technologie",
    location: "Paris, France",
    description: "Notre entreprise est spécialisée dans le développement de solutions numériques innovantes pour améliorer l'expérience utilisateur et optimiser les processus métier.",
    website: "https://example.com",
    employeeCount: "10-50"
  };
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    
    // Show success toast
    toast({
      title: "Profil mis à jour",
      description: "Vos modifications ont été enregistrées avec succès.",
    });
    
    // In a real application, you would send this data to your API
  };
  
  return (
    <DashboardLayout title="Modifier mon profil">
      <Helmet>
        <title>Modifier mon profil | Loommify</title>
      </Helmet>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/profil">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à mon profil
            </Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Informations du profil</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="votre@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Localisation</FormLabel>
                        <FormControl>
                          <Input placeholder="Ville, Pays" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {isFreelancer ? (
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre du poste</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Développeur Web" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industrie</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Technologie, Marketing" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                
                {isFreelancer ? (
                  <>
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez votre expertise, votre expérience et vos compétences..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="hourlyRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Taux horaire (€)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Compétences</FormLabel>
                            <FormControl>
                              <Input placeholder="Séparées par des virgules" {...field} />
                            </FormControl>
                            <FormDescription>
                              Séparez vos compétences par des virgules
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description de l'entreprise</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez votre entreprise, ses activités et sa mission..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site web</FormLabel>
                            <FormControl>
                              <Input placeholder="https://votresite.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="employeeCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre d'employés</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 10-50" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" asChild>
                    <Link to="/dashboard/profil">Annuler</Link>
                  </Button>
                  <Button type="submit">Enregistrer les modifications</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfileEdit;
