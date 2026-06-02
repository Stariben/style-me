import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/i18n';

const CONSENT_KEY = 'stylematch_gdpr_consent_v1';

export default function ConsentBanner() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-20 left-0 right-0 z-50 px-4"
        >
          <div className="bg-card border border-border rounded-2xl shadow-xl p-4 max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground mb-1">{t('consentTitle')}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('consentDesc')}{' '}
                  <Link to="/terms" className="text-primary underline underline-offset-2">
                   {t('learnMore')}
                  </Link>
                  </p>
                  </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                  <Button
                  onClick={accept}
                  size="sm"
                  className="flex-1 rounded-xl h-9 text-xs"
                  >
                  {t('consentAccept')}
                  </Button>
                  <Link to="/terms" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full rounded-xl h-9 text-xs">
                  {t('learnMore')}
                  </Button>
                  </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}