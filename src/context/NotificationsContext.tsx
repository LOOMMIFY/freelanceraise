
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  dismissNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};

const getDefaultNotifications = (role: "freelancer" | "business" | null): Notification[] => {
  const now = new Date();
  
  if (role === "freelancer") {
    return [
      {
        id: "1",
        title: "Bienvenue sur Loommify 🎉",
        description: "Découvrez comment trouver des offres et décrocher des missions dès aujourd'hui.",
        timestamp: now.toISOString(),
        read: false,
        link: "/how-it-works"
      },
      {
        id: "2",
        title: "Complétez votre profil ✍️",
        description: "Un profil complet attire 3x plus de clients potentiels.",
        timestamp: new Date(now.getTime() - 5 * 60000).toISOString(),
        read: false,
        link: "/dashboard"
      },
      {
        id: "3",
        title: "Nouvelle offre disponible 🚀",
        description: "Une entreprise a posté un projet correspondant à votre profil.",
        timestamp: new Date(now.getTime() - 20 * 60000).toISOString(),
        read: false,
        link: "/projects"
      },
      {
        id: "4",
        title: "Gagnez en visibilité 🌟",
        description: "Soyez actif pour apparaître parmi les freelances les plus consultés.",
        timestamp: new Date(now.getTime() - 60 * 60000).toISOString(),
        read: false
      }
    ];
  } else if (role === "business") {
    return [
      {
        id: "1",
        title: "Bienvenue sur Loommify 🎉",
        description: "Trouvez des freelances qualifiés pour vos projets en quelques clics.",
        timestamp: now.toISOString(),
        read: false,
        link: "/how-it-works"
      },
      {
        id: "2",
        title: "Postez votre premier projet 📢",
        description: "Décrivez votre besoin et recevez des propositions en moins de 24h.",
        timestamp: new Date(now.getTime() - 5 * 60000).toISOString(),
        read: false,
        link: "/dashboard/post-project"
      },
      {
        id: "3",
        title: "Boostez votre visibilité 🚀",
        description: "Un projet bien détaillé attire plus de freelances.",
        timestamp: new Date(now.getTime() - 20 * 60000).toISOString(),
        read: false
      },
      {
        id: "4",
        title: "Utilisez la messagerie intégrée 📩",
        description: "Discutez avec les freelances directement depuis Loommify.",
        timestamp: new Date(now.getTime() - 60 * 60000).toISOString(),
        read: false,
        link: "/messages"
      }
    ];
  }
  
  return [];
};

const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "À l'instant";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  }
};

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Initialize notifications when user logs in
  useEffect(() => {
    if (user) {
      // In a real app, fetch notifications from API
      // For now, we'll use localStorage to persist notifications
      const savedNotifications = localStorage.getItem(`notifications_${user.id}`);
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      } else {
        // Set default notifications for new users
        const defaultNotifications = getDefaultNotifications(user.role);
        setNotifications(defaultNotifications);
        localStorage.setItem(`notifications_${user.id}`, JSON.stringify(defaultNotifications));
      }
    } else {
      setNotifications([]);
    }
  }, [user]);
  
  // Update unread count whenever notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (user && notifications.length > 0) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);
  
  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  return (
    <NotificationsContext.Provider 
      value={{ 
        notifications, 
        unreadCount, 
        dismissNotification, 
        markAsRead, 
        markAllAsRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export { formatTimeAgo };
