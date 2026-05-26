import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/i18n';

const faqContent = {
  fr: [
    { q: 'Mes photos sont-elles privées ?', a: 'Oui. Vos photos ne sont jamais utilisées pour entraîner l\'IA et restent strictement confidentielles.' },
    { q: 'Combien d\'analyses gratuites ai-je ?', a: 'Vous bénéficiez de 5 analyses gratuites. Ensuite, vous pouvez acheter un pack de crédits.' },
    { q: 'Quelle photo dois-je télécharger ?', a: 'Un selfie ou portrait clair où l\'on voit bien votre visage et votre teint. Pas besoin de photo en pied.' },
    { q: 'Comment fonctionne le score ?', a: 'L\'IA analyse la compatibilité entre votre morphologie, votre teint et la tenue. Le score va de 0 à 100.' },
  ],
  en: [
    { q: 'Are my photos private?', a: 'Yes. Your photos are never used to train AI and remain strictly confidential.' },
    { q: 'How many free analyses do I get?', a: 'You get 5 free analyses. After that, you can purchase a credit pack.' },
    { q: 'What photo should I upload?', a: 'A clear selfie or portrait showing your face and complexion. No need for a full-body photo.' },
    { q: 'How does the score work?', a: 'The AI analyzes compatibility between your body type, complexion and the outfit. Score ranges from 0 to 100.' },
  ],
  es: [
    { q: '¿Mis fotos son privadas?', a: 'Sí. Tus fotos nunca se usan para entrenar IA y permanecen estrictamente confidenciales.' },
    { q: '¿Cuántos análisis gratuitos tengo?', a: 'Tienes 5 análisis gratuitos. Después puedes comprar un paquete de créditos.' },
    { q: '¿Qué foto debo subir?', a: 'Un selfie o retrato claro donde se vea bien tu cara y tez. No necesitas foto de cuerpo entero.' },
    { q: '¿Cómo funciona la puntuación?', a: 'La IA analiza la compatibilidad entre tu morfología, tez y el conjunto. La puntuación va de 0 a 100.' },
  ],
  ru: [
    { q: 'Мои фото конфиденциальны?', a: 'Да. Ваши фотографии никогда не используются для обучения ИИ и остаются строго конфиденциальными.' },
    { q: 'Сколько у меня бесплатных анализов?', a: 'Вам доступно 5 бесплатных анализов. После этого можно купить пакет кредитов.' },
    { q: 'Какое фото загружать?', a: 'Чёткое селфи или портрет с хорошо видимым лицом и тоном кожи. Фото в полный рост не нужно.' },
    { q: 'Как работает оценка?', a: 'ИИ анализирует совместимость вашей фигуры, тона кожи и наряда. Оценка от 0 до 100.' },
  ],
  zh: [
    { q: '我的照片是私密的吗？', a: '是的。您的照片永远不会用于训练AI，严格保密。' },
    { q: '我有多少免费分析次数？', a: '您有5次免费分析。之后可以购买信用点套餐。' },
    { q: '我应该上传什么照片？', a: '清晰的自拍或肖像，能清楚看到您的脸和肤色。不需要全身照。' },
    { q: '评分是如何工作的？', a: 'AI分析您的体型、肤色与服装的兼容性。评分从0到100。' },
  ],
  pt: [
    { q: 'Minhas fotos são privadas?', a: 'Sim. Suas fotos nunca são usadas para treinar IA e permanecem estritamente confidenciais.' },
    { q: 'Quantas análises gratuitas tenho?', a: 'Você tem 5 análises gratuitas. Depois pode comprar um pacote de créditos.' },
    { q: 'Que foto devo enviar?', a: 'Uma selfie ou retrato claro mostrando bem seu rosto e tom de pele. Não precisa de foto de corpo inteiro.' },
    { q: 'Como funciona a pontuação?', a: 'A IA analisa a compatibilidade entre seu tipo de corpo, tom de pele e a roupa. A pontuação vai de 0 a 100.' },
  ],
};

const titles = {
  fr: 'Questions fréquentes',
  en: 'FAQ',
  es: 'Preguntas frecuentes',
  ru: 'Вопросы и ответы',
  zh: '常见问题',
  pt: 'Perguntas frequentes',
};

export default function FaqSection() {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = faqContent[lang] || faqContent['fr'];
  const title = titles[lang] || titles['fr'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="px-6 mt-10 mb-6"
    >
      <h3 className="text-base font-semibold text-muted-foreground uppercase tracking-widest mb-6 text-center">
        {title}
      </h3>

      <div className="space-y-2">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.06 }}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-card border-border'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-4 py-4 text-left gap-3"
              >
                <span className="text-sm font-medium text-foreground leading-snug">{faq.q}</span>
                <div className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-colors ${
                  isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {isOpen
                    ? <Minus className="h-3 w-3" />
                    : <Plus className="h-3 w-3" />
                  }
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                  >
                    <p className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}