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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!folioFiscal || !rfcEmisor || !rfcReceptor || !captcha) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    const { data, error: dbError } = await supabase
      .from("cfdis") // 👈 SI TU TABLA SE LLAMA DIFERENTE, CAMBIA AQUÍ
      .select("*")
      .eq("folio_fiscal", folioFiscal)
      .single();

    setLoading(false);

    if (dbError || !data) {
      setError("CFDI no encontrado o no autorizado");
      return;
    }

    // ✅ SOLO SI EXISTE, SE MUESTRA
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border p-2"
        placeholder="Folio fiscal"
        value={folioFiscal}
        onChange={(e) => setFolioFiscal(e.target.value)}
      />

      <input
        className="w-full border p-2"
        placeholder="RFC emisor"
        value={rfcEmisor}
        onChange={(e) => setRfcEmisor(e.target.value)}
      />

      <input
        className="w-full border p-2"
        placeholder="RFC receptor"
        value={rfcReceptor}
        onChange={(e) => setRfcReceptor(e.target.value)}
      />

      <input
        className="w-full border p-2"
        placeholder="Captcha"
        value={captcha}
        onChange={(e) => setCaptcha(e.target.value)}
      />

      {error && (
        <div className="text-red-600 font-semibold">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-pink-800 text-white px-6 py-2 rounded"
      >
        {loading ? "Verificando..." : "Verificar CFDI"}
      </button>
    </form>
  );
};
