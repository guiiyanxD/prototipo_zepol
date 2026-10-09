"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Ruler, CheckCircle2, ChevronRight, Scale, User, Mail, Building, Phone } from "lucide-react";
import PackageModel3D from "./PackageModel3D";

export default function HeroQuoter() {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(25);
  const [gusset, setGusset] = useState(5);
  const [quantity, setQuantity] = useState(10000);
  const [selectedMaterialType, setSelectedMaterialType] = useState("BOPP Laminado Brillante");

  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [materials, setMaterials] = useState<any[]>([]);

  // Fetch materials on load to use a real baseMaterialId for the Quote
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/materials`)
      .then(res => res.json())
      .then(data => {
        const mats = data.data || data;
        setMaterials(Array.isArray(mats) ? mats : []);
      })
      .catch(console.error);
  }, []);

  // Simple math for visualization
  const totalAreaM2 = (width * height * 2 * quantity) / 10000;
  const weightKg = (totalAreaM2 * 0.05).toFixed(2);
  const estPrice = (Number(weightKg) * 4.5).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!materials.length) throw new Error("No hay materiales disponibles en el servidor.");

      // 1. Intentar crear el cliente
      let clientId = null;
      const clientRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contact.email,
          contactName: contact.name,
          companyName: contact.company
        })
      });

      const clientData = await clientRes.json();
      
      if (!clientRes.ok) {
        // Si ya existe (error 400 por email duplicado), podríamos intentar buscarlo. 
        // Para la demo, lanzamos el error o mostramos mensaje.
        throw new Error(clientData.error || "Error al registrar cliente.");
      }
      
      clientId = clientData.data.id;

      // 2. Crear la cotización
      const quoteRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: clientId,
          validityDays: 15,
          items: [{
            baseMaterialId: materials[0].id, // Usamos el primer material disponible
            packageWidthCm: width,
            packageHeightCm: height,
            quantity: quantity,
            inkCoveragePct: 40
          }]
        })
      });

      if (!quoteRes.ok) throw new Error("Error al procesar la proforma en el backend.");

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cotizador" className="bg-slate-50 min-h-screen relative overflow-hidden flex items-center justify-center py-20">
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-cyan-100/50 blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-8 relative z-10">
        
        {/* 3 Columns Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-[8px_8px_32px_rgba(203,213,225,0.4),-8px_-8px_32px_rgba(255,255,255,1)] border border-white"
        >
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* COLUMN 1: Dimensions */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Ruler className="text-zepol-accent" /> Parámetros
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs uppercase text-slate-500 font-bold mb-2 block">Sustrato / Material</label>
                  <select 
                    value={selectedMaterialType} 
                    onChange={(e) => setSelectedMaterialType(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 p-2.5 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-zepol-accent focus:ring-2 focus:ring-zepol-accent/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="BOPP Laminado Brillante">BOPP Laminado Brillante</option>
                    <option value="BOPP Laminado Transparente">BOPP Laminado Transparente</option>
                    <option value="Bilaminado Metalizado">Bilaminado Metalizado (Alta Barrera)</option>
                    <option value="Trilaminado Aluminio">Trilaminado con Aluminio</option>
                    <option value="Polivac Transparente">Polivac Transparente (Vacío)</option>
                    <option value="Papel Antigrasa">Papel Antigrasa / Parafinado</option>
                    <option value="Polietileno Transparente">Polietileno (Baja/Alta Densidad)</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between">
                    <label className="text-xs uppercase text-slate-500 font-bold mb-2 block">Ancho (W)</label>
                    <span className="text-xs font-mono font-bold text-zepol-primary">{width} cm</span>
                  </div>
                  <input type="range" min="5" max="50" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full accent-zepol-accent" />
                </div>
                <div>
                  <div className="flex justify-between">
                    <label className="text-xs uppercase text-slate-500 font-bold mb-2 block">Alto (H)</label>
                    <span className="text-xs font-mono font-bold text-zepol-primary">{height} cm</span>
                  </div>
                  <input type="range" min="5" max="60" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-zepol-accent" />
                </div>
                <div>
                  <div className="flex justify-between">
                    <label className="text-xs uppercase text-slate-500 font-bold mb-2 block">Fuelle (D)</label>
                    <span className="text-xs font-mono font-bold text-zepol-primary">{gusset} cm</span>
                  </div>
                  <input type="range" min="0" max="20" value={gusset} onChange={(e) => setGusset(Number(e.target.value))} className="w-full accent-zepol-accent" />
                </div>
                <div>
                  <label className="text-xs uppercase text-slate-500 font-bold mb-2 block">Tiraje (Unidades)</label>
                  <input type="number" step="1000" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full bg-slate-50 text-slate-800 p-3 rounded-xl border border-slate-200 font-mono outline-none focus:border-zepol-accent focus:ring-2 focus:ring-zepol-accent/20 transition-all" />
                </div>
              </div>
            </div>

            {/* COLUMN 2: 3D Visualization */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden relative flex flex-col items-center justify-center min-h-[400px] shadow-inner cursor-grab active:cursor-grabbing">
              <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-slate-400 font-mono bg-white px-3 py-1.5 rounded-lg shadow-sm z-20 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> INTERACTIVO 360°
              </div>
              
              {/* Contenedor del espacio 3D WebGL */}
              <div className="absolute inset-0">
                <PackageModel3D 
                  width={width} 
                  height={height} 
                  depth={gusset} 
                  materialType={selectedMaterialType} 
                />
              </div>

              {/* Leyenda 2D debajo */}
              <div className="absolute bottom-4 left-0 w-full flex justify-center gap-6 text-xs font-mono text-slate-500 pointer-events-none z-20 bg-white/50 backdrop-blur-sm py-1">
                <span>W: {width}cm</span>
                <span>H: {height}cm</span>
                <span>D: {gusset}cm</span>
              </div>
            </div>

            {/* COLUMN 3: Commercial Data / Submit */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              
              {success ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-green-50 rounded-2xl border border-green-100">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">¡Cotización Generada!</h3>
                  <p className="text-slate-600 text-sm">Tu solicitud ha sido registrada con éxito en nuestro ERP. Un asesor se comunicará contigo a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <User className="text-zepol-accent" /> Datos Comerciales
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-500 font-bold mb-1.5 block">Nombre Completo</label>
                        <input required type="text" value={contact.name} onChange={e=>setContact({...contact, name: e.target.value})} className="w-full bg-slate-50 text-slate-800 py-2.5 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-zepol-accent focus:ring-2 focus:ring-zepol-accent/20" placeholder="Juan Pérez" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-500 font-bold mb-1.5 block">Empresa</label>
                          <input required type="text" value={contact.company} onChange={e=>setContact({...contact, company: e.target.value})} className="w-full bg-slate-50 text-slate-800 py-2.5 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-zepol-accent focus:ring-2 focus:ring-zepol-accent/20" placeholder="Alimentos S.A." />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500 font-bold mb-1.5 block">Teléfono</label>
                          <input required type="tel" value={contact.phone} onChange={e=>setContact({...contact, phone: e.target.value})} className="w-full bg-slate-50 text-slate-800 py-2.5 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-zepol-accent focus:ring-2 focus:ring-zepol-accent/20" placeholder="+591 7..." />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-500 font-bold mb-1.5 block">Email</label>
                        <input required type="email" value={contact.email} onChange={e=>setContact({...contact, email: e.target.value})} className="w-full bg-slate-50 text-slate-800 py-2.5 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-zepol-accent focus:ring-2 focus:ring-zepol-accent/20" placeholder="juan@empresa.com" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <div className="text-xs text-slate-500 font-bold mb-1 uppercase">Material Est.</div>
                        <div className="text-xl font-mono text-slate-700">{weightKg} Kg</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 font-bold mb-1 uppercase">Costo Ref.</div>
                        <div className="text-2xl font-mono font-bold text-zepol-primary">${estPrice}</div>
                      </div>
                    </div>
                    
                    {error && <p className="text-red-500 text-xs mb-3 font-medium">{error}</p>}

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-zepol-primary hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 min-h-[52px]"
                    >
                      {loading ? (
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>Generar Cotización <ChevronRight size={18} /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
