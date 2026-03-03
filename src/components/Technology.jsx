'use client';

export default function Technology() {
    return (
        <section id="technology" className="py-24 relative overflow-hidden bg-slate-100 dark:bg-transparent">
            <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="tech-content">
                        <h2 className="font-display text-4xl font-bold dark:text-white text-slate-900 mb-6">Powered by Cutting-Edge <span className="text-cyan-400">AI Technology</span></h2>
                        <p className="text-slate-400 text-lg mb-8">DanMedy leverages state-of-the-art machine learning models and secure cloud infrastructure to deliver reliable healthcare services.</p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="dark:text-white text-slate-900 font-semibold text-lg mb-1">Deep Learning Models</h4>
                                    <p className="text-slate-400">Convolutional Neural Networks (CNN) for medical imaging, Transformer models for clinical NLP, and LSTM networks for time-series health data prediction.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="dark:text-white text-slate-900 font-semibold text-lg mb-1">IoT Integration</h4>
                                    <p className="text-slate-400">Seamless connectivity with FDA-approved wearable devices, smart home health monitors, and portable diagnostic equipment via Bluetooth and WiFi.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="dark:text-white text-slate-900 font-semibold text-lg mb-1">Blockchain Security</h4>
                                    <p className="text-slate-400">Decentralized health records ensuring data integrity, patient consent management, and secure sharing between healthcare providers.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative tech-visual">
                        <div className="dashboard-mockup rounded-3xl p-6 border border-slate-700">
                            <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-slate-400 text-sm font-mono">DanMedy AI Core v2.4</div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-slate-300 font-mono text-sm">Neural Network Status</span>
                                    </div>
                                    <span className="text-green-400 font-mono text-sm">ONLINE</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="stat-card p-4 rounded-xl">
                                        <div className="text-slate-400 text-xs mb-1">Model Accuracy</div>
                                        <div className="text-2xl font-bold dark:text-white text-slate-900">98.2%</div>
                                        <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                                            <div className="bg-cyan-400 h-1 rounded-full" style={{ width: '98.2%' }}></div>
                                        </div>
                                    </div>
                                    <div className="stat-card p-4 rounded-xl">
                                        <div className="text-slate-400 text-xs mb-1">Latency</div>
                                        <div className="text-2xl font-bold dark:text-white text-slate-900">24ms</div>
                                        <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                                            <div className="bg-emerald-400 h-1 rounded-full" style={{ width: '15%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                                    <div className="text-slate-400 text-xs mb-3 font-mono">REAL-TIME PROCESSING</div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-300">Image Analysis</span>
                                            <span className="text-cyan-400">Processing...</span>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-cyan-400 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-300">Symptom Check</span>
                                            <span className="text-emerald-400">Complete</span>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 font-mono pt-2">
                                    <span>Encrypted Connection</span>
                                    <span>•</span>
                                    <span>TLS 1.3</span>
                                    <span>•</span>
                                    <span>HIPAA Compliant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
