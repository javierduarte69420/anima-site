import React, { useState } from "react";
import { Header } from "@/sections/Header";
import { Form } from "@/sections/Form";
import { Footer } from "@/sections/Footer";
import { Admin } from "@/sections/Admin";

export type VerificationResult = {
  status: "valid" | "invalid";
  folioFiscal?: string;
};

const ADMIN_PASSWORD = "Xk9#mP2$vL8@qR5!nW7^tY4&jH6*bN3";

export const App = () => {
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);

  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />

        <Form
          verificationResult={verificationResult}
          onVerificationComplete={(result) => {
            setVerificationResult(result);
          }}
          onAdminPasswordDetected={(password: string) => {
            if (password === ADMIN_PASSWORD) {
              setShowAdminPanel(true);
            } else {
              alert("Contraseña admin incorrecta");
            }
          }}
        />

        <Footer />
      </div>

      {/* ADMIN PANEL */}
      {showAdminPanel && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
          <div className="bg-white w-[95%] max-w-4xl p-6 rounded-lg shadow-xl relative">
            <button
              onClick={() => setShowAdminPanel(false)}
              className="absolute top-3 right-3 px-4 py-2 bg-red-600 text-white rounded"
            >
              Cerrar
            </button>

            <Admin
              verificationResult={verificationResult}
              onClose={() => setShowAdminPanel(false)}
              onUpdate={(updated) => setVerificationResult(updated)}
            />
          </div>
        </div>
      )}
    </>
  );
};
