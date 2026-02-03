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
  const [activeTab, setActiveTab] =
    useState<"folio-fiscal" | "archivo-xml">("folio-fiscal");

  return (
    <main role="main" className="box-border mb-16">
      {/* SUB NAV */}
      <div className="w-auto mt-[25px] md:mt-[30px] mx-auto px-[15px] md:w-[1170px]">
        <div className="ml-[-15px] mr-[-15px]">
          <SubNavbar />
        </div>
      </div>

      {/* HEADER */}
      <div className="w-auto mt-[25px] mx-auto px-[15px] md:w-[1170px]">
        <div className="ml-[-15px] mr-[-15px]">
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
        </div>
      </div>

      {/* TABS + FORM */}
      <div className="w-auto mx-auto px-[15px] md:w-[1170px]">
        <VerificationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <hr className="relative mt-2.5 mb-5 h-[5px] bg-pink-800 border-0" />

        {activeTab === "folio-fiscal" ? (
          <FolioFiscalForm
            onVerificationComplete={props.onVerificationComplete}
            onAdminPasswordDetected={props.onAdminPasswordDetected}
          />
        ) : (
          <XMLUploadForm />
        )}

        {/* RESULTADO */}
        {props.verificationResult && (
          <div className="mt-10">
            <div className="bg-white p-6 border-t-4 border-green-600 rounded-md">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-600">
                    RFC del emisor
                  </h3>
                  <p className="break-words">
                    {props.verificationResult.rfcEmisor}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-neutral-600">
                    Nombre o razón social del emisor
                  </h3>
                  <p className="break-words">
                    {props.verificationResult.nombreEmisor}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-600">
                    RFC del receptor
                  </h3>
                  <p className="break-words">
                    {props.verificationResult.rfcReceptor}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-neutral-600">
                    Nombre o razón social del receptor
                  </h3>
                  <p className="break-words">
                    {props.verificationResult.nombreReceptor}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-600">
                    Folio fiscal
                  </h3>
                  <p className="text-xs break-all">
                    {props.verificationResult.folioFiscal}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-neutral-600">
                    Fecha de expedición
                  </h3>
                  <p>
                    {props.verificationResult.fechaEmision}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-600">
                    Total
                  </h3>
                  <p>${props.verificationResult.total}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-neutral-600">
                    Efecto
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
                  className="border-2 border-pink-950 px-6 py-2 text-pink-950 hover:bg-pink-950 hover:text-white"
                >
                  Imprimir
                </button>
              </div>

            </div>
          </div>
        )}
      </div>

      <LoadingIndicator />
    </main>
  );
};
