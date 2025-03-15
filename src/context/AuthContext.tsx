
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user types
export type UserRole = "freelancer" | "business" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  setSelectedRole: (role: UserRole) => void;
  selectedRole: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // In a real app, you would check localStorage or make an API call
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Mock login function (would connect to your actual auth API)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API in production
      console.log(`Login attempt with ${email} and password`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login - replace with actual API response
      const mockUser: User = {
        id: "user-123",
        name: email.split('@')[0],
        email,
        role: selectedRole || "freelancer", // Use selected role or default to freelancer
      };
      
      // Save user to state and localStorage
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("La connexion a échoué. Veuillez vérifier vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API in production
      console.log("Signup attempt with data:", userData, "and password");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const newUser: User = {
        id: "user-" + Date.now(),
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || selectedRole || "freelancer",
        avatar: userData.avatar,
      };
      
      // Save user to state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("L'inscription a échoué. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    selectedRole,
    setSelectedRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
