 'use client';
 import { useEffect, useState } from 'react';
 
 export default function BackToTop() {
   const [visible, setVisible] = useState(false);
   useEffect(() => {
     const onScroll = () => setVisible(window.scrollY > 400);
     onScroll();
     window.addEventListener('scroll', onScroll, { passive: true });
     return () => window.removeEventListener('scroll', onScroll);
   }, []);
 
   if (!visible) return null;
 
   const bottom = 'calc(env(safe-area-inset-bottom, 0px) + 72px)';
   const right = 'calc(env(safe-area-inset-right, 0px) + 16px)';
 
   return (
     <button
       onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
       aria-label="Back to top"
       className="group fixed z-50 rounded-full shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
       style={{ bottom, right }}
     >
       <div className="relative w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 flex items-center justify-center">
         <svg className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover:text-cyan-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
         </svg>
       </div>
     </button>
   );
 }
