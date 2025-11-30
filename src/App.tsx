import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import MainSpecialty from '@/components/sections/MainSpecialty';
import About from '@/components/sections/About';
import Differentials from '@/components/sections/Differentials';
import Services from '@/components/sections/Services';
import PainsSolutions from '@/components/sections/PainsSolutions';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import AdminTestimonials from '@/components/sections/AdminTestimonials';
import { Toaster } from 'sonner';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Admin page route
  if (currentPath === '/admin') {
    return (
      <div className="min-h-screen bg-background">
        <Toaster position="top-right" richColors />
        <AdminTestimonials />
      </div>
    );
  }

  // Main page
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <Hero />
        <MainSpecialty />
        <About />
        <Differentials />
        <Services />
        <PainsSolutions />
        <Process />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
