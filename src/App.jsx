import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import Project from '@/pages/Project';
import CustomerList from '@/pages/CustomerList';
import MarketTrends from '@/pages/MarketTrends';
import RetentionStrategy from '@/pages/RetentionStrategy';
import HelpCenter from '@/pages/HelpCenter';

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project" element={<Project />} />
      <Route path="/customer-list" element={<CustomerList />} />
      <Route path="/market-trends" element={<MarketTrends />} />
      <Route path="/retention-strategy" element={<RetentionStrategy />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App