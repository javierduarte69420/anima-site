import React, { useState } from "react";
import type { VerificationResult } from "@/App";

type Props = {
  onVerificationComplete: (result: VerificationResult) => void;
  onAdminPasswordDetected?: () => void;
};

const ADMIN_PASSWORD = "Xk9#mP2$vL8@qR5!nW7^tY4&jH6*bN3";

export const FolioFiscalForm = ({
  onVerificationComplete,
  onAdminPasswordDetected,
}: Props) => {
  const [folioFiscal, setFolioFiscal] = useState("");
  const [rfcEmisor, setRfcEmisor] = useState("");
  const [rfcReceptor, setRfcReceptor] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaValue] = useState("12345"); // SIMULACIÓN VISUAL
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 🔐 ADMIN ACCESS
    if (folioFiscal.trim() === ADMIN_PASSWORD) {
      if (captcha !== captchaValue) {
        setError("Captcha incorrecto.");
        return;
      }

      onAdminPasswordDetected?.();
      return;
    }

    // ❌ VALIDACIONES NORMALES
    if (!folioFiscal || !rfcEmisor || !rfcReceptor || !captcha) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (captcha !== captchaValue) {
      setError("Captcha incorrecto.");
      return;
    }

    // ❌ CFDI NO EXISTE → ERROR
    setError("El CFDI no fue encontrado o no existe.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-md mt-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Folio fiscal"
          value={folioFiscal}
          onChange={(e) => setFolioFiscal(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="RFC emisor"
          value={rfcEmisor}
          onChange={(e) => setRfcEmisor(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="RFC receptor"
          value={rfcReceptor}
          onChange={(e) => setRfcReceptor(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* CAPTCHA */}
      <div className="flex items-center gap-4 mt-4">
        <div className="bg-gray-200 px-4 py-2 font-mono text-lg tracking-widest">
          {captchaValue}
        </div>

        <input
          type="text"
          placeholder="Proporcione los dígitos de la imagen"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        <button
          type="submit"
          className="bg-[#7b1e3a] text-white px-6 py-2 rounded hover:bg-[#5e162c]"
        >
          Verificar CFDI
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-600 mt-4 font-medium">{error}</p>
      )}
    </form>
  );
};
