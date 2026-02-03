import React from "react";

export type XMLFormFieldsProps = {
  variant: string;
  imageUrl?: string;
  fileInputPlaceholder?: string;
  buttonText?: string;
  captchaLabel?: string;
  captchaInputName?: string;
  submitButtonName?: string;
  submitButtonValue?: string;
};

// Generate random 5-digit captcha number
const generateCaptcha = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const XMLFormFields = (props: XMLFormFieldsProps) => {
  const [captchaNumber, setCaptchaNumber] = React.useState(generateCaptcha());

  if (props.variant === "file-upload") {
    return (
      <div className="box-border caret-transparent relative float-none min-h-px w-auto px-[15px] md:float-left md:w-9/12">
        <div className="box-border caret-transparent">
          <div className="box-border caret-transparent ml-[-15px] mr-[-15px] mb-[15px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
            <span className="box-border caret-transparent block mb-[5px]">
              Archivo XML{" "}
              <small className="text-[13.86px] box-border caret-transparent leading-[19.8px]">
                *
              </small>
              :
            </span>
            <div className="box-border caret-transparent flex">
              <input
                type="text"
                placeholder={
                  props.fileInputPlaceholder || "Seleccionar Archivo..."
                }
                className="text-neutral-600 bg-zinc-100 shadow-[rgba(0,0,0,0.075)_0px_1px_1px_0px_inset] box-border caret-transparent block basis-[0%] grow h-[39px] w-full border border-stone-300 px-3 py-1.5 rounded-bl rounded-br rounded-tl rounded-tr border-solid"
              />
              <label className="text-pink-950 items-center bg-white shadow-[rgb(97,18,50)_0px_0px_0px_0px] box-border caret-transparent flex h-full max-w-full text-center text-nowrap align-middle border-pink-950 ml-[5px] px-[25px] py-[5px] rounded-[3px] border-2 border-solid hover:text-white hover:bg-pink-950">
                {props.buttonText || "Buscar"}
              </label>
            </div>
            <small className="text-red-700 text-[13.86px] box-border caret-transparent hidden leading-[19.8px] mt-[5px]">
              Este campo es obligatorio
            </small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="box-border caret-transparent ml-[-15px] mr-[-15px] mb-[15px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
      <div className="box-border caret-transparent">
        <div className="relative box-border caret-transparent float-none min-h-px w-auto pr-[15px] md:float-left md:w-[16.6667%]">
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
                <pattern id="mesh-xml" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                  <path d="M 0,1.5 L 3,1.5 M 1.5,0 L 1.5,3" stroke="#999" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mesh-xml)" />
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
        <div className="relative box-border caret-transparent float-none min-h-px w-auto px-[15px] md:float-left md:w-[33.3333%]">
          <span className="box-border caret-transparent block text-right mb-[7px] pt-[7px]">
            {props.captchaLabel || "Proporcione los dígitos de la imagen*:"}
          </span>
          <input
            name={props.captchaInputName}
            type="text"
            className="text-neutral-600 shadow-[rgba(0,0,0,0.075)_0px_1px_1px_0px_inset] box-border caret-transparent block h-[39px] w-full border border-stone-300 px-3 py-1.5 rounded-bl rounded-br rounded-tl rounded-tr border-solid"
          />
        </div>
        <div className="relative box-border caret-transparent float-none min-h-px w-auto pl-[15px] md:float-left md:w-3/12">
          <br className="box-border caret-transparent" />
          <input
            type="submit"
            name={props.submitButtonName}
            value={props.submitButtonValue || "Verificar CFDI"}
            className="text-white bg-pink-950 box-border caret-transparent block float-right opacity-65 text-center text-nowrap align-middle border-pink-950 px-[25px] py-2.5 rounded-[3px] border-solid"
          />
        </div>
        <div className="relative box-border caret-transparent float-none min-h-px w-auto px-[15px] md:float-left md:w-3/12"></div>
      </div>
    </div>
  );
};
