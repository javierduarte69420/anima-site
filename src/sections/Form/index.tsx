import React, { useState } from "react";
import type { VerificationResult } from "@/App";
import { Main } from "@/sections/Main";

type FormProps = {
  onVerificationComplete: (result: VerificationResult) => void;
  verificationResult: VerificationResult | null;
  onAdminPasswordDetected?: (password: string) => void;
};

export const Form = ({
  onVerificationComplete,
  verificationResult,
  onAdminPasswordDetected,
}: FormProps) => {
  const [folioFiscal, setFolioFiscal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 👉 SI ES CONTRASEÑA ADMIN, LA PASAMOS TAL CUAL
    if (onAdminPasswordDetected) {
      onAdminPasswordDetected(folioFiscal);
      return;
    }

    // flujo normal CFDI (temporal)
    onVerificationComplete({
      status: "invalid",
      folioFiscal,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="box-border">
      <Main
        folioFiscal={folioFiscal}
        setFolioFiscal={setFolioFiscal}
        verificationResult={verificationResult}
      />
    </form>
  );
};
