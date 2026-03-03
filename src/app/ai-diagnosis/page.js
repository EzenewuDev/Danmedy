'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const SYSTEM_PROMPT = `You are DanMedy AI, a compassionate and knowledgeable medical AI assistant powered by advanced medicine. Your role is to:
- Listen carefully to patients describing their symptoms and health concerns
- Ask thoughtful follow-up questions to understand severity, duration, and context
- Provide clear, helpful preliminary health information and possible explanations
- Always recommend consulting a real doctor for diagnosis and treatment
- Never prescribe medication, but you can explain how common conditions are typically managed
- Use plain, empathetic language — avoid overly technical jargon
- If symptoms sound urgent (chest pain radiating to arm, difficulty breathing, confusion, etc.), clearly advise emergency care
- Keep responses concise yet thorough — aim for 3–5 sentences unless more detail is needed
- Start your first message by warmly introducing yourself and asking how you can help today`;

export default function AIDiagnosisPage() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            text: "Hello! I'm DanMedy AI — your personal health assistant. I'm here to help you understand your symptoms, answer health questions, and guide you on next steps. Please describe what you're experiencing and I'll do my best to help. Remember, I'm here to inform and support — always see a qualified doctor for a formal diagnosis.",
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [engine, setEngine] = useState({ provider: 'Gemini', model: 'Auto' });
    const [provider, setProvider] = useState('auto');
    const [modelPref, setModelPref] = useState('');
    const [availableModels, setAvailableModels] = useState(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const QUICK_QUESTIONS = [
        'I have a persistent cough for 2 weeks',
        'My head has been throbbing since morning',
        'I feel extremely tired despite sleeping',
        'I have pain in my lower back',
        'I have a rash on my skin',
        'I\'ve been feeling anxious and stressed',
    ];

    const listModels = async () => {
        const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!key) throw new Error('Missing API key');
        const versions = ['v1', 'v1beta'];
        let items = [];
        let lastErr = null;
        for (const ver of versions) {
            try {
                const r = await fetch(`https://generativelanguage.googleapis.com/${ver}/models?key=${key}`);
                if (!r.ok) {
                    let msg = 'Unable to list models';
                    try {
                        const j = await r.json();
                        msg = j?.error?.message || msg;
                    } catch {}
                    throw new Error(msg);
                }
                const j = await r.json();
                if (Array.isArray(j?.models) && j.models.length) {
                    items = j.models;
                    break;
                }
            } catch (e) {
                lastErr = e;
            }
        }
        if (!items.length && lastErr) throw lastErr;
        const names = items
            .filter((m) => Array.isArray(m?.supportedGenerationMethods) ? m.supportedGenerationMethods.includes('generateContent') : true)
            .map((m) => m?.name?.replace(/^models\//, ''))
            .filter(Boolean);
        return [...new Set(names)];
    };

    const chooseBestModel = (names) => {
        const priority = [
            'gemini-2.0-flash',
            'gemini-2.0-flash-lite',
            'gemini-1.5-flash-8b',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
        ];
        for (const p of priority) {
            if (names.includes(p)) return p;
        }
        return names[0] || null;
    };

    const labelFor = (model) => {
        const map = {
            'gemini-2.0-flash': 'Gemini 2.0 Flash',
            'gemini-2.0-flash-lite': 'Gemini 2.0 Flash Lite',
            'gemini-1.5-flash': 'Gemini 1.5 Flash',
            'gemini-1.5-flash-8b': 'Gemini 1.5 Flash 8B',
            'gemini-1.5-pro': 'Gemini 1.5 Pro',
        };
        return map[model] || model || 'Auto';
    };

    const toOpenAIMessages = (history, captured) => {
        const msgs = [{ role: 'system', content: SYSTEM_PROMPT }];
        for (const m of history) {
            if (m.role === 'assistant') msgs.push({ role: 'assistant', content: m.text });
            if (m.role === 'user') msgs.push({ role: 'user', content: m.text });
        }
        msgs.push({ role: 'user', content: captured });
        return msgs;
    };

    const tryGroq = async (history, captured, preferred) => {
        const key = process.env.NEXT_PUBLIC_GROQ_API_KEY;
        if (!key) throw new Error('Missing Groq API key');
        const model = preferred || 'llama-3.3-70b-versatile';
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
                model,
                messages: toOpenAIMessages(history, captured),
                temperature: 0.7,
                max_tokens: 600,
            }),
        });
        if (!res.ok) {
            let msg = 'Groq request failed';
            try {
                const d = await res.json();
                msg = d?.error?.message || msg;
            } catch {}
            throw new Error(msg);
        }
        const d = await res.json();
        const t = d?.choices?.[0]?.message?.content;
        return { text: t, model };
    };

    const tryXAI = async (history, captured, preferred) => {
        const key = process.env.NEXT_PUBLIC_XAI_API_KEY;
        if (!key) throw new Error('Missing xAI API key');
        const model = preferred || 'grok-2-latest';
        const res = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
                model,
                messages: toOpenAIMessages(history, captured),
                temperature: 0.7,
                max_tokens: 600,
            }),
        });
        if (!res.ok) {
            let msg = 'xAI request failed';
            try {
                const d = await res.json();
                msg = d?.error?.message || msg;
            } catch {}
            throw new Error(msg);
        }
        const d = await res.json();
        const t = d?.choices?.[0]?.message?.content;
        return { text: t, model };
    };

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg = {
            id: Date.now(),
            role: 'user',
            text: input,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
        const captured = input;
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        setError('');

        try {
            const history = messages.map((m) => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.text }],
            }));

            const callGemini = async (preferred) => {
                let models = availableModels;
                if (!models) {
                    const list = await listModels();
                    models = list;
                    setAvailableModels(list);
                }
                let start = preferred ? preferred : (modelPref && provider.startsWith('gemini') ? modelPref : chooseBestModel(models));
                if (!start) throw new Error('No compatible Gemini model available for your key');
                const versions = ['v1', 'v1beta'];
                const tryCall = async (model) => {
                    let lastErr = null;
                    for (const ver of versions) {
                        try {
                            const res = await fetch(
                                `https://generativelanguage.googleapis.com/${ver}/models/${model}:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
                                {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                                        contents: [...history, { role: 'user', parts: [{ text: captured }] }],
                                        generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
                                        safetySettings: [
                                            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                                            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                                        ],
                                    }),
                                }
                            );
                            if (!res.ok) {
                                let msg = 'API request failed';
                                try {
                                    const d = await res.json();
                                    msg = d?.error?.message || msg;
                                } catch {}
                                throw new Error(msg);
                            }
                            const d = await res.json();
                            const t = d?.candidates?.[0]?.content?.parts?.[0]?.text;
                            if (t) return { text: t, model };
                        } catch (e) {
                            lastErr = e;
                        }
                    }
                    if (lastErr) throw lastErr;
                    return null;
                };
                const fallbacks = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash-8b', 'gemini-1.5-flash', 'gemini-1.5-pro'];
                const candidates = [start, ...fallbacks.filter((m) => m !== start && models.includes(m))];
                let lastError = null;
                for (const model of candidates) {
                    try {
                        const r = await tryCall(model);
                        if (r?.text) return { ...r, provider: 'Gemini' };
                    } catch (err) {
                        lastError = err;
                    }
                }
                throw lastError || new Error('No response from Gemini');
            };

            const pick = provider;
            let out = null;
            if (pick === 'gemini' || pick === 'gemini-2.0-flash' || pick === 'gemini-1.5-flash' || pick === 'gemini-1.5-flash-8b' || pick === 'gemini-2.0-flash-lite') {
                const prefer = pick.startsWith('gemini-') ? pick : modelPref;
                out = await callGemini(prefer);
            } else if (pick === 'groq') {
                out = await tryGroq(messages, captured, modelPref || 'llama-3.3-70b-versatile');
                out.provider = 'Groq';
            } else if (pick === 'xai') {
                out = await tryXAI(messages, captured, modelPref || 'grok-2-latest');
                out.provider = 'xAI';
            } else {
                let lastErr = null;
                try {
                    out = await callGemini();
                } catch (e) {
                    lastErr = e;
                }
                if (!out) {
                    try {
                        out = await tryGroq(messages, captured, 'llama-3.3-70b-versatile');
                        out.provider = 'Groq';
                    } catch (e) {
                        lastErr = e;
                    }
                }
                if (!out) {
                    try {
                        out = await tryXAI(messages, captured, 'grok-2-latest');
                        out.provider = 'xAI';
                    } catch (e) {
                        lastErr = e;
                    }
                }
                if (!out) throw lastErr || new Error('All providers failed');
            }

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: 'assistant',
                    text: out.text,
                    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
            const label = out.provider === 'Gemini' ? labelFor(out.model) : out.model;
            setEngine({ provider: out.provider || 'Gemini', model: label });
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 pt-20">
            <div className="gradient-bg" />

            {/* Header */}
            <div className="glass border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex-shrink-0 relative z-10">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div className="relative">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full animate-pulse" />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white">DanMedy AI</div>
                            <div className="text-emerald-500 text-xs flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                                Powered by {engine.provider} · {engine.model}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            value={provider}
                            onChange={(e) => {
                                const val = e.target.value;
                                setProvider(val);
                                if (val === 'gemini') setModelPref('');
                                if (val === 'groq') setModelPref('llama-3.3-70b-versatile');
                                if (val === 'xai') setModelPref('grok-2-latest');
                                if (val === 'auto') setModelPref('');
                            }}
                            className="text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-200"
                        >
                            <option value="auto">Auto (Best Free)</option>
                            <option value="gemini">Gemini (Auto)</option>
                            <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                            <option value="gemini-2.0-flash-lite">Gemini 2.0 Flash Lite</option>
                            <option value="gemini-1.5-flash-8b">Gemini 1.5 Flash 8B</option>
                            <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                            <option value="groq">Groq · Llama</option>
                            <option value="xai">xAI · Grok</option>
                        </select>
                        <button
                            onClick={() => {
                                setMessages([{
                                    id: 1, role: 'assistant',
                                    text: "Hello again! I'm ready for a fresh start. What health concern can I help you with?",
                                    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                                }]);
                                setError('');
                            }}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            Clear chat
                        </button>
                    </div>
                </div>
            </div>

            {/* Disclaimer banner */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800/40 px-4 py-2.5 flex-shrink-0 relative z-10">
                <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span><strong>Medical Disclaimer:</strong> This AI provides general health information only and does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified doctor.</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 relative z-10">
                <div className="max-w-3xl mx-auto space-y-5">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2.5`}>
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                            )}
                            <div className="max-w-[82%] sm:max-w-[72%]">
                                {msg.role === 'assistant' && (
                                    <div className="text-xs text-slate-400 dark:text-slate-500 mb-1 ml-1">DanMedy AI</div>
                                )}
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-violet-500 to-cyan-500 text-white rounded-br-sm shadow-md'
                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                                <div className={`text-xs text-slate-400 mt-1 ${msg.role === 'user' ? 'text-right' : 'ml-1'}`}>{msg.time}</div>
                            </div>
                        </div>
                    ))}

                    {/* Loading indicator */}
                    {loading && (
                        <div className="flex items-end gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow">
                                <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            </div>
                            <div className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm shadow-sm">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <div className="flex space-x-1">
                                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                    <span>Analysing your symptoms…</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="flex justify-center">
                            <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2 max-w-sm">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Input area */}
            <div className="glass border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4 flex-shrink-0 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Quick questions */}
                    <div className="flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-hide">
                        {QUICK_QUESTIONS.map((q) => (
                            <button
                                key={q}
                                onClick={() => setInput(q)}
                                className="flex-shrink-0 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-900/20 border border-slate-200 dark:border-slate-700 hover:border-violet-400 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full transition-all"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-end gap-3">
                        <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus-within:border-violet-500 rounded-2xl transition-colors px-4 py-3 shadow-sm">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                placeholder="Describe your symptoms or ask a health question…"
                                rows={1}
                                disabled={loading}
                                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none text-sm leading-relaxed disabled:opacity-60"
                                style={{ maxHeight: '120px' }}
                            />
                        </div>
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || loading}
                            className="p-3.5 bg-gradient-to-br from-violet-500 to-cyan-500 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-violet-500/30 flex-shrink-0"
                            title="Send"
                        >
                            {loading ? (
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-3">
                        <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-xs text-slate-400">Encrypted · {engine.model} · Not a substitute for medical care</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
