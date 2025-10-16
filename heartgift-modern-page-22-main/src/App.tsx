import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlanProvider } from "./contexts/PlanContext";
import Index from "./pages/Index";
import CreateGift from "./pages/CreateGift";
import GiftPreview from "./pages/GiftPreview";
import GiftView from "./pages/GiftView";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PlanProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/criar-presente" element={<CreateGift />} />
            <Route path="/preview-presente" element={<GiftPreview />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/presente/:id" element={<GiftView />} />
            <Route path="/presente" element={<GiftView />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PlanProvider>
  </QueryClientProvider>
);

export default App;
