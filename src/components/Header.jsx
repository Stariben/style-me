import { useState, useEffect } from 'react';
import { Download, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useLang } from '@/lib/i18n';

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

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Header() {
  const { t } = useLang();

  const handleLogin = () => {
    base44.auth.redirectToLogin(window.location.href);
  };

  return (
    <header className="px-6 pt-6 pb-4">
      <div className="flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-2xl overflow-hidden">
            <img src="/icons/icon-192.png" alt="Style Me" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">StyleMe</h1>
            <p className="text-sm text-muted-foreground font-medium">AI Outfit Advisor</p>
          </div>
        </div>

        {/* Nav + Login */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* Nav links — hidden on very small screens */}
          <nav className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
            <button
              onClick={() => scrollToSection('section-why')}
              className="px-3 py-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors min-h-0 font-medium"
            >
              {t('footerFeatures')}
            </button>
            <button
              onClick={() => scrollToSection('section-how')}
              className="px-3 py-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors min-h-0 font-medium"
            >
              {t('footerHowItWorks')}
            </button>
            <button
              onClick={() => scrollToSection('section-faq')}
              className="px-3 py-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors min-h-0 font-medium"
            >
              {t('footerFaq')}
            </button>
          </nav>

          {/* Login button */}
          <Button onClick={handleLogin} size="sm" className="gap-2 shrink-0">
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">
              {t('loginBtn') || 'Connexion'}
            </span>
          </Button>

          <InstallPWAButton />
        </div>
      </div>
    </header>
  );
}