import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    
    // Détecter si déjà installée
    window.addEventListener('appinstalled', () => {
      setIsVisible(false);
    });
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={handleInstall}
      variant="outline"
      size="sm"
      className="gap-2"
      data-testid="install-pwa-btn"
    >
      <Download className="h-4 w-4" />
      Installer l'app
    </Button>
  );
}
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