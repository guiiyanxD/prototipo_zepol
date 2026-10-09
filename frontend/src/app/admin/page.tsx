import { Activity, ArrowRight, Package, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard General</h1>
        <p className="text-slate-500 mt-1 text-sm">Resumen en tiempo real del piso de planta y ventas.</p>
      </header>

      {/* Tarjetas de Métricas (Mocks iniciales) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 right-0 p-4 text-slate-100"><Activity size={64} /></div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Cotizaciones Activas</h3>
          <div className="text-4xl font-mono font-bold text-slate-800 mb-4 relative z-10">14</div>
          <Link href="/admin/quotes" className="text-zepol-accent text-sm font-bold flex items-center gap-1 hover:text-cyan-700 relative z-10">
            Revisar proformas <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 right-0 p-4 text-slate-100"><Package size={64} /></div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Pedidos en Producción</h3>
          <div className="text-4xl font-mono font-bold text-slate-800 mb-4 relative z-10">8</div>
          <Link href="#" className="text-slate-500 text-sm font-bold flex items-center gap-1 hover:text-slate-700 relative z-10">
            Ver línea de producción <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-red-50 border border-red-100 p-6 rounded-xl shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 right-0 p-4 text-red-100"><AlertCircle size={64} /></div>
          <h3 className="text-red-500 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Alertas de Stock</h3>
          <div className="text-4xl font-mono font-bold text-red-600 mb-4 relative z-10">2</div>
          <Link href="/admin/inventory" className="text-red-500 text-sm font-bold flex items-center gap-1 hover:text-red-700 relative z-10">
            Reabastecer materiales <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Sección de Acceso Rápido / Actividad */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">Actividad Reciente</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg px-2 -mx-2 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-zepol-primary flex items-center justify-center">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Nueva proforma generada web</div>
                  <div className="text-xs text-slate-500 font-mono">Bolsa Trilaminada - Cliente B2B #{1040 + i}</div>
                </div>
              </div>
              <div className="text-xs text-slate-400 font-mono font-medium">Hace {i * 15} min</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
