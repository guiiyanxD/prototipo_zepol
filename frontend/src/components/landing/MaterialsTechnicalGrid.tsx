"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Beaker, Droplets, Wind, Plus, Minus } from "lucide-react";

export default function MaterialsTechnicalGrid() {
  const [expandedId, setExpandedId] = useState<string | null>("BOPP");

  const materials = [
    {
      id: "BOPP",
      name: "Polipropileno Biorientado",
      type: "Film Externo / Barrera Media",
      otr: "1500",
      wvtr: "5.0",
      features: ["Alta transparencia", "Excelente maquinabilidad", "Buena barrera a la humedad"],
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      id: "PET",
      name: "Poliéster",
      type: "Film Externo / Barrera Alta",
      otr: "110",
      wvtr: "40.0",
      features: ["Resistencia mecánica superior", "Barrera a gases", "Soporta altas temperaturas"],
      color: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      id: "PE",
      name: "Polietileno (LDPE)",
      type: "Film Sellante / Estructural",
      otr: "7000",
      wvtr: "18.0",
      features: ["Excelente sello térmico", "Alta elongación", "Aprobado FDA"],
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      id: "ALU",
      name: "Foil de Aluminio",
      type: "Barrera Absoluta",
      otr: "< 0.01",
      wvtr: "< 0.01",
      features: ["Barrera total a luz UV", "Barrera total a gases", "Ideal para químicos"],
      color: "bg-slate-100 text-slate-600 border-slate-300"
    },
    {
      id: "NYLON",
      name: "Nylon Biorientado",
      type: "Film Estructural / Resistencia",
      otr: "40",
      wvtr: "250.0",
      features: ["Resistencia extrema", "Barrera a olores", "Uso en vacío"],
      color: "bg-cyan-50 text-cyan-600 border-cyan-200"
    }
  ];

  return (
    <section id="sustratos" className="bg-white py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3"
            >
              <Beaker className="text-zepol-accent" /> Matriz Técnica de Sustratos
            </motion.h2>
            <p className="text-slate-500 text-sm">Propiedades de barrera base. Interacciona para expandir los detalles.</p>
          </div>
          
          <div className="flex gap-4 text-xs font-mono bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Wind size={14} className="text-cyan-500" /> OTR: <span className="text-slate-400">cc/m²/24h</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Droplets size={14} className="text-blue-500" /> WVTR: <span className="text-slate-400">g/m²/24h</span>
            </div>
          </div>
        </div>

        {/* Acordeón Horizontal (Desktop) / Vertical (Mobile) */}
        <div className="flex flex-col md:flex-row h-auto md:h-[450px] gap-4 w-full">
          {materials.map((mat) => {
            const isExpanded = expandedId === mat.id;
            return (
              <motion.div
                key={mat.id}
                layout
                onClick={() => setExpandedId(isExpanded ? null : mat.id)}
                onMouseEnter={() => setExpandedId(mat.id)}
                className={`relative flex flex-col md:flex-row rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 ease-in-out ${isExpanded ? 'md:flex-[3] bg-white border-slate-200 shadow-[8px_8px_32px_rgba(203,213,225,0.4)]' : 'md:flex-[1] bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
              >
                {/* Título Vertical (o barra horizontal en móvil) */}
                <div className={`flex md:flex-col items-center justify-between p-6 md:p-4 md:w-24 shrink-0 transition-colors ${isExpanded ? mat.color : 'text-slate-500'}`}>
                  <div className="md:-rotate-90 md:translate-y-12 origin-center whitespace-nowrap font-bold text-xl tracking-widest">
                    {mat.id}
                  </div>
                  <div className="md:mt-auto">
                    {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>

                {/* Contenido Expandido */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 md:p-8 md:pl-12 flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-1">{mat.name}</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">{mat.type}</p>
                        
                        <div className="space-y-3 mb-8">
                          {mat.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-zepol-accent" />
                              <span className="text-slate-600 font-medium">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-6 pt-6 border-t border-slate-100">
                        <div>
                          <div className="text-xs text-slate-500 font-bold uppercase mb-1 flex items-center gap-1">
                            <Wind size={14} className="text-cyan-500"/> OTR
                          </div>
                          <div className="text-2xl font-mono font-light text-slate-800">{mat.otr}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-bold uppercase mb-1 flex items-center gap-1">
                            <Droplets size={14} className="text-blue-500"/> WVTR
                          </div>
                          <div className="text-2xl font-mono font-light text-slate-800">{mat.wvtr}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 max-w-2xl mx-auto bg-slate-50 p-4 rounded-xl border border-slate-100">
            <strong>* Nota Técnica:</strong> La laminación de dos o más sustratos multiplica exponencialmente las barreras. Diseñamos la fórmula exacta según tu producto.
          </p>
        </div>

      </div>
    </section>
  );
}
