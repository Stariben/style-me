import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="px-6 pt-6 pb-4">
      <div className="flex items-center gap-2.5">
        <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
          <span className="text-xs font-bold text-primary-foreground tracking-tight">SM</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">StyleMatch</h1>
          <p className="text-xs text-muted-foreground font-medium">AI Outfit Advisor</p>
        </div>
      </div>
    </header>
  );
}