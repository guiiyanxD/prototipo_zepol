import type { Metadata } from "next";
import { Inter, Russo_One } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const russo = Russo_One({
  weight: "400",
  variable: "--font-russo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zepol | Cotizador de Envases Flexibles",
  description: "Cotizador inteligente e industrial para envases flexibles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${russo.variable} antialiased`}>
      <body className="min-h-screen bg-zepol-bg text-zepol-slate font-sans">
        {children}
      </body>
    </html>
  );
}
