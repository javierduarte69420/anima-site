import { Breadcrumb } from "@/components/Breadcrumb";
import { ResultHeader } from "@/sections/Result/components/ResultHeader";
import { ResultStatus } from "@/sections/Result/components/ResultStatus";
import { ResultDetails } from "@/sections/Result/components/ResultDetails";
import { ResultActions } from "@/sections/Result/components/ResultActions";

export type ResultProps = {
  status: 'valid' | 'invalid';
  folioFiscal: string;
  rfcEmisor: string;
  rfcReceptor: string;
  total?: string;
  fechaEmision?: string;
  fechaCertificacion?: string;
  pacCertificador?: string;
  onNewSearch: () => void;
};

export const Result = (props: ResultProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main role="main" className="box-border caret-transparent mb-16">
      <div className="box-border caret-transparent w-auto mt-[46px] mx-auto px-[15px] md:w-[1170px]">
        <div className="box-border caret-transparent ml-[-15px] mr-[-15px]">
          <Breadcrumb />
        </div>
        
        <ResultHeader />
        
        <div className="relative w-full mb-6">
          <hr className="text-pink-800 border-b-pink-800 border-l-pink-800 border-r-pink-800 border-t-zinc-200 caret-transparent h-0 mt-2.5 mb-5 border-b-0 border-x-0 before:bg-pink-800 before:box-border before:caret-transparent before:text-pink-800 before:block before:h-[5px] before:w-full before:absolute" />
        </div>
        
        <ResultStatus status={props.status} />
        
        <ResultDetails
          folioFiscal={props.folioFiscal}
          rfcEmisor={props.rfcEmisor}
          rfcReceptor={props.rfcReceptor}
          total={props.total}
          fechaEmision={props.fechaEmision}
          fechaCertificacion={props.fechaCertificacion}
          pacCertificador={props.pacCertificador}
        />
        
        <ResultActions onNewSearch={props.onNewSearch} onPrint={handlePrint} />
      </div>
    </main>
  );
};
