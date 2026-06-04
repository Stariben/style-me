import { Link } from 'react-router-dom';

import { useLang } from '@/lib/i18n';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-foreground text-background/60 px-5 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-11 w-11 rounded-2xl overflow-hidden shadow-sm">
                <img src="/icons/icon-192.png" alt="Style Me" className="w-full h-full object-cover" />
              </div>
              <span className="text-background font-black text-xl tracking-tight">Style Me</span>
            </div>
            <p className="text-sm text-background/40 max-w-[200px] leading-relaxed">
              {t('whySubtitle') || 'Your style, elevated effortlessly.'}
            </p>
          </div>

          {/* Links — three columns */}
          <div className="flex gap-8 md:gap-10 text-sm flex-wrap">
            {/* Section anchors */}
            <div className="flex flex-col gap-2">
              <p className="text-background/30 text-[11px] uppercase tracking-widest font-semibold mb-1">{t('footerProduct')}</p>
              <button onClick={() => scrollToSection('section-why')} className="text-left hover:text-background transition-colors min-h-0">
                {t('footerFeatures')}
              </button>
              <button onClick={() => scrollToSection('section-how')} className="text-left hover:text-background transition-colors min-h-0">
                {t('footerHowItWorks')}
              </button>
              <button onClick={() => scrollToSection('section-pricing')} className="text-left hover:text-background transition-colors min-h-0">
                {t('footerPricing')}
              </button>
              <button onClick={() => scrollToSection('section-faq')} className="text-left hover:text-background transition-colors min-h-0">
                {t('footerFaq')}
              </button>
            </div>

            {/* Support links */}
            <div className="flex flex-col gap-2">
              <p className="text-background/30 text-[11px] uppercase tracking-widest font-semibold mb-1">{t('footerSupport')}</p>
              <Link to="/about" className="hover:text-background transition-colors">
                {t('about')}
              </Link>
              <Link to="/contact" className="hover:text-background transition-colors">
                {t('contactUs')}
              </Link>
              <Link to="/privacy" className="hover:text-background transition-colors">
                {t('privacyPolicy')}
              </Link>
              <Link to="/terms" className="hover:text-background transition-colors">
                {t('termsTitle')}
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 mb-6" />

        {/* Bottom row */}
        <div className="text-xs text-background/30">
          <p>© {new Date().getFullYear()} StyleMe. {t('footerRights')}</p>
        </div>
      </div>
    </footer>
  );
}