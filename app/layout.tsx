import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GrainOverlay } from "@/components/GrainOverlay";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Kismet Finance Group",
  description: "Strategic finance coordination for Australians.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans bg-navy-deep text-white min-h-screen flex flex-col antialiased">
        <GrainOverlay />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
