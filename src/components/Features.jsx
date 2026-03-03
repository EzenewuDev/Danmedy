'use client';

import Image from 'next/image';

export default function Features() {
    return (
        <section id="features" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 section-header">
                    <h2 className="font-display text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-4">Three Pillars of <span className="text-cyan-400">DanMedy</span></h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">Comprehensive healthcare management through intelligent automation and AI-driven insights.</p>
                </div>

                {/* Our specialists — doctorA & doctorB */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 p-6 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50">
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Trusted by specialists</p>
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-cyan-500/30 flex-shrink-0">
                            <Image src="/doctorA.jpeg" alt="DanMedy specialist" fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-cyan-500/30 flex-shrink-0">
                            <Image src="/doctorB.jpeg" alt="DanMedy specialist" fill className="object-cover" sizes="64px" />
                        </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Board-certified doctors on the DanMedy platform</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Remote Diagnosis */}
                    <div className="glass-card rounded-3xl p-8 relative overflow-hidden group feature-card">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-6 feature-icon shadow-lg shadow-cyan-500/30">
                                <svg className="w-8 h-8 dark:text-white text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-4 font-display">AI Remote Diagnosis</h3>
                            <ul className="space-y-3 text-slate-400">
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Symptom analysis using NLP and computer vision</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Medical imaging interpretation (X-ray, CT, MRI)</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Differential diagnosis generation with confidence scores</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Integration with electronic health records (EHR)</span>
                                </li>
                            </ul>
                            <div className="mt-6 pt-6 border-t border-slate-700">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Accuracy Rate</span>
                                    <span className="text-cyan-400 font-bold">96.8%</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                                    <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '96.8%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Patient Monitoring */}
                    <div className="glass-card rounded-3xl p-8 relative overflow-hidden group feature-card">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-6 feature-icon shadow-lg shadow-purple-500/30">
                                <svg className="w-8 h-8 dark:text-white text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-4 font-display">Smart Patient Monitoring</h3>
                            <ul className="space-y-3 text-slate-400">
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Real-time IoT device integration (wearables, sensors)</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Continuous vital signs tracking (HR, BP, SpO2, Temp)</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Anomaly detection with instant alert system</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Predictive health trend analysis</span>
                                </li>
                            </ul>
                            <div className="mt-6 pt-6 border-t border-slate-700">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Active Monitors</span>
                                    <span className="text-purple-400 font-bold">12,450+</span>
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                    <div className="flex -space-x-2">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-slate-800 flex-shrink-0">
                                            <Image src="/doctorA.jpeg" alt="" fill className="object-cover" sizes="32px" />
                                        </div>
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-slate-800 flex-shrink-0">
                                            <Image src="/doctorB.jpeg" alt="" fill className="object-cover" sizes="32px" />
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-slate-800"></div>
                                    </div>
                                    <span className="text-xs text-slate-500">Live now</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Smart Scheduling */}
                    <div className="glass-card rounded-3xl p-8 relative overflow-hidden group feature-card">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mb-6 feature-icon shadow-lg shadow-emerald-500/30">
                                <svg className="w-8 h-8 dark:text-white text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-4 font-display">Intelligent Scheduling</h3>
                            <ul className="space-y-3 text-slate-400">
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>AI-optimized appointment allocation</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Emergency priority queuing system</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Automated follow-up and reminder system</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Multi-timezone and resource management</span>
                                </li>
                            </ul>
                            <div className="mt-6 pt-6 border-t border-slate-700">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Efficiency Gain</span>
                                    <span className="text-emerald-400 font-bold">+40%</span>
                                </div>
                                <div className="flex items-center space-x-2 mt-2 text-emerald-400 text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                    <span>Reduced wait times</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
