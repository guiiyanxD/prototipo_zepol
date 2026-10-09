"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Certificaciones", href: "#certificaciones" },
    { label: "Capacidades de Planta", href: "#capacidades" },
    { label: "Sustratos", href: "#sustratos" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#0A101D]/95 backdrop-blur-md shadow-lg py-3" : "bg-[#0A101D] py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 group">
          <span className="text-3xl md:text-4xl font-russo text-white tracking-widest uppercase hover:text-zepol-accent transition-colors">
            Zepol
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-zepol-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#cotizador"
            className="text-sm font-bold text-[#0A101D] bg-white hover:bg-zepol-accent hover:text-white px-5 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(8,145,178,0.4)]"
          >
            Cotizar Ahora
          </a>
        </div>
      </div>
    </nav>
  );
}
