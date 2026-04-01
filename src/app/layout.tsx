import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assam Association Delhi | Srimanta Sankaradeva Bhawan",
  description: "Official website of Assam Association Delhi. A cultural and social hub for the Assamese diaspora in the national capital since 1948.",
  keywords: ["Assam Association Delhi", "Assamese in Delhi", "Srimanta Sankaradeva Bhawan", "Assamese Culture", "Delhi Guest House"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 pt-16 overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
