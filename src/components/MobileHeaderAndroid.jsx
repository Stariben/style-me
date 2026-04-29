import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useNavigation } from '@/lib/NavigationContext';

export default function MobileHeaderAndroid({ title }) {
  const navigate = useNavigate();
  const { canGoBack } = useNavigation();

  if (!canGoBack) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 flex items-center gap-2 px-4 py-4"
      style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
      <button
        onClick={() => navigate(-1)}
        className="h-10 w-10 flex items-center justify-center rounded-lg active:bg-gray-100 transition-all"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </button>
      {title && <span className="text-base font-semibold text-foreground">{title}</span>}
    </div>
  );
}