"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Pencil, Trash2, X, RefreshCw, FileText } from "lucide-react";

interface Client {
  id: string;
  contactName: string;
  companyName: string;
  email: string;
}

interface Quote {
  id: string;
  clientId: string;
  totalPrice: number;
  itemsCount: number;
  createdAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const CLIENTS_API = `${API_BASE}/clients`;
const QUOTES_API = `${API_BASE}/quotes`;

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [formData, setFormData] = useState({
    contactName: "",
    companyName: "",
    email: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [clientsRes, quotesRes] = await Promise.all([
        fetch(CLIENTS_API),
        fetch(QUOTES_API)
      ]);
      const clientsJson = await clientsRes.json();
      const quotesJson = await quotesRes.json();
      if (clientsJson.data) setClients(clientsJson.data);
      if (quotesJson.data) setQuotes(quotesJson.data);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setFormData({
      contactName: "",
      companyName: "",
      email: "",
    });
    setIsFormOpen(true);
  };

  const openEditForm = (c: Client) => {
    setEditingId(c.id);
    setFormData({
      contactName: c.contactName,
      companyName: c.companyName,
      email: c.email,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Ests seguro de que deseas eliminar este cliente?")) return;
    try {
      await fetch(`${CLIENTS_API}/${id}`, { method: "DELETE" });
      fetchData();
      if (selectedClient?.id === id) setSelectedClient(null);
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`${CLIENTS_API}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(CLIENTS_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setIsFormOpen(false);
      fetchData();
    } catch (err) {
      console.error("Error saving client", err);
    }
  };

  // Filtrar cotizaciones por cliente seleccionado
  const clientQuotes = selectedClient 
    ? quotes.filter((q) => q.clientId === selectedClient.id)
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-zepol-primary" />
            Directorio B2B
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gesti&oacute;n de clientes y su historial de cotizaciones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
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
            Nuevo Cliente
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabla de Clientes */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4">Empresa / Contacto</th>
                  <th className="p-4">Email</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {loading && clients.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-400">
                      Cargando clientes...
                    </td>
                  </tr>
                ) : clients.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-400">
                      No hay clientes registrados.
                    </td>
                  </tr>
                ) : (
                  clients.map((c) => (
                    <tr 
                      key={c.id} 
                      className={`transition-colors cursor-pointer ${selectedClient?.id === c.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                      onClick={() => setSelectedClient(c)}
                    >
                      <td className="p-4">
                        <div className="font-medium text-slate-900">{c.companyName}</div>
                        <div className="text-xs text-slate-500">{c.contactName}</div>
                      </td>
                      <td className="p-4">{c.email}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => openEditForm(c)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
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

        {/* Panel de Cotizaciones del Cliente Seleccionado */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-slate-400" />
              Historial del Cliente
            </h2>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            {!selectedClient ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm text-center">
                Selecciona un cliente para ver sus cotizaciones.
              </div>
            ) : clientQuotes.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm text-center">
                {selectedClient.companyName} no tiene cotizaciones registradas.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {clientQuotes.map((q) => (
                  <div key={q.id} className="p-3 border border-slate-200 rounded-lg hover:border-zepol-primary/30 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-mono text-slate-500">
                        {q.id.split('-')[0]}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <div className="text-sm font-medium text-slate-700">
                        {q.itemsCount} items
                      </div>
                      <div className="text-base font-bold text-zepol-primary">
                        ${q.totalPrice ? q.totalPrice.toFixed(2) : '0.00'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Panel de Formulario Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-800">
                {editingId ? "Editar Cliente" : "Nuevo Cliente"}
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
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Empresa</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zepol-primary/50"
                  placeholder="Ej. Industrias Acme"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Contacto</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zepol-primary/50"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Correo Electr&oacute;nico</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zepol-primary/50"
                  placeholder="ejemplo@acme.com"
                />
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
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
