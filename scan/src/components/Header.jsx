import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="px-6 pt-6 pb-4">
      <div className="flex items-center gap-2.5">
        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">StyleMe</h1>
          <p className="text-xs text-muted-foreground font-medium">AI Outfit Advisor</p>
        </div>
      </div>
    </header>);

}