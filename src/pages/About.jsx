import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function About() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="max-w-lg mx-auto px-5 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground mb-8 text-sm hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl overflow-hidden shrink-0">
              <img src="/icons/icon-192.png" alt="Style Me" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xl font-black text-foreground tracking-tight">Style Me</p>
              <p className="text-xs text-muted-foreground">AI Fashion Advisor</p>
            </div>
          </div>

          <h1 className="text-3xl font-black text-foreground tracking-tight">{t('aboutTitle')}</h1>

          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>{t('aboutP1')}</p>
            <p>{t('aboutP2')}</p>
            <p>{t('aboutP3')}</p>
            <p>{t('aboutP4')}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}