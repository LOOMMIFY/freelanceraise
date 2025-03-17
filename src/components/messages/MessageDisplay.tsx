
import { useState, useRef, useEffect } from "react";
import { User } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Conversation } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessages";
import { Loader2, Send, Paperclip, File, Image, Briefcase, Check, CheckCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface MessageDisplayProps {
  conversation: Conversation;
  currentUser: User | null;
}

export const MessageDisplay = ({ conversation, currentUser }: MessageDisplayProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const { messages, isLoading, error, sendMessage, sendAttachment } = useMessages(conversation.id);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    sendAttachment(file);
    
    // Reset the input
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
    setIsAttachmentMenuOpen(false);
  };

  const renderMessageStatus = (isRead: boolean, isSent: boolean) => {
    if (!isSent) return null;
    
    return isRead ? (
      <CheckCheck className="h-4 w-4 text-primary" />
    ) : (
      <Check className="h-4 w-4 text-muted-foreground" />
    );
  };

  // Group messages by date
  const groupedMessages: { [date: string]: typeof messages } = {};
  messages?.forEach((message) => {
    const date = format(new Date(message.timestamp), "PPPP", { locale: fr });
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <>
      {/* Conversation header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={conversation.recipient.avatar} alt={conversation.recipient.name} />
            <AvatarFallback className="bg-[#8F3985] text-white">
              {conversation.recipient.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{conversation.recipient.name}</h3>
            {conversation.project && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Briefcase className="mr-1 h-3.5 w-3.5" />
                <span>{conversation.project.title}</span>
              </div>
            )}
          </div>
        </div>
        
        {conversation.project && (
          <Button variant="outline" size="sm" asChild>
            <a href={`/projects/${conversation.project.id}`}>Voir le projet</a>
          </Button>
        )}
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">
            Une erreur est survenue lors du chargement des messages.
          </div>
        ) : messages && messages.length > 0 ? (
          <>
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date} className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground px-2">{date}</span>
                  <Separator className="flex-1" />
                </div>
                
                {dateMessages.map((message) => {
                  const isCurrentUser = message.senderId === currentUser?.id;
                  
                  return (
                    <div 
                      key={message.id} 
                      className={cn(
                        "flex max-w-[80%]",
                        isCurrentUser ? "ml-auto" : "mr-auto"
                      )}
                    >
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src={conversation.recipient.avatar} alt={conversation.recipient.name} />
                          <AvatarFallback className="bg-[#8F3985] text-white text-xs">
                            {conversation.recipient.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div>
                        <div 
                          className={cn(
                            "rounded-lg p-3",
                            isCurrentUser 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted"
                          )}
                        >
                          {message.attachmentUrl && (
                            <div className="mb-2">
                              {message.attachmentType === "image" ? (
                                <img 
                                  src={message.attachmentUrl} 
                                  alt="Attached image" 
                                  className="rounded max-w-full h-auto max-h-64 cursor-pointer"
                                  onClick={() => window.open(message.attachmentUrl)}
                                />
                              ) : (
                                <div 
                                  className="flex items-center p-2 bg-background rounded cursor-pointer"
                                  onClick={() => window.open(message.attachmentUrl)}
                                >
                                  <File className="h-5 w-5 mr-2" />
                                  <span className="text-sm truncate">{message.attachmentName}</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <p className="whitespace-pre-wrap break-words">{message.content}</p>
                        </div>
                        
                        <div className={`flex items-center gap-1 mt-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(message.timestamp), "HH:mm")}
                          </span>
                          {isCurrentUser && renderMessageStatus(message.isRead, message.isSent)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            <p>Démarrez la conversation avec {conversation.recipient.name}.</p>
          </div>
        )}
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <div className="relative">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            
            {isAttachmentMenuOpen && (
              <div className="absolute bottom-full left-0 mb-1 bg-background border rounded-md shadow-md p-1 flex flex-col">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex justify-start"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <File className="h-4 w-4 mr-2" /> Fichier
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex justify-start"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Image className="h-4 w-4 mr-2" /> Image
                </Button>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.zip"
                />
                <input 
                  type="file" 
                  ref={imageInputRef} 
                  className="hidden" 
                  onChange={handleFileUpload}
                  accept="image/*"
                />
              </div>
            )}
          </div>
          
          <Textarea
            placeholder="Écrivez votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none min-h-[80px]"
          />
          
          <Button 
            type="button" 
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
};
