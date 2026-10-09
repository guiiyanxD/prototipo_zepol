import { Sidebar } from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin Console | Zepol",
  description: "Panel de control industrial para la gestión de envases flexibles Zepol.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-slate-50 text-slate-800 font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Decoración de fondo técnica suave */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none" />
        
        {/* Topbar del admin */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10 relative">
          <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Sistema en Línea
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-right hidden sm:block">
              <p className="text-slate-800 font-bold leading-none">Operador Zepol</p>
              <span className="text-slate-400 text-xs">Administrador</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-zepol-primary flex items-center justify-center font-bold text-white shadow-sm border-2 border-white ring-2 ring-slate-100">
              OP
            </div>
          </div>
        </header>
        
        {/* Contenido principal (las páginas internas) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
