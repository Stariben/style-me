import { Toaster } from "@/components/ui/toaster"
import { AnimatePresence } from 'framer-motion';
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavigationProvider } from '@/lib/NavigationContext';
import PageNotFound from './lib/PageNotFound';
import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

function LoginRedirect() {
  useEffect(() => {
    base44.auth.redirectToLogin(window.location.origin + '/analyze');
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
    </div>
  );
}
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import AccountSettings from './pages/AccountSettings';
import History from './pages/History.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsAndConditions from './pages/TermsAndConditions';import BottomNav from './components/BottomNav';
import PageTransition from './components/PageTransition';
import MobileHeader from './components/MobileHeader';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { LangProvider } from '@/lib/i18n';
import LanguagePicker from '@/components/LanguagePicker';
import { CameraProvider } from '@/lib/CameraContext';
import TermsConsentModal from '@/components/TermsConsentModal';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated, user } = useAuth();

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
      // Allow public access — individual pages handle auth requirements
    }
  }

  // Render the main app
  return (
    <NavigationProvider>
      <LanguagePicker />
      {isAuthenticated && user && <TermsConsentModal userId={user.id} />}
      <AnimatePresence mode="wait" initial={false}>
        <Routes key={window.location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/analyze" element={<PageTransition><MobileHeader /><Analyze /><BottomNav /></PageTransition>} />
          <Route path="/account" element={<PageTransition><MobileHeader /><AccountSettings /><BottomNav /></PageTransition>} />
          <Route path="/history" element={<PageTransition><MobileHeader /><History /><BottomNav /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
          <Route path="/about" element={<PageTransition><MobileHeader /><About /><BottomNav /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><MobileHeader /><Contact /><BottomNav /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><TermsAndConditions /></PageTransition>} />
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </NavigationProvider>
  );
};


function App() {

  return (
    <LangProvider>
      <CameraProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
      </CameraProvider>
    </LangProvider>
  )
}

export default App