 'use client';
 import { useState } from 'react';
 
 const items = [
   {
     q: 'How does the AI Diagnosis work?',
     a: 'It analyzes your symptoms using language models to provide educational guidance and possible explanations. It is not a medical diagnosis and cannot replace a licensed clinician.',
   },
   {
     q: 'Is my health data secure?',
     a: 'Data is encrypted in transit and at rest. Access controls and auditing are enforced in our infrastructure. Never share sensitive information in chat unless required.',
   },
   {
     q: 'Can I book appointments with real doctors?',
     a: 'Yes. Use Book Doctor to schedule a visit with board‑certified clinicians for video or in‑person consultations, depending on availability in your region.',
   },
   {
     q: 'Do you support insurance?',
     a: 'Availability varies by location and provider. You can add insurance details during booking or pay out‑of‑pocket and request a superbill.',
   },
   {
     q: 'What should I do in an emergency?',
     a: 'If you have severe or life‑threatening symptoms (e.g., chest pain, shortness of breath, confusion), call your local emergency number or go to the nearest ER immediately.',
   },
   {
     q: 'How much does DanMedy cost?',
     a: 'AI guidance is free in this demo. Clinical consultation pricing depends on provider and specialty. Transparent fees are shown before you confirm booking.',
   },
 ];
 
 export default function FAQ() {
   const [openIndex, setOpenIndex] = useState(0);
   return (
     <section id="faq" className="py-20 relative">
       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-12">
           <h2 className="font-display text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-3">Frequently Asked Questions</h2>
           <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Quick answers about AI guidance, appointments, privacy, and pricing.</p>
         </div>
 
         <div className="divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-transparent">
           {items.map((it, i) => {
             const open = i === openIndex;
             return (
               <div key={it.q}>
                 <button
                   onClick={() => setOpenIndex(open ? -1 : i)}
                   className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-4 sm:py-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                   aria-expanded={open}
                 >
                   <span className="font-medium dark:text-white text-slate-900">{it.q}</span>
                   <svg className={`w-5 h-5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                   </svg>
                 </button>
                 {open && (
                   <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 dark:text-slate-300">
                     {it.a}
                   </div>
                 )}
               </div>
             );
           })}
         </div>
       </div>
     </section>
   );
 }
