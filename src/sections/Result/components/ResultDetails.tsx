export type ResultDetailsProps = {
  folioFiscal: string;
  rfcEmisor: string;
  rfcReceptor: string;
  total?: string;
  fechaEmision?: string;
  fechaCertificacion?: string;
  pacCertificador?: string;
};

export const ResultDetails = (props: ResultDetailsProps) => {
  return (
    <div className="bg-white p-6 rounded-md border border-neutral-300 mb-6">
      <h3 className="text-lg font-semibold text-neutral-700 mb-4">
        Datos del Comprobante
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-neutral-600">UUID (Folio Fiscal):</label>
          <p className="text-neutral-700 break-all">{props.folioFiscal}</p>
        </div>
        
        <div>
          <label className="text-sm font-semibold text-neutral-600">RFC Emisor:</label>
          <p className="text-neutral-700">{props.rfcEmisor}</p>
        </div>
        
        <div>
          <label className="text-sm font-semibold text-neutral-600">RFC Receptor:</label>
          <p className="text-neutral-700">{props.rfcReceptor}</p>
        </div>
        
        {props.total && (
          <div>
            <label className="text-sm font-semibold text-neutral-600">Total:</label>
            <p className="text-neutral-700">${props.total}</p>
          </div>
        )}
        
        {props.fechaEmision && (
          <div>
            <label className="text-sm font-semibold text-neutral-600">Fecha de Emisión:</label>
            <p className="text-neutral-700">{props.fechaEmision}</p>
          </div>
        )}
        
        {props.fechaCertificacion && (
          <div>
            <label className="text-sm font-semibold text-neutral-600">Fecha de Certificación:</label>
            <p className="text-neutral-700">{props.fechaCertificacion}</p>
          </div>
        )}
        
        {props.pacCertificador && (
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-neutral-600">PAC Certificador:</label>
            <p className="text-neutral-700">{props.pacCertificador}</p>
          </div>
        )}
      </div>
    </div>
  );
};
