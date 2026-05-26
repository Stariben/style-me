import { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLang } from '@/lib/i18n';
import { Sparkles, RefreshCw } from 'lucide-react';
import usePullToRefresh from '../hooks/usePullToRefresh';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { AnimatePresence, motion } from 'framer-motion';
import PhotoUploader from '../components/PhotoUploader';
import ResultCard from '../components/ResultCard';
import AnalyzingOverlay from '../components/AnalyzingOverlay';
import Paywall from '../components/Paywall';
import HowItWorks from '../components/HowItWorks';
import FaqSection from '../components/FaqSection';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import SocialProof from '../components/SocialProof';
import CtaBanner from '../components/CtaBanner';
import { useAuth } from '@/lib/AuthContext';

const FREE_ANALYSES = 5;

export default function Home() {
  const { t, lang } = useLang();
  const { isAuthenticated, navigateToLogin } = useAuth();

  const [personImage, setPersonImage] = useState(null);
  const [outfitImage, setOutfitImage] = useState(null);
  const [result, setResult] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    const loadUser = async () => {
      const user = await base44.auth.me();
      setUserData(user);
    };
    loadUser();

    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      window.history.replaceState({}, '', '/');
      let attempts = 0;
      let creditsBefore = null;
      const poll = async () => {
        const u = await base44.auth.me();
        setUserData(u);
        if (creditsBefore === null) {
          creditsBefore = u?.analysis_credits || 0;
        } else if ((u?.analysis_credits || 0) > creditsBefore || attempts >= 10) {
          return;
        }
        attempts++;
        setTimeout(poll, 1500);
      };
      setTimeout(poll, 1500);
    }
  }, [isAuthenticated]);

  const freeUsed = userData?.free_analyses_used || 0;
  const paidCredits = userData?.analysis_credits || 0;
  const canUseApp = freeUsed < FREE_ANALYSES || paidCredits > 0;

  const resetState = useCallback(() => {
    setPersonImage(null);
    setOutfitImage(null);
    setResult(null);
    setGeneratedImage(null);
  }, []);

  const analyzeMutation = useMutation({
    onMutate: () => {
      setResult(null);
      setGeneratedImage(null);
    },
    mutationFn: async ({ personImg, outfitImg }) => {
      const res = await base44.functions.invoke('analyzeOutfit', {
        personImg,
        outfitImg,
        lang,
      });

      if (res.data?.needsPayment) {
        setShowPaywall(true);
        throw new Error('quota_exceeded');
      }

      if (!res.data?.analysis || !res.data?.imageUrl) {
        throw new Error(res.data?.error || 'Analyse échouée');
      }

      return { analysis: res.data.analysis, imageUrl: res.data.imageUrl };
    },
    onSuccess: async ({ analysis, imageUrl }) => {
      setResult(analysis);
      setGeneratedImage(imageUrl);
      const updated = await base44.auth.me();
      setUserData(updated);
    },
    onError: (err) => {
      if (err.message === 'quota_exceeded') return;
      console.error('Analyse échouée:', err);
    },
  });

  const handleRefresh = useCallback(() => {
    resetState();
    analyzeMutation.reset();
  }, [resetState, analyzeMutation]);

  const { pullDistance, refreshing } = usePullToRefresh(handleRefresh);

  const isAnalyzing = analyzeMutation.isPending;
  const canAnalyze = personImage && outfitImage && !isAnalyzing;

  const handleAnalyze = () => {
    if (!canUseApp) {
      setShowPaywall(true);
      return;
    }
    analyzeMutation.mutate({ personImg: personImage, outfitImg: outfitImage });
  };

  const handleReset = () => {
    setOutfitImage(null);
    setResult(null);
    setGeneratedImage(null);
    analyzeMutation.reset();
  };

  return (
    <div className="min-h-screen bg-background pt-14 pb-12">
      {/* Pull-to-refresh */}
      {pullDistance > 0 && (
        <div className="flex items-center justify-center overflow-hidden transition-all" style={{ height: pullDistance }}>
          <RefreshCw className={`h-5 w-5 text-primary transition-transform ${refreshing ? 'animate-spin' : ''}`} />
        </div>
      )}
      {refreshing && (
        <div className="flex items-center justify-center h-10">
          <RefreshCw className="h-5 w-5 text-primary animate-spin" />
        </div>
      )}

      <AnimatePresence>{isAnalyzing && <AnalyzingOverlay />}</AnimatePresence>
      <AnimatePresence>{showPaywall && <Paywall onClose={() => setShowPaywall(false)} />}</AnimatePresence>

      {/* Hero */}
      <HeroSection onSignIn={() => navigateToLogin()} />

      {/* Scanner */}
      {isAuthenticated && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="px-5 mt-2"
        >
          {/* Upload area */}
          <div className="flex gap-3">
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

          {/* Analyze button */}
          <div className="mt-4">
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className="w-full h-13 rounded-2xl text-base font-semibold gap-2.5 shadow-lg shadow-primary/20 disabled:shadow-none transition-all"
              size="lg"
            >
              <Sparkles className="h-5 w-5" />
              {t('analyzeMyLook')}
            </Button>

            {!personImage && !outfitImage && (
              <p className="text-xs text-center text-muted-foreground mt-3">{t('uploadBothPhotos')}</p>
            )}

            {/* Credits counter */}
            {userData && (
              <div className="mt-3 flex justify-center">
                {paidCredits > 0 ? (
                  <span className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                    ⚡ {paidCredits} {paidCredits > 1 ? t('creditsRemaining') : t('creditRemaining')}
                  </span>
                ) : freeUsed < FREE_ANALYSES ? (
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {FREE_ANALYSES - freeUsed} {FREE_ANALYSES - freeUsed > 1 ? t('freeAnalysesRemaining') : t('freeAnalysisRemaining')}
                  </span>
                ) : (
                  <button onClick={() => setShowPaywall(true)} className="text-xs text-primary font-medium underline">
                    {t('noMoreFreeAnalyses')} → {t('buyPack')}
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && <ResultCard result={result} generatedImage={generatedImage} onReset={handleReset} />}
      </AnimatePresence>

      {/* Landing content — only when no result */}
      {!result && (
        <>
          <FeatureCards />
          <HowItWorks />
          <SocialProof />
          <FaqSection />
          <CtaBanner onSignIn={() => navigateToLogin()} />
        </>
      )}
    </div>
  );
}