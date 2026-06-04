import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';

export default function PricingSection({ onStartAnalysis }) {
  const { t } = useLang();

  const packs = [
    {
      labelKey: 'paywallPack10Label',
      priceKey: 'paywallPack10Price',
      perKey: 'paywallPack10Per',
      best: false,
      analyses: 10,
    },
    {
      labelKey: 'paywallPack50Label',
      priceKey: 'paywallPack50Price',
      perKey: 'paywallPack50Per',
      best: true,
      analyses: 50,
    },
  ];

  return (
    <section id="section-pricing" className="bg-muted/40 px-5 py-14 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 max-w-2xl mx-auto"
      >
        <h2 className="text-[1.7rem] md:text-[2.6rem] font-black tracking-tight text-foreground">
          {t('pricingTitle')}
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground mt-2">
          {t('pricingSubtitle')}
        </p>
      </motion.div>

      {/* Free tier */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="max-w-md mx-auto mb-5"
      >
        <div className="rounded-2xl border border-border bg-card px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">{t('pricingFreeLabel')}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{t('pricingFreeDesc')}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-black text-foreground">0€</p>
            <p className="text-xs text-muted-foreground">{t('pricingFreeNote')}</p>
          </div>
        </div>
      </motion.div>

      {/* Paid packs */}
      <div className="max-w-md mx-auto space-y-4">
        {packs.map((pack, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={`relative rounded-2xl border px-6 py-5 ${
              pack.best
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                : 'border-border bg-card'
            }`}
          >
            {pack.best && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                {t('paywallBestValue')}
              </span>
            )}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  {t(pack.labelKey)}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{t(pack.perKey)}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-black text-foreground">{t(pack.priceKey)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Features list */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-md mx-auto mt-7 space-y-2"
      >
        {[t('pricingFeature1'), t('pricingFeature2'), t('pricingFeature3')].map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-primary shrink-0" />
            {f}
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-8"
      >
        <Button onClick={onStartAnalysis} size="lg" className="rounded-xl px-8 font-bold">
          {t('getStartedFree')}
        </Button>
        <p className="text-xs text-muted-foreground mt-3">{t('paywallSecure')}</p>
      </motion.div>
    </section>
  );
}