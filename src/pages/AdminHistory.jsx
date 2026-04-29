import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResultCard from '../components/ResultCard';

function HistoryItemModal({ item, onClose }) {
  const result = JSON.parse(item.result_json || '{}');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="bg-background rounded-t-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background flex items-center justify-between px-6 pt-5 pb-3 border-b border-border">
          <div>
            <h2 className="font-bold text-lg">Détails de l'analyse</h2>
            <p className="text-xs text-muted-foreground">{item.created_by}</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-3 px-6 pt-5">
          <div className="flex-1 rounded-2xl overflow-hidden aspect-[3/4] border border-border">
            <img src={item.person_image} alt="Person" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden aspect-[3/4] border border-border">
            <img src={item.outfit_image} alt="Outfit" className="w-full h-full object-cover" />
          </div>
        </div>
        <ResultCard result={result} generatedImage={item.generated_image} onReset={onClose} />
      </motion.div>
    </motion.div>
  );
}

export default function AdminHistory() {
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const [selectedUser, setSelectedUser] = useState('all');

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['admin-analysis-history'],
    queryFn: () => base44.entities.AnalysisHistory.list('-created_date', 200),
  });

  const users = useMemo(() => {
    const emails = [...new Set(items.map((i) => i.created_by).filter(Boolean))];
    return emails;
  }, [items]);

  const filtered = useMemo(() => {
    if (selectedUser === 'all') return items;
    return items.filter((i) => i.created_by === selectedUser);
  }, [items, selectedUser]);

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="h-16 w-16 rounded-3xl bg-destructive/10 flex items-center justify-center">
          <Shield className="h-8 w-8 text-destructive" />
        </div>
        <p className="font-bold text-lg">Accès refusé</p>
        <p className="text-sm text-muted-foreground">Cette page est réservée aux administrateurs.</p>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 5) return 'text-amber-500';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="px-6 pt-10 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Admin — Analyses</h1>
        </div>
        <p className="text-sm text-muted-foreground">{items.length} analyse(s) au total</p>
      </div>

      {/* User filter */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtrer par utilisateur</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedUser('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              selectedUser === 'all'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border text-foreground'
            }`}
          >
            Tous ({items.length})
          </button>
          {users.map((email) => {
            const count = items.filter((i) => i.created_by === email).length;
            return (
              <button
                key={email}
                onClick={() => setSelectedUser(email)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  selectedUser === email
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border text-foreground'
                }`}
              >
                {email} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      )}

      <div className="px-6 space-y-3">
        {filtered.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => setSelected(item)}
            className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-all"
          >
            <div className="flex -space-x-3 shrink-0">
              <div className="h-12 w-12 rounded-xl overflow-hidden border-2 border-background z-10">
                <img src={item.person_image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="h-12 w-12 rounded-xl overflow-hidden border-2 border-background">
                <img src={item.outfit_image} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate text-sm">{item.verdict || 'Outfit Analysis'}</p>
              <p className="text-xs text-muted-foreground truncate">{item.created_by}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {new Date(item.created_date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-lg font-bold ${getScoreColor(item.match_score)}`}>{item.match_score}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && <HistoryItemModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}