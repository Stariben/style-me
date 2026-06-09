import { motion } from 'framer-motion';
import { Camera, Image, Wand2, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const STEPS = [
  {
    icon: Camera,
    num: '01',
    titleKey: 'step1Title',
    descKey: 'step1Desc',
    gradient: 'from-blue-500 to-indigo-500',
    glow: 'shadow-blue-500/25',
  },
  {
    icon: Image,
    num: '02',
    titleKey: 'step2Title',
    descKey: 'step2Desc',
    gradient: 'from-violet-500 to-purple-500',
    glow: 'shadow-violet-500/25',
  },
  {
    icon: Wand2,
    num: '03',
    titleKey: 'step3Title',
    descKey: 'step3Desc',
    gradient: 'from-pink-500 to-rose-500',
    glow: 'shadow-pink-500/25',
  },
];

export default function HowItWorksSection({ onStartAnalysis }) {
  const { t } = useLang();

  return (
    <section id="section-how" className="bg-background px-5 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 max-w-2xl mx-auto"
      >
        <h2 className="text-[1.8rem] md:text-[2.8rem] font-black tracking-tight text-foreground">
          {t('howItWorksTitle')}
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground mt-3">
          {t('howItWorksSubtitle')}
        </p>
      </motion.div>

      <div className="max-w-2xl md:max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col items-start bg-card border border-border/60 rounded-2xl p-6 md:p-8"
            >
              {/* Step number */}
              <span className="absolute top-4 right-5 text-[11px] font-black text-muted-foreground/25 tracking-widest">
                {step.num}
              </span>
              {/* Icon */}
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-5 shadow-lg ${step.glow}`}>
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                {t(step.titleKey)}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(step.descKey)}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
        className="mt-10 text-center"
      >
        <button
          onClick={onStartAnalysis}
          className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-bold text-base md:text-lg px-9 py-4 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/30"
        >
          {t('startNow')}
        </button>
      </motion.div>
    </section>
  );
}