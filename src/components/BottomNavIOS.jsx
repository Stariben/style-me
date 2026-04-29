import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, User } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useCamera } from '@/lib/CameraContext';

export default function BottomNavIOS() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useLang();
  const { isCameraOpen } = useCamera();

  if (isCameraOpen) return null;

  const tabs = [
    { path: '/', label: 'StyleMatch', icon: Sparkles },
    { path: '/account', label: t('account'), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-t border-white/20 flex"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {tabs.map(({ path, label, icon: Icon }) => {
        const active = pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path, { replace: active })}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all active:scale-95"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            <Icon className={`h-5 w-5 transition-colors ${active ? 'text-primary' : 'text-gray-500'}`} />
            <span className={`text-[10px] font-medium transition-colors ${active ? 'text-primary' : 'text-gray-500'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}