import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, UserCircle, LogOut, Clock, Shield, Mail, CheckCircle2, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({ subject: '', message: '' });
  const [sendingContact, setSendingContact] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await base44.functions.invoke('sendContactEmail', {
        type: 'delete',
        subject: '',
        message: '',
      });
    } catch (e) {}
    setIsDeleting(false);
    setDeleted(true);
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  const handleContactSubmit = async () => {
    if (!contactForm.subject.trim() || !contactForm.message.trim()) return;
    setSendingContact(true);
    try {
      await base44.functions.invoke('sendContactEmail', {
        type: 'contact',
        subject: contactForm.subject,
        message: contactForm.message,
      });
    } catch (e) {
      console.error('Error sending contact email:', e);
    }
    setContactForm({ subject: '', message: '' });
    setSendingContact(false);
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setShowContactForm(false);
    }, 2500);
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
          onClick={() => setShowContactForm(true)}
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

      {showContactForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-background rounded-t-3xl max-h-[90vh] overflow-y-auto" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            {contactSent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 px-8 text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <p className="font-semibold text-lg">{t('contactMessageSent')}</p>
                <p className="text-sm text-muted-foreground">{t('contactMessageSentDesc')}</p>
              </div>
            ) : (
              <>
                <div className="sticky top-0 bg-background flex items-center justify-between px-6 pt-5 pb-3 border-b border-border">
                  <h2 className="font-bold text-lg">{t('contactUs')}</h2>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="h-9 w-9 rounded-full bg-muted flex items-center justify-center"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-6 space-y-4 pb-6">
                  <Input
                   placeholder={t('contactSubjectPlaceholder')}
                   value={contactForm.subject}
                   onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                   className="rounded-xl"
                  />
                  <Textarea
                   placeholder={t('contactMessagePlaceholder')}
                   value={contactForm.message}
                   onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                   className="rounded-xl h-32"
                  />
                  <div className="flex gap-3 pt-4 pb-20">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl"
                      onClick={() => setShowContactForm(false)}
                    >
                      {t('cancel')}
                    </Button>
                    <Button
                      className="flex-1 rounded-xl"
                      onClick={handleContactSubmit}
                      disabled={sendingContact || !contactForm.subject.trim() || !contactForm.message.trim()}
                    >
                      {sendingContact ? t('contactSending') : t('contactSend')}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}