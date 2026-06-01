import { motion } from 'framer-motion';
import { Eye, ShoppingBag, Palette, BookMarked } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const FEATURES = [
  {
    icon: Eye,
    titleKey: 'featureVisualTryOnTitle',
    descKey: 'featureVisualTryOnDesc',
    defaultTitle: 'AI Visual Try-On',
    defaultDesc: 'Upload a photo and instantly see yourself in the outfit. No more guessing before buying.',
    color: 'from-violet-500/10 to-purple-500/5',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600',
  },
  {
    icon: ShoppingBag,
    titleKey: 'featurePrivacyTitle',
    descKey: 'featurePrivacyDesc',
    defaultTitle: 'Vie privée protégée',
    defaultDesc: 'Vos photos ne sont jamais partagées. Seule notre IA les analyse.',
    color: 'from-pink-500/10 to-rose-500/5',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-600',
  },
  {
    icon: Palette,
    titleKey: 'featureStyleTitle',
    descKey: 'featureStyleDesc',
    defaultTitle: 'Personal Style',
    defaultDesc: 'Advice tailored to your body type and complexion for the perfect look.',
    color: 'from-amber-500/10 to-orange-500/5',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
  },
  {
    icon: BookMarked,
    titleKey: 'featureSaveTitle',
    descKey: 'featureSaveDesc',
    defaultTitle: 'Full History',
    defaultDesc: 'All your analyses saved. Compare your outfits any time.',
    color: 'from-emerald-500/10 to-teal-500/5',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600',
  },
];

export default function WhySection() {
  const { t } = useLang();

  return (
    <section className="bg-muted/40 px-5 py-14">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-9 text-center max-w-lg mx-auto"
      >
        <h2 className="text-[2rem] font-black tracking-tight text-foreground">
          {t('whyTitle') || 'Why use Style Me?'}
        </h2>
        <p className="text-base text-muted-foreground mt-2">
          {t('whySubtitle') || 'Your style, elevated effortlessly.'}
        </p>
      </motion.div>

      {/* Feature grid */}
      <div className="max-w-lg mx-auto grid grid-cols-2 gap-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.07 }}
              className={`rounded-2xl p-6 bg-gradient-to-br ${f.color} border border-border/50 bg-card`}
            >
              <div className={`h-14 w-14 rounded-xl ${f.iconBg} flex items-center justify-center mb-4`}>
                <Icon className={`${f.iconColor}`} size={26} />
              </div>
              <p className="text-[17px] font-bold text-foreground mb-2 leading-tight">
                {t(f.titleKey) || f.defaultTitle}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(f.descKey) || f.defaultDesc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}