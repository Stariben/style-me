import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sections = [
  {
    title: "1. Responsable du traitement",
    content: "StyleMatch est le responsable du traitement de vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679)."
  },
  {
    title: "2. Données collectées",
    content: "Nous collectons uniquement les données nécessaires au fonctionnement de l'application : adresse e-mail et nom lors de l'inscription, photos que vous téléchargez volontairement (portrait et vêtement) pour obtenir une analyse, et l'historique de vos analyses (score, verdict, images)."
  },
  {
    title: "3. Vos photos ne servent pas à entraîner l'IA",
    content: "Vos photos sont transmises à un modèle d'IA tiers uniquement pour générer votre analyse. Elles ne sont en aucun cas utilisées pour entraîner, affiner ou améliorer des modèles d'intelligence artificielle. Chaque analyse est traitée de manière isolée et vos images ne sont pas conservées par le fournisseur IA au-delà du traitement immédiat."
  },
  {
    title: "4. Finalité du traitement",
    content: "Vos données sont utilisées exclusivement pour : fournir le service d'analyse vestimentaire, afficher votre historique personnel d'analyses, et assurer la sécurité et le bon fonctionnement de l'application."
  },
  {
    title: "5. Base légale",
    content: "Le traitement de vos données repose sur votre consentement explicite (Art. 6(1)(a) RGPD) pour l'analyse des photos, et l'exécution du contrat (Art. 6(1)(b) RGPD) pour la fourniture du service."
  },
  {
    title: "6. Conservation des données",
    content: "Vos photos téléchargées sont conservées tant que vous maintenez votre compte actif ou jusqu'à suppression manuelle. Les données de votre compte sont supprimées dans les 30 jours suivant la fermeture de votre compte."
  },
  {
    title: "7. Vos droits",
    content: "Conformément au RGPD, vous disposez des droits suivants : droit d'accès à vos données, droit de rectification, droit à l'effacement (« droit à l'oubli »), droit à la portabilité, droit d'opposition, et droit de retirer votre consentement à tout moment. Pour exercer ces droits, utilisez la section « Paramètres du compte » de l'application ou contactez-nous."
  },
  {
    title: "8. Suppression de compte",
    content: "Vous pouvez supprimer votre compte et toutes vos données à tout moment depuis les paramètres de l'application. Cette suppression est définitive et irréversible."
  },
  {
    title: "9. Partage des données",
    content: "Vos données ne sont jamais vendues ni partagées à des fins commerciales. Elles sont uniquement transmises au fournisseur d'IA pour le traitement de l'analyse, sous contrat de confidentialité et dans le strict respect du RGPD."
  },

];

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold text-base">Politique de confidentialité</span>
        </div>
      </div>

      <div className="px-6 pt-6 pb-8 max-w-2xl mx-auto">
        <p className="text-xs text-muted-foreground mb-6">Dernière mise à jour : avril 2026 · Conforme au RGPD (UE 2016/679)</p>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-sm font-bold text-foreground mb-2">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">Engagement clé :</span> Vos photos ne sont jamais utilisées pour entraîner des modèles d'IA. Elles servent uniquement à générer votre analyse personnelle.
            </p>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-6 rounded-xl h-11" onClick={() => navigate(-1)}>
          Retour
        </Button>
      </div>
    </div>
  );
}