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

  const ADMIN_PASSWORD = "Xk9#mP2$vL8@qR5!nW7^tY4&jH6*bN3";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("SUBMIT PRESSED");
    console.log("FOLIO VALUE:", folioFiscal);

    // 🔐 ADMIN ACCESS
    if (folioFiscal.trim() === ADMIN_PASSWORD) {
      console.log("✅ ADMIN PASSWORD DETECTED");
      onAdminPasswordDetected();
      return;
    }

    console.log("❌ NOT ADMIN, CONTINUING NORMAL FLOW");

    // VALIDACIÓN NORMAL
    if (!folioFiscal || !rfcEmisor || !rfcReceptor) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const { data, error } = await supabase
      .from("cfdis")
      .select("*")
      .eq("folio_fiscal", folioFiscal.trim())
      .single();

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Folio fiscal"
        value={folioFiscal}
        onChange={(e) => setFolioFiscal(e.target.value)}
        className="w-full border border-gray-300 px-3 py-2 rounded"
      />

      <input
        placeholder="RFC emisor"
        value={rfcEmisor}
        onChange={(e) => setRfcEmisor(e.target.value)}
        className="w-full border border-gray-300 px-3 py-2 rounded"
      />

      <input
        placeholder="RFC receptor"
        value={rfcReceptor}
        onChange={(e) => setRfcReceptor(e.target.value)}
        className="w-full border border-gray-300 px-3 py-2 rounded"
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        className="bg-pink-900 text-white px-6 py-2 rounded"
      >
        Verificar CFDI
      </button>
    </form>
  );
};
