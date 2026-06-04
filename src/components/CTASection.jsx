import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function CTASection({ onStartAnalysis }) {
  const { t } = useLang();

  return (
    <section className="px-5 py-16 md:py-24 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl md:max-w-4xl mx-auto"
      >
        <div className="relative rounded-3xl overflow-hidden bg-foreground px-8 py-14 md:px-16 md:py-20 text-center">
          {/* Blobs */}
          <div className="absolute -top-16 -right-16 h-64 w-64 md:h-96 md:w-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 md:h-96 md:w-96 rounded-full bg-accent/25 blur-3xl pointer-events-none" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
              <Sparkles className="h-3 w-3" />
              Style Me AI
            </div>
            <h2 className="text-[2.2rem] md:text-[3.5rem] font-black text-white leading-tight mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-base md:text-xl text-white/50 mb-9 leading-relaxed max-w-sm md:max-w-lg mx-auto">
              {t('ctaSubtitle')}
            </p>
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-bold text-base md:text-xl px-9 md:px-12 py-4 md:py-5 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-primary/40"
            >
              {t('ctaButton')}
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}