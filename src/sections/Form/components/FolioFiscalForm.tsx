import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { VerificationResult } from "@/App";

type Props = {
  onVerificationComplete: (result: VerificationResult) => void;
  onAdminPasswordDetected?: () => void;
};

export const FolioFiscalForm = ({ onVerificationComplete }: Props) => {
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
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    const { data, error: dbError } = await supabase
      .from("cfdis")
      .select("*")
      .eq("folio_fiscal", folioFiscal.trim())
      .single();

    setLoading(false);

    // ❌ NO EXISTE EN SUPABASE
    if (dbError || !data) {
      setError("El folio fiscal no existe o no ha sido registrado.");
      onVerificationComplete({
        status: "invalid",
        folioFiscal,
        rfcEmisor: "",
        rfcReceptor: "",
      });
      return;
    }

    // ✅ EXISTE → RESULTADO REAL
    onVerificationComplete({
      status: "valid",
      folioFiscal: data.folio_fiscal,
      rfcEmisor: data.rfc_emisor,
      rfcReceptor: data.rfc_receptor,
      total: data.total,
      fechaEmision: data.fecha_emision,
      fechaCertificacion: data.fecha_certificacion,
      pacCertificador: data.pac,
      nombreEmisor: data.nombre_emisor,
      nombreReceptor: data.nombre_receptor,
      efectoComprobante: data.efecto,
      estadoCfdi: data.estado,
      estatusCancelacion: data.estatus_cancelacion,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Folio fiscal"
        value={folioFiscal}
        onChange={(e) => setFolioFiscal(e.target.value)}
        className="w-full border p-2"
      />

      <input
        placeholder="RFC emisor"
        value={rfcEmisor}
        onChange={(e) => setRfcEmisor(e.target.value)}
        className="w-full border p-2"
      />

      <input
        placeholder="RFC receptor"
        value={rfcReceptor}
        onChange={(e) => setRfcReceptor(e.target.value)}
        className="w-full border p-2"
      />

      <input
        placeholder="Captcha"
        value={captcha}
        onChange={(e) => setCaptcha(e.target.value)}
        className="w-full border p-2"
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-pink-900 text-white px-4 py-2"
      >
        {loading ? "Verificando..." : "Verificar CFDI"}
      </button>
    </form>
  );
};
