import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setIsVisible(false));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsVisible(false);
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <Button onClick={handleInstall} variant="outline" size="sm" className="gap-2">
      <Download className="h-4 w-4" />
      Installer l'app
    </Button>
  );
}

export default function Header() {
  return (
    <header className="px-6 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-2xl overflow-hidden">
          <img src="/icons/icon-192.png" alt="Style Me" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">StyleMe</h1>
          <p className="text-sm text-muted-foreground font-medium">AI Outfit Advisor</p>
        </div>
      </div>
    </header>
  );
}