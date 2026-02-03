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
  const [activeTab, setActiveTab] = useState<'folio-fiscal' | 'archivo-xml'>('folio-fiscal');
  return (
    <main role="main" className="box-border caret-transparent mb-16">
      <div className="box-border caret-transparent w-auto mt-[25px] md:mt-[30px] mx-auto px-[15px] md:w-[1170px]">
        <div className="box-border caret-transparent ml-[-15px] mr-[-15px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
          <div className="box-border caret-transparent">
            <SubNavbar />
          </div>
        </div>
        <div className="box-border caret-transparent w-auto mt-[25px] mx-auto px-[15px] md:w-[1170px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
          <div className="box-border caret-transparent">
            <div className="box-border caret-transparent w-auto mx-auto px-[15px] md:w-[1170px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
              <div className="box-border caret-transparent ml-[-15px] mr-[-15px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
                <Breadcrumb />
              </div>
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
            <div className="box-border caret-transparent">
              <VerificationTabs 
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              <div className="relative w-full">
                <hr className="text-pink-800 border-b-pink-800 border-l-pink-800 border-r-pink-800 border-t-zinc-200 caret-transparent h-0 mt-2.5 mb-5 border-b-0 border-x-0 before:accent-auto before:bg-pink-800 before:box-border before:caret-transparent before:text-pink-800 before:block before:text-lg before:not-italic before:normal-nums before:font-light before:h-[5px] before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:absolute before:text-start before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-noto_sans" />
              </div>
              
              {activeTab === 'folio-fiscal' ? (
                <FolioFiscalForm 
                  onVerificationComplete={props.onVerificationComplete}
                  onAdminPasswordDetected={props.onAdminPasswordDetected}
                />
              ) : (
                <XMLUploadForm />
              )}
              
              {/* Show results inline below the form */}
              {props.verificationResult && (
                <div className="mt-8">
                  <div className="bg-white box-border caret-transparent p-4 md:p-[25px] rounded-md border-t-4 border-t-green-600">
                    {/* RFC del emisor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">RFC del emisor</h3>
                        <p className="text-sm md:text-base text-neutral-700 break-words">{props.verificationResult.rfcEmisor}</p>
                      </div>
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">Nombre o razón social del emisor</h3>
                        <p className="text-sm md:text-base text-neutral-700 break-words">{props.verificationResult.nombreEmisor || 'SERVICIO GASOLINERO SANTA JULIA'}</p>
                      </div>
                    </div>

                    {/* RFC del receptor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">RFC del receptor</h3>
                        <p className="text-sm md:text-base text-neutral-700 break-words">{props.verificationResult.rfcReceptor}</p>
                      </div>
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">Nombre o razón social del receptor</h3>
                        <p className="text-sm md:text-base text-neutral-700 break-words">{props.verificationResult.nombreReceptor || 'SANTA FE CARBURANTES'}</p>
                      </div>
                    </div>

                    {/* Folio fiscal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">Folio fiscal</h3>
                        <p className="text-xs md:text-sm text-neutral-700 break-all">{props.verificationResult.folioFiscal}</p>
                      </div>
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">Fecha de expedición</h3>
                        <p className="text-sm md:text-base text-neutral-700">{props.verificationResult.fechaEmision}</p>
                      </div>
                    </div>

                    {/* Fecha certificación y PAC */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">Fecha certificación SAT</h3>
                        <p className="text-sm md:text-base text-neutral-700">{props.verificationResult.fechaCertificacion}</p>
                      </div>
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">PAC que certificó</h3>
                        <p className="text-sm md:text-base text-neutral-700">{props.verificationResult.pacCertificador}</p>
                      </div>
                    </div>

                    {/* Total, Efecto, Estado, Estatus */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">Total del CFDI</h3>
                        <p className="text-sm md:text-base text-neutral-700">${props.verificationResult.total}</p>
                      </div>
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">Efecto del comprobante</h3>
                        <p className="text-sm md:text-base text-neutral-700">{props.verificationResult.efectoComprobante || 'Ingreso'}</p>
                      </div>
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">Estado CFDI</h3>
                        <p className="text-sm md:text-base text-neutral-700">{props.verificationResult.estadoCfdi || 'Vigente'}</p>
                      </div>
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-600 mb-2">Estatus de cancelación</h3>
                        <p className="text-sm md:text-base text-neutral-700">{props.verificationResult.estatusCancelacion || 'Cancelable sin aceptación'}</p>
                      </div>
                    </div>

                    {/* Print button */}
                    <div className="flex justify-end mt-4 md:mt-6">
                      <button
                        onClick={() => window.print()}
                        className="text-pink-950 bg-white box-border px-4 md:px-6 py-2 md:py-2.5 rounded border-2 border-pink-950 hover:bg-pink-950 hover:text-white text-sm md:text-base w-full md:w-auto"
                      >
                        Imprimir
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <LoadingIndicator />
          <div className="box-border caret-transparent"></div>
        </div>
        <div className="box-border caret-transparent"></div>
      </div>
    </main>
  );
};
