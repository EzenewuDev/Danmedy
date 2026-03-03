'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function VitalCard({ label, value, unit, icon, status, statusColor, trend, sub }) {
    return (
        <div className="glass-card rounded-3xl p-6 border border-slate-700 hover:border-cyan-500/40 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{icon}</div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor}`}>{status}</span>
            </div>
            <div className="flex items-end gap-2 mb-1">
                <div className="text-4xl font-bold dark:text-white text-slate-900 font-display">{value}</div>
                <div className="text-slate-400 text-sm pb-1">{unit}</div>
            </div>
            <div className="text-slate-400 text-sm font-medium mb-3">{label}</div>
            {sub && <div className="text-xs text-slate-500">{sub}</div>}
            {trend && (
                <div className={`flex items-center space-x-1 mt-3 text-xs font-medium ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    <svg className={`w-3 h-3 ${trend > 0 ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>{Math.abs(trend)}% from last week</span>
                </div>
            )}
        </div>
    );
}

function MiniChart({ values, color }) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const points = values.map((v, i) => {
        const x = (i / (values.length - 1)) * 100;
        const y = 100 - ((v - min) / (max - min || 1)) * 80 - 10;
        return `${x},${y}`;
    }).join(' ');
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-16">
            <polyline fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />
        </svg>
    );
}

const WEEKS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function VitalsPage() {
    const [bpm, setBpm] = useState(72);
    const [spo2, setSpo2] = useState(98);
    const [bpSys, setBpSys] = useState(120);
    const [bpDia, setBpDia] = useState(80);
    const [temp, setTemp] = useState(36.6);
    const [bpmHistory] = useState([68, 74, 72, 76, 71, 73, 72]);
    const [spo2History] = useState([97, 98, 99, 98, 97, 98, 98]);
    const [steps] = useState(7423);

    // Simulate live vitals fluctuation
    useEffect(() => {
        const iv = setInterval(() => {
            setBpm((v) => Math.max(60, Math.min(100, v + Math.round((Math.random() - 0.5) * 4))));
            setSpo2((v) => Math.max(95, Math.min(100, v + (Math.random() > 0.5 ? 1 : -1))));
            setTemp((v) => parseFloat((Math.max(36.0, Math.min(37.5, v + (Math.random() - 0.5) * 0.1))).toFixed(1)));
        }, 2000);
        return () => clearInterval(iv);
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 dark:text-white text-slate-900 pt-24 pb-16">
            <div className="gradient-bg" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-3">
                            <span>💓</span><span>Live Vital Monitoring</span>
                        </div>
                        <h1 className="font-display text-4xl font-bold dark:text-white text-slate-900">Your Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Dashboard</span></h1>
                        <p className="text-slate-400 mt-2 text-sm">Last updated just now • Syncing with wearable device</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/chat" className="px-5 py-2.5 bg-slate-800 border border-slate-700 hover:border-cyan-500/40 dark:text-white text-slate-900 rounded-xl text-sm font-medium transition-all">
                            💬 Ask Doctor
                        </Link>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 dark:text-white text-slate-900 rounded-xl text-sm font-bold transition-all hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20">
                            Share Report
                        </button>
                    </div>
                </div>

                {/* Live ECG strip */}
                <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 mb-8 overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-sm font-semibold text-slate-300">ECG · Live</span>
                        </div>
                        <div className="text-cyan-400 font-mono text-lg font-bold">{bpm} BPM</div>
                    </div>
                    <svg className="w-full h-16" preserveAspectRatio="none" viewBox="0 0 400 60">
                        <path className="ecg-line" d="M0,30 L40,30 L50,10 L60,50 L70,30 L110,30 L120,5 L130,55 L140,30 L200,30 L210,10 L220,50 L230,30 L280,30 L290,5 L300,55 L310,30 L370,30 L380,10 L390,50 L400,30"
                            fill="none" stroke="#06b6d4" strokeWidth="2" />
                    </svg>
                </div>

                {/* Card grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <VitalCard label="Heart Rate" value={bpm} unit="BPM" icon="❤️"
                        status={bpm < 100 ? 'Normal' : 'High'} statusColor={bpm < 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}
                        trend={2.1} sub="Resting heart rate" />
                    <VitalCard label="Blood Oxygen" value={spo2} unit="%" icon="🫁"
                        status={spo2 >= 97 ? 'Excellent' : 'Low'} statusColor={spo2 >= 97 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-yellow-500/20 text-yellow-400'}
                        trend={0.5} sub="SpO₂ saturation" />
                    <VitalCard label="Blood Pressure" value={`${bpSys}/${bpDia}`} unit="mmHg" icon="🩺"
                        status="Normal" statusColor="bg-emerald-500/20 text-emerald-400"
                        trend={-1.2} sub="Systolic / Diastolic" />
                    <VitalCard label="Body Temperature" value={temp} unit="°C" icon="🌡️"
                        status={temp < 37.2 ? 'Normal' : 'Elevated'} statusColor={temp < 37.2 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}
                        trend={null} sub="Oral measurement" />
                    <VitalCard label="Steps Today" value={steps.toLocaleString()} unit="steps" icon="🦶"
                        status="On Track" statusColor="bg-purple-500/20 text-purple-400"
                        trend={12.4} sub="Goal: 10,000 steps" />
                    <VitalCard label="Sleep Quality" value="7.2" unit="hrs" icon="😴"
                        status="Good" statusColor="bg-blue-500/20 text-blue-400"
                        trend={5.0} sub="Deep sleep: 1.8 hrs" />
                </div>

                {/* Weekly trend charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card rounded-3xl p-6 border border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="dark:text-white text-slate-900 font-bold">Heart Rate Trend</h3>
                            <span className="text-xs text-slate-400">This week</span>
                        </div>
                        <MiniChart values={bpmHistory} color="#06b6d4" />
                        <div className="flex justify-between mt-2">
                            {WEEKS.map((d, i) => (
                                <span key={d} className="text-xs text-slate-500">{d}</span>
                            ))}
                        </div>
                    </div>
                    <div className="glass-card rounded-3xl p-6 border border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="dark:text-white text-slate-900 font-bold">SpO₂ Trend</h3>
                            <span className="text-xs text-slate-400">This week</span>
                        </div>
                        <MiniChart values={spo2History} color="#8b5cf6" />
                        <div className="flex justify-between mt-2">
                            {WEEKS.map((d) => (
                                <span key={d} className="text-xs text-slate-500">{d}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Recommendation */}
                <div className="mt-6 p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="text-3xl">🤖</div>
                    <div className="flex-1">
                        <div className="dark:text-white text-slate-900 font-bold mb-1">AI Health Insight</div>
                        <p className="text-slate-400 text-sm">Your vitals are within normal ranges today. Heart rate variability suggests light stress — consider 10 minutes of deep breathing. Schedule a follow-up if BP stays above 130/85 for 3 days.</p>
                    </div>
                    <Link href="/chat" className="flex-shrink-0 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl text-sm transition-all">
                        Talk to Dr
                    </Link>
                </div>
            </div>
        </div>
    );
}
