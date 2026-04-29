import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ExternalLink } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function ConsentBannerAndroid() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const hasConsent = localStorage.getItem('style_match_consent');
    if (!hasConsent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('style_match_consent', JSON.stringify({ timestamp: new Date() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[101] px-4 pb-6"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          <div className="rounded-2xl bg-white border border-gray-200 p-5 space-y-4 shadow-md">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm">{t('privacyTitle')}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t('privacyMessage')}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="/privacy"
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg border border-gray-200 text-xs font-semibold text-foreground hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                {t('learnMore')}
              </a>
              <button
                onClick={handleAccept}
                className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground text-xs font-semibold active:opacity-90 transition-opacity shadow-sm"
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}