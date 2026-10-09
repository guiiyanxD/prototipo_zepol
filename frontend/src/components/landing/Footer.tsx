"use client";

import Link from "next/link";
import { Factory, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#03060A] pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
              <Factory className="text-zepol-accent" size={28} />
              ZEPOL
            </h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Ingeniería en envases flexibles. Soluciones de alta barrera para la industria alimentaria, farmacéutica y agroquímica.
            </p>
            <div className="font-mono text-xs text-slate-600">
              ISO 9001:2015 CERTIFIED
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 tracking-wider text-sm">PLANTA INDUSTRIAL</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-slate-500 shrink-0 mt-0.5" size={16} />
                <span>Parque Industrial Norte<br/>Lote 45, Bodega 3<br/>Ciudad de México, CDMX</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-slate-500 shrink-0" size={16} />
                <span className="font-mono">+52 (55) 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-slate-500 shrink-0" size={16} />
                <span className="font-mono">cotizaciones@zepol.mx</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 tracking-wider text-sm">ENLACES RÁPIDOS</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {['Capacidades', 'Materiales', 'Sostenibilidad', 'Trabaja con Nosotros'].map((link) => (
                <li key={link}>
                  <Link href="#" className="flex items-center gap-2 hover:text-zepol-accent transition-colors group">
                    <ChevronRight size={14} className="text-slate-700 group-hover:text-zepol-accent" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 tracking-wider text-sm">PORTAL B2B</h3>
            <p className="text-slate-500 text-sm mb-4">
              Acceso exclusivo para clientes corporativos y personal de planta.
            </p>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-slate-900 border border-slate-700 hover:border-zepol-accent text-white py-2 px-4 rounded transition-colors"
            >
              INGRESAR AL SISTEMA
            </Link>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-mono">
          <p>© 2026 Zepol Envases Flexibles. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-400 transition-colors">Términos Comerciales</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
