
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Bell, BellOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNotifications, formatTimeAgo } from "@/context/NotificationsContext";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { isAuthenticated } = useAuth();
  const { notifications, unreadCount, dismissNotification, markAsRead, markAllAsRead } = useNotifications();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Notifications</h1>
            
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead} className="gap-2">
                <Check className="h-4 w-4" />
                Tout marquer comme lu
              </Button>
            )}
          </div>
          
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={cn(
                    "relative overflow-hidden transition-all",
                    !notification.read ? "border-l-4 border-l-loommify-primary" : ""
                  )}
                >
                  <CardContent className="p-5">
                    <Link 
                      to={notification.link || "#"} 
                      className="block"
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="pr-10">
                        <div className="flex items-start">
                          {!notification.read && (
                            <span className="w-2 h-2 bg-loommify-primary rounded-full mt-2 mr-2"></span>
                          )}
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{notification.title}</h3>
                            <p className="text-muted-foreground">{notification.description}</p>
                            <p className="text-sm text-muted-foreground mt-2">{formatTimeAgo(notification.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-card rounded-lg border min-h-[400px] flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 bg-loommify-primary/10 rounded-full flex items-center justify-center mb-4">
                <BellOff className="h-8 w-8 text-loommify-primary" />
              </div>
              <h2 className="text-xl font-medium mb-2">Vous êtes à jour !</h2>
              <p className="text-muted-foreground text-center">
                Vous n'avez pas de nouvelles notifications.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper function for conditional classnames
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default Notifications;
