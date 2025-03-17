
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

// Types
export interface Project {
  id: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  status: 'open' | 'in_progress' | 'completed';
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  
  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Mock data
        const mockProjects: Project[] = [
          {
            id: '101',
            title: 'Développement site e-commerce',
            description: 'Création d\'un site e-commerce complet pour une marque de vêtements.',
            budget: {
              min: 1000,
              max: 5000,
            },
            status: 'in_progress',
          },
          {
            id: '102',
            title: 'Application mobile',
            description: 'Développement d\'une application mobile pour iOS et Android.',
            budget: {
              min: 3000,
              max: 8000,
            },
            status: 'open',
          },
          {
            id: '103',
            title: 'Refonte de site web',
            description: 'Refonte complète d\'un site web existant avec nouvelle identité visuelle.',
            budget: {
              min: 2000,
              max: 4000,
            },
            status: 'completed',
          },
        ];
        
        setProjects(mockProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, [user]);
  
  return {
    projects,
    isLoading,
    error,
  };
}
