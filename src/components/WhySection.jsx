import { motion } from 'framer-motion';
import { Eye, ShoppingBag, Palette, Heart } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const FEATURES = [
  {
    icon: Eye,
    titleKey: 'featureVisualTryOnTitle',
    descKey: 'featureVisualTryOnDesc',
    defaultTitle: 'Visual Try-On',
    defaultDesc: 'Upload a photo of you, instantly see yourself dressed in new outfits. No more wondering if it fits.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    wide: true,
  },
  {
    icon: ShoppingBag,
    titleKey: 'featureShoppingTitle',
    descKey: 'featureShoppingDesc',
    defaultTitle: 'Instant Shopping',
    defaultDesc: 'Every outfit is built from real products with direct links to buy instantly.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    wide: false,
  },
  {
    icon: Palette,
    titleKey: 'featureStyleTitle',
    descKey: 'featureStyleDesc',
    defaultTitle: 'Personal Style',
    defaultDesc: 'Pick a vibe from Streetwear to Formal and get looks that match your aesthetic.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
    wide: false,
  },
  {
    icon: Heart,
    titleKey: 'featureSaveTitle',
    descKey: 'featureSaveDesc',
    defaultTitle: 'Save & Revisit',
    defaultDesc: 'Your full analysis history saved forever — compare looks any time.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    wide: true,
  },
];

export default function WhySection() {
  const { t } = useLang();

  return (
    <section className="bg-muted/50 px-6 py-12">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-black tracking-tight text-foreground">
          {t('whyTitle') || 'Why use Style Me?'}
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5">
          {t('whySubtitle') || 'Your style, elevated effortlessly.'}
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto space-y-3">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl overflow-hidden border border-border bg-card shadow-sm ${f.wide ? 'flex flex-col' : 'flex flex-row h-32'}`}
            >
              <img
                src={f.image}
                alt=""
                className={f.wide ? 'w-full h-44 object-cover' : 'w-32 h-full object-cover shrink-0'}
              />
              <div className="p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {t(f.titleKey) || f.defaultTitle}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(f.descKey) || f.defaultDesc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}