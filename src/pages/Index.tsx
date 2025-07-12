import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Roadmap from '@/components/Roadmap';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';
import { BackgroundPathsWrapper } from '@/components/ui/background-paths';

const Index = () => {
  return (
    <BackgroundPathsWrapper>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <Roadmap />
        <Waitlist />
        <Footer />
      </div>
    </BackgroundPathsWrapper>
  );
};

export default Index;
