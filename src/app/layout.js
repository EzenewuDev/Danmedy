import { Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthNotice from "@/components/AuthNotice";
import BackToTop from "@/components/BackToTop";
import SplashGate from "@/components/SplashGate";

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
  const disableAuth = process.env.NEXT_PUBLIC_DISABLE_AUTH === '1';
  const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !disableAuth;
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }} className="antialiased bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        {hasClerk ? (
          <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <SplashGate>
                {children}
              </SplashGate>
              <AuthNotice />
              <BackToTop />
            </ThemeProvider>
          </ClerkProvider>
        ) : (
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SplashGate>
              {children}
            </SplashGate>
            <AuthNotice />
            <BackToTop />
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
