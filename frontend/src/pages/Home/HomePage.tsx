import HeroSection from './Components/HeroSection';
import TrustSection from './Components/TrustSection';
import ProblemSection from './Components/ProblemSection';
import HowItWorksSection from './Components/HowItWorksSection';
import FeaturesSection from './Components/FeaturesSection';
import InteractiveDemoSection from './Components/InteractiveDemoSection';
import AudienceSection from './Components/AudienceSection';
import FeedbackPreviewSection from './Components/FeedbackPreviewSection';
import ProductProofSection from './Components/ProductProofSection';
import PricingSection from './Components/PricingSection';
import PrivacySection from './Components/PrivacySection';
import FAQSection from './Components/FAQSection';
import FinalCTASection from './Components/FinalCTASection';
import Footer from './Components/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <InteractiveDemoSection />
      <AudienceSection />
      <FeedbackPreviewSection />
      <ProductProofSection />
      <PricingSection />
      <PrivacySection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </>
  );
};

export default HomePage;