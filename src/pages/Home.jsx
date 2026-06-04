import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

import HeroSection from '../components/HeroSection';
import WhySection from '../components/WhySection';
import HowItWorksSection from '../components/HowItWorksSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import Header from '../components/Header';

export default function Home() {
  const navigate = useNavigate();

  const handleStartAnalysis = async () => {
    const authed = await base44.auth.isAuthenticated();
    if (!authed) {
      base44.auth.redirectToLogin(window.location.origin + '/analyze');
      return;
    }
    navigate('/analyze');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection onStartAnalysis={handleStartAnalysis} />
      <WhySection />
      <HowItWorksSection onStartAnalysis={handleStartAnalysis} />
      <FAQSection />
      <CTASection onStartAnalysis={handleStartAnalysis} />
      <Footer />
    </div>
  );
}