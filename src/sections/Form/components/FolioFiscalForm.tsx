import React from "react";
import { FormFields } from "@/sections/Form/components/FormFields";
import type { VerificationResult } from "@/App";

export type FolioFiscalFormProps = {
  onVerificationComplete: (result: VerificationResult) => void;
  onAdminPasswordDetected?: () => void;
};

export const FolioFiscalForm = (props: FolioFiscalFormProps) => {
  // Read URL parameters on mount
  const [folioFiscal, setFolioFiscal] = React.useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || "";
  });
  const [rfcEmisor, setRfcEmisor] = React.useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('re') || "";
  });
  const [rfcReceptor, setRfcReceptor] = React.useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('rr') || "";
  });

  return (
    <div className="bg-white box-border caret-transparent mt-[15px] p-[25px] rounded-md">
      <label className="text-neutral-700 box-border caret-transparent inline-block max-w-full mb-4">
        A través de esta opción, usted podrá verificar si el comprobante fue certificado por el SAT
      </label>
      <FormFields
        variant="fiscal-data"
        folioFiscalValue={folioFiscal}
        rfcEmisorValue={rfcEmisor}
        rfcReceptorValue={rfcReceptor}
        onFolioFiscalChange={setFolioFiscal}
        onRfcEmisorChange={setRfcEmisor}
        onRfcReceptorChange={setRfcReceptor}
      />
      <FormFields
        variant=""
        captchaImageSrc="https://c.animaapp.com/ml5pbkbosP02ek/assets/9.jpg"
        captchaValue=""
        folioFiscalValue={folioFiscal}
        rfcEmisorValue={rfcEmisor}
        rfcReceptorValue={rfcReceptor}
        onVerificationComplete={props.onVerificationComplete}
        onAdminPasswordDetected={props.onAdminPasswordDetected}
      />
      <div className="relative box-border caret-transparent float-none ml-[-15px] mr-[-15px] min-h-px w-auto mb-[15px] px-[15px] md:float-left md:w-full before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
        <div className="relative text-neutral-500 text-sm box-border caret-transparent float-left min-h-px w-auto px-[15px] md:w-[66.6667%]">
          * Datos obligatorios
        </div>
      </div>
    </div>
  );
};
