import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kismet Finance Group",
  description: "Strategic introductions for Australians who want their money to do more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
