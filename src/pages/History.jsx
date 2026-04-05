import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, X } from 'lucide-react';
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
          <h2 className="font-bold text-lg">Analysis Details</h2>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Image pair */}
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

export default function History() {
  const [selected, setSelected] = useState(null);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['analysis-history'],
    queryFn: () => base44.entities.AnalysisHistory.list('-created_date', 50),
  });

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 5) return 'text-amber-500';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-6 pt-10 pb-6">
        <h1 className="text-2xl font-bold tracking-tight">Analysis History</h1>
        <p className="text-sm text-muted-foreground mt-1">Your past outfit analyses</p>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center gap-3">
          <div className="h-16 w-16 rounded-3xl bg-muted flex items-center justify-center">
            <Clock className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="font-semibold">No analyses yet</p>
          <p className="text-sm text-muted-foreground">Your outfit analyses will appear here once you use StyleMatch.</p>
        </div>
      )}

      <div className="px-6 space-y-3">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(item)}
            className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
          >
            {/* Thumbnails */}
            <div className="flex -space-x-3 shrink-0">
              <div className="h-12 w-12 rounded-xl overflow-hidden border-2 border-background z-10">
                <img src={item.person_image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="h-12 w-12 rounded-xl overflow-hidden border-2 border-background">
                <img src={item.outfit_image} alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{item.verdict || 'Outfit Analysis'}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {new Date(item.created_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Score */}
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