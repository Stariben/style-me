import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, UserCircle, LogOut, Clock, Shield, Mail, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/lib/AuthContext';

export default function AccountSettings() {
  const { user } = useAuth();
  const { t } = useLang();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  const ADMIN_EMAIL = 'ai.unjd5@passmail.net';

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: ADMIN_EMAIL,
        subject: `[StyleMatch] Demande de suppression de compte`,
        body: `Bonjour,\n\nL'utilisateur suivant a demandé la suppression de son compte :\n\nNom : ${user?.full_name || 'N/A'}\nEmail : ${user?.email}\n\nConformément à notre politique de confidentialité, la suppression sera effectuée dans un délai de 30 jours.\n\nVeuillez traiter cette demande.\n\nStyleMatch`,
      });
    } catch (e) {}
    setIsDeleting(false);
    setDeleted(true);
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  if (deleted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8 text-center gap-5">
        <div className="h-20 w-20 rounded-3xl bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{t('deletionRequestedTitle')}</h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {t('deletionRequestedMsg')}
          </p>
        </div>
        <Button variant="outline" className="rounded-xl" onClick={handleLogout}>
          {t('logOut')}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="px-6 pt-10 pb-6">
        <h1 className="text-2xl font-bold tracking-tight">{t('accountSettings')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('manageAccount')}</p>
      </div>

      {/* Profile card */}
      <div className="mx-6 mb-6 bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <UserCircle className="h-8 w-8 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold truncate">{user?.full_name || 'User'}</p>
          <p className="text-sm text-muted-foreground truncate">{user?.email || ''}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mx-6 space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl justify-start gap-3 select-none"
          onClick={() => navigate('/privacy')}
        >
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span>{t('privacyPolicy')}</span>
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 rounded-xl justify-start gap-3 select-none"
          onClick={() => navigate('/history')}
        >
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{t('analysisHistory')}</span>
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 rounded-xl justify-start gap-3 select-none"
          onClick={() => window.location.href = 'mailto:ai.unjd5@passmail.net'}
        >
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{t('contactUs')}</span>
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 rounded-xl justify-start gap-3 select-none"
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 text-muted-foreground" />
          <span>{t('logOut')}</span>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl justify-start gap-3 border-destructive/30 text-destructive hover:bg-destructive/5 select-none"
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              <Trash2 className="h-4 w-4" />
              <span>{t('deleteAccount')}</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-2xl mx-4">
            <AlertDialogHeader>
              <AlertDialogTitle>{t('deleteAccountTitle')}</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{t('deleteAccountDesc')}</p>
                  <p className="font-medium text-foreground">{t('deleteAccount30days')}</p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? t('deleting') : t('sendDeletionRequest')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}