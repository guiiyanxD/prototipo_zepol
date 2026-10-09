"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function WelcomeHero() {
  return (
    <section id="inicio" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Soft Shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-100/40 blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-slate-800 tracking-tight mb-6 leading-tight"
        >
          Configura tu empaque.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zepol-primary to-zepol-accent">
            Obtén respuesta inmediata.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-10"
        >
          Fabricamos envases de alta barrera con calidad de impresión fotográfica. Inicia tu proceso de cotización técnica con nuestra herramienta interactiva.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col items-center w-full"
        >
          <a 
            href="#cotizador"
            className="inline-flex items-center gap-2 bg-zepol-primary hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 mb-12"
          >
            Cotizar Ahora
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400"
      >
        <span className="text-xs font-mono font-bold tracking-widest mb-2 uppercase">Descubre Más</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
