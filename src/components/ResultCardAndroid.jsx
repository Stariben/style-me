import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Check, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';

function ScoreRing({ score }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative h-32 w-32">
      <svg className="absolute inset-0" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="45" fill="none" stroke="#f0f0f0" strokeWidth="8" />
        <circle
          cx="60" cy="60" r="45" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{score}</span>
      </div>
    </div>
  );
}

export default function ResultCardAndroid({ result, generatedImage, onReset }) {
  const { t } = useLang();
  const [showFull, setShowFull] = useState(false);
  const data = JSON.parse(result?.result_json || '{}');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="px-6 mt-6 mb-28"
    >
      <div className="rounded-3xl bg-white border border-gray-200 p-6 space-y-6 shadow-md">
        
        {/* Score */}
        <div className="flex justify-center">
          <ScoreRing score={result?.match_score || 0} />
        </div>

        {/* Verdict */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-1">{result?.verdict}</h3>
          <p className="text-sm text-muted-foreground">{t('matchPercentage')}</p>
        </div>

        {/* Generated Image */}
        {generatedImage && (
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            <img src={generatedImage} alt="Generated Look" className="w-full" />
          </div>
        )}

        {/* Analysis */}
        {data.pros && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">✨ {t('pros')}</h4>
            <div className="space-y-2">
              {data.pros.slice(0, showFull ? undefined : 3).map((pro, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {data.cons && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">⚠️ {t('cons')}</h4>
            <div className="space-y-2">
              {data.cons.slice(0, showFull ? undefined : 3).map((con, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{con}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle */}
        {(data.pros?.length > 3 || data.cons?.length > 3) && (
          <button
            onClick={() => setShowFull(!showFull)}
            className="w-full py-2 text-sm text-primary font-medium"
          >
            {showFull ? t('showLess') : t('showMore')}
          </button>
        )}

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity shadow-sm"
        >
          <RotateCcw className="h-4 w-4" />
          {t('analyzeAgain')}
        </button>
      </div>
    </motion.div>
  );
}