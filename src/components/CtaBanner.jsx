import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/AuthContext';
import { Sparkles } from 'lucide-react';

const content = {
  fr: {
    title: 'Prêt à sublimer votre style ?',
    subtitle: 'Rejoignez le futur de la mode. Un style personnel, simplifié.',
    cta: 'Commencer maintenant',
  },
  en: {
    title: 'Ready to upgrade your style?',
    subtitle: 'Join the future of fashion. Personal styling, simplified.',
    cta: 'Get Started Now',
  },
  es: {
    title: '¿Listo para mejorar tu estilo?',
    subtitle: 'Únete al futuro de la moda. Estilismo personal, simplificado.',
    cta: 'Empezar ahora',
  },
  ru: {
    title: 'Готовы улучшить свой стиль?',
    subtitle: 'Присоединяйтесь к будущему моды. Персональный стиль, упрощённо.',
    cta: 'Начать сейчас',
  },
  zh: {
    title: '准备好提升您的风格了吗？',
    subtitle: '加入时尚的未来。个人造型，简单实现。',
    cta: '立即开始',
  },
  pt: {
    title: 'Pronto para elevar seu estilo?',
    subtitle: 'Junte-se ao futuro da moda. Estilo pessoal, simplificado.',
    cta: 'Começar agora',
  },
};

export default function CtaBanner({ onSignIn }) {
  const { lang } = useLang();
  const { isAuthenticated } = useAuth();
  const c = content[lang] || content['fr'];

  if (isAuthenticated) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="px-5 mt-12 mb-4"
    >
      <div className="bg-foreground rounded-3xl p-7 text-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10">
          <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white leading-tight">{c.title}</h2>
          <p className="text-sm text-white/70 mt-2 leading-relaxed">{c.subtitle}</p>
          <button
            onClick={onSignIn}
            className="mt-5 w-full bg-white text-foreground font-semibold text-sm py-3.5 rounded-2xl hover:bg-white/90 active:scale-[0.98] transition-all"
          >
            {c.cta}
          </button>
        </div>
      </div>
    </motion.section>
  );
}