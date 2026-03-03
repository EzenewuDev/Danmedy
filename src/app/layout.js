import { Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata = {
  title: {
    default: "DanMedy",
    template: "%s | DanMedy",
  },
  description: "Book doctors, monitor vitals, and chat with healthcare professionals — all in one place. AI-powered telemedicine platform.",
};

export default function RootLayout({ children }) {
  const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }} className="antialiased bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        {hasClerk ? (
          <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
            </ThemeProvider>
          </ClerkProvider>
        ) : (
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="w-full bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800/40 px-4 py-2 text-center text-xs text-amber-700 dark:text-amber-400">
              Authentication is temporarily unavailable: missing Clerk keys.
            </div>
            {children}
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
