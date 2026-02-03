import { useState } from "react";

type Props = {
  onVerificationComplete: (result: any) => void;
  onAdminPasswordDetected?: () => void;
};

const ADMIN_PASSWORD = "Xk9#mP2$vL8@qR5!nW7^tY4&jH6*bN3";

export const FolioFiscalForm = ({
  onVerificationComplete,
  onAdminPasswordDetected,
}: Props) => {
  const [folio, setFolio] = useState("");
  const [rfcEmisor, setRfcEmisor] = useState("");
  const [rfcReceptor, setRfcReceptor] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ⬅️ ESTO ERA CLAVE

    setError(null);

    // 🔐 ADMIN ACCESS
    if (folio === ADMIN_PASSWORD) {
      onAdminPasswordDetected?.();
      return;
    }

    // 🧪 CAPTCHA FAKE (obligatorio)
    if (captcha.trim() !== "12345") {
      setError("Captcha incorrecto");
      return;
    }

    // ❌ NO EXISTE CFDI
    setError("El CFDI no fue encontrado");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 border rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          placeholder="Folio fiscal"
          value={folio}
          onChange={(e) => setFolio(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="RFC emisor"
          value={rfcEmisor}
          onChange={(e) => setRfcEmisor(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="RFC receptor"
          value={rfcReceptor}
          onChange={(e) => setRfcReceptor(e.target.value)}
          className="border p-2"
        />
      </div>

      {/* CAPTCHA RESTAURADO */}
      <div className="flex items-center gap-4 mb-4">
        <div className="border px-4 py-2 bg-gray-100 font-mono">
          12345
        </div>
        <input
          placeholder="Proporcione los dígitos de la imagen"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          className="border p-2 flex-1"
        />
      </div>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        type="submit"
        className="bg-pink-800 text-white px-6 py-2 rounded"
      >
        Verificar CFDI
      </button>
    </form>
  );
};
