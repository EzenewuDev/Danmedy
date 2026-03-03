'use client';

import Image from 'next/image';

export default function CTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {/* Doctor images for trust */}
                <div className="flex justify-center gap-4 mb-8">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg">
                        <Image src="/doctorA.jpeg" alt="Healthcare specialist" fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg">
                        <Image src="/doctorB.jpeg" alt="Healthcare specialist" fill className="object-cover" sizes="56px" />
                    </div>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold dark:text-white text-slate-900 mb-6">Ready to Transform <br />Your Healthcare Practice?</h2>
                <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">Join thousands of healthcare providers using DanMedy to deliver superior patient care remotely.</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-full transform hover:scale-105 transition-all shadow-xl shadow-cyan-500/30 text-lg">
                        Start Free 14-Day Trial
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 border-2 border-slate-600 hover:border-white dark:text-white text-slate-900 font-semibold rounded-full transition-all text-lg">
                        Schedule Demo
                    </button>
                </div>

                <p className="mt-6 text-slate-500 text-sm">No credit card required • Setup in 5 minutes • 24/7 Support</p>
            </div>
        </section>
    );
}
