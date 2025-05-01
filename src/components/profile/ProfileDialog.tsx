import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useAuth } from "@/context/auth-context";
import { useStore } from "@/context/store-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, X } from "lucide-react";
import { StoreMembers } from "./StoreMembers";
import { EmojiPicker } from "./EmojiPicker";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  const { currentUser, setCurrentUser } = useAuth();
  const { stores, regions } = useStore();
  const [newUsername, setNewUsername] = useState(currentUser?.username || "");
  const [emoji, setEmoji] = useState("😊");
  const [isEditingStore, setIsEditingStore] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeRegion, setStoreRegion] = useState("");
  
  const userStore = stores.find(store => store.id === currentUser?.storeId);

  const handleUsernameChange = () => {
    if (currentUser && newUsername) {
      setCurrentUser({
        ...currentUser,
        username: newUsername
      });
    }
  };

  const handleStoreUpdate = () => {
    // This will be implemented when backend is connected via Supabase
    console.log('Update store:', { name: storeName, region: storeRegion });
    setIsEditingStore(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="pr-8">Profile Settings</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        
        <ScrollArea className="flex-1">
          <div className="space-y-6 py-4 px-6">
            <div className="flex flex-col items-center gap-4 pt-2">
              <EmojiPicker 
                currentEmoji={emoji}
                onEmojiSelect={setEmoji}
              />
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Username</h4>
              <div className="flex items-center gap-2">
                <Input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                />
                <Button onClick={handleUsernameChange}>Save</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Role</h4>
              <p className="text-sm text-muted-foreground">
                {currentUser?.isOwner ? "Store Owner" : "Employee"}
              </p>
            </div>

            {userStore && (
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Store Details</h4>
                  {currentUser?.isOwner && !isEditingStore && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setIsEditingStore(true);
                        setStoreName(userStore.name);
                        setStoreRegion(userStore.region);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {isEditingStore && currentUser?.isOwner ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm">Store Name</label>
                      <Input
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="Enter store name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Region</label>
                      <Select value={storeRegion} onValueChange={setStoreRegion}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region.id} value={region.name}>
                              {region.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsEditingStore(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleStoreUpdate}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Store:</span> {userStore.name}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Region:</span> {userStore.region}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">Store Code</h4>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    {userStore.password}
                  </p>
                </div>
              </div>
            )}

            {currentUser?.isOwner && (
              <div className="pb-4">
                <StoreMembers />
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
