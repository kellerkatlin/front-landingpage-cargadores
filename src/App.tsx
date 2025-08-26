import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./page/Index";
import NotFound from "./page/NotFound";
import AppLayout from "./components/layout/AppLayout";
import CustomersPage from "./page/admin/Customer";
import LoginPage from "./page/admin/Login";
import RequireAuth from "./components/auth/RequireAuth";
import SalesPage from "./page/admin/Sales";
import CheckoutSuccess from "./page/checkout/Success";
import CheckoutFailure from "./page/checkout/Failure";
import CheckoutPending from "./page/checkout/Pending";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing pública */}
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/failure" element={<CheckoutFailure />} />
            <Route path="/checkout/pending" element={<CheckoutPending />} />
            {/* Admin con layout */}
            {/* admin protegida */}
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AppLayout />
                </RequireAuth>
              }
            >
              <Route path="customers" element={<CustomersPage />} />
              <Route path="sales" element={<SalesPage />} />
            </Route>

            {/* catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
