
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, Search, User as UserIcon, Building } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";
import { useCreateConversation } from "@/hooks/useCreateConversation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (conversationId: string) => void;
}

export const NewConversationModal = ({ isOpen, onClose, onSuccess }: NewConversationModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  const { projects, isLoading: isProjectsLoading } = useProjects();
  const { users, isLoading: isUsersLoading } = useUsers(searchQuery);
  const { createConversation, isLoading: isCreating } = useCreateConversation();
  const { toast } = useToast();
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedProjectId(undefined);
      setSelectedUserId(null);
    }
  }, [isOpen]);
  
  const handleCreateConversation = async () => {
    if (!selectedUserId) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner un destinataire.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const conversationId = await createConversation(selectedUserId, selectedProjectId);
      onSuccess(conversationId);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la conversation. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouvelle conversation</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="project">Projet (optionnel)</Label>
            <Select 
              value={selectedProjectId} 
              onValueChange={(value) => setSelectedProjectId(value)}
            >
              <SelectTrigger id="project">
                <SelectValue placeholder="Sélectionner un projet (optionnel)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun projet</SelectItem>
                {isProjectsLoading ? (
                  <div className="flex items-center justify-center p-2">
                    <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
                  </div>
                ) : (
                  projects?.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinataire</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="recipient"
                placeholder="Rechercher un freelance ou une entreprise..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <ScrollArea className="h-[200px] border rounded-md">
              {isUsersLoading ? (
                <div className="flex items-center justify-center p-4">
                  <LoaderCircle className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : users && users.length > 0 ? (
                <div className="p-1">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className={cn(
                        "flex items-center p-3 rounded-md cursor-pointer hover:bg-accent transition-colors",
                        selectedUserId === user.id && "bg-accent"
                      )}
                      onClick={() => setSelectedUserId(user.id)}
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-[#8F3985] text-white">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{user.name}</h3>
                          <Badge variant="outline" className="ml-2">
                            {user.role === 'freelancer' ? (
                              <><UserIcon className="mr-1 h-3 w-3" /> Freelance</>
                            ) : (
                              <><Building className="mr-1 h-3 w-3" /> Entreprise</>
                            )}
                          </Badge>
                        </div>
                        {user.title && (
                          <p className="text-sm text-muted-foreground">{user.title}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-4 text-center text-muted-foreground">
                  <p>Aucun utilisateur trouvé.</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleCreateConversation} disabled={!selectedUserId || isCreating}>
            {isCreating && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Démarrer la conversation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
