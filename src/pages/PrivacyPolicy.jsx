import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const { t } = useLang();
  const sections = t('privacySections');

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 flex items-center gap-3 px-5 py-3">
        <button
          onClick={() => navigate(-1)}
          className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-bold text-sm">{t('privacyPolicy')}</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-6 pb-8 max-w-2xl mx-auto"
      >
        <p className="text-xs text-muted-foreground mb-6">{t('privacyLastUpdate')}</p>

        {/* Key commitment banner */}
        <div className="mb-8 p-5 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-bold">{t('privacyKeyCommitment')} </span>
            {t('privacyKeyCommitmentText')}
          </p>
        </div>

        <div className="space-y-6">
          {Array.isArray(sections) && sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="border-b border-border/50 pb-6 last:border-0"
            >
              <h2 className="text-sm font-bold text-foreground mb-2">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 w-full flex items-center justify-center gap-2 border border-border rounded-xl h-11 text-sm font-medium hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          {t('back')}
        </button>
      </motion.div>
    </div>
  );
}