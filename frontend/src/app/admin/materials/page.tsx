"use client";

import { useState, useEffect } from "react";
import { PackageOpen, Plus, Pencil, Trash2, X, RefreshCw } from "lucide-react";

interface Material {
  id: string;
  name: string;
  type: "BASE" | "INK";
  grammageGm2: number;
  pricePerKg: number;
  stockKg: number;
  wasteMarginPct: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const API_URL = `${API_BASE}/materials`;

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "BASE",
    grammageGm2: 0,
    pricePerKg: 0,
    stockKg: 0, // Used as initialStockKg when creating, and stockKg when updating
    wasteMarginPct: 0,
  });

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (json.data) {
        setMaterials(json.data);
      }
    } catch (err) {
      console.error("Error fetching materials", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      type: "BASE",
      grammageGm2: 0,
      pricePerKg: 0,
      stockKg: 0,
      wasteMarginPct: 0,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (m: Material) => {
    setEditingId(m.id);
    setFormData({
      name: m.name,
      type: m.type,
      grammageGm2: m.grammageGm2,
      pricePerKg: m.pricePerKg,
      stockKg: m.stockKg,
      wasteMarginPct: m.wasteMarginPct,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Ests seguro de que deseas eliminar este material?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchMaterials();
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            type: formData.type,
            grammageGm2: Number(formData.grammageGm2),
            pricePerKg: Number(formData.pricePerKg),
            stockKg: Number(formData.stockKg),
            wasteMarginPct: Number(formData.wasteMarginPct),
          }),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            type: formData.type,
            grammageGm2: Number(formData.grammageGm2),
            pricePerKg: Number(formData.pricePerKg),
            initialStockKg: Number(formData.stockKg),
            wasteMarginPct: Number(formData.wasteMarginPct),
          }),
        });
      }
      setIsFormOpen(false);
      fetchMaterials();
    } catch (err) {
      console.error("Error saving material", err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <PackageOpen className="text-zepol-primary" />
            Materiales y Frmulas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gestiona la materia prima, bobinas y tintas usadas en produccin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchMaterials}
            className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-md shadow-sm transition-colors"
            title="Actualizar"
          >
            <RefreshCw size={18} className={loading ? "animate-spin text-zepol-accent" : ""} />
          </button>
          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 px-4 py-2 bg-zepol-primary text-white rounded-md shadow-sm hover:bg-zepol-primary/90 font-medium text-sm transition-colors"
          >
            <Plus size={18} />
            Nuevo Material
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">Nombre</th>
                <th className="p-4">Tipo</th>
                <th className="p-4 text-right">Gramaje (g/m)</th>
                <th className="p-4 text-right">Precio ($/Kg)</th>
                <th className="p-4 text-right">Stock (Kg)</th>
                <th className="p-4 text-right">Merma (%)</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {loading && materials.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Cargando materiales...
                  </td>
                </tr>
              ) : materials.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No hay materiales registrados.
                  </td>
                </tr>
              ) : (
                materials.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{m.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${m.type === 'BASE' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {m.type}
                      </span>
                    </td>
                    <td className="p-4 text-right">{m.grammageGm2}</td>
                    <td className="p-4 text-right">${m.pricePerKg.toFixed(2)}</td>
                    <td className="p-4 text-right font-medium">
                      <span className={m.stockKg < 100 ? "text-red-500" : "text-green-600"}>
                        {m.stockKg}
                      </span>
                    </td>
                    <td className="p-4 text-right">{m.wasteMarginPct}%</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditForm(m)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Editar"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(m.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panel de Formulario Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-800">
                {editingId ? "Editar Material" : "Nuevo Material"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zepol-primary/50 focus:border-zepol-primary"
                  placeholder="Ej. PET Cristal 12 micras"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tipo</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as "BASE" | "INK" })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zepol-primary/50"
                >
                  <option value="BASE">Sustrato / Film (BASE)</option>
                  <option value="INK">Tinta (INK)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Gramaje (g/m)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.grammageGm2}
                    onChange={(e) => setFormData({ ...formData, grammageGm2: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zepol-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Precio ($/Kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.pricePerKg}
                    onChange={(e) => setFormData({ ...formData, pricePerKg: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zepol-primary/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Stock (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.stockKg}
                    onChange={(e) => setFormData({ ...formData, stockKg: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zepol-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Merma (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.wasteMarginPct}
                    onChange={(e) => setFormData({ ...formData, wasteMarginPct: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zepol-primary/50"
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-3 justify-end border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zepol-primary text-white text-sm font-medium rounded-md shadow-sm hover:bg-zepol-primary/90 transition-colors"
                >
                  Guardar Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
