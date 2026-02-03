import type { VerificationResult } from "@/App";
import { Main } from "@/sections/Main";

export type FormProps = {
  onVerificationComplete: (result: VerificationResult) => void;
  verificationResult: VerificationResult | null;
  onAdminPasswordDetected: () => void;
};

export const Form = ({
  onVerificationComplete,
  verificationResult,
  onAdminPasswordDetected,
}: FormProps) => {
  return (
    <form className="box-border">
      <Main
        onVerificationComplete={onVerificationComplete}
        verificationResult={verificationResult}
        onAdminPasswordDetected={onAdminPasswordDetected}
      />
    </form>
  );
};
