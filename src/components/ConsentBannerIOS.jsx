import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Link as LinkIcon } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function ConsentBannerIOS() {
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
          className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-6"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          <div className="rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/40 to-white/20 border border-white/30 p-5 space-y-4">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white text-sm">{t('privacyTitle')}</h3>
                <p className="text-xs text-white/70 mt-1">{t('privacyMessage')}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="/privacy"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/20 border border-white/30 text-xs font-medium text-white hover:bg-white/30 transition-colors"
              >
                <LinkIcon className="h-3.5 w-3.5" />
                {t('learnMore')}
              </a>
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold active:scale-95 transition-transform"
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