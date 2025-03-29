import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

async function UTSSR() {
  await connection();
  return <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoe Marshal",
  description: "A shoe store",
};

interface LayoutProps {
  children: React.ReactNode;
};



export default function RootLayout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <html lang="en" className="light" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
    </AuthProvider >
  );
}
