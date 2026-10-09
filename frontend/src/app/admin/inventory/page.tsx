"use client";

import { useState, useEffect } from "react";
import { Warehouse, Plus, Minus, ArrowDownRight, ArrowUpRight, History, PackageOpen, RefreshCw } from "lucide-react";

interface Material {
  id: string;
  name: string;
  type: "BASE" | "INK";
  stockKg: number;
}

interface Transaction {
  id: string;
  materialId: string;
  type: "IN" | "OUT" | "RESERVE" | "COMMIT" | "CANCEL";
  amountKg: number;
  referenceQuoteId: string | null;
  notes: string | null;
  createdAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const MATERIALS_API = `${API_BASE}/materials`;
const INVENTORY_API = `${API_BASE}/inventory`;

export default function InventoryPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(false);

  // Formulario
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [txType, setTxType] = useState<"IN" | "OUT">("IN");
  const [amount, setAmount] = useState<number>(0);
  const [notes, setNotes] = useState("");

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await fetch(MATERIALS_API);
      const json = await res.json();
      if (json.data) setMaterials(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (materialId: string) => {
    setTxLoading(true);
    try {
      const res = await fetch(`${INVENTORY_API}/${materialId}`);
      const json = await res.json();
      if (json.data) setTransactions(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setTxLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleSelectMaterial = (m: Material) => {
    setSelectedMaterial(m);
    fetchTransactions(m.id);
  };

  const openForm = (type: "IN" | "OUT") => {
    setTxType(type);
    setAmount(0);
    setNotes("");
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterial) return;

    try {
      await fetch(INVENTORY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialId: selectedMaterial.id,
          type: txType,
          amountKg: Number(amount),
          notes,
        }),
      });
      setIsFormOpen(false);
      // Recargar datos
      await fetchMaterials();
      // Actualizar el material seleccionado con el nuevo stock
      const updatedMaterialsRes = await fetch(MATERIALS_API);
      const updatedJson = await updatedMaterialsRes.json();
      const updatedMaterial = updatedJson.data.find((m: Material) => m.id === selectedMaterial.id);
      if (updatedMaterial) setSelectedMaterial(updatedMaterial);
      
      fetchTransactions(selectedMaterial.id);
    } catch (err) {
      console.error(err);
      alert("Error al registrar transaccin");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Warehouse className="text-zepol-primary" />
            Inventario en Planta
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gesti&oacute;n de Kardex, entradas, salidas y mermas de sustratos.
          </p>
        </div>
        <button
          onClick={fetchMaterials}
          className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-md shadow-sm transition-colors"
          title="Actualizar"
        >
          <RefreshCw size={18} className={loading ? "animate-spin text-zepol-accent" : ""} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Listado de Materiales (Resumen) */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[600px] overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <PackageOpen size={18} className="text-slate-400" />
              Sustratos y Bobinas
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
            {loading ? (
              <div className="p-4 text-center text-slate-400 text-sm">Cargando...</div>
            ) : materials.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-sm">No hay materiales.</div>
            ) : (
              materials.map(m => (
                <button
                  key={m.id}
                  onClick={() => handleSelectMaterial(m)}
                  className={`w-full text-left p-3 rounded-md transition-colors flex items-center justify-between group ${selectedMaterial?.id === m.id ? 'bg-zepol-accent/10 border-zepol-accent/20' : 'hover:bg-slate-50'}`}
                >
                  <div>
                    <div className="font-medium text-slate-800 text-sm">{m.name}</div>
                    <div className="text-xs text-slate-400">{m.type}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${m.stockKg < 100 ? 'text-red-500' : 'text-slate-700'}`}>
                      {m.stockKg.toFixed(2)} Kg
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Kardex de Transacciones */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[600px] overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <History size={18} className="text-slate-400" />
              Kardex de Movimientos
              {selectedMaterial && (
                <span className="text-zepol-primary ml-2">- {selectedMaterial.name}</span>
              )}
            </h2>
            {selectedMaterial && (
              <div className="flex gap-2">
                <button
                  onClick={() => openForm("IN")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded shadow-sm text-xs font-medium transition-colors"
                >
                  <Plus size={14} /> Entrada
                </button>
                <button
                  onClick={() => openForm("OUT")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded shadow-sm text-xs font-medium transition-colors"
                >
                  <Minus size={14} /> Salida
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {!selectedMaterial ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                Selecciona un material para ver su Kardex.
              </div>
            ) : txLoading ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                Cargando movimientos...
              </div>
            ) : transactions.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                No hay movimientos registrados.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200 shadow-sm">
                  <tr className="text-xs uppercase tracking-wider text-slate-500">
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3 text-right">Cantidad</th>
                    <th className="p-3">Notas / Ref</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-slate-500">
                        {new Date(tx.createdAt).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                          tx.type === 'IN' ? 'bg-green-100 text-green-700' : 
                          tx.type === 'OUT' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {tx.type === 'IN' ? <ArrowDownRight size={12}/> : 
                           tx.type === 'OUT' ? <ArrowUpRight size={12}/> : null}
                          {tx.type}
                        </span>
                      </td>
                      <td className={`p-3 text-right font-medium ${tx.type === 'IN' ? 'text-green-600' : 'text-red-500'}`}>
                        {tx.type === 'IN' ? '+' : '-'}{tx.amountKg.toFixed(2)} Kg
                      </td>
                      <td className="p-3 text-slate-600 text-xs">
                        {tx.notes || (tx.referenceQuoteId ? `Cotizacin: ${tx.referenceQuoteId.split('-')[0]}` : '-')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal Nueva Transaccin */}
      {isFormOpen && selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className={`p-4 border-b border-slate-100 text-white ${txType === 'IN' ? 'bg-green-500' : 'bg-red-500'}`}>
              <h2 className="font-bold flex items-center gap-2">
                {txType === 'IN' ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                {txType === 'IN' ? 'Entrada de Material' : 'Salida de Material'}
              </h2>
              <div className="text-xs opacity-90 mt-1">{selectedMaterial.name}</div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Cantidad (Kg)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  min="0.01"
                  max={txType === 'OUT' ? selectedMaterial.stockKg : undefined}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-lg font-mono focus:outline-none focus:ring-2 focus:ring-zepol-primary/50"
                  autoFocus
                />
                {txType === 'OUT' && (
                  <div className="text-xs text-slate-400 mt-1">Stock m&aacute;ximo disponible: {selectedMaterial.stockKg} Kg</div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Notas / Motivo</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zepol-primary/50 resize-none h-20"
                  placeholder="Ej. Recepci&oacute;n de proveedor, merma por da&ntilde;o..."
                />
              </div>

              <div className="mt-2 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white text-sm font-medium rounded-md shadow-sm transition-colors ${
                    txType === 'IN' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  Registrar {txType === 'IN' ? 'Entrada' : 'Salida'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
