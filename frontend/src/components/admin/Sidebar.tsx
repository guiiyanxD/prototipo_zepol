"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PackageOpen, Warehouse, FileText, Users, Settings, Factory } from "lucide-react";
import clsx from "clsx";

const routes = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Cotizaciones", path: "/admin/quotes", icon: FileText },
  { name: "Inventario en Planta", path: "/admin/inventory", icon: Warehouse },
  { name: "Materiales y Fórmulas", path: "/admin/materials", icon: PackageOpen },
  { name: "Directorio B2B", path: "/admin/clients", icon: Users },
  { name: "Configuración", path: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zepol-secondary border-r border-slate-800 flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-[#0A101D]">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Factory className="text-zepol-accent" size={24} />
          ZEPOL
        </h2>
      </div>
      
      <nav className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-3">
          Control Industrial
        </div>
        
        {routes.map((route) => {
          // Coincidencia exacta para /admin, inclusiva para subrutas
          const isActive = route.path === "/admin" 
            ? pathname === "/admin"
            : pathname.startsWith(route.path);
            
          const Icon = route.icon;
          
          return (
            <Link
              key={route.path}
              href={route.path}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm font-medium border",
                isActive 
                  ? "bg-zepol-accent/10 text-zepol-accent border-zepol-accent/20 shadow-[inset_3px_0_0_0_#0891B2]" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border-transparent shadow-[inset_0px_0_0_0_#0891B2] hover:shadow-[inset_3px_0_0_0_#334155]"
              )}
            >
              <Icon size={18} />
              {route.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 font-mono flex items-center justify-between bg-[#0A101D]">
        <span>Admin Console</span>
        <span className="text-zepol-accent">v1.0.0</span>
      </div>
    </aside>
  );
}
