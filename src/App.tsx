import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Steam from "./pages/Steam";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portal from "./pages/Portal";  
import ScrollToTop from "./components/ScrollToTop"; 

const queryClient = new QueryClient();
const navLinks = [
  { name: "O que é FTC?", path: "/#first-ftc", scroll: true },
]

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/steam" element={<Steam />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/portal" element={<Portal />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
