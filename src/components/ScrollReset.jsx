 'use client';
 import { useEffect } from 'react';
 
 export default function ScrollReset() {
   useEffect(() => {
     try {
       if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
     } catch {}
     window.scrollTo({ top: 0, behavior: 'auto' });
   }, []);
   return null;
 }
