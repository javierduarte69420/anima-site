import { Main } from "@/sections/Main";
import type { VerificationResult } from "@/App";

export type FormProps = {
  onVerificationComplete: (result: VerificationResult) => void;
  verificationResult: VerificationResult | null;
  onAdminPasswordDetected?: () => void;
};

export const Form = ({
  onVerificationComplete,
  verificationResult,
  onAdminPasswordDetected,
}: FormProps) => {
  return (
    <form
      className="box-border caret-transparent"
      onSubmit={(e) => {
        e.preventDefault(); // ⬅️ CRÍTICO: evita recarga / pantalla blanca
      }}
    >
      <Main
        onVerificationComplete={onVerificationComplete}
        verificationResult={verificationResult}
        onAdminPasswordDetected={onAdminPasswordDetected}
      />
    </form>
  );
};
