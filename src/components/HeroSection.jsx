import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    tag: 'Smart Casual',
    score: '9.2',
    match: 'Perfect match',
  },
  {
    src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80',
    tag: 'Streetwear',
    score: '8.7',
    match: 'Great fit',
  },
  {
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
    tag: 'Minimal',
    score: '9.5',
    match: 'Ideal style',
  },
];

export default function HeroSection({ onStartAnalysis }) {
  const { t } = useLang();

  return (
    <section className="bg-background px-5 pt-10 pb-12 overflow-hidden">
      <div className="max-w-lg mx-auto text-center">

        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 bg-primary/8 text-primary text-[11px] font-semibold px-3.5 py-1.5 rounded-full border border-primary/15 tracking-wide uppercase">
            <Sparkles className="h-3 w-3" />
            {t('herobadge') || 'AI stylist in your pocket'}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="text-[2.9rem] font-black leading-[1.12] tracking-tight text-foreground mb-4"
        >
          {t('heroHeadline1') || 'AI-powered outfits,'}<br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('heroHeadline2') || 'personalized to you.'}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="text-[17px] text-muted-foreground leading-relaxed mb-8 mx-auto max-w-[320px]"
        >
          {t('heroSubtitle') || 'Upload a photo and get an instant AI analysis with a match score, style tips, and photorealistic preview.'}
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18 }}
          onClick={onStartAnalysis}
          className="inline-flex items-center gap-2 bg-foreground text-background font-semibold text-lg px-10 py-5 rounded-full hover:opacity-85 active:scale-95 transition-all shadow-xl shadow-foreground/15"
        >
          {t('getStartedFree') || 'Try it for free'}
          <ArrowRight className="h-4 w-4" />
        </motion.button>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mt-4 text-[11px] text-muted-foreground/60"
        >
          ✦ Free · No credit card · Instant results
        </motion.p>
      </div>

      {/* Preview cards */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="mt-9 flex gap-4 overflow-x-auto pb-2 no-scrollbar px-2"
      >
        {HERO_IMAGES.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 + i * 0.07 }}
            className="shrink-0 w-[200px] rounded-[22px] overflow-hidden bg-card border border-border/60 shadow-lg shadow-black/5"
          >
            <div className="relative">
              <img src={item.src} alt="" className="w-full h-72 object-cover" />
              {/* Score badge */}
              <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm text-foreground text-[11px] font-black px-2 py-0.5 rounded-full shadow-sm">
                {item.score}
              </div>
            </div>
            <div className="px-4 py-3.5">
              <p className="text-sm font-semibold text-foreground mb-0.5">{item.tag}</p>
              <p className="text-[13px] text-primary font-medium">{item.match}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}