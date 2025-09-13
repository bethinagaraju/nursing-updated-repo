import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
// Protect payment result routes from direct access
const StripeProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // You can use a more robust check (e.g. sessionStorage, query param, etc.)
  const allowed = sessionStorage.getItem("stripeRedirect") === "true";
  useEffect(() => {
    // Clear the flag after showing the page once
    if (allowed) sessionStorage.removeItem("stripeRedirect");
  }, [allowed]);
  if (!allowed) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
import { Toaster as DefaultToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// Pages
import Index from "./pages/Index";
import RegistrationPage from "./pages/Register";
import SessionPage from "./pages/session";
import AbstractSubmissionPage from "./pages/AbstractSubmission";
import Agenda from "./pages/Agenda";
import SpeakersPage from "./pages/SpeakersPage";
import ContactPage from "./pages/contact";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import DiscountRegistrationPage from "./pages/DiscountRegistrationPage";

import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./Admin/DashboardLayout";
import DashboardHomeContent from "./Admin/DashboardHomeContent";
import BankingDashboard from "./Admin/BankingDashboard";


import AbstractSubmissions from "./Admin/AbstractSubmissions";
import Bookings from "./Admin/Bookings";
import Payments from "./Admin/Payments";
import RegistrationTypes from "./Admin/RegistrationTypes";
import Discounts from "./Admin/Discounts";
import AccommodationCombinations from "./Admin/AccommodationCombinations";
import ImportantDates from "./Admin/ImportantDates";
import VenueDetails from "./Admin/VenueDetails";
import Adminlogin from "./Admin/Adminlogin";


const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DefaultToaster />
      <SonnerToaster />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workflow" element={<Adminlogin />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/discount-registration" element={<DiscountRegistrationPage />} />
          <Route path="/abstract-submission" element={<AbstractSubmissionPage />} />
          <Route path="/sessions" element={<SessionPage />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboardHomeContent />} />
            <Route path="banking" element={<BankingDashboard />} />

            <Route path="abstract-submissions" element={<AbstractSubmissions />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="payments" element={<Payments />} />
            <Route path="registration-types" element={<RegistrationTypes />} />
            <Route path="discounts" element={<Discounts />} />
            <Route path="accommodation-combinations" element={<AccommodationCombinations />} />
            <Route path="important-dates" element={<ImportantDates />} />
            <Route path="venue-details" element={<VenueDetails />} />
            {/* Add more dashboard pages here, e.g., <Route path="page1" element={<Page1 />} /> */}
          </Route>
          <Route path="/payment-success" element={
            <StripeProtectedRoute>
              <PaymentSuccess />
            </StripeProtectedRoute>
          } />
          <Route path="/payment-failure" element={
            <StripeProtectedRoute>
              <PaymentFailure />
            </StripeProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
