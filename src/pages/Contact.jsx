import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function Contact() {
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

        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isFr ? 'Nous contacter' : 'Contact Us'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isFr
            ? 'Une question, un problème ou une suggestion ? Nous sommes là pour vous aider.'
            : 'A question, an issue or a suggestion? We are here to help.'}
        </p>

        <div className="space-y-4">
          {/* Email */}
          <a
            href="mailto:contact@stylematch.app"
            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">
                {isFr ? 'Par e-mail' : 'By email'}
              </p>
              <p className="text-muted-foreground text-sm">contact@stylematch.app</p>
            </div>
          </a>

          {/* In-app contact */}
          <button
            onClick={() => navigate('/account')}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors text-left"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">
                {isFr ? 'Via l\'application' : 'Via the app'}
              </p>
              <p className="text-muted-foreground text-sm">
                {isFr
                  ? 'Utilisez le formulaire de contact dans les paramètres du compte'
                  : 'Use the contact form in account settings'}
              </p>
            </div>
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-8 text-center">
          {isFr
            ? 'Nous répondons généralement sous 24-48h.'
            : 'We usually respond within 24-48 hours.'}
        </p>
      </div>
    </div>
  );
}