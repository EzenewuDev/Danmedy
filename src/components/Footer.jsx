'use client';

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-cyan-500 rounded-lg transform rotate-45 flex items-center justify-center">
                                <svg className="w-5 h-5 dark:text-white text-slate-900 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <span className="font-display text-2xl font-bold dark:text-white text-slate-900">Dan<span className="text-cyan-400">Medy</span></span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">Revolutionizing healthcare delivery through AI-powered telemedicine, remote monitoring, and intelligent scheduling systems.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-cyan-500 hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-cyan-500 hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-cyan-500 hover:text-white transition-all" aria-label="Instagram">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.505 4.505 0 0 0 12 7.5zm0 7.5a3 3 0 1 1 3-3 3.003 3.003 0 0 1-3 3zm4.75-8.75a1.25 1.25 0 1 0 1.25 1.25 1.251 1.251 0 0 0-1.25-1.25z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="dark:text-white text-slate-900 font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">Security</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">Integrations</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">API</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="dark:text-white text-slate-900 font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">© 2024 DanMedy. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-600 dark:text-slate-500">
                        <a href="#" className="hover:text-cyan-600 dark:hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-cyan-600 dark:hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-cyan-600 dark:hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
