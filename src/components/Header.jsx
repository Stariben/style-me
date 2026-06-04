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
    <Button onClick={handleInstall} variant="outline" size="sm" className="gap-2 rounded-full">
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">Installer</span>
    </Button>
  );
}

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogin = () => {
    base44.auth.redirectToLogin(window.location.href);
  };

  return (
    <header className={`sticky top-0 z-40 px-5 py-3 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl overflow-hidden shrink-0">
            <img src="/icons/icon-192.png" alt="Style Me" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg font-black tracking-tight text-foreground">StyleMe</span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
          {[
            { label: t('footerFeatures'), id: 'section-why' },
            { label: t('footerHowItWorks'), id: 'section-how' },
            { label: t('headerPricing'), id: 'section-pricing' },
            { label: t('footerFaq'), id: 'section-faq' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-3.5 py-2 rounded-lg hover:bg-muted hover:text-foreground transition-colors min-h-0 font-medium text-sm"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <InstallPWAButton />
          <Button onClick={handleLogin} size="sm" className="gap-2 rounded-full px-5 font-semibold">
            <LogIn className="h-3.5 w-3.5" />
            <span>{t('loginBtn')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}