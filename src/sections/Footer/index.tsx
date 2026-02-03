import { FooterContent } from "@/sections/Footer/components/FooterContent";

export const Footer = () => {
  return (
    <footer className="text-white bg-pink-950 box-border caret-transparent min-h-14 text-left w-screen">
      <div className="box-border caret-transparent w-full">
        <div className="box-border caret-transparent w-full max-w-[1170px] mx-auto px-4 md:px-[15px] before:accent-auto before:box-border before:caret-transparent before:text-white before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-left before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-white after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-left after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
          <FooterContent />
        </div>
      </div>
    </footer>
  );
};
