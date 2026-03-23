import { motion } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown, Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ScoreRing({ score }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;

  const getColor = () => {
    if (score >= 8) return 'text-green-500';
    if (score >= 5) return 'text-amber-500';
    return 'text-red-400';
  };

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/80" />
        <motion.circle
          cx="50" cy="50" r={radius}
          fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"
          className={getColor()}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-3xl font-bold ${getColor()}`}
        >
          {score}
        </motion.span>
        <span className="text-[10px] text-muted-foreground font-medium">/10</span>
      </div>
    </div>
  );
}

export default function ResultCard({ result, onReset }) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-6 mt-6 mb-8"
    >
      <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
        {/* Score */}
        <div className="flex flex-col items-center mb-6">
          <ScoreRing score={result.match_score} />
          <h3 className="text-lg font-bold mt-3">{result.verdict}</h3>
        </div>

        {/* Pros */}
        {result.pros?.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-semibold">What Works</span>
            </div>
            <ul className="space-y-1.5">
              {result.pros.map((pro, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-sm text-muted-foreground pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-green-400"
                >
                  {pro}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Cons */}
        {result.cons?.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsDown className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold">Consider</span>
            </div>
            <ul className="space-y-1.5">
              {result.cons.map((con, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-sm text-muted-foreground pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-red-400"
                >
                  {con}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Tips */}
        {result.styling_tips?.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold">Style Tips</span>
            </div>
            <ul className="space-y-1.5">
              {result.styling_tips.map((tip, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="text-sm text-muted-foreground pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
                >
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        <Button onClick={onReset} variant="outline" className="w-full rounded-xl h-11 gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Another Outfit
        </Button>
      </div>
    </motion.div>
  );
}