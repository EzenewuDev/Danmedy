import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Security from '@/components/Security';
import Footer from '@/components/Footer';

export default function SecurityPage() {
  return (
    <>
      <Background />
      <Navbar />
      <main className="px-4 sm:px-6 pt-24">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-3">Security & Compliance</h1>
          <p className="text-slate-500 dark:text-slate-400">Privacy-first architecture with encryption, access controls, and continuous auditing.</p>
        </section>
        <Security />
      </main>
      <Footer />
    </>
  );
}
