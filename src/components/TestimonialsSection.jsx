import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const TESTIMONIALS = [
  {
    nameKey: 'testimonial1Name',
    textKey: 'testimonial1Text',
    titleKey: 'testimonial1Title',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
  },
  {
    nameKey: 'testimonial2Name',
    textKey: 'testimonial2Text',
    titleKey: 'testimonial2Title',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
  },
  {
    nameKey: 'testimonial3Name',
    textKey: 'testimonial3Text',
    titleKey: 'testimonial3Title',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80',
  },
];

export default function TestimonialsSection() {
  const { t } = useLang();

  return (
    <section className="bg-muted/30 px-5 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 max-w-2xl mx-auto"
      >
        <h2 className="text-[1.8rem] md:text-[2.8rem] font-black tracking-tight text-foreground">
          {t('testimonialsTitle')}
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground mt-3">
          {t('testimonialsSubtitle')}
        </p>
      </motion.div>

      <div className="max-w-2xl md:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {TESTIMONIALS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: i * 0.09 }}
            className="bg-card border border-border/60 rounded-2xl p-6 md:p-7 flex flex-col gap-4 hover:shadow-md transition-shadow"
          >
            {/* Stars */}
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            {/* Title */}
            <p className="text-base font-bold text-foreground leading-snug">
              {t(item.titleKey)}
            </p>
            {/* Quote */}
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {t(item.textKey)}
            </p>
            {/* Author */}
            <div className="flex items-center gap-3 pt-2 border-t border-border/50">
              <img src={item.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-foreground">{t(item.nameKey)}</p>
                <p className="text-[11px] text-muted-foreground">Verified user ✓</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}