import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useNavigation } from '@/lib/NavigationContext';
import useSwipeBack from '@/hooks/useSwipeBack';

export default function MobileHeader() {
  const navigate = useNavigate();
  const { canGoBack } = useNavigation();
  useSwipeBack();

  if (!canGoBack) return null;

  return (
    <div className="flex items-center gap-2 px-4 pt-safe pt-4 pb-2 bg-background border-b border-border sticky top-0 z-40">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center h-11 w-11 -ml-2 rounded-xl hover:bg-muted transition-colors"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        aria-label="Go back"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>

    </div>
  );
}