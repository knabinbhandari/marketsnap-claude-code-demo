import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarketSnap",
  description: "AI-powered customer insights for small SaaS teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
