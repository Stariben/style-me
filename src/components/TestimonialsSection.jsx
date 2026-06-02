import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const TESTIMONIALS = [
  {
    nameKey: 'testimonial1Name',
    textKey: 'testimonial1Text',
    titleKey: 'testimonial1Title',
    defaultName: 'Sarah M.',
    defaultTitle: 'Saved me so much time',
    defaultText: '"I upload a photo, pick a vibe, and it gives me outfits I\'d actually wear. The AI preview is mind-blowing."',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
  },
  {
    nameKey: 'testimonial2Name',
    textKey: 'testimonial2Text',
    titleKey: 'testimonial2Title',
    defaultName: 'James K.',
    defaultTitle: 'Changed how I shop',
    defaultText: '"I no longer scroll websites for hours. The AI creates perfect outfits with my style preferences instantly."',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
  },
  {
    nameKey: 'testimonial3Name',
    textKey: 'testimonial3Text',
    titleKey: 'testimonial3Title',
    defaultName: 'Aisha L.',
    defaultTitle: 'Best style tool ever',
    defaultText: '"It tells me exactly if an outfit suits me and why. The match score and tips are super accurate."',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80',
  },
];

export default function TestimonialsSection() {
  const { t } = useLang();

  return (
    <section className="px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-black tracking-tight text-foreground">
          {t('testimonialsTitle') || 'Loved by people who want to look good'}
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5">
          {t('testimonialsSubtitle') || 'Style confidence, without the endless scrolling.'}
        </p>
      </motion.div>

      <div className="space-y-3">
        {TESTIMONIALS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-4 shadow-sm"
          >
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              {t(item.titleKey)}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {t(item.textKey)}
            </p>
            <div className="flex items-center gap-2.5">
              <img src={item.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
              <div>
                <p className="text-xs font-semibold text-foreground">{t(item.nameKey)}</p>
                <p className="text-[10px] text-muted-foreground">Style Me AI user · Verified ✓</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}