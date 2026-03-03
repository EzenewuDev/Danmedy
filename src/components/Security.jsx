'use client';

export default function Security() {
    return (
        <section id="security" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-display text-4xl font-bold dark:text-white text-slate-900 mb-6">Enterprise-Grade <span className="text-cyan-400">Security</span></h2>
                        <p className="text-slate-400 text-lg mb-8">Patient data protection is our highest priority. DanMedy complies with global healthcare standards.</p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="glass-card p-6 rounded-2xl text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <div className="dark:text-white text-slate-900 font-semibold mb-1">HIPAA Compliant</div>
                                <div className="text-slate-400 text-sm">Full adherence to US healthcare privacy standards</div>
                            </div>

                            <div className="glass-card p-6 rounded-2xl text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                                <div className="dark:text-white text-slate-900 font-semibold mb-1">End-to-End Encryption</div>
                                <div className="text-slate-400 text-sm">AES-256 encryption for all data transmission</div>
                            </div>

                            <div className="glass-card p-6 rounded-2xl text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                </div>
                                <div className="dark:text-white text-slate-900 font-semibold mb-1">GDPR Ready</div>
                                <div className="text-slate-400 text-sm">EU data protection regulation compliance</div>
                            </div>

                            <div className="glass-card p-6 rounded-2xl text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div className="dark:text-white text-slate-900 font-semibold mb-1">FDA Class II</div>
                                <div className="text-slate-400 text-sm">Medical device software certification</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
                        <div className="relative glass-card rounded-3xl p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="dark:text-white text-slate-900 font-semibold">Security Status</div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 text-sm">All Systems Secure</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                        <span className="text-slate-300">Data Encryption</span>
                                    </div>
                                    <span className="text-green-400 text-sm font-mono">Active</span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                        </svg>
                                        <span className="text-slate-300">Firewall Protection</span>
                                    </div>
                                    <span className="text-green-400 text-sm font-mono">Active</span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                                        </svg>
                                        <span className="text-slate-300">Access Control</span>
                                    </div>
                                    <span className="text-green-400 text-sm font-mono">Active</span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                                        </svg>
                                        <span className="text-slate-300">Backup Systems</span>
                                    </div>
                                    <span className="text-green-400 text-sm font-mono">Synced</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-700">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Last Security Audit</span>
                                    <span className="text-slate-300">2 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
