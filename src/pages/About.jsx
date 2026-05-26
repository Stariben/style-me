import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function About() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background pt-16 pb-10">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground mb-6 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">Style Me</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-6">
          {t('aboutTitle')}
        </h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            <strong className="text-foreground">Style Me</strong> {t('aboutP1').replace(/^Style Me\s?/, '')}
          </p>
          <p>{t('aboutP2')}</p>
          <p>{t('aboutP3')}</p>
          <p>{t('aboutP4')}</p>
        </div>
      </div>
    </div>
  );
}