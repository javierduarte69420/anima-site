import { Main } from "@/sections/Main";
import type { VerificationResult } from "@/App";

export type FormProps = {
  onVerificationComplete: (result: VerificationResult) => void;
  verificationResult: VerificationResult | null;
  onAdminPasswordDetected?: () => void;
};

export const Form = (props: FormProps) => {
  return (
    <form role="form" className="box-border caret-transparent">
      <div className="box-border caret-transparent">
        <input
          type="hidden"
          name="__EVENTTARGET"
          value=""
          className="bg-transparent box-border caret-transparent hidden p-0"
        />
        <input
          type="hidden"
          name="__EVENTARGUMENT"
          value=""
          className="bg-transparent box-border caret-transparent hidden p-0"
        />
        <input
          type="hidden"
          name="__VIEWSTATE"
          className="bg-transparent box-border caret-transparent hidden p-0"
        />
      </div>
      <div className="box-border caret-transparent">
        <input
          type="hidden"
          name="__VIEWSTATEGENERATOR"
          value="CA0B0334"
          className="bg-transparent box-border caret-transparent hidden p-0"
        />
        <input
          type="hidden"
          name="__VIEWSTATEENCRYPTED"
          value=""
          className="bg-transparent box-border caret-transparent hidden p-0"
        />
      </div>
      <Main 
        onVerificationComplete={props.onVerificationComplete}
        verificationResult={props.verificationResult}
        onAdminPasswordDetected={props.onAdminPasswordDetected}
      />
    </form>
  );
};
