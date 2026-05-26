import { useLang } from '@/lib/i18n';
import { Camera, Sliders, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { icon: Camera, key: 'step1' },
  { icon: Sliders, key: 'step2' },
  { icon: Sparkles, key: 'step3' },
];

const stepContent = {
  fr: [
    { title: 'Téléchargez vos photos', desc: 'Un selfie ou portrait clair + la tenue que vous envisagez.' },
    { title: 'Notre IA analyse', desc: 'L\'IA étudie votre morphologie, votre teint et la compatibilité avec la tenue.' },
    { title: 'Obtenez votre résultat', desc: 'Score de compatibilité, aperçu IA et conseils personnalisés en quelques secondes.' },
  ],
  en: [
    { title: 'Upload your photos', desc: 'A clear selfie or portrait + the outfit you are considering.' },
    { title: 'AI analyzes', desc: 'The AI studies your body type, complexion and outfit compatibility.' },
    { title: 'Get your result', desc: 'Compatibility score, AI preview and personalized advice in seconds.' },
  ],
  es: [
    { title: 'Sube tus fotos', desc: 'Un selfie claro o retrato + el conjunto que estás considerando.' },
    { title: 'La IA analiza', desc: 'La IA estudia tu morfología, tez y compatibilidad con el conjunto.' },
    { title: 'Obtén tu resultado', desc: 'Puntuación de compatibilidad, vista previa IA y consejos personalizados en segundos.' },
  ],
  ru: [
    { title: 'Загрузите фото', desc: 'Чёткое селфи или портрет + наряд, который вы рассматриваете.' },
    { title: 'ИИ анализирует', desc: 'ИИ изучает вашу фигуру, тон кожи и совместимость с нарядом.' },
    { title: 'Получите результат', desc: 'Оценка совместимости, превью ИИ и персональные советы за секунды.' },
  ],
  zh: [
    { title: '上传照片', desc: '清晰的自拍或肖像 + 您正在考虑的服装。' },
    { title: 'AI分析', desc: 'AI分析您的体型、肤色以及与服装的兼容性。' },
    { title: '获取结果', desc: '几秒钟内获得兼容性评分、AI预览和个性化建议。' },
  ],
  pt: [
    { title: 'Envie suas fotos', desc: 'Uma selfie clara ou retrato + a roupa que está considerando.' },
    { title: 'A IA analisa', desc: 'A IA estuda seu tipo de corpo, tom de pele e compatibilidade com a roupa.' },
    { title: 'Obtenha seu resultado', desc: 'Pontuação de compatibilidade, prévia IA e conselhos personalizados em segundos.' },
  ],
};

const titles = {
  fr: 'Comment ça marche ?',
  en: 'How it Works',
  es: '¿Cómo funciona?',
  ru: 'Как это работает?',
  zh: '如何使用？',
  pt: 'Como funciona?',
};

export default function HowItWorks() {
  const { lang } = useLang();
  const content = stepContent[lang] || stepContent['fr'];
  const title = titles[lang] || titles['fr'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="px-6 mt-10"
    >
      <h3 className="text-lg font-bold text-foreground mb-5 text-center">{title}</h3>
      <div className="space-y-4">
        {steps.map(({ icon: Icon, key }, i) => (
          <div key={key} className="flex items-start gap-4">
            <div className="shrink-0 h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="pt-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                  {i + 1}
                </span>
                <p className="font-semibold text-sm text-foreground">{content[i].title}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{content[i].desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}