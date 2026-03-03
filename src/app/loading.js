'use client';
import { useEffect, useState } from 'react';

export default function Loading() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0f172a]">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-slate-900" />

            {/* ECG Line Animation */}
            <div className="relative w-64 h-32 flex items-center justify-center mb-8">
                <svg className="absolute w-full h-full opacity-80" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path
                        d="M 0 50 L 150 50 L 160 20 L 175 90 L 190 50 L 250 50 L 260 30 L 270 70 L 280 50 L 400 50"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="animate-[drawECG_2.5s_linear_infinite]"
                        style={{ strokeDasharray: 800, strokeDashoffset: 800 }}
                    />
                </svg>

                {/* Heart icon pulse */}
                <div className="absolute w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                    <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </div>

            {/* Loading Text */}
            <div className="text-center relative z-10">
                <h2 className="text-2xl font-display font-bold dark:text-white text-slate-900 mb-2 tracking-wide">
                    Dan<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Medy</span>
                </h2>
                <p className="text-sm font-medium text-slate-400 font-mono tracking-widest uppercase flex items-center gap-1">
                    Initializing System
                    <span className="inline-block w-4 text-left">{dots}</span>
                </p>
            </div>

            {/* Loading Bar */}
            <div className="mt-8 w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-[loadingBar_2s_ease-in-out_infinite]" />
            </div>

            <style jsx>{`
        @keyframes drawECG {
          0% { stroke-dashoffset: 800; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes loadingBar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 100%; transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}
