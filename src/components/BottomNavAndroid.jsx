import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, User } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useCamera } from '@/lib/CameraContext';

export default function BottomNavAndroid() {
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {tabs.map(({ path, label, icon: Icon }) => {
        const active = pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path, { replace: active })}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-all active:bg-gray-100"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            <Icon className={`h-6 w-6 transition-colors ${active ? 'text-primary' : 'text-gray-600'}`} />
            <span className={`text-[11px] font-medium transition-colors ${active ? 'text-primary' : 'text-gray-600'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}