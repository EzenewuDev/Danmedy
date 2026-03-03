'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const DOCTORS = [
    {
        id: 1,
        name: 'Dr. Sarah Chen',
        initials: 'SC',
        specialty: 'Cardiologist',
        experience: '14 yrs exp',
        rating: 4.9,
        patients: '3.2k',
        gradient: 'from-cyan-400 to-blue-600',
        color: 'cyan',
        available: true,
        bio: 'Specialist in heart disease, hypertension, and cardiovascular preventive care.',
        topics: ['I have chest pain', 'My heart is racing', 'High blood pressure', 'Shortness of breath'],
    },
    {
        id: 2,
        name: 'Dr. James Okonkwo',
        initials: 'JO',
        specialty: 'Neurologist',
        experience: '11 yrs exp',
        rating: 4.8,
        patients: '2.7k',
        gradient: 'from-purple-400 to-pink-600',
        color: 'purple',
        available: true,
        bio: 'Specialising in migraines, stroke prevention, epilepsy, and nervous system disorders.',
        topics: ['I have a headache', 'I feel dizzy', 'Tingling sensation', 'Memory issues'],
    },
    {
        id: 3,
        name: 'Dr. Aisha Patel',
        initials: 'AP',
        specialty: 'General Practitioner',
        experience: '9 yrs exp',
        rating: 4.7,
        patients: '5.1k',
        gradient: 'from-emerald-400 to-teal-600',
        color: 'emerald',
        available: true,
        bio: 'Your first point of contact for any health concern — from colds to chronic illness management.',
        topics: ['I have a fever', 'I feel tired all the time', 'Need a check-up', 'Stomach pain'],
    },
    {
        id: 4,
        name: 'Dr. Marcus Webb',
        initials: 'MW',
        specialty: 'Orthopaedic Surgeon',
        experience: '16 yrs exp',
        rating: 4.9,
        patients: '1.9k',
        gradient: 'from-orange-400 to-red-600',
        color: 'orange',
        available: false,
        bio: 'Expert in bone, joint, and muscle conditions. Sports injuries, arthritis, and spinal care.',
        topics: ['My knee hurts', 'Back pain', 'I sprained my ankle', 'Joint stiffness'],
    },
];

const RESPONSES = {
    default: (doc) => `Thank you for sharing that with me. As a ${doc.specialty}, I want to make sure I understand your situation fully. Could you describe when these symptoms started and how severe they are on a scale of 1–10?`,
    fever: () => `Fever is your body's natural defence response. What's your current temperature reading? Do you also have chills, sweating, or body aches? This will help me assess whether we need urgent attention.`,
    headache: () => `I understand — headaches can range from tension-type to migraines. Can you describe it: is it throbbing, pressure-like, or sharp? Is it on one side or both, and does light or sound make it worse?`,
    chest: () => `Chest symptoms always require careful assessment. Is the discomfort sharp, pressure-like, or burning? Does it radiate to your arm, neck, or jaw? Have you been physically active recently?`,
    tired: () => `Persistent fatigue can have many causes — anaemia, thyroid issues, sleep disorders, or viral infections. How long has this been going on? Are you sleeping 7–8 hours and still feeling exhausted?`,
    stomach: () => `Abdominal discomfort can stem from many conditions. Can you point to where it hurts most — upper, lower, left, or right side? Is it constant or does it come and go? Any nausea, vomiting, or changes in appetite?`,
    back: () => `Back pain is very common. Is it located in your upper, mid, or lower back? Does it radiate down your leg? Did it start suddenly from an injury or come on gradually over time?`,
    knee: () => `Knee pain needs careful examination. Is there any swelling, warmth, or clicking when you move it? Did you injure it, or did the pain come on gradually? Does it hurt more going up or down stairs?`,
    heart: () => `Racing or irregular heartbeat can be caused by stress, caffeine, or arrhythmia. How long do the episodes last? Do you also feel short of breath, dizzy, or have fainting spells? Any history of heart conditions?`,
    dizzy: () => `Dizziness can be very disorienting. Is it a spinning sensation (vertigo) or feeling faint? Does it happen when you stand up, turn your head, or randomly? Any recent ear infections or head injuries?`,
    blood: () => `Blood pressure management is crucial for long-term heart health. What readings have you been recording at home? Have you been on any medication for this before, and how is your diet and salt intake?`,
    breath: () => `Shortness of breath is an important symptom. Does it happen at rest or only during activity? Is it accompanied by wheezing, coughing, or chest tightness? Any known asthma or allergies?`,
};

