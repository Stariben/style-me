import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Clock } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Contact() {
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
        >
          <h1 className="text-3xl font-black text-foreground mb-2 tracking-tight">{t('contactUs')}</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">{t('aboutSubtitle')}</p>

          <div className="space-y-3">
            <a
              href="mailto:contact@stylematch.app"
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Email</p>
                <p className="text-muted-foreground text-sm mt-0.5">contact@stylematch.app</p>
              </div>
            </a>

            <button
              onClick={() => navigate('/account')}
              className="w-full flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{t('contactUs')}</p>
                <p className="text-muted-foreground text-sm mt-0.5">{t('manageAccount')}</p>
              </div>
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground justify-center">
            <Clock className="h-3.5 w-3.5" />
            <span>24–48h</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}