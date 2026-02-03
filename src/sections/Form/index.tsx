import { Main } from "@/sections/Main";
import type { VerificationResult } from "@/App";
import { supabase } from "@/lib/supabase";

export type FormProps = {
  onVerificationComplete: (result: VerificationResult) => void;
  verificationResult: VerificationResult | null;
  onAdminPasswordDetected?: () => void;
};

export const Form = (props: FormProps) => {

  const handleVerification = async (result: VerificationResult) => {
    // 1️⃣ Guardar en Supabase
    const { error } = await supabase
      .from("cfdi_verifications")
      .insert([
        {
          folio_fiscal: result.folioFiscal,
          rfc_emisor: result.rfcEmisor,
          rfc_receptor: result.rfcReceptor,
          total: result.total,
          fecha_emision: result.fechaEmision,
          fecha_certificacion: result.fechaCertificacion,
          pac_certificador: result.pacCertificador,
          nombre_emisor: result.nombreEmisor,
          nombre_receptor: result.nombreReceptor,
          efecto_comprobante: result.efectoComprobante,
          estado_cfdi: result.estadoCfdi,
          estatus_cancelacion: result.estatusCancelacion,
          status: result.status,
        },
      ]);

    if (error) {
      console.error("Error guardando CFDI:", error);
    }

    // 2️⃣ Continuar flujo normal de la app
    props.onVerificationComplete(result);
  };

  return (
    <form role="form" className="box-border caret-transparent">
      <Main
        onVerificationComplete={handleVerification}
        verificationResult={props.verificationResult}
        onAdminPasswordDetected={props.onAdminPasswordDetected}
      />
    </form>
  );
};
