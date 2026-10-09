"use client";

import { motion } from "framer-motion";
import { Layers, Printer, PackageSearch, Box } from "lucide-react";

export default function Capabilities() {
  const capabilities = [
    {
      icon: Printer,
      title: "Flexografía HD",
      subtitle: "HASTA 8 COLORES",
      description: "Prensas tambor central de última generación. Tramas estocásticas para reproducciones fotorealistas en sustratos flexibles.",
      techSpecs: ["Ancho máx: 1200mm", "Repetición: 350-800mm", "Tintas: PU/NC/Agua"]
    },
    {
      icon: Layers,
      title: "Laminación Técnica",
      subtitle: "SOLVENTLESS Y SOLVENT BASE",
      description: "Estructuras tri-laminadas y bi-laminadas de alta barrera térmica y mecánica. Unión molecular perfecta.",
      techSpecs: ["BOPP / PET / PE / ALU", "Curado controlado", "Cero migración"]
    },
    {
      icon: PackageSearch,
      title: "Ingeniería de Empaque",
      subtitle: "ESTRUCTURAS A MEDIDA",
      description: "Diseño de barreras (OTR/WVTR) optimizadas para alargar la vida de anaquel de tus productos.",
      techSpecs: ["Análisis de permeabilidad", "Coeficiente de fricción", "Fuerza de sello"]
    },
    {
      icon: Box,
      title: "Formatos Estructurales",
      subtitle: "CONFECCIÓN FINAL",
      description: "Entregamos bobinas para máquinas VFFS/HFFS (Rollstock) o empaques pre-formados.",
      techSpecs: ["Doypack c/ Zipper", "Sello de 3 Lados", "Fuelle Lateral"]
    }
  ];

  return (
    <section id="capacidades" className="bg-slate-50 py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-16 md:w-2/3">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-4"
          >
            <span className="text-zepol-accent text-5xl leading-none">/</span>
            Capacidades de Planta
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg leading-relaxed"
          >
            Nuestro parque industrial está equipado para cumplir con las tolerancias más estrictas de la industria alimentaria y farmacéutica.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((cap, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative bg-white border border-slate-100 rounded-3xl p-8 hover:border-zepol-accent/30 transition-all duration-300 shadow-[8px_8px_24px_rgba(203,213,225,0.3),-8px_-8px_24px_rgba(255,255,255,1)]"
            >
              
              <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-inner group-hover:scale-105 transition-transform">
                    <cap.icon className="text-zepol-primary" size={32} />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-zepol-accent mb-1 tracking-wider uppercase">{cap.subtitle}</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{cap.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {cap.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {cap.techSpecs.map((spec, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-zepol-accent transition-colors" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
