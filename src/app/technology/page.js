import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Technology from '@/components/Technology';
import Footer from '@/components/Footer';

export default function TechnologyPage() {
  return (
    <>
      <Background />
      <Navbar />
      <main className="px-4 sm:px-6 pt-24">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-3">Our Technology</h1>
          <p className="text-slate-500 dark:text-slate-400">How DanMedy uses advanced AI, secure infrastructure, and real-time processing to deliver care.</p>
        </section>
        <Technology />
      </main>
      <Footer />
    </>
  );
}
