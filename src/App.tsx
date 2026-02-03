import React, { useState, useEffect } from "react";
import { Header } from "@/sections/Header";
import { Form } from "@/sections/Form";
import { Footer } from "@/sections/Footer";
import { Result } from "@/sections/Result";
import { Admin } from "@/sections/Admin";
import { supabase } from "@/lib/supabase";

export type VerificationResult = {
  status: "valid" | "invalid";
  folioFiscal: string;
  rfcEmisor: string;
  rfcReceptor: string;
  total?: string;
  fechaEmision?: string;
  fechaCertificacion?: string;
  pacCertificador?: string;
  nombreEmisor?: string;
  nombreReceptor?: string;
  efectoComprobante?: string;
  estadoCfdi?: string;
  estatusCancelacion?: string;
};

export const App = () => {
  const [showResult, setShowResult] = useState(false);
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  /**
   * 🔍 LECTURA AUTOMÁTICA DESDE QR (?id=FOLIO)
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const folioFiscal = params.get("id");

    if (!folioFiscal) return;

    const fetchFromSupabase = async () => {
      const { data, error } = await supabase
        .from("cfdi_verifications")
        .select("*")
        .eq("folio_fiscal", folioFiscal)
        .single();

      if (error || !data) {
        setVerificationResult({
          status: "invalid",
          folioFiscal,
          rfcEmisor: "",
          rfcReceptor: "",
        });
        setShowResult(true);
        return;
      }

      setVerificationResult({
        status: data.status,
        folioFiscal: data.folio_fiscal,
        rfcEmisor: data.rfc_emisor,
        rfcReceptor: data.rfc_receptor,
        total: data.total?.toString(),
        fechaEmision: data.fecha_emision,
        fechaCertificacion: data.fecha_certificacion,
        pacCertificador: data.pac_certificador,
        nombreEmisor: data.nombre_emisor,
        nombreReceptor: data.nombre_receptor,
        efectoComprobante: data.efecto_comprobante,
        estadoCfdi: data.estado_cfdi,
        estatusCancelacion: data.estatus_cancelacion,
      });

      setShowResult(true);
    };

    fetchFromSupabase();
  }, []);

  /**
   * 🧾 CUANDO EL FORM TERMINA UNA BÚSQUEDA NORMAL
   */
  const handleVerificationComplete = (result: VerificationResult) => {
    setVerificationResult(result);
    setShowResult(true);
  };

  const handleNewSearch = () => {
    setShowResult(false);
    setVerificationResult(null);
    window.history.replaceState({}, "", window.location.pathname);
  };

  /**
   * 🛠 ADMIN
   */
  const handleAdminUpdate = (result: VerificationResult) => {
    setVerificationResult(result);
  };

  const handleAdminPasswordDetected = () => {
    setShowAdminPanel(true);
  };

  return (
    <body className="text-neutral-700 text-lg not-italic normal-nums font-light bg-white overflow-x-hidden">
      <Header />

      <Form
        onVerificationComplete={handleVerificationComplete}
        verificationResult={showResult ? verificationResult : null}
        onAdminPasswordDetected={handleAdminPasswordDetected}
      />

      <Footer />

      {showAdminPanel && (
        <Admin
          verificationResult={verificationResult}
          onUpdate={handleAdminUpdate}
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </body>
  );
};
