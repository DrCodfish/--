import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { TopNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { useStore } from "@/context/store-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {
  const { register } = useAuth();
  const { stores } = useStore();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("type") === "employee" ? "employee" : "owner";
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [ownerUsername, setOwnerUsername] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [employeeUsername, setEmployeeUsername] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [storePassword, setStorePassword] = useState("");
  
  const handleOwnerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, would validate username doesn't already exist
    navigate("/create-store", { 
      state: { username: ownerUsername, password: ownerPassword } 
    });
  };
  
  const handleEmployeeRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find store with matching password
    const store = stores.find(s => s.password === storePassword);
    
    if (!store) {
      toast({
        title: "Registration failed",
        description: "Invalid store code",
        variant: "destructive",
      });
      return;
    }
    
    const user = register(employeeUsername, employeePassword, false, store.id);
    
    if (user) {
      toast({
        title: "Registration submitted",
        description: "Please wait for store owner approval",
      });
      navigate("/login");
    } else {
      toast({
        title: "Registration failed",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
          
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="owner">Store Owner</TabsTrigger>
              <TabsTrigger value="employee">Employee</TabsTrigger>
            </TabsList>
            
            <TabsContent value="owner">
              <div className="bg-white p-6 rounded-lg shadow-md border border-black dark:border-white">
                <form onSubmit={handleOwnerRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner-username">Username</Label>
                    <Input 
                      id="owner-username"
                      type="text"
                      placeholder="Choose a username"
                      value={ownerUsername}
                      onChange={(e) => setOwnerUsername(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="owner-password">Password</Label>
                    <Input 
                      id="owner-password"
                      type="password"
                      placeholder="Choose a password"
                      value={ownerPassword}
                      onChange={(e) => setOwnerPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-round-blue hover:bg-blue-600">
                    Continue to Create Store
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="employee">
              <div className="bg-white p-6 rounded-lg shadow-md border border-black dark:border-white">
                <form onSubmit={handleEmployeeRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-password">Store Code</Label>
                    <Input 
                      id="store-password"
                      type="text"
                      placeholder="Enter the store code provided by your manager"
                      value={storePassword}
                      onChange={(e) => setStorePassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employee-username">Username</Label>
                    <Input 
                      id="employee-username"
                      type="text"
                      placeholder="Choose a username"
                      value={employeeUsername}
                      onChange={(e) => setEmployeeUsername(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employee-password">Password</Label>
                    <Input 
                      id="employee-password"
                      type="password"
                      placeholder="Choose a password"
                      value={employeePassword}
                      onChange={(e) => setEmployeePassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-round-blue hover:bg-blue-600">
                    Register as Employee
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
          
          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-round-blue hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
