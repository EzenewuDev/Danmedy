'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [timeStr, setTimeStr] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTimeStr(now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }));
        };
        updateClock();
        const iv = setInterval(updateClock, 1000);
        return () => clearInterval(iv);
    }, []);

    return (
        <section id="dashboard" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-4">Unified <span className="text-cyan-400">Command Center</span></h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">A comprehensive dashboard providing real-time insights into patient health, diagnostic results, and system operations.</p>
                </div>

                <div className="glass rounded-3xl p-2 border border-slate-700 shadow-2xl">
                    <div className="bg-slate-900 rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-800/50">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <span className="text-cyan-400 font-bold">Dr.</span>
                                </div>
                                <div>
                                    <div className="dark:text-white text-slate-900 font-semibold">Dr. Sarah Chen</div>
                                    <div className="text-slate-400 text-sm">Cardiology Department</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="text-right">
                                    <div className="text-2xl font-bold dark:text-white text-slate-900" id="clock">{timeStr}</div>
                                    <div className="text-slate-400 text-sm">Local Time</div>
                                </div>
                                <div className="relative">
                                    <div className="pulse-ring absolute inset-0"></div>
                                    <div className="w-3 h-3 bg-cyan-400 rounded-full relative z-10"></div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="dark:text-white text-slate-900 font-semibold text-lg">Active Patients</h3>
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">Live</button>
                                        <button className="px-3 py-1 rounded-full bg-slate-700 text-slate-400 text-sm">History</button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center dark:text-white text-slate-900 font-bold">JD</div>
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                                            </div>
                                            <div>
                                                <div className="dark:text-white text-slate-900 font-medium group-hover:text-cyan-400 transition-colors">John Doe</div>
                                                <div className="text-slate-400 text-sm">ID: #DM-2024-001 • 45 yrs</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right hidden sm:block">
                                                <div className="text-slate-400 text-xs">Heart Rate</div>
                                                <div className="dark:text-white text-slate-900 font-mono">72 BPM</div>
                                            </div>
                                            <div className="text-right hidden sm:block">
                                                <div className="text-slate-400 text-xs">BP</div>
                                                <div className="dark:text-white text-slate-900 font-mono">120/80</div>
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Stable</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center dark:text-white text-slate-900 font-bold">AS</div>
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
                                            </div>
                                            <div>
                                                <div className="dark:text-white text-slate-900 font-medium group-hover:text-cyan-400 transition-colors">Alice Smith</div>
                                                <div className="text-slate-400 text-sm">ID: #DM-2024-002 • 62 yrs</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right hidden sm:block">
                                                <div className="text-slate-400 text-xs">Heart Rate</div>
                                                <div className="text-yellow-400 font-mono">98 BPM</div>
                                            </div>
                                            <div className="text-right hidden sm:block">
                                                <div className="text-slate-400 text-xs">BP</div>
                                                <div className="text-red-400 font-mono">145/95</div>
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">Attention</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="dark:text-white text-slate-900 font-semibold text-lg">AI Insights</h3>
                                <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl border border-cyan-500/30">
                                    <div className="flex items-start space-x-3 mb-3">
                                        <svg className="w-5 h-5 text-cyan-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <div className="text-slate-300 text-sm">Patient AS showing elevated BP patterns. Recommend immediate consultation.</div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span>Confidence: 94%</span>
                                        <span>2 min ago</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                    <div className="text-slate-400 text-xs mb-2">Today's Schedule</div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3 text-sm">
                                            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                            <span className="text-slate-300">15:00 - Follow-up (JD)</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm">
                                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                            <span className="text-slate-300">15:30 - New Patient</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                            <span className="text-slate-300">16:00 - Team Sync</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors">
                                    Generate Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
