import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import FloatingHearts from '@/components/FloatingHearts';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <HowItWorks />
          <Features />
          <Testimonials />
          <FAQ />
          <Pricing />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