function getReply(msg, doc) {
    const lower = msg.toLowerCase();
    if (lower.includes('fever') || lower.includes('temperature') || lower.includes('hot')) return RESPONSES.fever();
    if (lower.includes('headache') || lower.includes('head') || lower.includes('migraine')) return RESPONSES.headache();
    if (lower.includes('chest') || lower.includes('heart pain')) return RESPONSES.chest();
    if (lower.includes('tired') || lower.includes('fatigue') || lower.includes('exhausted')) return RESPONSES.tired();
    if (lower.includes('stomach') || lower.includes('abdomen') || lower.includes('belly')) return RESPONSES.stomach();
    if (lower.includes('back') || lower.includes('spine') || lower.includes('lumbar')) return RESPONSES.back();
    if (lower.includes('knee') || lower.includes('joint') || lower.includes('ankle')) return RESPONSES.knee();
    if (lower.includes('racing') || lower.includes('palpitation') || lower.includes('irregular')) return RESPONSES.heart();
    if (lower.includes('dizzy') || lower.includes('vertigo') || lower.includes('faint')) return RESPONSES.dizzy();
    if (lower.includes('blood pressure') || lower.includes('hypertension') || lower.includes('bp')) return RESPONSES.blood();
    if (lower.includes('breath') || lower.includes('breathing') || lower.includes('wheez')) return RESPONSES.breath();
    return RESPONSES.default(doc);
}

