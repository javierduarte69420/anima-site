import React, { useState } from "react";
import { SubNavbar } from "@/sections/Main/components/SubNavbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHeader } from "@/components/PageHeader";
import { VerificationTabs } from "@/sections/Main/components/VerificationTabs";
import { FolioFiscalForm } from "@/sections/Form/components/FolioFiscalForm";
import { XMLUploadForm } from "@/sections/Form/components/XMLUploadForm";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import type { VerificationResult } from "@/App";

export type MainProps = {
  onVerificationComplete: (result: VerificationResult) => void;
  verificationResult: VerificationResult | null;
  onAdminPasswordDetected?: () => void;
};

export const Main = (props: MainProps) => {
  const [activeTab, setActiveTab] = useState<"folio-fiscal" | "archivo-xml">(
    "folio-fiscal"
  );

  return (
    <>
      {/* ===================== FORMULARIO SAT ===================== */}
      <main role="main" className="mb-16">
        <div className="w-full max-w-[1170px] mx-auto px-4 mt-6">
          <SubNavbar />
          <Breadcrumb />

          <PageHeader
            variant="logo"
            logoUrl="https://c.animaapp.com/ml5pbkbosP02ek/assets/Logo_SHCP_SAT-.jpg"
            logoAlt="Logo SHCP"
          />
          <PageHeader
            variant="title"
            title="Verificación de comprobantes fiscales digitales por internet"
          />

          <VerificationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <hr className="border-t-4 border-pink-800 my-6" />

          {activeTab === "folio-fiscal" ? (
            <FolioFiscalForm
              onVerificationComplete={props.onVerificationComplete}
              onAdminPasswordDetected={props.onAdminPasswordDetected}
            />
          ) : (
            <XMLUploadForm />
          )}
        </div>

        <LoadingIndicator />
      </main>

      {/* ===================== RESULTADO LIMPIO ===================== */}
      {props.verificationResult && (
        <section className="w-full bg-gray-100 py-10">
          <div className="max-w-5xl mx-auto bg-white p-8 rounded-md border-t-4 border-green-600">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  RFC del emisor
                </h3>
                <p>{props.verificationResult.rfcEmisor}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  Nombre o razón social del emisor
                </h3>
                <p>{props.verificationResult.nombreEmisor}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  RFC del receptor
                </h3>
                <p>{props.verificationResult.rfcReceptor}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  Nombre o razón social del receptor
                </h3>
                <p>{props.verificationResult.nombreReceptor}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  Folio fiscal
                </h3>
                <p className="break-all">
                  {props.verificationResult.folioFiscal}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  Fecha de expedición
                </h3>
                <p>{props.verificationResult.fechaEmision}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  Fecha certificación SAT
                </h3>
                <p>{props.verificationResult.fechaCertificacion}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  PAC que certificó
                </h3>
                <p>{props.verificationResult.pacCertificador}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  Total del CFDI
                </h3>
                <p>${props.verificationResult.total}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  Efecto del comprobante
                </h3>
                <p>{props.verificationResult.efectoComprobante}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  Estado CFDI
                </h3>
                <p>{props.verificationResult.estadoCfdi}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-600">
                  Estatus de cancelación
                </h3>
                <p>{props.verificationResult.estatusCancelacion}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => window.print()}
                className="border-2 border-pink-900 text-pink-900 px-6 py-2 rounded hover:bg-pink-900 hover:text-white"
              >
                Imprimir
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
