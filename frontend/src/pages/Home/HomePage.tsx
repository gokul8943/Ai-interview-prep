import HeroSection from './Components/HeroSection';
import ProblemSection from './Components/ProblemSection';
import HowItWorksSection from './Components/HowItWorksSection';
import FeaturesSection from './Components/FeaturesSection';
import AudienceSection from './Components/AudienceSection';
import FeedbackPreviewSection from './Components/FeedbackPreviewSection';
import PricingSection from './Components/PricingSection';
import FAQSection from './Components/FAQSection';
import FinalCTASection from './Components/FinalCTASection';
import Footer from './Components/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AudienceSection />
      <FeedbackPreviewSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </>
  );
};

export default HomePage;