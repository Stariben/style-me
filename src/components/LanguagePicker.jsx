import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang, translations } from '@/lib/i18n';

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
];

export default function LanguagePicker() {
  const { langChosen, setLang } = useLang();
  const [selected, setSelected] = useState('fr');

  // Live translation from the selected language (before confirming)
  const tPreview = (key) => translations[selected]?.[key] ?? translations['fr'][key] ?? key;

  if (langChosen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="w-full max-w-sm bg-card rounded-t-3xl sm:rounded-3xl border border-border shadow-2xl p-6 pb-10 sm:pb-6"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="text-4xl mb-3">🌍</div>
            <h2 className="text-xl font-bold">{tPreview('chooseLanguage')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{tPreview('languageSubtitle')}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all active:scale-95 ${
                  selected === lang.code
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border bg-background text-foreground'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setLang(selected)}
            className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold text-base transition-opacity active:opacity-80"
          >
            {tPreview('confirm')}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}