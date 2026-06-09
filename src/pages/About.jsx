import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Heart, Zap, Users } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function About() {
  const navigate = useNavigate();
  const { t } = useLang();

  const highlights = [
    { icon: Zap, label: t('aboutHighlight1') },
    { icon: Heart, label: t('aboutHighlight2') },
    { icon: Users, label: t('aboutHighlight3') },
  ];

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 flex items-center gap-3 px-5 py-3">
        <button
          onClick={() => navigate(-1)}
          className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-bold text-sm">{t('aboutTitle')}</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-6 pb-8 max-w-2xl mx-auto"
      >
        {/* Brand banner */}
        <div className="mb-8 p-5 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0">
            <img src="/icons/icon-192.png" alt="StyleMe" className="w-full h-full object-cover" />
          </div>
          <p className="text-sm text-foreground leading-relaxed pt-1">
            <span className="font-bold">StyleMe — </span>
            {t('aboutBannerText')}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {[t('aboutP1'), t('aboutP2'), t('aboutP3'), t('aboutP4')].filter(Boolean).map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="text-sm text-muted-foreground leading-relaxed border-b border-border/50 pb-6 last:border-0"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Highlights */}
        <div className="space-y-3 mb-8">
          {highlights.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card"
            >
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{label}</p>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-full flex items-center justify-center gap-2 border border-border rounded-xl h-11 text-sm font-medium hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          {t('back')}
        </button>
      </motion.div>
    </div>
  );
}