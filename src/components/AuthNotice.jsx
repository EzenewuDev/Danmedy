 'use client';
 import { useEffect, useState } from 'react';
 
 export default function AuthNotice() {
   const show =
     process.env.NEXT_PUBLIC_DISABLE_AUTH === '1' ||
     !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
   const [hidden, setHidden] = useState(() => {
     if (!show) return true;
     try {
       return typeof window !== 'undefined' && window.localStorage.getItem('auth_notice_dismissed') === '1';
     } catch {
       return false;
     }
   });
 
   if (!show || hidden) return null;
 
   const dismiss = () => {
     try {
       window.localStorage.setItem('auth_notice_dismissed', '1');
     } catch {}
     setHidden(true);
   };
 
   const bottom = 'calc(env(safe-area-inset-bottom, 0px) + 12px)';
 
   return (
     <div
       className="fixed left-1/2 -translate-x-1/2 z-50 max-w-[92%] sm:max-w-md"
       style={{ bottom }}
       role="status"
       aria-live="polite"
     >
       <div className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-amber-500/15 border border-amber-400/30 backdrop-blur-md text-amber-700 dark:text-amber-300 shadow-lg">
         <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
         </svg>
         <span className="text-xs sm:text-[13px]">
           Authentication is disabled or not configured for this deployment.
         </span>
         <button
           onClick={dismiss}
           className="ml-1 text-xs px-2 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 transition-colors"
           aria-label="Dismiss authentication notice"
         >
           Dismiss
         </button>
       </div>
     </div>
   );
 }
