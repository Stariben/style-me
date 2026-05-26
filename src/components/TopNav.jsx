import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, User, LogIn } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useCamera } from '@/lib/CameraContext';
import { useAuth } from '@/lib/AuthContext';

export default function TopNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useLang();
  const { isCameraOpen } = useCamera();
  const { isAuthenticated, navigateToLogin } = useAuth();

  if (isCameraOpen) return null;

  const navLinks = [
    { path: '/about', label: 'Features' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between px-5 h-14">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 select-none"
        >
          <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="font-bold text-base text-foreground tracking-tight">
            Style Me <span className="text-primary">AI</span>
          </span>
        </button>

        {/* Center nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map(({ path, label }) => {
            const active = pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'text-foreground bg-gray-100'
                    : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Auth button */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/account')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/account'
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
              }`}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t('account')}</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateToLogin()}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              Sign In
            </button>
            <button
              onClick={() => navigateToLogin()}
              className="text-sm font-semibold bg-foreground text-white px-4 py-2 rounded-xl hover:bg-foreground/90 transition-colors"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}