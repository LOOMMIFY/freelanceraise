
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
            avatar: '',
            role: 'freelancer',
            title: 'Développeuse Full-Stack',
          },
          {
            id: 'f2',
            name: 'Thomas Dubois',
            avatar: '',
            role: 'freelancer',
            title: 'Designer UX/UI',
          },
          {
            id: 'f3',
            name: 'Julie Lefebvre',
            avatar: '',
            role: 'freelancer',
            title: 'Rédactrice Web',
          },
        ];
        
        const mockBusinesses: UserProfile[] = [
          {
            id: 'b1',
            name: 'TechCorp',
            avatar: '',
            role: 'business',
          },
          {
            id: 'b2',
            name: 'DesignStudio',
            avatar: '',
            role: 'business',
          },
          {
            id: 'b3',
            name: 'MarketingPro',
            avatar: '',
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
