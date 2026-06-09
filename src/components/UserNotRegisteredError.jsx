import { base44 } from '@/api/base44Client';

export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 mb-5 rounded-2xl bg-destructive/10">
          <svg className="w-7 h-7 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Accès restreint</h1>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Vous n'êtes pas enregistré sur cette application. Contactez l'administrateur pour obtenir l'accès.
        </p>
        <button
          onClick={() => base44.auth.logout('/')}
          className="w-full h-11 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}