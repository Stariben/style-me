import { useLang } from '@/lib/i18n';
import { Camera, Sliders, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { icon: Camera, gradient: 'from-violet-500 to-purple-600', num: '1' },
  { icon: Sliders, gradient: 'from-purple-500 to-pink-500', num: '2' },
  { icon: Sparkles, gradient: 'from-pink-500 to-rose-500', num: '3' },
];

const stepContent = {
  fr: {
    title: 'Trois étapes simples',
    subtitle: 'Téléchargez, analysez, et découvrez votre style.',
    steps: [
      { step: 'Étape 1', title: 'Téléchargez vos photos', desc: 'Un selfie clair + la tenue que vous envisagez. Aucune mise en scène requise.' },
      { step: 'Étape 2', title: 'Notre IA analyse', desc: 'Morphologie, teint et compatibilité étudiés en quelques secondes.' },
      { step: 'Étape 3', title: 'Obtenez votre résultat', desc: 'Score, aperçu IA et conseils de style personnalisés instantanément.' },
    ],
  },
  en: {
    title: 'Three simple steps',
    subtitle: 'Upload, analyze, and discover your style.',
    steps: [
      { step: 'Step 1', title: 'Upload your photos', desc: 'A clear selfie + the outfit you are considering. No posing skills needed.' },
      { step: 'Step 2', title: 'AI analyzes', desc: 'Body type, complexion and compatibility studied in seconds.' },
      { step: 'Step 3', title: 'Get your result', desc: 'Score, AI preview and personalized style advice instantly.' },
    ],
  },
  es: {
    title: 'Tres pasos simples',
    subtitle: 'Sube, analiza y descubre tu estilo.',
    steps: [
      { step: 'Paso 1', title: 'Sube tus fotos', desc: 'Un selfie claro + el conjunto que estás considerando.' },
      { step: 'Paso 2', title: 'La IA analiza', desc: 'Morfología, tez y compatibilidad estudiadas en segundos.' },
      { step: 'Paso 3', title: 'Obtén tu resultado', desc: 'Puntuación, vista previa IA y consejos de estilo al instante.' },
    ],
  },
  ru: {
    title: 'Три простых шага',
    subtitle: 'Загрузите, проанализируйте и откройте свой стиль.',
    steps: [
      { step: 'Шаг 1', title: 'Загрузите фото', desc: 'Чёткое селфи + наряд, который вы рассматриваете.' },
      { step: 'Шаг 2', title: 'ИИ анализирует', desc: 'Фигура, тон кожи и совместимость — за секунды.' },
      { step: 'Шаг 3', title: 'Получите результат', desc: 'Оценка, превью ИИ и персональные советы по стилю.' },
    ],
  },
  zh: {
    title: '三个简单步骤',
    subtitle: '上传、分析，发现您的风格。',
    steps: [
      { step: '步骤 1', title: '上传照片', desc: '清晰的自拍 + 您正在考虑的服装。' },
      { step: '步骤 2', title: 'AI 分析', desc: '体型、肤色和兼容性，几秒内完成。' },
      { step: '步骤 3', title: '获取结果', desc: '即时获得评分、AI 预览和个性化搭配建议。' },
    ],
  },
  pt: {
    title: 'Três etapas simples',
    subtitle: 'Envie, analise e descubra seu estilo.',
    steps: [
      { step: 'Etapa 1', title: 'Envie suas fotos', desc: 'Uma selfie clara + a roupa que está considerando.' },
      { step: 'Etapa 2', title: 'A IA analisa', desc: 'Tipo de corpo, tom de pele e compatibilidade em segundos.' },
      { step: 'Etapa 3', title: 'Obtenha seu resultado', desc: 'Pontuação, prévia IA e conselhos de estilo instantâneos.' },
    ],
  },
};

export default function HowItWorks() {
  const { lang } = useLang();
  const content = stepContent[lang] || stepContent['fr'];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="px-5 mt-12"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">{content.title}</h2>
        <p className="text-sm text-muted-foreground mt-1.5">{content.subtitle}</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => {
          const StepIcon = step.icon;
          return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.09 }}
            className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
          >
            <div className="relative shrink-0">
              <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                <StepIcon className="h-5 w-5 text-white" strokeWidth={2} />
              </div>
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-foreground text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {step.num}
              </span>
            </div>
            <div className="pt-0.5">
              <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{content.steps[i].step}</span>
              <p className="font-semibold text-sm text-foreground mt-0.5">{content.steps[i].title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{content.steps[i].desc}</p>
            </div>
          </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}