import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function TermsAndConditions() {
  const navigate = useNavigate();
  const { t } = useLang();
  const sections = t('termsSections');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h1 className="text-sm font-bold">{t('termsTitle')}</h1>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-5 py-8 pb-24"
      >
        <p className="text-xs text-muted-foreground mb-3">{t('termsLastUpdate')}</p>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8">
          <p className="text-sm font-bold text-primary mb-1">{t('termsIntroTitle')}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('termsIntroText')}</p>
        </div>

        <div className="space-y-6">
          {Array.isArray(sections) && sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="border-b border-border/50 pb-6 last:border-0"
            >
              <h2 className="text-sm font-bold text-foreground mb-2">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}