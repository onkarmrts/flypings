import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Flypings — Instagram DM Automation for Creators",
    template: "%s | Flypings",
  },
  description:
    "Turn Instagram comments into customers. Automate DMs, collect UPI payments, and grow — all without leaving Instagram.",
  keywords: ["instagram automation", "dm automation", "creator tools", "india", "upi payment", "comment to dm"],
  openGraph: {
    title: "Flypings — Instagram DM Automation for Creators",
    description: "Comment karo, link pao. India's first comment-to-commerce engine.",
    siteName: "Flypings",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#8B5CF6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
