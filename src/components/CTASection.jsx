import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function CTASection({ onStartAnalysis }) {
  const { t } = useLang();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-5 pb-12 pt-10 bg-background"
    >
      <div className="max-w-lg mx-auto">
        {/* Card */}
        <div className="relative rounded-[28px] overflow-hidden bg-foreground px-7 py-11 text-center">
          {/* Gradient blobs */}
          <div className="absolute -top-14 -right-14 h-52 w-52 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-14 -left-14 h-52 w-52 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)',
            }}
          />

          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-3">
              ✦ Style Me AI
            </p>
            <h2 className="text-2xl font-black text-background leading-tight mb-3">
              {t('ctaTitle') || 'Ready to upgrade your style?'}
            </h2>
            <p className="text-sm text-background/55 mb-7 leading-relaxed max-w-xs mx-auto">
              {t('ctaSubtitle') || 'Personal AI styling, simplified. Start free today.'}
            </p>
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-7 py-3.5 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/40"
            >
              {t('ctaButton') || 'Get Started Now'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}