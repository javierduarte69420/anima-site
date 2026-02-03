import React, { useState, useEffect } from "react";
import { Header } from "@/sections/Header";
import { Form } from "@/sections/Form";
import { Footer } from "@/sections/Footer";
import { Result } from "@/sections/Result";
import { Admin } from "@/sections/Admin";

export type VerificationResult = {
  status: 'valid' | 'invalid';
  folioFiscal: string;
  rfcEmisor: string;
  rfcReceptor: string;
  total?: string;
  fechaEmision?: string;
  fechaCertificacion?: string;
  pacCertificador?: string;
  nombreEmisor?: string;
  nombreReceptor?: string;
  efectoComprobante?: string;
  estadoCfdi?: string;
  estatusCancelacion?: string;
};

export const App = () => {
  const [showResult, setShowResult] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleVerificationComplete = (result: VerificationResult) => {
    setVerificationResult(result);
    setShowResult(true);
  };

  const handleNewSearch = () => {
    setShowResult(false);
    setVerificationResult(null);
  };

  const handleAdminUpdate = (result: VerificationResult) => {
    setVerificationResult(result);
  };

  const handleAdminPasswordDetected = () => {
    setShowAdminPanel(true);
  };

  return (
    <body className="text-neutral-700 text-lg not-italic normal-nums font-light accent-auto bg-white box-border caret-transparent block tracking-[normal] leading-[25.7143px] list-outside list-disc pointer-events-auto text-start indent-[0px] normal-case visible pt-30 md:pt-34 border-separate font-noto_sans overflow-x-hidden">
      <Header />
      <div className="box-border caret-transparent hidden pointer-events-none">
        <div className="fixed bg-red-700 box-border caret-transparent h-0.5 w-full z-[2000] right-full top-0">
          <div className="box-border caret-transparent"></div>
        </div>
        <div className="box-border caret-transparent"></div>
      </div>
      
      <Form 
        onVerificationComplete={handleVerificationComplete}
        verificationResult={showResult ? verificationResult : null}
        onAdminPasswordDetected={handleAdminPasswordDetected}
      />
      
      <Footer />

      {showAdminPanel && (
        <Admin
          verificationResult={verificationResult}
          onUpdate={handleAdminUpdate}
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </body>
  );
};
