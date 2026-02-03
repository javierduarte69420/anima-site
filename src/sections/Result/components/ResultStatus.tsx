export type ResultStatusProps = {
  status: 'valid' | 'invalid';
};

export const ResultStatus = (props: ResultStatusProps) => {
  const isValid = props.status === 'valid';
  
  return (
    <div className={`p-6 rounded-md mb-6 ${isValid ? 'bg-green-50 border-2 border-green-600' : 'bg-red-50 border-2 border-red-600'}`}>
      <div className="flex items-start gap-4">
        <div className={`text-4xl ${isValid ? 'text-green-600' : 'text-red-600'}`}>
          {isValid ? '✓' : '✗'}
        </div>
        <div>
          <h2 className={`text-xl font-semibold mb-2 ${isValid ? 'text-green-700' : 'text-red-700'}`}>
            {isValid ? 'Estado: Vigente' : 'Estado: No Vigente'}
          </h2>
          <p className="text-neutral-700">
            {isValid 
              ? 'El comprobante fiscal digital fue certificado por el SAT y se encuentra vigente.'
              : 'El comprobante fiscal digital no fue encontrado o no es válido.'}
          </p>
        </div>
      </div>
    </div>
  );
};
