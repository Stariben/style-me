import { useLocation, useNavigate } from 'react-router-dom';
import { User, Mail } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useCamera } from '@/lib/CameraContext';
import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useLang();
  const { isCameraOpen } = useCamera();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    base44.auth.isAuthenticated().then(setIsAuthenticated);
  }, []);

  if (isCameraOpen || !isAuthenticated) return null;

  const otherTabs = [
    { path: '/contact', label: t('contactUs'), icon: Mail },
    { path: '/account', label: t('account'), icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border flex items-center px-4 gap-3"
      style={{ paddingTop: 'env(safe-area-inset-top)', height: 'calc(64px + env(safe-area-inset-top))' }}>
      {/* StyleMe brand button */}
      <button
        onClick={() => navigate('/', { replace: pathname === '/' })}
        className="flex items-center gap-3 flex-1 select-none"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <div className="h-14 w-14 rounded-2xl overflow-hidden shrink-0">
          <img src="/icons/icon-192.png" alt="Style Me" className="w-full h-full object-cover" />
        </div>
        <div className="text-left">
          <p className="text-2xl font-bold tracking-tight text-foreground leading-tight">StyleMe</p>
          <p className="text-sm text-muted-foreground font-medium">AI Outfit Advisor</p>
        </div>
      </button>

      {/* Other tabs */}
      <div className="flex items-center gap-1">
        {otherTabs.map(({ path, label, icon: Icon }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path, { replace: active })}
              className="flex flex-col items-center justify-center px-4 py-2 rounded-xl hover:bg-muted transition-colors select-none gap-1"
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              <Icon className={`h-5 w-5 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[10px] font-medium transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}