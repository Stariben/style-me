import { Link, useLocation } from 'react-router-dom';
import { Sparkles, User } from 'lucide-react';

const tabs = [
  { path: '/', label: 'StyleMatch', icon: Sparkles },
  { path: '/account', label: 'Account', icon: User },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {tabs.map(({ path, label, icon: Icon }) => {
        const active = pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            <Icon className={`h-5 w-5 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-[10px] font-medium transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}