import { useState, useEffect } from 'react';
import { Download, LogIn, Share, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useLang } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
}

function isInStandaloneMode() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function IOSInstallModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-4" onClick={onClose}>
      <div
        className="bg-card rounded-3xl w-full max-w-sm p-6 shadow-2xl relative mb-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-2xl overflow-hidden mx-auto mb-3 shadow-md">
            <img src="/icons/icon-192.png" alt="StyleMe" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold">Installer StyleMe</h2>
          <p className="text-sm text-muted-foreground mt-1">Ajoutez l'app sur votre écran d'accueil</p>
        </div>
        <ol className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <span>Appuyez sur <strong>Partager</strong> <Share className="inline h-4 w-4 text-blue-500" /> en bas de Safari</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <span>Faites défiler et appuyez sur <strong>«&nbsp;Sur l'écran d'accueil&nbsp;»</strong></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <span>Appuyez sur <strong>Ajouter</strong> en haut à droite</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

export function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showAndroidButton, setShowAndroidButton] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  const ios = typeof navigator !== 'undefined' && isIOS();
  const standalone = typeof window !== 'undefined' && isInStandaloneMode();

  useEffect(() => {
    if (ios || standalone) return;
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowAndroidButton(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setShowAndroidButton(false));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShowAndroidButton(false);
    setDeferredPrompt(null);
  };

  if (standalone) return null;

  if (ios) {
    return (
      <>
        <Button onClick={() => setShowIOSModal(true)} variant="outline" size="sm" className="gap-2 rounded-full">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Installer</span>
        </Button>
        {showIOSModal && <IOSInstallModal onClose={() => setShowIOSModal(false)} />}
      </>
    );
  }

  if (!showAndroidButton) return null;

  return (
    <Button onClick={handleAndroidInstall} variant="outline" size="sm" className="gap-2 rounded-full">
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
  
const navigate = useNavigate();
const handleLogin = () => {
  navigate('/login');
};

  return (
    <header className={`sticky top-0 z-40 px-5 py-3 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="h-12 w-12 rounded-2xl overflow-hidden shrink-0 shadow-sm">
            <img src="/icons/icon-192.png" alt="StyleMe" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-black tracking-tight text-foreground">StyleMe</span>
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
