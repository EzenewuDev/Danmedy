import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const hasClerk =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;
const disabled =
  process.env.CLERK_MIDDLEWARE_DISABLED === "1" ||
  process.env.NEXT_PUBLIC_DISABLE_AUTH === "1";

export default hasClerk && !disabled
  ? clerkMiddleware()
  : function middleware() {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
