
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import AboutPage from "./pages/AboutPage";
import HowItWorks from "./pages/HowItWorks";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Freelance from "./pages/Freelance";
import FreelancerDetail from "./pages/FreelancerDetail";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/freelance" element={<Freelance />} />
            <Route path="/freelance/:id" element={<FreelancerDetail />} />
            <Route path="/parametres" element={<Settings />} />
            
            {/* Redirect old routes to projects */}
            <Route path="/freelancers" element={<Navigate to="/freelance" replace />} />
            <Route path="/freelancers/:id" element={<Navigate to="/freelance" replace />} />
            <Route path="/services" element={<Navigate to="/projects" replace />} />
            <Route path="/services/:id" element={<Navigate to="/projects" replace />} />
            <Route path="/offres" element={<Navigate to="/projects" replace />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
