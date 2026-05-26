import { useLang } from '@/lib/i18n';
import { Camera, Wand2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { icon: Camera, color: 'from-violet-500 to-purple-600' },
  { icon: Wand2, color: 'from-purple-500 to-pink-500' },
  { icon: Sparkles, color: 'from-pink-500 to-rose-500' },
];

const stepContent = {
  fr: [
    { title: 'Téléchargez vos photos', desc: 'Un selfie clair + la tenue que vous envisagez.' },
    { title: 'Notre IA analyse', desc: 'Morphologie, teint et compatibilité étudiés en quelques secondes.' },
    { title: 'Obtenez votre résultat', desc: 'Score, aperçu IA et conseils de style personnalisés.' },
  ],
  en: [
    { title: 'Upload your photos', desc: 'A clear selfie + the outfit you are considering.' },
    { title: 'AI analyzes', desc: 'Body type, complexion and compatibility studied in seconds.' },
    { title: 'Get your result', desc: 'Score, AI preview and personalized style advice.' },
  ],
  es: [
    { title: 'Sube tus fotos', desc: 'Un selfie claro + el conjunto que estás considerando.' },
    { title: 'La IA analiza', desc: 'Morfología, tez y compatibilidad estudiadas en segundos.' },
    { title: 'Obtén tu resultado', desc: 'Puntuación, vista previa IA y consejos de estilo.' },
  ],
  ru: [
    { title: 'Загрузите фото', desc: 'Чёткое селфи + наряд, который вы рассматриваете.' },
    { title: 'ИИ анализирует', desc: 'Фигура, тон кожи и совместимость — за секунды.' },
    { title: 'Получите результат', desc: 'Оценка, превью ИИ и персональные советы по стилю.' },
  ],
  zh: [
    { title: '上传照片', desc: '清晰的自拍 + 您正在考虑的服装。' },
    { title: 'AI分析', desc: '体型、肤色和兼容性，几秒内完成。' },
    { title: '获取结果', desc: '评分、AI预览和个性化搭配建议。' },
  ],
  pt: [
    { title: 'Envie suas fotos', desc: 'Uma selfie clara + a roupa que está considerando.' },
    { title: 'A IA analisa', desc: 'Tipo de corpo, tom de pele e compatibilidade em segundos.' },
    { title: 'Obtenha seu resultado', desc: 'Pontuação, prévia IA e conselhos de estilo personalizados.' },
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
      <h3 className="text-base font-semibold text-muted-foreground uppercase tracking-widest mb-6 text-center">
        {title}
      </h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-violet-500/30 via-pink-500/20 to-transparent" />

        <div className="space-y-6">
          {steps.map(({ icon: Icon, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
              className="flex items-start gap-4"
            >
              <div className={`shrink-0 h-10 w-10 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg shadow-primary/20`}>
                <Icon className="h-4.5 w-4.5 text-white" strokeWidth={2} />
              </div>
              <div className="pt-1.5">
                <p className="font-semibold text-sm text-foreground">{content[i].title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{content[i].desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}