
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Types
export interface Conversation {
  id: string;
  recipient: {
    id: string;
    name: string;
    avatar: string;
    role: 'freelancer' | 'business';
  };
  project?: {
    id: string;
    title: string;
  };
  lastMessagePreview: string;
  lastMessageTime: string;
  unreadCount: number;
}

export function useConversations(selectedId: string | null) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch conversations when component mounts
  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockConversations: Conversation[] = user?.role === 'freelancer' ? [
          {
            id: '1',
            recipient: {
              id: 'b1',
              name: 'TechCorp',
              avatar: '',
              role: 'business',
            },
            project: {
              id: '101',
              title: 'Développement site e-commerce',
            },
            lastMessagePreview: 'Bonjour, je suis intéressé par votre profil pour notre projet.',
            lastMessageTime: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
            unreadCount: 2,
          },
          {
            id: '2',
            recipient: {
              id: 'b2',
              name: 'DesignStudio',
              avatar: '',
              role: 'business',
            },
            lastMessagePreview: 'Merci pour vos services, c\'était un plaisir de travailler avec vous.',
            lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
            unreadCount: 0,
          },
        ] : [
          {
            id: '1',
            recipient: {
              id: 'f1',
              name: 'Sophie Martin',
              avatar: '',
              role: 'freelancer',
            },
            project: {
              id: '101',
              title: 'Développement site e-commerce',
            },
            lastMessagePreview: 'J\'ai terminé les maquettes comme demandé.',
            lastMessageTime: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
            unreadCount: 1,
          },
          {
            id: '2',
            recipient: {
              id: 'f2',
              name: 'Thomas Dubois',
              avatar: '',
              role: 'freelancer',
            },
            project: {
              id: '102',
              title: 'Application mobile',
            },
            lastMessagePreview: 'Quand serait-il possible de discuter des détails du projet?',
            lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            unreadCount: 0,
          },
        ];
        
        setConversations(mockConversations);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Failed to load conversations');
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les conversations.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConversations();
    
    // In a real app, we would set up a WebSocket connection here
  }, [user, toast]);
  
  // Update active conversation when selectedId changes
  useEffect(() => {
    if (selectedId) {
      const conversation = conversations.find(c => c.id === selectedId);
      
      if (conversation) {
        setActiveConversation(conversation);
        
        // Mark conversation as read
        setConversations(prevConversations => 
          prevConversations.map(c => 
            c.id === selectedId ? { ...c, unreadCount: 0 } : c
          )
        );
      }
    } else {
      setActiveConversation(null);
    }
  }, [selectedId, conversations]);
  
  return {
    conversations,
    activeConversation,
    isLoading,
    error,
  };
}
