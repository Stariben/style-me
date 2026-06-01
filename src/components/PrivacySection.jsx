import { motion } from 'framer-motion';
import { Lock, EyeOff, Trash2, ShieldCheck } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const ITEMS = [
  {
    icon: Lock,
    title: 'Vos photos restent privées',
    desc: 'Vos images ne sont jamais partagées ni vendues. Elles servent uniquement à générer votre analyse.',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600',
  },
  {
    icon: EyeOff,
    title: 'Aucun accès humain',
    desc: "Seule notre IA analyse vos photos. Aucun employé ne les voit, jamais.",
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-600',
  },
  {
    icon: Trash2,
    title: 'Suppression sur demande',
    desc: 'Vous pouvez supprimer votre historique et vos données à tout moment depuis votre compte.',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
  },
  {
    icon: ShieldCheck,
    title: 'Données chiffrées',
    desc: 'Toutes vos données sont transmises et stockées de façon sécurisée (chiffrement TLS/AES).',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600',
  },
];

export default function PrivacySection() {
  return (
    <section className="bg-muted/40 px-5 py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-9 text-center max-w-lg mx-auto"
      >
        <h2 className="text-[1.9rem] font-black tracking-tight text-foreground">
          Votre vie privée, protégée
        </h2>
        <p className="text-base text-muted-foreground mt-2">
          Style Me ne revend aucune donnée. Vos photos vous appartiennent.
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto grid grid-cols-2 gap-4">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl p-6 border border-border/50 bg-card"
            >
              <div className={`h-13 w-13 rounded-xl ${item.iconBg} flex items-center justify-center mb-4`}>
                <Icon className={item.iconColor} size={24} />
              </div>
              <p className="text-[15px] font-bold text-foreground mb-2 leading-tight">
                {item.title}
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}