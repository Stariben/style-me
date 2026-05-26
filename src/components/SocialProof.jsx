import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { Star } from 'lucide-react';

const testimonials = {
  fr: [
    { name: 'Marie', handle: 'Utilisatrice Style Me AI', quote: 'Je télécharge une photo, je choisis un style et j\'obtiens des tenues que je porterais vraiment. Incroyable !' },
    { name: 'Lucas', handle: 'Utilisateur Style Me AI', quote: 'Fini les doutes devant le miroir. Le score me dit exactement si une tenue me va. Super utile.' },
    { name: 'Aisha', handle: 'Utilisatrice Style Me AI', quote: 'J\'ai redécouvert ma garde-robe grâce à l\'IA. Je combine mes vêtements différemment maintenant.' },
  ],
  en: [
    { name: 'Marie', handle: 'Style Me AI user', quote: 'I upload a photo, pick a vibe, and it gives me outfits I\'d actually wear. The AI preview is incredible!' },
    { name: 'Lucas', handle: 'Style Me AI user', quote: 'No more second-guessing in front of the mirror. The score tells me exactly if an outfit works.' },
    { name: 'Aisha', handle: 'Style Me AI user', quote: 'I rediscovered my wardrobe with AI. I\'m combining my clothes differently now and buying smarter.' },
  ],
  es: [
    { name: 'Marie', handle: 'Usuaria de Style Me AI', quote: 'Subo una foto, elijo un estilo y obtengo conjuntos que usaría de verdad. ¡La vista previa IA es increíble!' },
    { name: 'Lucas', handle: 'Usuario de Style Me AI', quote: 'Se acabaron las dudas frente al espejo. La puntuación me dice exactamente si un conjunto me favorece.' },
    { name: 'Aisha', handle: 'Usuaria de Style Me AI', quote: 'Redescubrí mi guardarropa gracias a la IA. Ahora combino mis prendas de forma diferente.' },
  ],
  ru: [
    { name: 'Мария', handle: 'Пользователь Style Me AI', quote: 'Загружаю фото, выбираю стиль — и получаю образы, которые реально надену. Превью ИИ восхитительно!' },
    { name: 'Лукас', handle: 'Пользователь Style Me AI', quote: 'Больше никаких сомнений перед зеркалом. Оценка точно говорит, подходит ли мне наряд.' },
    { name: 'Айша', handle: 'Пользователь Style Me AI', quote: 'ИИ помог мне по-новому взглянуть на гардероб. Теперь комбинирую вещи иначе.' },
  ],
  zh: [
    { name: 'Marie', handle: 'Style Me AI 用户', quote: '上传一张照片，选择风格，就能获得我真正会穿的造型。AI 预览太棒了！' },
    { name: 'Lucas', handle: 'Style Me AI 用户', quote: '不再在镜子前犹豫不决。评分告诉我一套服装是否适合我。' },
    { name: 'Aisha', handle: 'Style Me AI 用户', quote: '借助 AI 重新发现了我的衣橱，现在以不同方式搭配衣物，购物更明智。' },
  ],
  pt: [
    { name: 'Marie', handle: 'Usuária Style Me AI', quote: 'Envio uma foto, escolho um estilo e recebo looks que eu realmente usaria. A prévia IA é incrível!' },
    { name: 'Lucas', handle: 'Usuário Style Me AI', quote: 'Chega de dúvidas na frente do espelho. A pontuação me diz exatamente se uma roupa funciona.' },
    { name: 'Aisha', handle: 'Usuária Style Me AI', quote: 'Redescobri meu guarda-roupa com IA. Agora combino minhas peças de forma diferente.' },
  ],
};

const titles = {
  fr: { title: 'Apprécié par ceux qui veulent être bien habillés', subtitle: 'Confiants dans leur style, sans chercher pendant des heures.' },
  en: { title: 'Loved by people who want to look good', subtitle: 'Style confidence, without the endless scrolling.' },
  es: { title: 'Amado por quienes quieren verse bien', subtitle: 'Confianza en el estilo, sin el desplazamiento interminable.' },
  ru: { title: 'Любимый теми, кто хочет хорошо выглядеть', subtitle: 'Уверенность в стиле без бесконечной прокрутки.' },
  zh: { title: '深受注重外表人士的喜爱', subtitle: '风格自信，无需无尽地刷屏。' },
  pt: { title: 'Amado por quem quer ter boa aparência', subtitle: 'Confiança no estilo, sem rolar infinitamente.' },
};

export default function SocialProof() {
  const { lang } = useLang();
  const reviews = testimonials[lang] || testimonials['fr'];
  const { title, subtitle } = titles[lang] || titles['fr'];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="px-5 mt-12"
    >
      <div className="text-center mb-7">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1.5">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.07 }}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex gap-0.5 mb-2.5">
              {[...Array(5)].map((_, s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-foreground leading-relaxed font-medium">"{r.quote}"</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-400 to-primary flex items-center justify-center text-white text-xs font-bold">
                {r.name[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{r.name}</p>
                <p className="text-[10px] text-muted-foreground">{r.handle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}