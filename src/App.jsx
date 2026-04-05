import { Toaster } from "@/components/ui/toaster"
import { AnimatePresence } from 'framer-motion';
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { NavigationProvider } from '@/lib/NavigationContext';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import AccountSettings from './pages/AccountSettings';
import History from './pages/History';import BottomNav from './components/BottomNav';
import PageTransition from './components/PageTransition';
import MobileHeader from './components/MobileHeader';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <NavigationProvider>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><MobileHeader /><Home /><BottomNav /></PageTransition>} />
          <Route path="/account" element={<PageTransition><MobileHeader /><AccountSettings /><BottomNav /></PageTransition>} />
          <Route path="/history" element={<PageTransition><MobileHeader /><History /><BottomNav /></PageTransition>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </NavigationProvider>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App