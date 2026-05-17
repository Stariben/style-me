import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useLang } from '@/lib/i18n';

const PACKS = [
  {
    id: 'pack10',
    label: '10 Analyses',
    price: '2,99€',
    perUnit: '0,30€/analyse',
    highlight: false,
  },
  {
    id: 'pack50',
    label: '50 Analyses',
    price: '7,99€',
    perUnit: '0,16€/analyse',
    highlight: true,
    badge: 'Meilleure valeur',
  },
];

export default function Paywall({ onClose }) {
  const [loading, setLoading] = useState(null);

  const handleBuy = async (packId) => {
    // Block if in iframe (Base44 preview)
    if (window.self !== window.top) {
      alert('Le paiement fonctionne uniquement depuis l\'application publiée.');
      return;
    }

    setLoading(packId);
    try {
      const origin = window.location.origin;
      const res = await base44.functions.invoke('stripeCheckout', {
        packId,
        successUrl: `${origin}/?payment=success`,
        cancelUrl: `${origin}/?payment=cancel`,
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      alert('Erreur lors du paiement. Réessaie.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-card rounded-3xl w-full max-w-sm p-6 shadow-2xl relative"
      >
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Tu as utilisé tes 5 analyses gratuites</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choisis un pack pour continuer à analyser tes tenues
          </p>
        </div>

        {/* Packs */}
        <div className="space-y-3 mb-5">
          {PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`relative rounded-2xl border p-4 flex items-center justify-between ${
                pack.highlight
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-muted/30'
              }`}
            >
              {pack.badge && (
                <span className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {pack.badge}
                </span>
              )}
              <div>
                <div className="font-semibold flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-primary" />
                  {pack.label}
                </div>
                <div className="text-xs text-muted-foreground">{pack.perUnit}</div>
              </div>
              <Button
                size="sm"
                variant={pack.highlight ? 'default' : 'outline'}
                className="rounded-xl min-w-[80px]"
                onClick={() => handleBuy(pack.id)}
                disabled={loading !== null}
              >
                {loading === pack.id ? '...' : pack.price}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-center text-muted-foreground">
          Paiement sécurisé par Stripe · Pas d'abonnement
        </p>
      </motion.div>
    </motion.div>
  );
}