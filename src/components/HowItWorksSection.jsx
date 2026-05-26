import { motion } from 'framer-motion';
import { Camera, SlidersHorizontal, Wand2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const STEPS = [
  {
    icon: Camera,
    num: '1',
    titleKey: 'step1Title',
    descKey: 'step1Desc',
    defaultTitle: 'Upload Photo',
    defaultDesc: 'Take a quick selfie or upload a full-body photo. No posing skills needed — just you, as you are.',
  },
  {
    icon: SlidersHorizontal,
    num: '2',
    titleKey: 'step2Title',
    descKey: 'step2Desc',
    defaultTitle: 'Choose Outfit',
    defaultDesc: 'Upload the outfit you want to try — a screenshot, photo, or store image.',
  },
  {
    icon: Wand2,
    num: '3',
    titleKey: 'step3Title',
    descKey: 'step3Desc',
    defaultTitle: 'Get Styled',
    defaultDesc: 'Our AI generates a photorealistic preview of you in the outfit, with a match score and styling tips.',
  },
];

export default function HowItWorksSection({ onStartAnalysis }) {
  const { t } = useLang();

  return (
    <section className="px-6 py-10 bg-muted/40 rounded-3xl mx-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-black tracking-tight text-foreground">
          {t('howItWorksTitle') || 'Three simple steps'}
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5">
          {t('howItWorksSubtitle') || 'Upload a photo and get styled in seconds.'}
        </p>
      </motion.div>

      <div className="space-y-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4"
            >
              {/* Step number + line */}
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-2xl bg-foreground text-background flex items-center justify-center font-black text-sm shrink-0">
                  {step.num}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-px h-8 bg-border mt-2" />
                )}
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">
                    {t(step.titleKey) || step.defaultTitle}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
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
        className="mt-8 w-full bg-primary text-primary-foreground font-semibold text-sm py-3.5 rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/25"
      >
        {t('startNow') || 'Start Now →'}
      </motion.button>
    </section>
  );
}