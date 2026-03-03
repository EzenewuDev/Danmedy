import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';

export default async function AdminLayout({ children }) {
    const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;
    if (hasClerk) {
        const val = await auth();
        const userId = val?.userId;
        if (!userId) {
            redirect('/sign-in');
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex">
            <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 flex flex-col hidden md:flex">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-8 h-8 bg-cyan-500 rounded-lg transform rotate-45 flex items-center justify-center">
                        <svg className="w-5 h-5 dark:text-white text-slate-900 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <span className="font-display text-2xl font-bold dark:text-white text-slate-900">Admin<span className="text-cyan-400">Panel</span></span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/admin" className="block px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 font-medium border border-cyan-500/20">Dashboard</Link>
                    <Link href="/admin/patients" className="block px-4 py-2 rounded-lg text-slate-400 dark:text-slate-300 hover:text-slate-300 hover:dark:text-white hover:bg-slate-800 transition-colors">Patients</Link>
                    <Link href="/admin/appointments" className="block px-4 py-2 rounded-lg text-slate-400 dark:text-slate-300 hover:text-slate-300 hover:dark:text-white hover:bg-slate-800 transition-colors">Appointments</Link>
                    <Link href="/admin/settings" className="block px-4 py-2 rounded-lg text-slate-400 dark:text-slate-300 hover:text-slate-300 hover:dark:text-white hover:bg-slate-800 transition-colors">Settings</Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-800">
                    <Link href="/" className="block px-4 py-2 rounded-lg text-slate-400 dark:text-slate-300 hover:text-slate-300 hover:dark:text-white hover:bg-slate-800 transition-colors">← Back to Site</Link>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto bg-slate-900 dark:text-white text-slate-900 p-8">
                {children}
            </main>
        </div>
    );
}
