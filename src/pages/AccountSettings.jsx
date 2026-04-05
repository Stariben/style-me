import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, UserCircle, LogOut, Clock } from 'lucide-react';
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
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    await base44.auth.deleteAccount();
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="px-6 pt-10 pb-6">
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
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
          onClick={() => navigate('/history')}
        >
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Analysis History</span>
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 rounded-xl justify-start gap-3 select-none"
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 text-muted-foreground" />
          <span>Log Out</span>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl justify-start gap-3 border-destructive/30 text-destructive hover:bg-destructive/5 select-none"
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Account</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-2xl mx-4">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Your account and all associated data will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}