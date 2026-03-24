import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Sparkles, RefreshCw } from 'lucide-react';
import usePullToRefresh from '../hooks/usePullToRefresh';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/Header';
import PhotoUploader from '../components/PhotoUploader';
import ResultCard from '../components/ResultCard';
import AnalyzingOverlay from '../components/AnalyzingOverlay';

export default function Home() {
  const [personImage, setPersonImage] = useState(null);
  const [outfitImage, setOutfitImage] = useState(null);
  const handleRefresh = useCallback(async () => {
    // Reset state on pull-to-refresh
    setPersonImage(null);
    setOutfitImage(null);
    setResult(null);
    setGeneratedImage(null);
  }, []);

  const { pullDistance, refreshing, onTouchStart, onTouchMove, onTouchEnd, threshold } = usePullToRefresh(handleRefresh);

  const [result, setResult] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const analyzeMutation = useMutation({
    mutationFn: async ({ personImage, outfitImage }) => {
      const [analysis, imageResult] = await Promise.all([

  const handleReset = () => {
    setPersonImage(null);
    setOutfitImage(null);
    setResult(null);
    setGeneratedImage(null);
  };

  return (
    <div
      className="min-h-screen bg-background pb-28"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Pull-to-refresh indicator */}
      {pullDistance > 0 && (
        <div
          className="flex items-center justify-center overflow-hidden transition-all"
          style={{ height: pullDistance }}
        >
          <RefreshCw
            className={`h-5 w-5 text-primary transition-transform ${refreshing ? 'animate-spin' : ''}`}
            style={{ transform: `rotate(${(pullDistance / threshold) * 180}deg)` }}
          />
        </div>
      )}
      {refreshing && (
        <div className="flex items-center justify-center h-10">
          <RefreshCw className="h-5 w-5 text-primary animate-spin" />
        </div>
      )}
      <AnimatePresence>{isAnalyzing && <AnalyzingOverlay />}</AnimatePresence>

      <Header />

      {/* Hero text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 mb-6"
      >
        <h2 className="text-2xl font-bold tracking-tight leading-tight">
          Does this outfit
          <br />
          <span className="text-primary">suit you?</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Upload a photo of yourself and the outfit you're considering. Our AI will tell you if it's a match.
        </p>
      </motion.div>

      {/* Upload section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6"
      >
        <div className="flex gap-4">
          <PhotoUploader
            type="person"
            imageUrl={personImage}
            onImageUploaded={setPersonImage}
            onClear={() => setPersonImage(null)}
          />
          <PhotoUploader
            type="outfit"
            imageUrl={outfitImage}
            onImageUploaded={setOutfitImage}
            onClear={() => setOutfitImage(null)}
          />
        </div>
      </motion.div>

      {/* Analyze button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 mt-6"
      >
        <Button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className="w-full h-13 rounded-2xl text-base font-semibold gap-2.5 shadow-lg shadow-primary/20 disabled:shadow-none transition-all"
          size="lg"
        >
          <Sparkles className="h-5 w-5" />
          Analyze My Look
        </Button>

        {!personImage && !outfitImage && (
          <p className="text-xs text-center text-muted-foreground mt-3">
            Upload both photos to get started
          </p>
        )}
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {result && <ResultCard result={result} generatedImage={generatedImage} onReset={handleReset} />}
      </AnimatePresence>
    </div>
  );
}