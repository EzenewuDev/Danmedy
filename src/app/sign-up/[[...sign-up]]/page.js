import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center pt-20 px-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900 -z-10" />
            <SignUp appearance={{
                elements: {
                    rootBox: "shadow-2xl shadow-blue-500/10 rounded-2xl",
                    card: "bg-slate-900/90 border border-slate-800 backdrop-blur-xl",
                    headerTitle: "dark:text-white text-slate-900 font-display",
                    headerSubtitle: "text-slate-400",
                    socialButtonsBlockButton: "text-slate-300 border-slate-700 hover:bg-slate-800",
                    socialButtonsBlockButtonText: "text-slate-300 font-medium",
                    socialButtonsBlockButtonArrow: "text-slate-400",
                    dividerLine: "bg-slate-800",
                    dividerText: "text-slate-500",
                    formFieldLabel: "text-slate-300",
                    formFieldInput: "bg-slate-800/50 border-slate-700 dark:text-white text-slate-900 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-lg",
                    footerActionText: "text-slate-400",
                    footerActionLink: "text-cyan-400 hover:text-cyan-300",
                    identityPreviewText: "text-slate-300",
                    identityPreviewEditButtonIcon: "text-cyan-400",
                    formButtonPrimary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 dark:text-white text-slate-900 font-semibold rounded-xl text-sm transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-500/30",
                }
            }} />
        </div>
    );
}
