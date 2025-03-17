
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function useCreateConversation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  
  const createConversation = async (recipientId: string, projectId?: string) => {
    if (!user) {
      throw new Error("User must be authenticated to create a conversation");
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response
      const conversationId = `conv-${Date.now()}`;
      
      return conversationId;
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError('Failed to create conversation');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    createConversation,
    isLoading,
    error,
  };
}
