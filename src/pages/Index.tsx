
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { TopNav } from "@/components/top-nav";

const Index = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Round Table</h1>
          <p className="text-xl mb-8">
            The communication platform connecting store owners and employees
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-8 max-w-md mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md border border-black dark:border-white">
              <h2 className="text-xl font-bold mb-4">Store Owners</h2>
              <p className="mb-4">Create a store, manage your team, and connect with other owners in your region.</p>
              <Button asChild className="w-full bg-round-blue hover:bg-blue-600">
                <Link to="/register?type=owner">Register as Owner</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-black dark:border-white">
              <h2 className="text-xl font-bold mb-4">Store Employees</h2>
              <p className="mb-4">Join your store's team and stay connected with important updates.</p>
              <Button asChild className="w-full bg-round-blue hover:bg-blue-600">
                <Link to="/register?type=employee">Register as Employee</Link>
              </Button>
            </div>
          </div>
          
          <p className="mt-8">
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

export default Index;
