import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, User, Info, Mail } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useCamera } from '@/lib/CameraContext';

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useLang();
  const { isCameraOpen } = useCamera();

  if (isCameraOpen) return null;

  const tabs = [
    { path: '/', label: 'StyleMatch', icon: Sparkles },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Mail },
    { path: '/account', label: t('account'), icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border flex"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}>
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
    </nav>
  );
}