'use client';

export default function Workflow() {
    return (
        <section id="workflow" className="py-24 relative overflow-hidden bg-slate-100 dark:bg-transparent">
            <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-4">How <span className="text-cyan-400">DanMedy</span> Works</h2>
                    <p className="text-slate-400 text-lg">Seamless integration from patient intake to diagnosis and monitoring.</p>
                </div>

                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 transform -translate-y-1/2"></div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="relative text-center workflow-step">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-cyan-500/50 flex items-center justify-center relative z-10 shadow-xl shadow-cyan-500/20">
                                <span className="text-3xl font-bold text-cyan-400">01</span>
                            </div>
                            <h3 className="dark:text-white text-slate-900 font-bold text-lg mb-2">Patient Onboarding</h3>
                            <p className="text-slate-400 text-sm">Secure registration with biometric verification and medical history import.</p>
                        </div>

                        <div className="relative text-center workflow-step">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-purple-500/50 flex items-center justify-center relative z-10 shadow-xl shadow-purple-500/20">
                                <span className="text-3xl font-bold text-purple-400">02</span>
                            </div>
                            <h3 className="dark:text-white text-slate-900 font-bold text-lg mb-2">AI Assessment</h3>
                            <p className="text-slate-400 text-sm">Initial symptom analysis and preliminary diagnosis using machine learning.</p>
                        </div>

                        <div className="relative text-center workflow-step">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-emerald-500/50 flex items-center justify-center relative z-10 shadow-xl shadow-emerald-500/20">
                                <span className="text-3xl font-bold text-emerald-400">03</span>
                            </div>
                            <h3 className="dark:text-white text-slate-900 font-bold text-lg mb-2">Remote Consultation</h3>
                            <p className="text-slate-400 text-sm">HD video consultation with screen sharing and real-time vitals review.</p>
                        </div>

                        <div className="relative text-center workflow-step">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-pink-500/50 flex items-center justify-center relative z-10 shadow-xl shadow-pink-500/20">
                                <span className="text-3xl font-bold text-pink-400">04</span>
                            </div>
                            <h3 className="dark:text-white text-slate-900 font-bold text-lg mb-2">Continuous Monitoring</h3>
                            <p className="text-slate-400 text-sm">Post-consultation monitoring with automated alerts and follow-up scheduling.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
