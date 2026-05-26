import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    tag: 'Smart Casual · Autumn',
    score: '9.2',
  },
  {
    src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80',
    tag: 'Streetwear · Winter',
    score: '8.7',
  },
  {
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
    tag: 'Minimal · Spring',
    score: '9.5',
  },
];

export default function HeroSection({ onStartAnalysis }) {
  const { t } = useLang();

  return (
    <section className="px-6 pt-10 pb-8">
      {/* Pill badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5"
      >
        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {t('herobadge') || 'AI stylist in your pocket'}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-[2rem] font-black leading-tight tracking-tight text-foreground mb-3"
      >
        {t('heroHeadline1') || 'AI-powered outfits,'}<br />
        <span className="text-primary">{t('heroHeadline2') || 'personalized to you.'}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-muted-foreground leading-relaxed mb-7 max-w-xs"
      >
        {t('heroSubtitle') || 'Upload a photo and get an instant AI analysis of your outfit — with a match score, style tips, and a photorealistic preview.'}
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        onClick={onStartAnalysis}
        className="inline-flex items-center gap-2 bg-foreground text-background font-semibold text-sm px-6 py-3.5 rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-lg"
      >
        <Sparkles className="h-4 w-4" />
        {t('getStartedFree') || 'Try it for free'}
      </motion.button>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar"
      >
        {HERO_IMAGES.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            className="shrink-0 w-36 rounded-2xl overflow-hidden bg-card border border-border shadow-md"
          >
            <img src={item.src} alt="" className="w-full h-44 object-cover" />
            <div className="p-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                  AI ✦
                </span>
                <span className="text-[10px] font-bold text-foreground">{item.score}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">{item.tag}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}