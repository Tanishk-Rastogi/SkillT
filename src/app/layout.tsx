import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Background } from "@/components/layout/Background";
import { WorldEvolutionOverlay } from "@/components/world/WorldEvolutionOverlay";
import { SidebarProvider } from "@/lib/SidebarContext";
import { MainContent } from "@/components/layout/MainContent";

const syne = Syne({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-sans" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "SkillT — Career Progression OS",
  description: "A verifiable skill civilization for engineers. Build proof. Not claims.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable} dark`}>
      <body className="antialiased bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-black">
        <AuthProvider>
          <SidebarProvider>
            <Background />
            <WorldEvolutionOverlay />
            {/* Sidebar — fixed left, manages its own width via context */}
            <Sidebar />
            {/* Navbar — reads sidebar context for left offset */}
            <Navbar />
            <MainContent>
              {children}
            </MainContent>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
