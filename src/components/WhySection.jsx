import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Palette, BookMarked } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const FEATURES = [
  {
    icon: Eye,
    titleKey: 'featureVisualTryOnTitle',
    descKey: 'featureVisualTryOnDesc',
    color: 'text-violet-600',
    bg: 'bg-violet-500/10',
    border: 'border-violet-200/60',
  },
  {
    icon: ShieldCheck,
    titleKey: 'featurePrivacyTitle',
    descKey: 'featurePrivacyDesc',
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-200/60',
  },
  {
    icon: Palette,
    titleKey: 'featureStyleTitle',
    descKey: 'featureStyleDesc',
    color: 'text-amber-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-200/60',
  },
  {
    icon: BookMarked,
    titleKey: 'featureSaveTitle',
    descKey: 'featureSaveDesc',
    color: 'text-sky-600',
    bg: 'bg-sky-500/10',
    border: 'border-sky-200/60',
  },
];

export default function WhySection() {
  const { t } = useLang();

  return (
    <section id="section-why" className="bg-muted/30 px-5 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 max-w-2xl mx-auto"
      >
        <h2 className="text-[1.8rem] md:text-[2.8rem] font-black tracking-tight text-foreground">
          {t('whyTitle')}
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground mt-3">
          {t('whySubtitle')}
        </p>
      </motion.div>

      <div className="max-w-2xl md:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.08 }}
              className={`group rounded-2xl border ${f.border} bg-card p-6 md:p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
            >
              <div className={`h-12 w-12 rounded-xl ${f.bg} flex items-center justify-center mb-5`}>
                <Icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 leading-tight">
                {t(f.titleKey)}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(f.descKey)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}