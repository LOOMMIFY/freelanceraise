
import React from "react";
import { Link } from "react-router-dom";
import { X, BellOff } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications, formatTimeAgo } from "@/context/NotificationsContext";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationsPopoverProps {
  children: React.ReactNode;
}

export const NotificationsPopover = ({ children }: NotificationsPopoverProps) => {
  const { notifications, unreadCount, dismissNotification, markAsRead, markAllAsRead } = useNotifications();
  
  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    return !!link; // Return true to let the navigation happen if there's a link
  };
  
  const handleDismiss = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    dismissNotification(id);
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {children}
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 px-1.5 min-w-[1.2rem] h-5 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-[400px] p-0 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Tout marquer comme lu
            </Button>
          )}
        </div>
        
        <ScrollArea className="flex-1 max-h-[320px]">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <Link
                  key={notification.id}
                  to={notification.link || "#"}
                  onClick={() => handleNotificationClick(notification.id, notification.link)}
                  className="block"
                >
                  <div 
                    className={`p-3 hover:bg-accent transition-colors relative ${
                      !notification.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3 pr-6">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium line-clamp-1">
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDismiss(e, notification.id)}
                      className="absolute top-2 right-2 p-1 rounded-full hover:bg-accent-foreground/10 text-muted-foreground"
                      aria-label="Fermer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center text-muted-foreground">
              <BellOff className="mb-2 h-10 w-10 text-muted-foreground/50" />
              <p>Vous n'avez aucune notification</p>
            </div>
          )}
        </ScrollArea>
        
        <div className="p-3 border-t text-center">
          <Button variant="ghost" size="sm" asChild className="w-full">
            <Link to="/notifications">Voir toutes les notifications</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
