"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Factory, Award, Leaf } from "lucide-react";

export default function TrustBar() {
  const items = [
    { icon: ShieldCheck, label: "HACCP & GMP COMPLIANT", detail: "Inocuidad alimentaria garantizada" },
    { icon: Factory, label: "CAPACIDAD INSTALADA", detail: "+150 Toneladas Mensuales" },
    { icon: Award, label: "CERTIFICACIÓN ISO 9001", detail: "Procesos estandarizados" },
    { icon: Leaf, label: "SUSTRATOS RECICLABLES", detail: "Opciones monomateriales PE/PE" },
  ];

  return (
    <section className="bg-[#050A14] border-y border-slate-800/60 py-8 relative overflow-hidden z-10">
      {/* Luz ambiental sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-zepol-accent/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x-0 md:divide-x divide-slate-800">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center md:items-start text-center md:text-left px-4 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <item.icon className="text-slate-500 group-hover:text-zepol-accent transition-colors" size={24} />
                <h3 className="font-bold text-slate-300 text-sm tracking-wide">{item.label}</h3>
              </div>
              <p className="font-mono text-xs text-slate-500 md:pl-9">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
