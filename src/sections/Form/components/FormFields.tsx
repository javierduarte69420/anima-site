import React from "react";
import type { VerificationResult } from "@/App";

export type FormFieldsProps = {
  variant: string;
  folioFiscalValue?: string;
  rfcEmisorValue?: string;
  rfcReceptorValue?: string;
  captchaImageSrc?: string;
  captchaValue?: string;
  onFolioFiscalChange?: (value: string) => void;
  onRfcEmisorChange?: (value: string) => void;
  onRfcReceptorChange?: (value: string) => void;
  onVerificationComplete?: (result: VerificationResult) => void;
  onAdminPasswordDetected?: () => void;
};

// Generate random 5-digit captcha number
const generateCaptcha = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const FormFields = (props: FormFieldsProps) => {
  const [captchaInput, setCaptchaInput] = React.useState(props.captchaValue || "");
  const [captchaNumber, setCaptchaNumber] = React.useState(generateCaptcha());

const [isPending, setIsPending] = React.useState(false);
const [error, setError] = React.useState<Error | null>(null);

const create = async (_data: any) => {
  setIsPending(true);
  setError(null);

  // Simula la llamada que antes hacía Anima
  await new Promise((res) => setTimeout(res, 1200));

  setIsPending(false);
  return true;
};

  const ADMIN_PASSWORD = 'Xk9#mP2$vL8@qR5!nW7^tY4&jH6*bN3';

  const handleFolioFiscalChange = (value: string) => {
    // Don't convert to uppercase to allow password paste
    if (props.onFolioFiscalChange) {
      props.onFolioFiscalChange(value);
    }
  };

  if (props.variant === "fiscal-data") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-neutral-700 text-sm mb-2">
            Folio fiscal<span className="text-red-600">*</span>:
          </label>
          <input
            name="ctl00$MainContent$TxtUUID"
            type="text"
            value={props.folioFiscalValue || ""}
            onChange={(e) => handleFolioFiscalChange(e.target.value)}
            className="text-neutral-600 bg-white shadow-sm box-border block h-[39px] w-full border border-neutral-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-neutral-700 text-sm mb-2">
            RFC emisor<span className="text-red-600">*</span>:
          </label>
          <input
            name="ctl00$MainContent$TxtRfcEmisor"
            type="text"
            value={props.rfcEmisorValue || ""}
            onChange={(e) => props.onRfcEmisorChange && props.onRfcEmisorChange(e.target.value.toUpperCase())}
            className="text-neutral-600 bg-white shadow-sm box-border block h-[39px] uppercase w-full border border-neutral-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-neutral-700 text-sm mb-2">
            RFC receptor<span className="text-red-600">*</span>:
          </label>
          <input
            name="ctl00$MainContent$TxtRfcReceptor"
            type="text"
            value={props.rfcReceptorValue || ""}
            onChange={(e) => props.onRfcReceptorChange && props.onRfcReceptorChange(e.target.value.toUpperCase())}
            className="text-neutral-600 bg-white shadow-sm box-border block h-[39px] uppercase w-full border border-neutral-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 focus:border-transparent"
          />
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const folioFiscal = props.folioFiscalValue || "";
    const rfcEmisor = props.rfcEmisorValue || "";
    const rfcReceptor = props.rfcReceptorValue || "";
    
    // Validate captcha first
    if (!captchaInput.trim()) {
      alert("Por favor, ingrese los dígitos de la imagen");
      return;
    }

    if (captchaInput !== captchaNumber) {
      alert("Los dígitos ingresados no coinciden con la imagen. Por favor, inténtelo de nuevo.");
      setCaptchaNumber(generateCaptcha());
      setCaptchaInput("");
      return;
    }

    // Check if admin password was entered in folio fiscal field (after captcha validation)
    // Trim the password to handle any extra whitespace from copy/paste
    if (folioFiscal.trim() === ADMIN_PASSWORD) {
      if (props.onAdminPasswordDetected) {
        props.onAdminPasswordDetected();
        // Clear the fields after detecting password
        if (props.onFolioFiscalChange) {
          props.onFolioFiscalChange('');
        }
        setCaptchaInput("");
        setCaptchaNumber(generateCaptcha());
      }
      return;
    }

    // Then validate other fields for normal verification
    if (!folioFiscal.trim() || !rfcEmisor.trim() || !rfcReceptor.trim()) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

    try {
      await create({
        variant: "fiscal-data",
        folioFiscal: folioFiscal,
        rfcEmisor: rfcEmisor,
        rfcReceptor: rfcReceptor,
      });
      
      // Show verification result screen
      if (props.onVerificationComplete) {
        props.onVerificationComplete({
          status: 'valid',
          folioFiscal: folioFiscal,
          rfcEmisor: rfcEmisor,
          rfcReceptor: rfcReceptor,
          total: '500.00',
          fechaEmision: new Date().toLocaleDateString('es-MX', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          fechaCertificacion: new Date().toLocaleDateString('es-MX', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          pacCertificador: 'PAC Certificador Demo',
          nombreEmisor: 'SERVICIO GASOLINERO SANTA JULIA',
          nombreReceptor: 'SANTA FE CARBURANTES',
          efectoComprobante: 'Ingreso',
          estadoCfdi: 'Vigente',
          estatusCancelacion: 'Cancelable sin aceptación'
        });
      }
      
    } catch (err) {
      alert("Error al verificar CFDI: " + (err instanceof Error ? err.message : "Error desconocido"));
    }
  };

  return (
    <div className="box-border caret-transparent ml-[-15px] mr-[-15px] mb-[15px]">
      <div className="box-border caret-transparent">
        <div className="relative box-border caret-transparent float-none min-h-px w-full px-[15px] mb-4 md:float-left md:w-[16.6667%] md:pr-[15px] md:pl-0 md:mb-0">
            <div 
            className="box-border caret-transparent border border-gray-400 p-2 bg-gray-200 flex items-center justify-center relative overflow-hidden" 
            style={{
              background: `
                linear-gradient(135deg, #d4d4d4 0%, #e5e5e5 50%, #d4d4d4 100%),
                repeating-linear-gradient(
                  0deg,
                  #ddd 0px,
                  #ccc 1px,
                  #ddd 2px
                ),
                repeating-linear-gradient(
                  90deg,
                  #ddd 0px,
                  #ccc 1px,
                  #ddd 2px
                )
              `,
              backgroundSize: 'cover, 2px 2px, 2px 2px',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1), 0 1px 1px rgba(0,0,0,0.05)'
            }}
          >
            {/* Dense mesh pattern overlay */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              style={{ opacity: 0.3 }}
            >
              <defs>
                <pattern id="mesh" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                  <path d="M 0,1.5 L 3,1.5 M 1.5,0 L 1.5,3" stroke="#999" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mesh)" />
            </svg>

            {/* Numbers with gray boring styling */}
            <div className="relative select-none z-10" style={{ 
              letterSpacing: '4px',
              filter: 'blur(0.4px)'
            }}>
              {captchaNumber.split('').map((digit, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: '32px',
                    fontWeight: '600',
                    color: Math.random() > 0.5 ? '#666' : '#777',
                    textShadow: `
                      1px 1px 1px rgba(0,0,0,0.15),
                      -1px -1px 1px rgba(255,255,255,0.3)
                    `,
                    transform: `rotate(${-8 + Math.random() * 16}deg) translateY(${-3 + Math.random() * 6}px) skewX(${-5 + Math.random() * 10}deg)`,
                    display: 'inline-block',
                    margin: '0 1px'
                  }}
                >
                  {digit}
                </span>
              ))}
            </div>

            {/* Gray boring noise and interference */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              style={{ opacity: 0.4 }}
            >
              {/* Random dots */}
              {Array.from({ length: 400 }).map((_, i) => (
                <circle
                  key={`dot-${i}`}
                  cx={`${Math.random() * 100}%`}
                  cy={`${Math.random() * 100}%`}
                  r={Math.random() * 1}
                  fill={Math.random() > 0.5 ? '#999' : '#aaa'}
                />
              ))}
              
              {/* Horizontal lines */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={`${(i / 12) * 100}%`}
                  x2="100%"
                  y2={`${(i / 12) * 100 + Math.random() * 5}%`}
                  stroke={Math.random() > 0.5 ? '#aaa' : '#bbb'}
                  strokeWidth={Math.random() * 1.2 + 0.4}
                  opacity={0.5}
                />
              ))}
              
              {/* Vertical lines */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={`${(i / 12) * 100}%`}
                  y1="0"
                  x2={`${(i / 12) * 100 + Math.random() * 5}%`}
                  y2="100%"
                  stroke={Math.random() > 0.5 ? '#aaa' : '#bbb'}
                  strokeWidth={Math.random() * 1.2 + 0.4}
                  opacity={0.5}
                />
              ))}
              
              {/* Diagonal scribbles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={`d-${i}`}
                  x1={`${Math.random() * 100}%`}
                  y1={`${Math.random() * 100}%`}
                  x2={`${Math.random() * 100}%`}
                  y2={`${Math.random() * 100}%`}
                  stroke="#999"
                  strokeWidth={Math.random() * 1.5 + 0.8}
                  opacity={0.4}
                />
              ))}
              
              {/* Random scribbles over numbers - like pencil marks */}
              {Array.from({ length: 25 }).map((_, i) => {
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const controlX1 = startX + Math.random() * 40 - 20;
                const controlY1 = startY + Math.random() * 40 - 20;
                const controlX2 = startX + Math.random() * 50 - 25;
                const controlY2 = startY + Math.random() * 50 - 25;
                const endX = startX + Math.random() * 60 - 30;
                const endY = startY + Math.random() * 60 - 30;
                
                return (
                  <path
                    key={`scribble-${i}`}
                    d={`M ${startX},${startY} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`}
                    stroke={Math.random() > 0.5 ? '#888' : '#999'}
                    strokeWidth={Math.random() * 1.5 + 0.5}
                    fill="none"
                    opacity={0.6}
                    strokeLinecap="round"
                  />
                );
              })}
              
              {/* Additional wavy scribbles */}
              {Array.from({ length: 10 }).map((_, i) => {
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                let path = `M ${startX},${startY}`;
                
                // Create a wavy line with multiple points
                for (let j = 0; j < 3; j++) {
                  const x = startX + (j + 1) * (Math.random() * 20 - 10);
                  const y = startY + (j + 1) * (Math.random() * 20 - 10);
                  path += ` L ${x},${y}`;
                }
                
                return (
                  <path
                    key={`wavy-${i}`}
                    d={path}
                    stroke="#999"
                    strokeWidth={Math.random() * 1.3 + 0.7}
                    fill="none"
                    opacity={0.5}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
            
            {/* Subtle gray texture overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(0,0,0,0.08) 0%, transparent 50%)
                `,
                mixBlendMode: 'overlay'
              }}
            />
          </div>
        </div>
        <div className="relative box-border caret-transparent float-none min-h-px w-full px-[15px] mb-4 md:float-left md:w-[33.3333%] md:mb-0">
          <span className="box-border caret-transparent block text-left md:text-right mb-[7px] pt-[7px] text-sm md:text-base">
            Proporcione los dígitos de la imagen<span className="text-red-600">*</span>:
          </span>
          <input
            name="ctl00$MainContent$TxtCaptchaNumbers"
            type="text"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            disabled={isPending}
            maxLength={5}
            className="text-neutral-600 shadow-[rgba(0,0,0,0.075)_0px_1px_1px_0px_inset] box-border caret-transparent block h-[39px] w-full border border-stone-300 px-3 py-1.5 rounded-bl rounded-br rounded-tl rounded-tr border-solid focus:outline-none focus:ring-2 focus:ring-pink-950 focus:border-transparent disabled:opacity-50"
          />
        </div>
        <div className="relative box-border caret-transparent float-none min-h-px w-full px-[15px] md:float-left md:w-3/12 md:pl-[15px]">
          <br className="box-border caret-transparent hidden md:block" />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="text-white bg-pink-950 box-border caret-transparent block w-full md:w-auto md:float-right text-center text-nowrap align-middle border-pink-950 px-[25px] py-2.5 rounded-[3px] border-solid hover:opacity-80 disabled:opacity-50 cursor-pointer text-sm md:text-base"
          >
            {isPending ? "Verificando..." : "Verificar CFDI"}
          </button>
        </div>
        <div className="relative box-border caret-transparent float-none min-h-px w-auto px-[15px] md:float-left md:w-3/12"></div>
      </div>
      {error && (
        <div className="text-red-600 text-sm mt-2 px-[15px]">
          Error: {error.message}
        </div>
      )}
    </div>
  );
};
