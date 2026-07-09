import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ZERO ERROR IT SOLUTIONS | Premium Enterprise IT Solutions & Services",
  description: "ZERO ERROR IT SOLUTIONS delivers reliable, cost-effective, and innovative IT solutions. Your premium partner for Enterprise Hardware, Networking, CCTV Surveillance, and AMC Support.",
  keywords: "IT solutions, Nellore, computer hardware, CCTV surveillance, networking solutions, server storage, AMC, corporate procurement, India IT solutions",
  authors: [{ name: "ZERO ERROR IT SOLUTIONS" }],
  openGraph: {
    title: "ZERO ERROR IT SOLUTIONS | Premium Enterprise IT Products & Services",
    description: "Your trusted technology partner for computer hardware, CCTV surveillance, IT infrastructure, and technical support.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
