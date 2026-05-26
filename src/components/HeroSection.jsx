import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles, LogIn } from 'lucide-react';

const heroContent = {
  fr: {
    badge: '✦ Votre styliste IA de poche',
    title: 'Des tenues IA,',
    titleAccent: 'personnalisées pour vous.',
    subtitle: 'Téléchargez une photo et découvrez instantanément si une tenue vous va. Score, aperçu IA et conseils en quelques secondes.',
    cta: 'Commencer gratuitement',
    ctaSub: 'Connectez-vous pour accéder au scanner IA',
  },
  en: {
    badge: '✦ AI stylist in your pocket',
    title: 'AI-powered outfits,',
    titleAccent: 'personalized to you.',
    subtitle: 'Upload a photo and instantly discover if an outfit suits you. Score, AI preview and style tips in seconds.',
    cta: 'Get started for free',
    ctaSub: 'Sign in to access the AI scanner',
  },
  es: {
    badge: '✦ Tu estilista IA de bolsillo',
    title: 'Looks con IA,',
    titleAccent: 'personalizados para ti.',
    subtitle: 'Sube una foto y descubre al instante si un conjunto te favorece. Puntuación, vista previa y consejos en segundos.',
    cta: 'Comenzar gratis',
    ctaSub: 'Inicia sesión para acceder al escáner IA',
  },
  ru: {
    badge: '✦ Ваш ИИ-стилист в кармане',
    title: 'Образы от ИИ,',
    titleAccent: 'персонально для вас.',
    subtitle: 'Загрузите фото и мгновенно узнайте, подходит ли вам наряд. Оценка, превью и советы за секунды.',
    cta: 'Начать бесплатно',
    ctaSub: 'Войдите, чтобы использовать ИИ-сканер',
  },
  zh: {
    badge: '✦ 您的口袋 AI 造型师',
    title: 'AI 个性化穿搭，',
    titleAccent: '专为您打造。',
    subtitle: '上传照片，即刻发现服装是否适合您。几秒内获得评分、AI 预览和造型建议。',
    cta: '免费开始',
    ctaSub: '登录以使用 AI 扫描仪',
  },
  pt: {
    badge: '✦ Seu estilista IA de bolso',
    title: 'Looks com IA,',
    titleAccent: 'personalizados para você.',
    subtitle: 'Envie uma foto e descubra instantaneamente se uma roupa combina com você. Pontuação, prévia IA e dicas em segundos.',
    cta: 'Começar de graça',
    ctaSub: 'Faça login para acessar o scanner IA',
  },
};

export default function HeroSection({ onSignIn }) {
  const { lang } = useLang();
  const { isAuthenticated } = useAuth();
  const content = heroContent[lang] || heroContent['fr'];

  return (
    <section className="px-5 pt-8 pb-6">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/8 border border-primary/15 px-3 py-1.5 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {content.badge.replace('✦ ', '')}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="mt-4"
      >
        <h1 className="text-4xl font-extrabold tracking-tight leading-[1.1] text-foreground">
          {content.title}
          <br />
          <span className="text-primary">{content.titleAccent}</span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16 }}
        className="mt-4 text-[15px] text-muted-foreground leading-relaxed"
      >
        {content.subtitle}
      </motion.p>

      {/* CTA — only for unauthenticated */}
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="mt-6 flex flex-col gap-3"
        >
          <button
            onClick={onSignIn}
            className="w-full flex items-center justify-center gap-2 bg-foreground text-white font-semibold text-[15px] py-3.5 rounded-2xl hover:bg-foreground/90 active:scale-[0.98] transition-all"
          >
            <LogIn className="h-4 w-4" />
            {content.cta}
          </button>
          <p className="text-xs text-center text-muted-foreground">{content.ctaSub}</p>
        </motion.div>
      )}
    </section>
  );
}