import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const { t } = useLang();

  const sections = t('privacySections');

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold text-base">{t('privacyPolicy')}</span>
        </div>
      </div>

      <div className="px-6 pt-6 pb-8 max-w-2xl mx-auto">
        <p className="text-xs text-muted-foreground mb-6">{t('privacyLastUpdate')}</p>

        <div className="space-y-6">
          {Array.isArray(sections) && sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-sm font-bold text-foreground mb-2">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">{t('privacyKeyCommitment')} </span>
              {t('privacyKeyCommitmentText')}
            </p>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-6 rounded-xl h-11" onClick={() => navigate(-1)}>
          {t('back')}
        </Button>
      </div>
    </div>
  );
}