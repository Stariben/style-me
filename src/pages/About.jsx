import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function About() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const isFr = !lang || lang === 'fr';

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground mb-6 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {isFr ? 'Retour' : 'Back'}
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">StyleMatch</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-6">
          {isFr ? 'À propos de StyleMatch' : 'About StyleMatch'}
        </h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          {isFr ? (
            <>
              <p>
                <strong className="text-foreground">StyleMatch</strong> est une application intelligente qui utilise l'intelligence artificielle pour vous aider à choisir les tenues qui vous correspondent le mieux. En quelques secondes, notre IA analyse votre morphologie, votre teint et le vêtement que vous envisagez, puis vous donne un score de compatibilité et des conseils personnalisés.
              </p>
              <p>
                L'application s'adresse à toute personne qui souhaite s'habiller avec confiance — que vous soyez passionné(e) de mode ou simplement à la recherche d'un avis objectif avant un achat ou une sortie. Fini les doutes devant le miroir : StyleMatch vous dit clairement si la tenue vous va, ce qui fonctionne, et comment améliorer votre look.
              </p>
              <p>
                StyleMatch a été créé par une équipe indépendante de développeurs passionnés de mode et de technologie. Notre mission est de démocratiser l'accès aux conseils en style, habituellement réservés aux personal shoppers ou aux experts de mode. Grâce à l'IA générative, nous offrons une expérience personnalisée, rapide et accessible à tous, partout dans le monde.
              </p>
              <p>
                Nous accordons une importance particulière à la confidentialité : vos photos ne sont jamais utilisées pour entraîner des modèles d'IA et restent strictement privées. StyleMatch est conforme au RGPD et s'engage à protéger vos données personnelles.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-foreground">StyleMatch</strong> is an intelligent app that uses artificial intelligence to help you choose the outfits that suit you best. In seconds, our AI analyzes your body type, complexion, and the outfit you're considering, then gives you a compatibility score and personalized advice.
              </p>
              <p>
                The app is designed for anyone who wants to dress with confidence — whether you're a fashion enthusiast or simply looking for an objective opinion before a purchase or an outing. No more second-guessing in front of the mirror: StyleMatch clearly tells you if the outfit works for you, what's great about it, and how to improve your look.
              </p>
              <p>
                StyleMatch was created by an independent team of developers passionate about fashion and technology. Our mission is to democratize access to style advice, usually reserved for personal shoppers or fashion experts. Thanks to generative AI, we offer a personalized, fast, and accessible experience to everyone, everywhere in the world.
              </p>
              <p>
                We place great importance on privacy: your photos are never used to train AI models and remain strictly private. StyleMatch is GDPR compliant and committed to protecting your personal data.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}