
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ConversationList } from "@/components/messages/ConversationList";
import { MessageDisplay } from "@/components/messages/MessageDisplay";
import { NewConversationModal } from "@/components/messages/NewConversationModal";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Search } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";

const Messages = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { conversations, activeConversation, isLoading, error } = useConversations(selectedConversationId);

  // Handle conversation selection
  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
  };

  // Handle new conversation creation
  const handleCreateNewConversation = () => {
    setIsNewConversationOpen(true);
  };

  // Handle new conversation success
  const handleNewConversationSuccess = (conversationId: string) => {
    setIsNewConversationOpen(false);
    setSelectedConversationId(conversationId);
    toast({
      title: "Nouvelle conversation créée",
      description: "Votre conversation a été créée avec succès.",
    });
  };

  // Filter conversations by search query
  const filteredConversations = conversations?.filter(
    (conversation) =>
      conversation.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conversation.project && conversation.project.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Messages</h1>
            <Button onClick={handleCreateNewConversation}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau message
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[600px]">
            {/* Left side - Conversation list */}
            <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg border overflow-hidden">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Rechercher une conversation..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <div className="px-4 pt-2">
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">Tous</TabsTrigger>
                    <TabsTrigger value="unread" className="flex-1">Non lus</TabsTrigger>
                    <TabsTrigger value="projects" className="flex-1">Projets</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : error ? (
                    <div className="p-4 text-center text-red-500">
                      Une erreur est survenue lors du chargement des conversations.
                    </div>
                  ) : filteredConversations && filteredConversations.length > 0 ? (
                    <ConversationList 
                      conversations={filteredConversations} 
                      selectedId={selectedConversationId} 
                      onSelect={handleSelectConversation} 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                      <p className="mb-4">Vous n'avez pas encore de conversations.</p>
                      <Button onClick={handleCreateNewConversation} variant="outline">
                        Démarrer une nouvelle conversation
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="unread" className="mt-0">
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredConversations?.filter(conv => conv.unreadCount > 0).length ? (
                    <ConversationList 
                      conversations={filteredConversations.filter(conv => conv.unreadCount > 0)} 
                      selectedId={selectedConversationId} 
                      onSelect={handleSelectConversation} 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                      <p>Vous n'avez pas de messages non lus.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="projects" className="mt-0">
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredConversations?.filter(conv => conv.project).length ? (
                    <ConversationList 
                      conversations={filteredConversations.filter(conv => conv.project)} 
                      selectedId={selectedConversationId} 
                      onSelect={handleSelectConversation} 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                      <p>Vous n'avez pas de conversations liées à des projets.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Right side - Message display */}
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg border overflow-hidden flex flex-col">
              {selectedConversationId && activeConversation ? (
                <MessageDisplay 
                  conversation={activeConversation}
                  currentUser={user}
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                  <p className="mb-4">Sélectionnez une conversation ou commencez-en une nouvelle.</p>
                  <Button onClick={handleCreateNewConversation} variant="outline">
                    Démarrer une nouvelle conversation
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* New conversation modal */}
      <NewConversationModal 
        isOpen={isNewConversationOpen} 
        onClose={() => setIsNewConversationOpen(false)}
        onSuccess={handleNewConversationSuccess}
      />
    </div>
  );
};

export default Messages;
