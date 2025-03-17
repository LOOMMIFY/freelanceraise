
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { 
  User, 
  Settings, 
  MessageSquare, 
  Bell, 
  FileText, 
  Home 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const location = useLocation();
  const { user } = useAuth();

  // Dashboard navigation links
  const navItems = [
    { 
      label: 'Tableau de bord', 
      path: '/dashboard', 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      label: 'Messages', 
      path: '/messages', 
      icon: <MessageSquare className="w-5 h-5" /> 
    },
    { 
      label: 'Notifications', 
      path: '/notifications', 
      icon: <Bell className="w-5 h-5" /> 
    },
    { 
      label: 'Projets', 
      path: '/projects', 
      icon: <FileText className="w-5 h-5" /> 
    },
    { 
      label: 'Paramètres', 
      path: '/parametres', 
      icon: <Settings className="w-5 h-5" /> 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row pt-20">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#8F3985] flex items-center justify-center text-white">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user?.name} 
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0) || '?'
                  )}
                </div>
                <Badge className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-[#8F3985]">
                  {user?.role === 'freelancer' ? '👨‍💻' : '🏢'}
                </Badge>
              </div>
              <div>
                <h3 className="font-medium">{user?.name || 'Utilisateur'}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.role === 'freelancer' ? 'Freelance' : 'Entreprise'}
                </p>
              </div>
            </div>
          </div>
          
          <nav className="px-4 pb-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-[#8F3985]/10 text-[#8F3985] font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className={`mr-3 ${
                      location.pathname === item.path
                        ? 'text-[#8F3985]'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6 md:p-8">
          {title && (
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h1>
          )}
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};
