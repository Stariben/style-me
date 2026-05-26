import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { Eye, ShoppingBag, Palette, Heart } from 'lucide-react';

const features = [
  { icon: Eye, gradient: 'from-violet-500 to-purple-600' },
  { icon: ShoppingBag, gradient: 'from-purple-500 to-pink-500' },
  { icon: Palette, gradient: 'from-pink-500 to-rose-500' },
  { icon: Heart, gradient: 'from-rose-400 to-orange-400' },
];

const featureContent = {
  fr: {
    title: 'Pourquoi Style Me AI ?',
    subtitle: 'Votre style, sublimé sans effort.',
    items: [
      { title: 'Aperçu visuel IA', desc: 'Visualisez-vous dans n\'importe quelle tenue avant de l\'acheter.' },
      { title: 'Budget intelligent', desc: 'Obtenez des conseils adaptés à votre budget, sans compromis.' },
      { title: 'Style personnalisé', desc: 'Du casual au formel, des looks qui correspondent à votre esthétique.' },
      { title: 'Analyses sauvegardées', desc: 'Retrouvez vos analyses passées et comparez vos tenues favorites.' },
    ],
  },
  en: {
    title: 'Why Style Me AI?',
    subtitle: 'Your style, elevated effortlessly.',
    items: [
      { title: 'Visual AI Try-On', desc: 'See yourself in any outfit before you buy — no guessing.' },
      { title: 'Smart Budgeting', desc: 'Get styled recommendations that match your price range.' },
      { title: 'Personal Style', desc: 'From casual to formal — looks that match your aesthetic.' },
      { title: 'Saved Analyses', desc: 'Revisit past analyses and compare your favourite outfits.' },
    ],
  },
  es: {
    title: '¿Por qué Style Me AI?',
    subtitle: 'Tu estilo, elevado sin esfuerzo.',
    items: [
      { title: 'Vista previa IA', desc: 'Mírate con cualquier conjunto antes de comprarlo.' },
      { title: 'Presupuesto inteligente', desc: 'Recomendaciones adaptadas a tu rango de precios.' },
      { title: 'Estilo personal', desc: 'De casual a formal — looks que coinciden con tu estética.' },
      { title: 'Análisis guardados', desc: 'Revisa tus análisis pasados y compara tus conjuntos favoritos.' },
    ],
  },
  ru: {
    title: 'Почему Style Me AI?',
    subtitle: 'Ваш стиль, возведённый без усилий.',
    items: [
      { title: 'Визуальная примерка ИИ', desc: 'Увидьте себя в любом наряде до покупки — без догадок.' },
      { title: 'Умный бюджет', desc: 'Рекомендации, соответствующие вашему ценовому диапазону.' },
      { title: 'Личный стиль', desc: 'От casual до formal — образы под ваш стиль.' },
      { title: 'Сохранённые анализы', desc: 'Просматривайте прошлые анализы и сравнивайте любимые образы.' },
    ],
  },
  zh: {
    title: '为什么选择 Style Me AI？',
    subtitle: '您的风格，轻松提升。',
    items: [
      { title: 'AI 视觉试穿', desc: '购买前先看自己穿上任何服装的效果。' },
      { title: '智能预算', desc: '获得符合您价格范围的造型建议。' },
      { title: '个人风格', desc: '从休闲到正式——符合您审美的造型。' },
      { title: '保存的分析', desc: '回顾过去的分析，比较您最喜欢的搭配。' },
    ],
  },
  pt: {
    title: 'Por que Style Me AI?',
    subtitle: 'Seu estilo, elevado sem esforço.',
    items: [
      { title: 'Prévia Visual IA', desc: 'Veja-se em qualquer roupa antes de comprar — sem adivinhar.' },
      { title: 'Orçamento Inteligente', desc: 'Recomendações adaptadas à sua faixa de preço.' },
      { title: 'Estilo Pessoal', desc: 'Do casual ao formal — looks que combinam com sua estética.' },
      { title: 'Análises Salvas', desc: 'Reveja análises passadas e compare seus looks favoritos.' },
    ],
  },
};

export default function FeatureCards() {
  const { lang } = useLang();
  const content = featureContent[lang] || featureContent['fr'];

  return (
    <section className="px-5 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-7"
      >
        <h2 className="text-2xl font-bold text-foreground tracking-tight">{content.title}</h2>
        <p className="text-sm text-muted-foreground mt-1.5">{content.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, i) => {
          const FeatureIcon = feature.icon;
          return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.07 }}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
          >
            <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 shadow-md`}>
              <FeatureIcon className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <p className="font-semibold text-[13px] text-foreground leading-tight">{content.items[i].title}</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{content.items[i].desc}</p>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}