import { useState, useCallback, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLang } from '@/lib/i18n';
import { Sparkles, RefreshCw, ArrowLeft } from 'lucide-react';
import usePullToRefresh from '../hooks/usePullToRefresh';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { AnimatePresence, motion } from 'framer-motion';

// Landing sections
import HeroSection from '../components/HeroSection';
import WhySection from '../components/WhySection';
import HowItWorksSection from '../components/HowItWorksSection';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';

// Tool components
import Header from '../components/Header';
import PhotoUploader from '../components/PhotoUploader';
import ResultCard from '../components/ResultCard';
import AnalyzingOverlay from '../components/AnalyzingOverlay';
import Paywall from '../components/Paywall';

const FREE_ANALYSES = 5;

export default function Home() {
  const { t, lang } = useLang();
  const toolRef = useRef(null);

  const [showTool, setShowTool] = useState(false);
  const [personImage, setPersonImage] = useState(null);
  const [outfitImage, setOutfitImage] = useState(null);
  const [result, setResult] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [userData, setUserData] = useState(null);

  // Load user credits on mount & after payment success
  useEffect(() => {
    const loadUser = async () => {
      const user = await base44.auth.me();
      setUserData(user);
    };
    loadUser();

    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      window.history.replaceState({}, '', '/');
      setShowTool(true);
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
  }, []);

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

  const handleAnalyze = async () => {
    const authed = await base44.auth.isAuthenticated();
    if (!authed) {
      base44.auth.redirectToLogin(window.location.href);
      return;
    }
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

  const handleStartAnalysis = async () => {
    const authed = await base44.auth.isAuthenticated();
    if (!authed) {
      base44.auth.redirectToLogin(window.location.href);
      return;
    }
    setShowTool(true);
    setTimeout(() => {
      toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background pt-14 pb-6">
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

      {/* ── Landing mode ── */}
      <AnimatePresence mode="wait">
        {!showTool ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Header />
            <HeroSection onStartAnalysis={handleStartAnalysis} />
            <WhySection />
            <HowItWorksSection onStartAnalysis={handleStartAnalysis} />
            <FAQSection />
            <CTASection onStartAnalysis={handleStartAnalysis} />
          </motion.div>
        ) : (
          /* ── Tool mode ── */
          <motion.div
            key="tool"
            ref={toolRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tool header */}
            <div className="px-6 pt-6 pb-4 flex items-center gap-3">
              <button
                onClick={() => { setShowTool(false); resetState(); analyzeMutation.reset(); }}
                className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h1 className="text-base font-bold tracking-tight text-foreground leading-tight">StyleMe</h1>
                  <p className="text-[10px] text-muted-foreground font-medium">AI Outfit Advisor</p>
                </div>
              </div>
            </div>

            {/* Hero text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 mb-6"
            >
              <h2 className="text-2xl font-bold tracking-tight leading-tight">
                {t('doesThisOutfit')}
                <br />
                <span className="text-primary">{t('suitYou')}</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {t('homeSubtitle')}
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
                {t('analyzeMyLook')}
              </Button>

              {!personImage && !outfitImage && (
                <p className="text-xs text-center text-muted-foreground mt-3">
                  {t('uploadBothPhotos')}
                </p>
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
                    <button
                      onClick={() => setShowPaywall(true)}
                      className="text-xs text-primary font-medium underline"
                    >
                      {t('noMoreFreeAnalyses')} → {t('buyPack')}
                    </button>
                  )}
                </div>
              )}
            </motion.div>

            {/* Results */}
            <AnimatePresence>
              {result && <ResultCard result={result} generatedImage={generatedImage} onReset={handleReset} />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}