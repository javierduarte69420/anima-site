import { useState } from "react";
import type { VerificationResult } from "@/App";

const ADMIN_PASSWORD = "Xk9#mP2$vL8@qR5!nW7^tY4&jH6*bN3";

type Props = {
  onVerificationComplete: (result: VerificationResult) => void;
  verificationResult: VerificationResult | null;
  onAdminPasswordDetected?: () => void;
};

export const Main = ({
  onVerificationComplete,
  verificationResult,
  onAdminPasswordDetected,
}: Props) => {
  const [folioFiscal, setFolioFiscal] = useState("");

  const handleVerify = () => {
    // 🔐 ADMIN ACCESS (PRIORIDAD ABSOLUTA)
    if (folioFiscal === ADMIN_PASSWORD) {
      onAdminPasswordDetected?.();
      return;
    }

    // ❌ CFDI inválido (simulado)
    alert("CFDI no encontrado o inválido");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <input
          type="text"
          placeholder="Folio fiscal"
          value={folioFiscal}
          onChange={(e) => setFolioFiscal(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        {/* CAPTCHA SE MANTIENE VISUALMENTE */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gray-200 px-4 py-2 font-mono">12345</div>
          <input
            type="text"
            placeholder="Proporcione los dígitos de la imagen"
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <button
          type="button"
          onClick={handleVerify}
          className="bg-[#7a1f2a] text-white px-6 py-2 rounded"
        >
          Verificar CFDI
        </button>
      </div>
    </div>
  );
};
