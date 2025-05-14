<<<<<<< HEAD

=======
>>>>>>> 060614a (readded remote)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/context/app-provider";
<<<<<<< HEAD
=======
import { AuthProvider } from "@/context/auth-context";
>>>>>>> 060614a (readded remote)

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateStore from "./pages/CreateStore";
import Dashboard from "./pages/Dashboard";
import Forum from "./pages/Forum";
import Chat from "./pages/Chat";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="round-table-theme">
        <AppProvider>
<<<<<<< HEAD
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-store" element={<CreateStore />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
=======
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-store" element={<CreateStore />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
>>>>>>> 060614a (readded remote)
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
