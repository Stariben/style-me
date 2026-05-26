import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function CTASection({ onStartAnalysis }) {
  const { t } = useLang();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-4 pb-10 bg-muted/50 pt-12"
    >
      <div className="bg-foreground rounded-3xl px-6 py-10 text-center relative overflow-hidden max-w-lg mx-auto">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-black text-background mb-2">
            {t('ctaTitle') || 'Ready to upgrade your style?'}
          </h2>
          <p className="text-sm text-background/60 mb-6 leading-relaxed">
            {t('ctaSubtitle') || 'Personal AI styling, simplified. Start free today.'}
          </p>
          <button
            onClick={onStartAnalysis}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3.5 rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/30"
          >
            <Sparkles className="h-4 w-4" />
            {t('ctaButton') || 'Get Started Now'}
          </button>
        </div>
      </div>
    </motion.section>
  );
}