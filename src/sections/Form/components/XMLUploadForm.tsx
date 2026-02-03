import { XMLFormFields } from "@/sections/Form/components/XMLFormFields";

export const XMLUploadForm = () => {
  return (
    <div className="bg-white box-border caret-transparent mt-[15px] p-[25px] rounded-md">
      <input
        type="file"
        name="ctl00$MainContent$fileUploadXML"
        className="text-neutral-600 items-baseline shadow-[rgba(0,0,0,0.075)_0px_1px_1px_0px_inset] box-border caret-transparent hidden h-[39px] text-ellipsis text-nowrap w-full border border-stone-300 px-3 py-1.5 rounded-bl rounded-br rounded-tl rounded-tr border-solid"
      />
      <div className="box-border caret-transparent ml-[-15px] mr-[-15px] mb-[15px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
        <label className="font-bold box-border caret-transparent inline-block max-w-full text-right mb-[7px] pt-[7px]">
          A través de esta opción, usted podrá verificar si el comprobante fue
          certificado por el SAT{" "}
        </label>
        <br className="box-border caret-transparent" />
        <XMLFormFields variant="file-upload" />
        <div className="relative box-border caret-transparent float-none min-h-px w-auto px-[15px] md:float-left md:w-9/12"></div>
      </div>
      <br className="box-border caret-transparent" />
      <XMLFormFields
        variant=""
        imageUrl="https://c.animaapp.com/ml5pbkbosP02ek/assets/10.jpg"
        captchaInputName="ctl00$MainContent$TxtCaptchaNumbersXml"
        submitButtonName="ctl00$MainContent$BtnBusquedaXml"
        submitButtonValue="Verificar CFDI"
      />
      <div className="relative box-border caret-transparent float-none ml-[-15px] mr-[-15px] min-h-px w-auto mb-[15px] px-[15px] md:float-left md:w-full before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
        <div className="relative text-neutral-500 box-border caret-transparent float-left leading-[47px] min-h-px w-auto px-[15px] md:w-[66.6667%]">
          * Datos obligatorios
        </div>
      </div>
      <div className="box-border caret-transparent ml-[-15px] mr-[-15px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans"></div>
      <div className="box-border caret-transparent ml-[-15px] mr-[-15px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
        <div className="relative text-neutral-600 bg-red-100 box-border caret-transparent hidden float-none min-h-px text-center w-auto border-red-700 mb-[25px] rounded-bl rounded-br rounded-tl rounded-tr border-2 border-solid md:float-left md:w-full">
          <h5 className="font-semibold box-border caret-transparent leading-[19.8px] mx-2.5 my-5">
            <label className="font-bold box-border caret-transparent inline-block max-w-full mb-[5px]">
              El archivo es demasiado grande. Tamaño máximo: 6MB
            </label>
          </h5>
        </div>
      </div>
      <br className="box-border caret-transparent" />
      <div className="box-border caret-transparent mb-2.5 before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
        <div className="box-border caret-transparent float-right">
          <input
            type="hidden"
            name="ctl00$MainContent$strBusquedaXml"
            className="bg-transparent box-border caret-transparent hidden p-0"
          />
          <input
            type="button"
            value="Imprimir"
            className="text-pink-950 shadow-[rgb(97,18,50)_0px_0px_0px_0px] box-border caret-transparent hidden text-center text-nowrap align-middle border-pink-950 px-[25px] py-2.5 rounded-[3px] border-solid hover:text-white hover:bg-pink-950"
          />
        </div>
      </div>
      <br className="box-border caret-transparent" />
      <br className="box-border caret-transparent" />
      <br className="box-border caret-transparent" />
    </div>
  );
};
