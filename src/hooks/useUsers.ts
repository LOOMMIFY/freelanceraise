
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

// Types
export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  role: 'freelancer' | 'business';
  title?: string;
}

export function useUsers(searchQuery: string) {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user: currentUser } = useAuth();
  
  // Fetch users based on search query
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockFreelancers: UserProfile[] = [
          {
            id: 'f1',
            name: 'Sophie Martin',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            role: 'freelancer',
            title: 'Développeuse Full-Stack',
          },
          {
            id: 'f2',
            name: 'Thomas Dubois',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            role: 'freelancer',
            title: 'Designer UX/UI',
          },
          {
            id: 'f3',
            name: 'Julie Lefebvre',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            role: 'freelancer',
            title: 'Rédactrice Web',
          },
        ];
        
        const mockBusinesses: UserProfile[] = [
          {
            id: 'b1',
            name: 'TechCorp',
            avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            role: 'business',
          },
          {
            id: 'b2',
            name: 'DesignStudio',
            avatar: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            role: 'business',
          },
          {
            id: 'b3',
            name: 'MarketingPro',
            avatar: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            role: 'business',
          },
        ];
        
        // Filter by role (don't show users of the same role as current user)
        let filteredUsers = currentUser?.role === 'freelancer'
          ? mockBusinesses
          : mockFreelancers;
        
        // Filter by search query
        if (searchQuery) {
          filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        setUsers(filteredUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, [searchQuery, currentUser]);
  
  return {
    users,
    isLoading,
    error,
  };
}
