
import { useAuth } from "@/context/auth-context";
import { useStore } from "@/context/store-context";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash, User, UserCheck } from "lucide-react";

export function StoreMembers() {
  const { stores } = useStore();
  const { currentUser } = useAuth();
  
  if (!currentUser?.isOwner || !currentUser?.storeId) {
    return null;
  }
  
  const userStore = stores.find(store => store.id === currentUser.storeId);
  
  const handleRemoveUser = (userId: string) => {
    // This will be implemented when backend is connected via Supabase
    console.log('Remove user:', userId);
  };

  const handleApproveUser = (userId: string) => {
    // This will be implemented when backend is connected via Supabase
    console.log('Approve user:', userId);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium">Pending Approvals</h4>
        <ScrollArea className="h-[100px] rounded-md border p-4">
          <div className="space-y-4">
            {/* This will be populated with actual pending members when backend is connected */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Pending Employee</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="default"
                  size="sm"
                  onClick={() => handleApproveUser("pending-id")}
                >
                  <UserCheck className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleRemoveUser("pending-id")}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Store Members</h4>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <div className="space-y-4">
            {/* This will be populated with actual approved members when backend is connected */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Example Employee</span>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleRemoveUser("example-id")}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
