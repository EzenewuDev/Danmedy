'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    const [bpm, setBpm] = useState(72);

    useEffect(() => {
        const baseline = 72;
        const min = 60;
        const max = 92;
        const start = Date.now();
        const interval = setInterval(() => {
            setBpm((prev) => {
                const t = (Date.now() - start) / 1000;
                const resp = Math.sin((2 * Math.PI * t) / 5) * 1.2;
                const jitter = (Math.random() - 0.5) * 1.4;
                const pull = (baseline - prev) * 0.15;
                const next = Math.round(prev + pull + resp * 0.25 + jitter);
                return Math.max(min, Math.min(max, next));
            });
        }, 900);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* ── Left: Copy ── */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <span>AI-Powered Healthcare Revolution</span>
                        </div>

                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight dark:text-white text-slate-900">
                            Healthcare Without&nbsp;<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Boundaries
                            </span>
                        </h1>

                        <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                            DanMedy gives you instant access to board-certified doctors — book appointments, monitor your vitals live, and chat with your physician all in one platform.
                        </p>

                        {/* Quick services row */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: '🩺', label: 'Book Doctor', href: '/appointments' },
                                { icon: '💓', label: 'Check Vitals', href: '/vitals' },
                                { icon: '💬', label: 'Chat Live', href: '/chat' },
                            ].map((s) => (
                                <Link
                                    key={s.label}
                                    href={s.href}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-slate-200 hover:text-white text-sm font-medium transition-all hover:bg-white/10 hover:border-cyan-500/40"
                                >
                                    <span>{s.icon}</span>
                                    <span>{s.label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/appointments"
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 dark:text-white text-slate-900 font-bold rounded-full transform hover:scale-105 transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2"
                            >
                                <span>Book a Doctor</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href="/vitals"
                                className="px-8 py-4 border border-slate-600 hover:border-cyan-500 dark:text-white text-slate-900 font-semibold rounded-full transition-all flex items-center gap-2 group hover:bg-white/5"
                            >
                                <svg className="w-5 h-5 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span>View Vitals</span>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                            <div>
                                <div className="text-3xl font-bold dark:text-white text-slate-900 font-display">98.5%</div>
                                <div className="text-xs text-slate-400 mt-0.5">Diagnostic Accuracy</div>
                            </div>
                            <div className="h-10 w-px bg-slate-700" />
                            <div>
                                <div className="text-3xl font-bold dark:text-white text-slate-900 font-display">50k+</div>
                                <div className="text-xs text-slate-400 mt-0.5">Patients Monitored</div>
                            </div>
                            <div className="h-10 w-px bg-slate-700" />
                            <div>
                                <div className="text-3xl font-bold dark:text-white text-slate-900 font-display">24/7</div>
                                <div className="text-xs text-slate-400 mt-0.5">AI Support</div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Visual ── */}
                    <div className="relative flex items-center justify-center min-h-[420px]">
                        {/* Glow blob */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-600/15 blur-3xl" />

                        {/* Doctor photos — trusted faces */}
                        <div className="absolute top-8 left-4 z-20 flex -space-x-3">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-slate-800 dark:ring-slate-700 shadow-xl">
                                <Image src="/doctorA.jpeg" alt="Our specialist" fill className="object-cover" sizes="80px" />
                            </div>
                            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-slate-800 dark:ring-slate-700 shadow-xl">
                                <Image src="/doctorB.jpeg" alt="Our specialist" fill className="object-cover" sizes="80px" />
                            </div>
                        </div>

                        {/* BPM ring */}
                        <div className="relative w-64 h-64 z-10">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#06b6d4" strokeWidth="8"
                                    strokeDasharray="283" strokeDashoffset="70" strokeLinecap="round"
                                    className="animate-spin" style={{ animationDuration: '3s' }} />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-5xl font-bold dark:text-white text-slate-900 font-display tabular-nums">{bpm}</div>
                                <div className="text-cyan-400 text-sm font-medium tracking-wider">BPM</div>
                            </div>
                        </div>

                        {/* Floating: Diagnosis card */}
                        <div className="absolute top-4 right-0 glass-card p-4 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-500 z-20 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400">Diagnosis</div>
                                    <div className="text-sm font-semibold dark:text-white text-slate-900 whitespace-nowrap">Hypertension Stage 1</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating: Appointment card */}
                        <div className="absolute bottom-16 left-0 glass-card p-4 rounded-2xl -rotate-3 hover:rotate-0 transition-transform duration-500 z-20 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400">Next Appointment</div>
                                    <div className="text-sm font-semibold dark:text-white text-slate-900 whitespace-nowrap">Dr. Sarah — 2:30 PM</div>
                                </div>
                            </div>
                        </div>

                        {/* ECG strip */}
                        <svg className="absolute bottom-0 left-0 right-0 h-20 w-full z-10 opacity-70" preserveAspectRatio="none">
                            <path className="ecg-line" d="M0,50 L40,50 L50,15 L60,85 L70,50 L120,50 L130,10 L140,90 L150,50 L200,50 L210,15 L220,85 L230,50 L300,50"
                                fill="none" stroke="#06b6d4" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </svg>
                    </div>

                </div>
            </div>
        </section>
    );
}
