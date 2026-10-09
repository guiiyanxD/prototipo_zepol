"use client";

import { useState, useEffect } from "react";
import { FileText, ArrowRight, CheckCircle, XCircle, Clock, FileEdit, Eye } from "lucide-react";

interface QuoteDetailsDTO {
  id: string;
  clientId: string;
  clientName: string;
  companyName: string | null;
  status: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
  totalPrice: number;
  validUntil: string;
  createdAt: string;
  itemsCount: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const QUOTES_API = `${API_BASE}/quotes`;

export default function QuotesPipelinePage() {
  const [quotes, setQuotes] = useState<QuoteDetailsDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(QUOTES_API);
      const json = await res.json();
      if (json.data) setQuotes(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const changeStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${QUOTES_API}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchQuotes();
      } else {
        let errorMsg = "Error al cambiar estado";
        try {
          const errorData = await res.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          // If response is not JSON
        }
        alert(`Error: ${errorMsg}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión al intentar cambiar el estado");
    }
  };

  const columns = [
    { id: "DRAFT", label: "Borrador", icon: <FileEdit size={16} />, color: "bg-slate-100", textColor: "text-slate-600" },
    { id: "PENDING_APPROVAL", label: "Pendiente", icon: <Clock size={16} />, color: "bg-blue-50", textColor: "text-blue-600" },
    { id: "APPROVED", label: "Aprobada", icon: <CheckCircle size={16} />, color: "bg-green-50", textColor: "text-green-600" },
    { id: "REJECTED", label: "Rechazada", icon: <XCircle size={16} />, color: "bg-red-50", textColor: "text-red-600" }
  ];

  const QuoteCard = ({ quote }: { quote: QuoteDetailsDTO }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-mono text-slate-400">
          #{quote.id.split('-')[0]}
        </span>
        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          {quote.itemsCount} {quote.itemsCount === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      <h3 className="font-bold text-slate-800 text-sm mb-1 truncate">
        {quote.companyName || quote.clientName}
      </h3>
      
      <div className="text-zepol-primary font-bold text-lg mb-3">
        ${quote.totalPrice.toFixed(2)}
      </div>
      
      <div className="text-xs text-slate-400 mb-4 flex justify-between">
        <span>C: {new Date(quote.createdAt).toLocaleDateString()}</span>
        <span>V: {new Date(quote.validUntil).toLocaleDateString()}</span>
      </div>
      
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
        <button 
          onClick={() => alert('Vista de proforma en desarrollo...')}
          className="text-slate-400 hover:text-zepol-primary transition-colors p-1"
          title="Ver Proforma"
        >
          <Eye size={16} />
        </button>
        
        <div className="flex gap-1">
          {quote.status === "DRAFT" && (
            <button
              onClick={() => changeStatus(quote.id, "PENDING_APPROVAL")}
              className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
            >
              Enviar a Rev.
            </button>
          )}
          {quote.status === "PENDING_APPROVAL" && (
            <>
              <button
                onClick={() => changeStatus(quote.id, "REJECTED")}
                className="text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                title="Rechazar"
              >
                <XCircle size={14} />
              </button>
              <button
                onClick={() => changeStatus(quote.id, "APPROVED")}
                className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors flex items-center gap-1"
              >
                <CheckCircle size={14} /> Aprobar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="text-zepol-primary" />
            Cotizaciones / Pipeline
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gesti&oacute;n del embudo de ventas y estado de proformas.
          </p>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {loading ? (
          <div className="w-full flex items-center justify-center text-slate-500">
            Cargando cotizaciones...
          </div>
        ) : (
          columns.map(col => {
            const columnQuotes = quotes.filter(q => q.status === col.id);
            return (
              <div key={col.id} className={`flex-shrink-0 w-80 rounded-xl flex flex-col ${col.color} border border-slate-200`}>
                <div className="p-3 border-b border-slate-200/50 flex items-center justify-between">
                  <div className={`flex items-center gap-2 font-bold text-sm ${col.textColor}`}>
                    {col.icon}
                    {col.label}
                  </div>
                  <span className="bg-white/50 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {columnQuotes.length}
                  </span>
                </div>
                <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
                  {columnQuotes.map(q => (
                    <QuoteCard key={q.id} quote={q} />
                  ))}
                  {columnQuotes.length === 0 && (
                    <div className="text-center text-sm text-slate-400 py-8 italic">
                      Vac&iacute;o
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
