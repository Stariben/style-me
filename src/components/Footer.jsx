import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
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
              <div className="h-8 w-8 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="text-background font-black text-lg tracking-tight">Style Me</span>
            </div>
            <p className="text-sm text-background/40 max-w-[200px] leading-relaxed">
              {t('whySubtitle') || 'Your style, elevated effortlessly.'}
            </p>
          </div>

          {/* Links — two columns */}
          <div className="flex gap-12 md:gap-16 text-sm">
            {/* Section anchors */}
            <div className="flex flex-col gap-3">
              <p className="text-background/30 text-[11px] uppercase tracking-widest font-semibold mb-1">Sections</p>
              <button onClick={() => scrollToSection('section-why')} className="text-left hover:text-background transition-colors">
                {t('whyTitle') || 'Why Style Me'}
              </button>
              <button onClick={() => scrollToSection('section-how')} className="text-left hover:text-background transition-colors">
                {t('howItWorksTitle') || 'How it works'}
              </button>
              <button onClick={() => scrollToSection('section-faq')} className="text-left hover:text-background transition-colors">
                {t('faqTitle') || 'FAQ'}
              </button>
            </div>

            {/* Page links */}
            <div className="flex flex-col gap-3">
              <p className="text-background/30 text-[11px] uppercase tracking-widest font-semibold mb-1">Pages</p>
              <Link to="/about" className="hover:text-background transition-colors">
                {t('aboutTitle') || 'About'}
              </Link>
              <Link to="/history" className="hover:text-background transition-colors">
                {t('historyTitle') || 'History'}
              </Link>
              <Link to="/contact" className="hover:text-background transition-colors">
                {t('contactUs') || 'Contact'}
              </Link>
              <Link to="/privacy" className="hover:text-background transition-colors">
                {t('privacyPolicy') || 'Privacy Policy'}
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 mb-6" />

        {/* Bottom row */}
        <div className="text-xs text-background/30">
          <p>© {new Date().getFullYear()} StyleMe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}