import { Main } from "@/sections/Main";
import type { VerificationResult } from "@/App";

export type FormProps = {
  onVerificationComplete: (result: VerificationResult) => void;
  verificationResult: VerificationResult | null;
  onAdminPasswordDetected?: () => void;
};

export const Form = (props: FormProps) => {
  return (
    <div role="form" className="box-border caret-transparent">
      {/* 🚫 NO <form> AQUÍ */}
      <Main
        onVerificationComplete={props.onVerificationComplete}
        verificationResult={props.verificationResult}
        onAdminPasswordDetected={props.onAdminPasswordDetected}
      />
    </div>
  );
};
