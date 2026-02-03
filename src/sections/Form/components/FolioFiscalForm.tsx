import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { VerificationResult } from "@/App";

type Props = {
  onVerificationComplete: (result: VerificationResult) => void;
  onAdminPasswordDetected?: () => void;
};

export const FolioFiscalForm = ({
  onVerificationComplete,
  onAdminPasswordDetected,
}: Props) => {
  const [folioFiscal, setFolioFiscal] = useState("");
  const [rfcEmisor, setRfcEmisor] = useState("");
  const [rfcReceptor, setRfcReceptor] = useState("");
  const [captcha, setCaptcha] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 🔐 Acceso oculto al admin
    if (folioFiscal === "_ADMIN_") {
      onAdminPasswordDetected?.();
      return;
    }

    if (!folioFiscal || !rfcEmisor || !rfcReceptor || !captcha) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("cfdis") // 👈 TU TABLA REAL
      .select("*")
      .eq("folio_fiscal", folioFiscal.trim())
      .single();

    setLoading(false);

    if (error || !data) {
      setError("CFDI no encontrado o no autorizado");
      return;
    }

    onVerificationComplete({
      status: "valid",
      folioFiscal: data.folio_fiscal,
      rfcEmisor: data.rfc_emisor,
      rfcReceptor: data.rfc_receptor,
      total: data.total,
      fechaEmision: data.fecha_emision,
      fechaCertificacion: data.fecha_certificacion,
      pacCertificador: data.pac_certificador,
      nombreEmisor: data.nombre_emisor,
      nombreReceptor: data.nombre_receptor,
      efectoComprobante: data.efecto_comprobante,
      estadoCfdi: data.estado_cfdi,
      estatusCancelacion: data.estatus_cancelacion,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Folio fiscal
            </label>
            <input
              type="text"
              value={folioFiscal}
              onChange={(e) => setFolioFiscal(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              RFC emisor
            </label>
            <input
              type="text"
              value={rfcEmisor}
              onChange={(e) => setRfcEmisor(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              RFC receptor
            </label>
            <input
              type="text"
              value={rfcReceptor}
              onChange={(e) => setRfcReceptor(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="bg-gray-200 px-4 py-2 text-lg font-mono tracking-widest">
            12345
          </div>

          <input
            type="text"
            placeholder="Proporcione los dígitos de la imagen"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded w-64"
          />

          <button
            type="submit"
            disabled={loading}
            className="ml-auto bg-[#7a1f3d] text-white px-6 py-2 rounded hover:bg-[#5e162e]"
          >
            {loading ? "Verificando..." : "Verificar CFDI"}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-700 text-sm font-semibold">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};
