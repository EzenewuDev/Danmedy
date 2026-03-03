import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Technology from '@/components/Technology';
import Dashboard from '@/components/Dashboard';
import Workflow from '@/components/Workflow';
import Security from '@/components/Security';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Technology />
        <Dashboard />
        <Workflow />
        <Security />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
