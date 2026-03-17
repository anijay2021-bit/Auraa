import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auraa — Stop Guessing. Start Glowing.",
  description:
    "AI-powered personal color analysis for women globally. Auraa accurately analyzes all skin tones — South Asian, African, Latina, Middle Eastern, and Southeast Asian complexions.",
  keywords: ["color analysis", "skin tone", "personal color", "AI stylist", "fashion", "inclusive beauty"],
  openGraph: {
    title: "Auraa — Stop Guessing. Start Glowing.",
    description: "Discover your perfect color palette with Auraa's inclusive AI color analysis.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-cream text-[#2C2C2C] antialiased min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
