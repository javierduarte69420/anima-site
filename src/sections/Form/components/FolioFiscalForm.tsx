import { useState } from "react";
import type { VerificationResult } from "@/App";
import { supabase } from "@/lib/supabase";

type Props = {
  onVerificationComplete: (result: VerificationResult) => void;
  onAdminPasswordDetected: () => void;
};

export const FolioFiscalForm = ({
  onVerificationComplete,
  onAdminPasswordDetected,
}: Props) => {
  const [folioFiscal, setFolioFiscal] = useState("");
  const [rfcEmisor, setRfcEmisor] = useState("");
  const [rfcReceptor, setRfcReceptor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 🔐 ADMIN PASSWORD
    if (folioFiscal.trim() === "__ADMIN__") {
      onAdminPasswordDetected();
      return;
    }

    // 🔎 CONSULTA REAL A SUPABASE
    const { data, error } = await supabase
      .from("cfdis")
      .select("*")
      .eq("folio_fiscal", folioFiscal)
      .single();

    if (error || !data) {
      setError("CFDI no encontrado");
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

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        className="bg-pink-900 text-white px-4 py-2"
      >
        Verificar CFDI
      </button>
    </form>
  );
};
