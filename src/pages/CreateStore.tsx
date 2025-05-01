
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TopNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useStore } from "@/context/store-context";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const CreateStore = () => {
  const location = useLocation();
  const ownerCredentials = location.state as { username: string, password: string };
  
  const { register } = useAuth();
  const { regions, addRegion, addStore } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState("");
  const [regionId, setRegionId] = useState("");
  const [newRegionName, setNewRegionName] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    if (!ownerCredentials?.username || !ownerCredentials?.password) {
      navigate("/register");
    }
  }, [ownerCredentials, navigate]);
  
  const generateStorePassword = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    return `store-${randomString}`;
  };
  
  const handleAddNewRegion = () => {
    if (newRegionName.trim()) {
      const newRegion = addRegion(newRegionName.trim());
      setRegionId(newRegion.id);
      setNewRegionName("");
      toast({
        title: "Region added",
        description: `${newRegion.name} has been added as a new region.`,
      });
    }
  };
  
  const handleCreateStore = () => {
    if (!storeName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a store name",
        variant: "destructive",
      });
      return;
    }
    
    if (!regionId) {
      toast({
        title: "Error",
        description: "Please select or create a region",
        variant: "destructive",
      });
      return;
    }
    
    const selectedRegion = regions.find(r => r.id === regionId);
    if (!selectedRegion) return;
    
    const owner = register(
      ownerCredentials.username, 
      ownerCredentials.password, 
      true
    );
    
    const storePassword = generateStorePassword();
    
    const store = addStore({
      name: storeName.trim(),
      region: selectedRegion.name,
      password: storePassword,
      ownerId: owner.id,
    });
    
    owner.storeId = store.id;
    
    setGeneratedPassword(storePassword);
    setShowPassword(true);
  };
  
  const handleCompleteRegistration = () => {
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Create Your Store</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-black dark:border-white">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input 
                  id="store-name"
                  type="text"
                  placeholder="Enter your store name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Select Region</Label>
                <Select value={regionId} onValueChange={setRegionId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Or add a new region"
                    value={newRegionName}
                    onChange={(e) => setNewRegionName(e.target.value)}
                  />
                </div>
                <Button type="button" onClick={handleAddNewRegion}>
                  Add
                </Button>
              </div>
              
              <Dialog open={showPassword} onOpenChange={setShowPassword}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-round-blue hover:bg-blue-600" onClick={handleCreateStore}>
                    Create Store
                  </Button>
                </DialogTrigger>
                
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Store Created Successfully!</DialogTitle>
                    <DialogDescription>
                      Your store has been created. Share this password with your employees so they can join your store:
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="bg-muted p-4 rounded text-center my-4">
                    <p className="text-xl font-mono">{generatedPassword}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Make sure to save this password somewhere safe. You'll need to share it with any employees who want to join your store.
                  </p>
                  
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="w-full bg-round-blue hover:bg-blue-600" onClick={handleCompleteRegistration}>
                        Continue to Dashboard
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateStore;
