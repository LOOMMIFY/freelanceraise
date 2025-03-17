
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Building, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Conversation } from "@/hooks/useConversations";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const ConversationList = ({ conversations, selectedId, onSelect }: ConversationListProps) => {
  return (
    <div className="divide-y overflow-auto max-h-[500px]">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={cn(
            "p-4 hover:bg-accent cursor-pointer transition-colors",
            selectedId === conversation.id && "bg-accent"
          )}
          onClick={() => onSelect(conversation.id)}
        >
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src={conversation.recipient.avatar} alt={conversation.recipient.name} />
              <AvatarFallback className="bg-[#8F3985] text-white">
                {conversation.recipient.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="font-medium truncate">{conversation.recipient.name}</h3>
                  {conversation.recipient.role === "freelancer" ? (
                    <User className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Building className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(conversation.lastMessageTime), { addSuffix: true, locale: fr })}
                </span>
              </div>
              
              {conversation.project && (
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Briefcase className="mr-1 h-3.5 w-3.5" />
                  <span className="truncate">{conversation.project.title}</span>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mt-1 truncate">
                {conversation.lastMessagePreview}
              </p>
            </div>
            
            {conversation.unreadCount > 0 && (
              <Badge className="rounded-full px-2 min-w-[1.5rem] h-5 flex items-center justify-center bg-[#8F3985]">
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
