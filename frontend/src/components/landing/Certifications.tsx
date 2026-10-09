"use client";

import { motion } from "framer-motion";
import { ShieldCheck, History, CheckCircle, Leaf } from "lucide-react";

export default function Certifications() {
  const certs = [
    {
      icon: History,
      title: "Más de 30 Años",
      subtitle: "De Experiencia",
      desc: "Líderes en envases flexibles a nivel nacional e internacional.",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: ShieldCheck,
      title: "FDA Compliant",
      subtitle: "Inocuidad Total",
      desc: "Materiales aptos para el contacto directo con alimentos.",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      icon: CheckCircle,
      title: "ISO 9001:2008",
      subtitle: "Calidad Certificada",
      desc: "Procesos estandarizados desde el 2012 garantizando excelencia.",
      color: "text-zepol-primary",
      bg: "bg-blue-50"
    },
    {
      icon: Leaf,
      title: "100% Virgen",
      subtitle: "Materias Primas",
      desc: "Aseguramos la máxima calidad estructural y pureza sanitaria.",
      color: "text-cyan-500",
      bg: "bg-cyan-50"
    }
  ];

  return (
    <section id="certificaciones" className="bg-white py-20 relative z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            ¿Por qué trabajar con nosotros?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Estamos certificados y comprometidos con la calidad. Acompañamos tus desarrollos brindando atención personalizada durante todo el proceso de fabricación.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col items-center text-center group"
            >
              <div className={`w-16 h-16 rounded-2xl ${cert.bg} ${cert.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <cert.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">{cert.title}</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">{cert.subtitle}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{cert.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
