import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    tag: 'Smart Casual',
    score: '9.2',
  },
  {
    src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80',
    tag: 'Streetwear',
    score: '8.7',
  },
  {
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
    tag: 'Minimal',
    score: '9.5',
  },
];

export default function HeroSection({ onStartAnalysis }) {
  const { t } = useLang();

  return (
    <section className="relative bg-background px-5 pt-10 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full border border-primary/20 tracking-widest uppercase">
            <Sparkles className="h-3 w-3" />
            {t('herobadge')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
          className="text-[3rem] md:text-[5rem] font-black leading-[1.08] tracking-tight text-foreground mb-5"
        >
          {t('heroHeadline1')}<br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_3s_ease-in-out_infinite]">
            {t('heroHeadline2')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="text-base md:text-xl text-muted-foreground leading-relaxed mb-9 max-w-[340px] md:max-w-[540px] mx-auto"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* CTA group */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={onStartAnalysis}
            className="inline-flex items-center gap-2.5 bg-foreground text-background font-bold text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full hover:opacity-85 active:scale-95 transition-all shadow-2xl shadow-foreground/20"
          >
            {t('getStartedFree')}
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-xs text-muted-foreground/50"
        >
          ✦ {t('pricingFreeNote')} · {t('pricingFreeDesc')}
        </motion.p>
      </div>

      {/* Preview cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-12 flex gap-4 overflow-x-auto pb-2 no-scrollbar px-4 sm:justify-center"
      >
        {HERO_IMAGES.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
            animate={{ opacity: 1, y: 0, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="shrink-0 w-[170px] md:w-[240px] rounded-[20px] overflow-hidden bg-card border border-border/60 shadow-xl shadow-black/8"
          >
            <div className="relative h-64 md:h-88 bg-muted">
              <img src={item.src} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Score */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-foreground text-[11px] font-black px-2.5 py-1 rounded-full shadow">
                ★ {item.score}
              </div>
              {/* Tag */}
              <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
                {item.tag}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}