import React, { useState } from "react";
import { Header } from "@/sections/Header";
import { Form } from "@/sections/Form";
import { Footer } from "@/sections/Footer";

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
          verificationResult={verificationResult}
          onAdminPasswordDetected={() => {
            setShowAdminPanel(true);
          }}
        />

        <Footer />
      </div>

      {/* === ADMIN OVERLAY (TEST) === */}
      {showAdminPanel && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-4xl p-10 rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-4">
              ADMIN PANEL ABIERTO
            </h1>

            <p className="mb-4 text-gray-600">
              Si ves este mensaje, el admin SÍ se está abriendo correctamente.
            </p>

            <pre className="p-4 bg-gray-100 rounded text-xs overflow-auto max-h-[300px]">
              {JSON.stringify(verificationResult, null, 2)}
            </pre>

            <button
              onClick={() => setShowAdminPanel(false)}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
