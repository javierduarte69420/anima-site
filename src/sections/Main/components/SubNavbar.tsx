import { SubNavbarToggle } from "@/sections/Main/components/SubNavbarToggle";

export const SubNavbar = () => {
  return (
    <nav className="fixed text-sm md:text-base bg-[#4a1622] box-border caret-transparent h-auto leading-[22.8571px] min-h-14 md:min-h-16 w-full z-[1029] mt-16 md:mt-18 top-0 left-0 right-0">
      <div className="box-border caret-transparent w-full max-w-[1170px] mx-auto px-[15px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-base before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[22.8571px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-base after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[22.8571px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
        <div className="box-border caret-transparent float-none ml-[-15px] mr-[-15px] md:float-left md:mx-0 before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:table before:text-base before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[22.8571px] before:list-outside before:list-disc before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-700 after:table after:text-base after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[22.8571px] after:list-outside after:list-disc after:pointer-events-auto after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
          <SubNavbarToggle />
          <a
            href="/"
            className="text-white text-lg md:text-xl font-light box-border caret-transparent flex items-center h-14 md:h-16 leading-[25px] uppercase px-[15px] md:ml-[-15px]"
          >
            FACTURA ELECTRÓNICA
          </a>
        </div>
      </div>
    </nav>
  );
};
