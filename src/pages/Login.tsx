import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { TopNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("type") === "employee" ? "employee" : "owner";
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [ownerUsername, setOwnerUsername] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [employeeUsername, setEmployeeUsername] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [storePassword, setStorePassword] = useState("");
  
  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = login(ownerUsername, ownerPassword, true);
    
    if (user) {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };
  
  const handleEmployeeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = login(employeeUsername, employeePassword, false);
    
    if (user) {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Log In to Round Table</h1>
          
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="owner">Store Owner</TabsTrigger>
              <TabsTrigger value="employee">Employee</TabsTrigger>
            </TabsList>
            
            <TabsContent value="owner">
              <div className="bg-white p-6 rounded-lg shadow-md border border-black dark:border-white">
                <form onSubmit={handleOwnerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner-username">Username</Label>
                    <Input 
                      id="owner-username"
                      type="text"
                      placeholder="Enter your username"
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
                      placeholder="Enter your password"
                      value={ownerPassword}
                      onChange={(e) => setOwnerPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-round-blue hover:bg-blue-600">
                    Log In as Owner
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="employee">
              <div className="bg-white p-6 rounded-lg shadow-md border border-black dark:border-white">
                <form onSubmit={handleEmployeeLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-password">Store Password</Label>
                    <Input 
                      id="store-password"
                      type="text"
                      placeholder="Enter the store password"
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
                      placeholder="Enter your username"
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
                      placeholder="Enter your password"
                      value={employeePassword}
                      onChange={(e) => setEmployeePassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-round-blue hover:bg-blue-600">
                    Log In as Employee
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
          
          <p className="text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-round-blue hover:underline">
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
