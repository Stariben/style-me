import { motion } from 'framer-motion';
import { Camera, SlidersHorizontal, Wand2, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const STEPS = [
  {
    icon: Camera,
    num: '01',
    titleKey: 'step1Title',
    descKey: 'step1Desc',
    defaultTitle: 'Your photo',
    defaultDesc: 'Take a quick selfie or upload a full-body photo. No posing needed — just you.',
    accent: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: SlidersHorizontal,
    num: '02',
    titleKey: 'step2Title',
    descKey: 'step2Desc',
    defaultTitle: 'The outfit',
    defaultDesc: 'Upload the outfit you want to try — a screenshot, photo, or store image.',
    accent: 'bg-violet-500/10 text-violet-600',
  },
  {
    icon: Wand2,
    num: '03',
    titleKey: 'step3Title',
    descKey: 'step3Desc',
    defaultTitle: 'The analysis',
    defaultDesc: 'Our AI generates a photorealistic preview with a match score and style tips.',
    accent: 'bg-pink-500/10 text-pink-600',
  },
];

export default function HowItWorksSection({ onStartAnalysis }) {
  const { t } = useLang();

  return (
    <section className="bg-background px-5 py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-9 max-w-lg mx-auto"
      >
        <h2 className="text-[1.7rem] font-black tracking-tight text-foreground">
          {t('howItWorksTitle') || 'Three simple steps'}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {t('howItWorksSubtitle') || 'Upload a photo and get styled in seconds.'}
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto space-y-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.09 }}
              className="flex items-center gap-4 bg-card border border-border/60 rounded-2xl p-5 shadow-sm"
            >
              {/* Number */}
              <div className="shrink-0 text-[11px] font-black text-muted-foreground/40 w-6 text-right tracking-tight">
                {step.num}
              </div>
              {/* Icon */}
              <div className={`shrink-0 h-12 w-12 rounded-xl flex items-center justify-center ${step.accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-foreground leading-tight">
                  {t(step.titleKey) || step.defaultTitle}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {t(step.descKey) || step.defaultDesc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        onClick={onStartAnalysis}
        className="mt-8 max-w-lg mx-auto w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm py-3.5 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/25"
      >
        {t('startNow') || 'Start Now'}
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </section>
  );
}