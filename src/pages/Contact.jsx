import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail, MessageCircle, Clock, Headphones } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Contact() {
  const navigate = useNavigate();
  const { t } = useLang();

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
          <Headphones className="h-4 w-4 text-primary" />
          <span className="font-bold text-sm">{t('contactUs') || 'Contact'}</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-6 pb-8 max-w-2xl mx-auto"
      >
        {/* Banner */}
        <div className="mb-8 p-5 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-3">
          <Headphones className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-bold">{t('contactUs') || 'Nous contacter'} — </span>
            {t('contactBannerText') || 'Notre équipe est disponible pour répondre à toutes vos questions.'}
          </p>
        </div>

        <div className="space-y-3 mb-8">
          <motion.a
            href="mailto:contact@styleme.app"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Email</p>
              <p className="text-muted-foreground text-sm mt-0.5">contact@styleme.app</p>
            </div>
          </motion.a>

          <motion.button
            onClick={() => navigate('/account')}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{t('contactUs') || 'Support'}</p>
              <p className="text-muted-foreground text-sm mt-0.5">{t('manageAccount') || 'Formulaire de contact'}</p>
            </div>
          </motion.button>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center mb-8">
          <Clock className="h-3.5 w-3.5" />
          <span>24–48h</span>
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