export default function ChatPage() {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const startChat = (doc) => {
        setSelectedDoctor(doc);
        setMessages([
            {
                id: 1,
                sender: 'doctor',
                text: `Hello! I'm ${doc.name}, your ${doc.specialty}. I'm here to listen and help. Please describe how you're feeling today — don't hold back, everything is confidential.`,
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            },
        ]);
        setInput('');
    };

    const sendMessage = () => {
        if (!input.trim() || !selectedDoctor) return;
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: input,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
        const captured = input;
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setTyping(true);
        setTimeout(() => {
            const reply = {
                id: Date.now() + 1,
                sender: 'doctor',
                text: getReply(captured, selectedDoctor),
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, reply]);
            setTyping(false);
        }, 1800);
    };

    /* ─── Doctor Selection Screen ─── */
    if (!selectedDoctor) {
        return (
            <div className="min-h-screen pt-20 pb-12 px-4">
                <div className="gradient-bg" />
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
                            Doctors Available Now
                        </div>
                        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Doctor</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
                            Select a specialist below and start a confidential real-time chat consultation.
                        </p>
                    </div>

                    {/* Doctor Cards */}
                    <div className="grid sm:grid-cols-2 gap-5">
                        {DOCTORS.map((doc) => (
                            <div
                                key={doc.id}
                                className={`group glass-card rounded-2xl p-6 transition-all duration-300 ${doc.available ? 'cursor-pointer hover:scale-[1.02]' : 'opacity-60 cursor-not-allowed'}`}
                                onClick={() => doc.available && startChat(doc)}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${doc.gradient} flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg`}>
                                        {doc.initials}
                                        {doc.available ? (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full" />
                                        ) : (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-slate-500 border-2 border-white dark:border-slate-900 rounded-full" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{doc.name}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${doc.available ? 'bg-emerald-500/15 text-emerald-500' : 'bg-slate-500/15 text-slate-400'}`}>
                                                {doc.available ? 'Available' : 'Offline'}
                                            </span>
                                        </div>
                                        <p className="text-cyan-500 dark:text-cyan-400 text-sm font-medium">{doc.specialty}</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{doc.experience}</p>
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{doc.bio}</p>

                                <div className="flex items-center gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-400">★</span>
                                        <span className="font-semibold text-slate-800 dark:text-white">{doc.rating}</span>
                                    </div>
                                    <div className="text-slate-500 dark:text-slate-400">
                                        <span className="font-semibold text-slate-800 dark:text-white">{doc.patients}</span> patients
                                    </div>
                                </div>

                                {/* Quick topics */}
                                <div className="flex flex-wrap gap-2">
                                    {doc.topics.map((t) => (
                                        <span key={t} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {doc.available && (
                                    <button className={`mt-5 w-full py-2.5 bg-gradient-to-r ${doc.gradient} text-white text-sm font-semibold rounded-xl transition-all group-hover:shadow-lg group-hover:opacity-95`}>
                                        Start Chat →
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-slate-500 dark:text-slate-500 text-sm mt-6">
                        Or try our <Link href="/ai-diagnosis" className="text-cyan-500 hover:underline">AI Diagnosis</Link> for instant symptom analysis.
                    </p>
                </div>
            </div>
        );
    }

    /* ─── Chat Screen ─── */
    return (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white pt-20">
            <div className="gradient-bg" />

            {/* Header */}
            <div className="glass border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex-shrink-0 z-10 relative">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSelectedDoctor(null)}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                            title="Back to doctor list"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="relative">
                            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${selectedDoctor.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                                {selectedDoctor.initials}
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{selectedDoctor.name}</div>
                            <div className="text-emerald-500 text-xs flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                                Online · {selectedDoctor.specialty}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all" title="Video call">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.069A1 1 0 0121 8.847v6.306a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all" title="Vitals">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 relative z-10">
                <div className="max-w-3xl mx-auto space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                        <span className="text-xs text-slate-400 font-medium">Today</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                    </div>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2.5`}>
                            {msg.sender === 'doctor' && (
                                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedDoctor.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                    {selectedDoctor.initials}
                                </div>
                            )}
                            <div className={`max-w-[80%] sm:max-w-[70%]`}>
                                {msg.sender === 'doctor' && (
                                    <div className="text-xs text-slate-400 mb-1 ml-1">{selectedDoctor.name}</div>
                                )}
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                    ? `bg-gradient-to-br ${selectedDoctor.gradient} text-white rounded-br-sm shadow-md`
                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                                <div className={`text-xs text-slate-400 mt-1 ${msg.sender === 'user' ? 'text-right' : 'ml-1'}`}>{msg.time}</div>
                            </div>
                        </div>
                    ))}

                    {typing && (
                        <div className="flex items-end gap-2.5">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedDoctor.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                {selectedDoctor.initials}
                            </div>
                            <div className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm shadow-sm">
                                <div className="flex space-x-1.5">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Input */}
            <div className="glass border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4 flex-shrink-0 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <div className="flex gap-2 flex-wrap mb-3">
                        {selectedDoctor.topics.map((q) => (
                            <button
                                key={q}
                                onClick={() => setInput(q)}
                                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full transition-all"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-end gap-3">
                        <div className="flex-1 flex items-end bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus-within:border-cyan-500 rounded-2xl transition-colors px-4 py-3 gap-3 shadow-sm">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                placeholder={`Message ${selectedDoctor.name}...`}
                                rows={1}
                                className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none text-sm leading-relaxed"
                                style={{ maxHeight: '120px' }}
                            />
                        </div>
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim()}
                            className={`p-3.5 bg-gradient-to-br ${selectedDoctor.gradient} hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl transition-all transform hover:scale-105 shadow-lg flex-shrink-0`}
                            title="Send"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
