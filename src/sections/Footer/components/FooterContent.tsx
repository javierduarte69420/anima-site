import { FooterLogo } from "@/sections/Footer/components/FooterLogo";
import { FooterColumn } from "@/sections/Footer/components/FooterColumn";

export const FooterContent = () => {
  return (
    <div className="box-border caret-transparent pb-8 before:accent-auto before:box-border before:caret-transparent before:text-white before:table before:text-lg before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[25.7143px] before:list-outside before:list-disc before:pointer-events-auto before:text-left before:indent-[0px] before:normal-case before:visible before:border-separate before:font-noto_sans after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-white after:table after:text-lg after:not-italic after:normal-nums after:font-light after:tracking-[normal] after:leading-[25.7143px] after:list-outside after:list-disc after:pointer-events-auto after:text-left after:indent-[0px] after:normal-case after:visible after:border-separate after:font-noto_sans">
      <FooterLogo />
      <FooterColumn
        title="Enlaces"
        variant="mb-[15px] px-[15px] md:mb-0"
        links={[
          {
            text: "Participa",
            url: "https://participa.gob.mx/",
            title: "Enlace abre en ventana nueva",
          },
          {
            text: "Marco Jurídico",
            url: "http://www.ordenjuridico.gob.mx/",
            title: "Enlace abre en ventana nueva",
          },
          {
            text: "Plataforma Nacional de Transparencia",
            url: "https://consultapublicamx.plataformadetransparencia.org.mx/vut-web/faces/view/consultaPublica.xhtml#inicio",
            title: "Enlace abre en ventana nueva",
          },
          {
            text: "Transparencia para el pueblo",
            url: "https://transparencia.gob.mx/",
            title: "Enlace abre en ventana nueva",
          },
          {
            text: "Alerta",
            url: "https://alertadores.funcionpublica.gob.mx/",
            title: "Enlace abre en ventana nueva",
          },
        ]}
      />
      <FooterColumn
        title="¿Qué es gob.mx?"
        variant="mb-[15px] px-[15px] md:mb-0"
        description="Es el portal único de trámites, información y participación ciudadana."
        descriptionLinkText="Leer más"
        descriptionLinkUrl="https://www.gob.mx/que-es-gobmx"
        links={[
          { text: "Portal de datos abiertos", url: "https://datos.gob.mx/" },
          {
            text: "Declaración de accesibilidad",
            url: "https://www.gob.mx/accesibilidad",
          },
          {
            text: "Términos y Condiciones",
            url: "https://www.gob.mx/terminos",
          },
        ]}
      />
      <FooterColumn
        title="Denuncia contra servidores públicos"
        variant="relative text-base box-border caret-transparent float-left leading-6 min-h-px w-full my-[15px] px-[25px] md:text-lg md:leading-[25.7143px] md:w-3/12 md:my-0 md:px-[15px]"
        links={[
          {
            text: "Denuncia contra servidores públicos",
            url: "https://sidec.buengobierno.gob.mx/#!/",
          },
        ]}
        showSocialMedia={true}
        socialMediaLinks={[
          {
            platform: "Facebook",
            url: "https://www.facebook.com/gobmexico",
            iconUrl:
              "https://c.animaapp.com/ml5pbkbosP02ek/assets/facebook.png",
            title: "enlace a facebook abre en una nueva ventana",
          },
          {
            platform: "Twitter",
            url: "https://twitter.com/GobiernoMX",
            iconUrl: "https://c.animaapp.com/ml5pbkbosP02ek/assets/twitter.png",
            title: "Enlace a twitter abre en una nueva ventana",
          },
          {
            platform: "Instagram",
            url: "https://www.instagram.com/gobmexico/",
            iconUrl:
              "https://c.animaapp.com/ml5pbkbosP02ek/assets/instagram.png",
            title: "Enlace a instagram abre en una nueva ventana",
          },
          {
            platform: "Youtube",
            url: "https://www.youtube.com/@gobiernodemexico",
            iconUrl: "https://c.animaapp.com/ml5pbkbosP02ek/assets/youtube.png",
            title: "Enlace a youtube abre en una nueva ventana",
          },
        ]}
        phoneImageUrl="https://c.animaapp.com/ml5pbkbosP02ek/assets/079.png"
        phoneNumber="+079"
      />
    </div>
  );
};
