import { Main } from "@/sections/Main";
import type { VerificationResult } from "@/App";
import { useState } from "react";

export type FormProps = {
  onVerificationComplete: (result: VerificationResult) => void;
  verificationResult: VerificationResult | null;
  onAdminPasswordDetected?: () => void;
};

// 🔐 CONTRASEÑA ADMIN (exacta)
const ADMIN_PASSWORD = "Xk9#mP2$vL8@qR5!nW7^tY4&jH6*bN3";

export const Form = (props: FormProps) => {
  const [folioFiscal, setFolioFiscal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 👉 DETECCIÓN DE ADMIN
    if (folioFiscal === ADMIN_PASSWORD) {
      props.onAdminPasswordDetected?.();
      setFolioFiscal("");
      return;
    }

    // 👉 SI NO ES ADMIN, NO MOSTRAR RESULTADOS FALSOS
    alert("CFDI no encontrado o datos incorrectos");
  };

  return (
    <form
      role="form"
      onSubmit={handleSubmit}
      className="box-border caret-transparent"
    >
      {/* Campo oculto para compatibilidad visual */}
      <input type="hidden" />

      <Main
        onVerificationComplete={props.onVerificationComplete}
        verificationResult={props.verificationResult}
        onAdminPasswordDetected={props.onAdminPasswordDetected}
      />

      {/* Input invisible sincronizado con el Folio Fiscal */}
      <input
        type="text"
        value={folioFiscal}
        onChange={(e) => setFolioFiscal(e.target.value)}
        className="hidden"
      />
    </form>
  );
};
