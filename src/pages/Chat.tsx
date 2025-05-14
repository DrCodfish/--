import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useAuth } from "@/context/auth-context";
<<<<<<< HEAD
import { useStore } from "@/context/store-context";
=======
>>>>>>> 060614a (readded remote)
import { useChat } from "@/context/chat-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Chat = () => {
  const { currentUser } = useAuth();
<<<<<<< HEAD
  const { stores } = useStore();
  const { chatMessages, addChatMessage } = useChat();
  const [message, setMessage] = useState("");
  const [showOwnerOnlyChat, setShowOwnerOnlyChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const isOwner = currentUser?.isOwner || false;
  
  const userStore = currentUser?.storeId 
    ? stores.find(s => s.id === currentUser.storeId)
    : null;
  
  const filteredMessages = chatMessages.filter(msg => {
    const isCurrentStore = msg.storeId === currentUser?.storeId;
    
=======
  const { chatMessages, fetchChatMessages, addChatMessage } = useChat();
  const [message, setMessage] = useState("");
  const [showOwnerOnlyChat, setShowOwnerOnlyChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userStore = currentUser?.storeId;

  const filteredMessages = chatMessages.filter((msg) => {
    const isCurrentStore = msg.storeId === userStore;

>>>>>>> 060614a (readded remote)
    if (showOwnerOnlyChat) {
      return isCurrentStore && msg.isOwnerOnly;
    } else {
      return isCurrentStore && !msg.isOwnerOnly;
    }
  });
<<<<<<< HEAD
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !userStore || !message.trim()) return;
    
    addChatMessage({
      content: message.trim(),
      authorId: currentUser.id,
      authorName: currentUser.username,
      storeId: userStore.id,
      isOwnerOnly: showOwnerOnlyChat
    });
    
    setMessage("");
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);
  
=======

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || !userStore || !message.trim()) {
      if (!userStore) {
        console.error('Message send aborted: userStore is null. Please ensure the user is associated with a store.');
      }
      console.warn('Message send aborted. Missing required data:', {
        currentUser,
        userStore,
        message,
      });
      return;
    }

    const result = await addChatMessage({
      content: message.trim(),
      authorId: currentUser.id,
      authorName: currentUser.username,
      storeId: userStore,
      isOwnerOnly: showOwnerOnlyChat,
    });

    if (result) {
      setMessage("");
    } else {
      console.error('Failed to send message');
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

  if (!userStore) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">You are not associated with a store. Please contact support.</p>
      </div>
    );
  }

>>>>>>> 060614a (readded remote)
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Chat</h1>
<<<<<<< HEAD
        
        {isOwner && (
=======

        {currentUser?.isOwner && (
>>>>>>> 060614a (readded remote)
          <div className="flex items-center space-x-2">
            <Switch
              id="owner-only"
              checked={showOwnerOnlyChat}
              onCheckedChange={setShowOwnerOnlyChat}
            />
            <Label htmlFor="owner-only">
              {showOwnerOnlyChat ? "Owner-only Chat" : "Store Chat"}
            </Label>
          </div>
        )}
      </div>
<<<<<<< HEAD
      
=======

>>>>>>> 060614a (readded remote)
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        <div className="flex-1 overflow-y-auto border border-black dark:border-white rounded-t-md p-4 mb-0">
          {filteredMessages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">
<<<<<<< HEAD
                {showOwnerOnlyChat 
                  ? "No messages in owner-only chat yet" 
=======
                {showOwnerOnlyChat
                  ? "No messages in owner-only chat yet"
>>>>>>> 060614a (readded remote)
                  : "No messages yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
<<<<<<< HEAD
              {filteredMessages.map(msg => {
                const isOwnMessage = msg.authorId === currentUser?.id;
                
                return (
                  <div 
                    key={msg.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      max-w-[80%] px-4 py-2 rounded-lg
                      ${isOwnMessage 
                        ? 'bg-round-blue text-white' 
                        : 'bg-secondary/50'
                      }
                    `}>
                      <div className="text-xs mb-1">
                        {!isOwnMessage && <span className="font-semibold">{msg.authorName}</span>}
                        <span className="text-xs ml-2 opacity-70">
                          {new Date(msg.date).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </span>
                      </div>
                      <p>{msg.content}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <form 
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 p-4 border border-t-0 border-black dark:border-white rounded-b-md"
        >
          <Input
            placeholder={`Type a message in ${showOwnerOnlyChat ? 'owner-only chat' : 'store chat'}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow"
          />
          <Button 
            type="submit" 
            className="bg-round-blue hover:bg-blue-600"
            disabled={!message.trim()}
          >
            Send
          </Button>
=======
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.authorId === currentUser?.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.authorId === currentUser?.id
                        ? "bg-round-blue text-white"
                        : "bg-secondary/50"
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <form onSubmit={handleSendMessage} className="mt-4">
          <div className="flex items-center space-x-4">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <Button type="submit">Send</Button>
          </div>
>>>>>>> 060614a (readded remote)
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
