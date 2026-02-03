import React, { useState } from "react";
import { Header } from "@/sections/Header";
import { Form } from "@/sections/Form";
import { Footer } from "@/sections/Footer";
import { Admin } from "@/sections/Admin";

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

  const handleVerificationComplete = (result: VerificationResult) => {
    setVerificationResult(result);
    setShowResult(true);
  };

  const handleAdminUpdate = (result: VerificationResult) => {
    setVerificationResult(result);
  };

  const handleAdminPasswordDetected = () => {
    if (!verificationResult) {
      alert("Primero verifica un CFDI antes de abrir el panel admin");
      return;
    }
    setShowAdminPanel(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-700">
      <Header />

      <Form
        onVerificationComplete={handleVerificationComplete}
        verificationResult={showResult ? verificationResult : null}
        onAdminPasswordDetected={handleAdminPasswordDetected}
      />

      <Footer />

      {showAdminPanel && verificationResult && (
        <Admin
          verificationResult={verificationResult}
          onUpdate={handleAdminUpdate}
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </div>
  );
};
