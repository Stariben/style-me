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
      className="px-5 pb-12 pt-10 md:pb-24 md:pt-20 bg-background"
    >
      <div className="max-w-2xl md:max-w-4xl mx-auto">
        {/* Card */}
        <div className="relative rounded-[28px] overflow-hidden bg-foreground px-7 py-11 md:px-16 md:py-20 text-center">
          {/* Gradient blobs */}
          <div className="absolute -top-14 -right-14 h-52 w-52 md:h-80 md:w-80 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-14 -left-14 h-52 w-52 md:h-80 md:w-80 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)',
            }}
          />

          <div className="relative z-10">
            <p className="text-[11px] md:text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              ✦ Style Me AI
            </p>
            <h2 className="text-[2.1rem] md:text-[3.2rem] font-black text-background leading-tight mb-3">
              {t('ctaTitle') || 'Ready to upgrade your style?'}
            </h2>
            <p className="text-base md:text-xl text-background/55 mb-7 md:mb-10 leading-relaxed max-w-xs md:max-w-lg mx-auto">
              {t('ctaSubtitle') || 'Personal AI styling, simplified. Start free today.'}
            </p>
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-lg md:text-xl px-9 md:px-12 py-4 md:py-5 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/40"
            >
              {t('ctaButton') || 'Get Started Now'}
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}