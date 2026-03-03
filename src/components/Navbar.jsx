'use client';
import { useState, useEffect, useRef } from 'react';
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const navItems = [
    {
        label: 'Services',
        mega: [
            { icon: '🩺', title: 'Book Appointment', desc: 'Schedule a doctor visit instantly', href: '/appointments' },
            { icon: '💓', title: 'Vital Check', desc: 'Monitor your health metrics live', href: '/vitals' },
            { icon: '💬', title: 'Doctor Chat', desc: 'Real-time 1-on-1 with your doctor', href: '/chat' },
            { icon: '🧠', title: 'AI Diagnosis', desc: 'AI-powered symptom analysis', href: '/ai-diagnosis' },
        ],
    },
    {
        label: 'Technology',
        href: '/#technology',
    },
    {
        label: 'Dashboard',
        href: '/#dashboard',
    },
    {
        label: 'Security',
        href: '/#security',
    },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const menuRef = useRef(null);
    const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    // When scrolled, navbar bg is dark slate-900, so text must always be white.
    // When at top, respect dark/light mode.
    const linkColor = scrolled ? 'text-white' : 'text-slate-900 dark:text-white';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-slate-900/95 shadow-2xl shadow-cyan-500/5 border-b border-slate-800'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* ── Logo ── */}
                        <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl transform group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-cyan-500/40" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className={`w-6 h-6 ${linkColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                {/* live pulse */}
                                <span className="absolute -top-1 -right-1 w-3 h-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
                                </span>
                            </div>
                            <span className={`font-display text-2xl font-bold tracking-tight ${linkColor}`}>
                                Dan<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Medy</span>
                            </span>
                        </Link>

                        {/* ── Desktop nav ── */}
                        <div ref={menuRef} className="hidden lg:flex items-center space-x-1">
                            {navItems.map((item) =>
                                item.mega ? (
                                    <div key={item.label} className="relative">
                                        <button
                                            onMouseEnter={() => setActiveMenu(item.label)}
                                            onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                                            className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeMenu === item.label
                                                ? 'text-cyan-400 bg-cyan-500/10'
                                                : `${linkColor} hover:bg-white/5`
                                                }`}
                                        >
                                            <span>{item.label}</span>
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`}
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Mega dropdown */}
                                        {activeMenu === item.label && (
                                            <div
                                                onMouseLeave={() => setActiveMenu(null)}
                                                className="absolute left-1/2 -translate-x-1/2 mt-2 w-[480px] rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-4 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-200"
                                            >
                                                {item.mega.map((sub) => (
                                                    <Link
                                                        key={sub.title}
                                                        href={sub.href}
                                                        onClick={() => setActiveMenu(null)}
                                                        className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-800/80 group/item transition-all duration-200 border border-transparent hover:border-cyan-500/20"
                                                    >
                                                        <span className="text-2xl mt-0.5">{sub.icon}</span>
                                                        <div>
                                                            <div className="dark:text-white text-slate-900 font-semibold text-sm group-hover/item:text-cyan-400 transition-colors">{sub.title}</div>
                                                            <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{sub.desc}</div>
                                                        </div>
                                                    </Link>
                                                ))}

                                                {/* Bottom CTA strip */}
                                                <div className="col-span-2 mt-1 pt-3 border-t border-slate-800 flex items-center justify-between">
                                                    <span className="text-xs text-slate-500">Trusted by 50,000+ patients worldwide</span>
                                                    <Link
                                                        href="/appointments"
                                                        onClick={() => setActiveMenu(null)}
                                                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-1"
                                                    >
                                                        <span>Book now</span>
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`relative px-4 py-2 rounded-lg text-sm font-medium ${linkColor} hover:bg-white/5 transition-all duration-200 nav-link`}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            )}
                        </div>

                        {/* ── Right side ── */}
                        <div className="flex items-center space-x-3">
                            {/* Live status pill */}
                            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>24/7 Live</span>
                            </div>

                            {/* Theme Toggle */}
                            <ThemeToggle />

                            {hasClerk ? (
                                <SignedIn>
                                    <Link
                                        href="/admin"
                                        className={`hidden md:block px-4 py-2 text-sm font-medium ${linkColor} hover:bg-white/5 rounded-lg transition-all`}
                                    >
                                        Admin
                                    </Link>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>
                            ) : null}

                            {hasClerk ? (
                                <SignedOut>
                                    <Link href="/sign-in" className={`hidden md:block text-sm font-medium ${linkColor} px-4 py-2 rounded-lg hover:bg-white/5 transition-all`}>
                                        Sign in
                                    </Link>
                                    <Link href="/sign-up" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 text-sm">
                                        Get Started
                                    </Link>
                                </SignedOut>
                            ) : null}

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className={`lg:hidden p-2 rounded-lg ${linkColor} hover:bg-white/10 transition-all`}
                                aria-label="Toggle menu"
                            >
                                <div className="w-5 flex flex-col gap-1.5">
                                    <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                    <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                                    <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Mobile Drawer ── */}
                <div
                    className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="bg-slate-900/98 border-t border-slate-800 px-4 py-6 space-y-1">
                        <div className="mb-4 pb-4 border-b border-slate-800">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Services</p>
                            {navItems[0].mega.map((sub) => (
                                <Link
                                    key={sub.title}
                                    href={sub.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center space-x-3 px-3 py-3 rounded-xl text-slate-900 dark:text-white hover:bg-slate-800 transition-all"
                                >
                                    <span className="text-xl">{sub.icon}</span>
                                    <div>
                                        <div className="text-sm font-semibold">{sub.title}</div>
                                        <div className="text-xs text-slate-500">{sub.desc}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {navItems.slice(1).map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-2.5 rounded-lg text-slate-900 dark:text-white hover:bg-slate-800 text-sm font-medium transition-all"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-slate-800 space-y-3">
                            {hasClerk ? (
                                <SignedOut>
                                    <Link href="/sign-up" className="block w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl text-sm text-center">
                                        Get Started
                                    </Link>
                                </SignedOut>
                            ) : null}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
