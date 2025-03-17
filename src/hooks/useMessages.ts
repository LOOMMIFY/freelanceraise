
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Types
export interface Message {
  id: string;
  conversationId: string;
  content: string;
  senderId: string;
  timestamp: string;
  isRead: boolean;
  isSent: boolean;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'file';
  attachmentName?: string;
}

export function useMessages(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch messages for the conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockMessages: Message[] = [
          {
            id: '1',
            conversationId,
            content: 'Bonjour, je suis intéressé par votre profil pour notre projet de développement web.',
            senderId: user?.role === 'freelancer' ? 'b1' : 'f1',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            isRead: true,
            isSent: true,
          },
          {
            id: '2',
            conversationId,
            content: 'Bonjour, merci pour votre message. Je serais ravi d\'en savoir plus sur votre projet.',
            senderId: user?.id || '',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
            isRead: true,
            isSent: true,
          },
          {
            id: '3',
            conversationId,
            content: 'Parfait ! Notre projet concerne le développement d\'un site e-commerce pour notre nouvelle ligne de produits.',
            senderId: user?.role === 'freelancer' ? 'b1' : 'f1',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
            isRead: true,
            isSent: true,
          },
          {
            id: '4',
            conversationId,
            content: 'Voici nos maquettes préliminaires.',
            senderId: user?.role === 'freelancer' ? 'b1' : 'f1',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
            isRead: true,
            isSent: true,
            attachmentUrl: 'https://via.placeholder.com/500x300',
            attachmentType: 'image',
            attachmentName: 'maquette.jpg',
          },
          {
            id: '5',
            conversationId,
            content: 'Je viens de regarder vos maquettes et elles me semblent très intéressantes. Avez-vous un cahier des charges plus détaillé ?',
            senderId: user?.id || '',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            isRead: true,
            isSent: true,
          },
          {
            id: '6',
            conversationId,
            content: 'Bien sûr, voici le cahier des charges complet.',
            senderId: user?.role === 'freelancer' ? 'b1' : 'f1',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
            isRead: true,
            isSent: true,
            attachmentUrl: '#',
            attachmentType: 'file',
            attachmentName: 'cahier_des_charges.pdf',
          },
          {
            id: '7',
            conversationId,
            content: 'Merci ! Je vais l\'étudier et revenir vers vous avec des questions si nécessaire.',
            senderId: user?.id || '',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
            isRead: false,
            isSent: true,
          },
        ];
        
        setMessages(mockMessages);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les messages.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMessages();
    
    // In a real app, we would set up a WebSocket connection here
    
    return () => {
      // Clean up (e.g., disconnect WebSocket)
    };
  }, [conversationId, user, toast]);
  
  // Send a new message
  const sendMessage = async (content: string) => {
    if (!user || !conversationId) return;
    
    try {
      // Create a temporary message with pending status
      const tempId = `temp-${Date.now()}`;
      const newMessage: Message = {
        id: tempId,
        conversationId,
        content,
        senderId: user.id,
        timestamp: new Date().toISOString(),
        isRead: false,
        isSent: false,
      };
      
      // Add message to local state immediately
      setMessages(prevMessages => [...prevMessages, newMessage]);
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the message to sent status
      setMessages(prevMessages => 
        prevMessages.map(m => 
          m.id === tempId 
            ? { ...m, id: `${Date.now()}`, isSent: true } 
            : m
        )
      );
    } catch (err) {
      console.error('Error sending message:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message.',
        variant: 'destructive',
      });
      
      // Remove the failed message
      setMessages(prevMessages => prevMessages.filter(m => m.id !== `temp-${Date.now()}`));
    }
  };
  
  // Send an attachment
  const sendAttachment = async (file: File) => {
    if (!user || !conversationId) return;
    
    try {
      // Determine attachment type
      const isImage = file.type.startsWith('image/');
      
      // Create a temporary message with pending status
      const tempId = `temp-${Date.now()}`;
      const newMessage: Message = {
        id: tempId,
        conversationId,
        content: '',
        senderId: user.id,
        timestamp: new Date().toISOString(),
        isRead: false,
        isSent: false,
        attachmentUrl: URL.createObjectURL(file),
        attachmentType: isImage ? 'image' : 'file',
        attachmentName: file.name,
      };
      
      // Add message to local state immediately
      setMessages(prevMessages => [...prevMessages, newMessage]);
      
      // In a real app, this would be an API call to upload the file
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the message to sent status
      setMessages(prevMessages => 
        prevMessages.map(m => 
          m.id === tempId 
            ? { ...m, id: `${Date.now()}`, isSent: true } 
            : m
        )
      );
      
      toast({
        title: 'Fichier envoyé',
        description: `${file.name} a été envoyé avec succès.`,
      });
    } catch (err) {
      console.error('Error sending attachment:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le fichier.',
        variant: 'destructive',
      });
      
      // Remove the failed message
      setMessages(prevMessages => prevMessages.filter(m => m.id !== `temp-${Date.now()}`));
    }
  };
  
  return {
    messages,
    isLoading,
    error,
    sendMessage,
    sendAttachment,
  };
}
