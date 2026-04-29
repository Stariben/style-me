import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useNavigation } from '@/lib/NavigationContext';

export default function MobileHeaderIOS({ title }) {
  const navigate = useNavigate();
  const { canGoBack } = useNavigation();

  if (!canGoBack) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/80 border-b border-white/20 flex items-center gap-3 px-4 py-3"
      style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}>
      <button
        onClick={() => navigate(-1)}
        className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </button>
      {title && <span className="text-sm font-semibold text-foreground">{title}</span>}
    </div>
  );
}