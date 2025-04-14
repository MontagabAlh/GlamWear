import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/style/globals.css";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "@/components/Provider/theme-provider";
import ProgressBar from "@/components/ui/ProgressBar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner"
import { connection } from "next/server";
import { Suspense } from "react";
import Footer from "@/components/Layout/Web/Footer";

async function UTSSR() {
  await connection();
  return <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
// const winkySans = Winky_Sans({
//   variable: "--font-winky-sans",
//   weight: ['300', '400', '500', '600', '700', '800', '900'],
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Glam Wear",
  description: "A shoe store",
};

interface LayoutProps {
  children: React.ReactNode;
};

// ${winkySans.variable}
export default function RootLayout({ children }: LayoutProps) {
  return (

    <html lang="en" >
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <AuthProvider>
          <Suspense>
            <UTSSR />
          </Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ProgressBar />
            <div className="min-h-[calc(100vh-64px)] w-full h-full">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
