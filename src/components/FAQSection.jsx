import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const FAQ_KEYS = [
  { qKey: 'faq1Q', aKey: 'faq1A' },
  { qKey: 'faq2Q', aKey: 'faq2A' },
  { qKey: 'faq3Q', aKey: 'faq3A' },
  { qKey: 'faq4Q', aKey: 'faq4A' },
  { qKey: 'faq5Q', aKey: 'faq5A' },
  { qKey: 'faq6Q', aKey: 'faq6A' },
  { qKey: 'faq7Q', aKey: 'faq7A' },
];

export default function FAQSection() {
  const { t } = useLang();
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-background px-5 py-14 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-9 max-w-2xl mx-auto"
      >
        <h2 className="text-[1.7rem] md:text-[2.6rem] font-black tracking-tight text-foreground">
          {t('faqTitle') || 'Questions fréquentes'}
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground mt-2">
          {t('faqSubtitle') || 'Tout ce que vous devez savoir.'}
        </p>
      </motion.div>

      <div className="max-w-2xl md:max-w-4xl mx-auto space-y-2 md:space-y-3">
        {FAQ_KEYS.map(({ qKey, aKey }, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border/60 bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-5 md:px-8 py-4 md:py-6 text-left gap-3"
              >
                <span className="text-[15px] md:text-lg font-semibold text-foreground leading-snug">
                  {t(qKey)}
                </span>
                <ChevronDown
                  className={`h-5 w-5 md:h-6 md:w-6 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-8 pb-4 md:pb-6 text-[14px] md:text-base text-muted-foreground leading-relaxed">
                      {t(aKey)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}