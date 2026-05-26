import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, User, Info, Mail, LogIn } from 'lucide-react';
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

  const tabs = [
    { path: '/', label: 'StyleMe', icon: Sparkles },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  // Account tab: Sign in if not authenticated, Account if authenticated
  const accountTab = isAuthenticated
    ? { path: '/account', label: t('account'), icon: User, action: () => navigate('/account') }
    : { path: null, label: 'Sign in', icon: LogIn, action: () => navigateToLogin() };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border flex items-center"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {tabs.map(({ path, label, icon: Icon }) => {
        const active = pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path, { replace: active })}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            <Icon className={`h-5 w-5 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-[10px] font-medium transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
              {label}
            </span>
          </button>
        );
      })}

      {/* Sign in / Account button */}
      <button
        onClick={accountTab.action}
        className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors select-none"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {(() => {
          const Icon = accountTab.icon;
          const active = pathname === accountTab.path;
          return (
            <>
              <Icon className={`h-5 w-5 transition-colors ${active ? 'text-primary' : isAuthenticated ? 'text-muted-foreground' : 'text-primary'}`} />
              <span className={`text-[10px] font-medium transition-colors ${active ? 'text-primary' : isAuthenticated ? 'text-muted-foreground' : 'text-primary'}`}>
                {accountTab.label}
              </span>
            </>
          );
        })()}
      </button>
    </nav>
  );
}