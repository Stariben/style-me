import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function TermsAndConditions() {
  const { t } = useLang();

  const sections = t('termsSections');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b border-border/50">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-3">
          <Link
            to="/"
            className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </Link>
          <h1 className="text-base font-bold text-foreground">{t('termsTitle')}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-8 pb-24">
        {/* Last update */}
        <p className="text-xs text-muted-foreground mb-2">{t('termsLastUpdate')}</p>

        {/* Intro */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8">
          <p className="text-sm font-semibold text-primary mb-1">{t('termsIntroTitle')}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('termsIntroText')}</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {Array.isArray(sections) && sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-base font-bold text-foreground mb-2">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}