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
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);

  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />

        <Form
          onVerificationComplete={(result) => {
            setVerificationResult(result);
          }}
          verificationResult={
            verificationResult?.status === "valid"
              ? verificationResult
              : null
          }
          onAdminPasswordDetected={() => {
            if (!verificationResult || verificationResult.status !== "valid") {
              alert("Primero verifica un CFDI válido.");
              return;
            }
            setShowAdminPanel(true);
          }}
        />

        <Footer />
      </div>

      {showAdminPanel && verificationResult?.status === "valid" && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
          <div className="bg-white w-[95%] max-w-6xl max-h-[90vh] overflow-auto rounded-lg shadow-xl relative">
            <button
              onClick={() => setShowAdminPanel(false)}
              className="absolute top-3 right-3 px-4 py-2 bg-red-600 text-white rounded"
            >
              Cerrar
            </button>

            <Admin
              verificationResult={verificationResult}
              onUpdate={(updated) => setVerificationResult(updated)}
              onClose={() => setShowAdminPanel(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
