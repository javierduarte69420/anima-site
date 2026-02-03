export type FooterColumnProps = {
  title: string;
  variant: string;
  description?: string;
  descriptionLinkText?: string;
  descriptionLinkUrl?: string;
  links: Array<{
    text: string;
    url: string;
    title?: string;
  }>;
  showSocialMedia?: boolean;
  socialMediaLinks?: Array<{
    platform: string;
    url: string;
    iconUrl: string;
    title: string;
  }>;
  phoneImageUrl?: string;
  phoneNumber?: string;
};

export const FooterColumn = (props: FooterColumnProps) => {
  return (
    <div
      className={`relative box-border caret-transparent float-left min-h-px w-full ${props.variant === "mb-[15px] px-[15px] md:mb-0" ? "md:w-3/12" : "md:w-3/12"} ${props.variant}`}
    >
      {props.variant === "mb-[15px] px-[15px] md:mb-0" ? (
        <>
          <input
            type="checkbox"
            name="toggle"
            className="bg-transparent box-border caret-transparent hidden leading-[normal] text-start mt-1 p-0"
          />
          <label className="relative text-sm font-bold box-border caret-transparent block leading-[50px] max-w-full min-h-[25px] mb-[5px] px-[5px] md:static md:text-lg md:inline-block md:leading-[25.7143px] md:min-h-0 md:px-0">
            <h5 className="font-semibold box-border caret-transparent leading-[19.8px] mt-[12.5px] mb-[18px]">
              {props.title}
            </h5>
          </label>
          <section className="box-border caret-transparent h-0 overflow-hidden md:h-auto md:overflow-visible">
            <div className="box-border caret-transparent">
              {props.description && (
                <p className="text-base box-border caret-transparent leading-6 my-[15px] px-5 md:px-0">
                  {props.description}{" "}
                  {props.descriptionLinkText && props.descriptionLinkUrl && (
                    <a
                      href={props.descriptionLinkUrl}
                      className="box-border caret-transparent underline"
                    >
                      {props.descriptionLinkText}
                    </a>
                  )}
                </p>
              )}
              <ul className="box-border caret-transparent inline-block list-none p-px">
                {props.links.map((link, index) => (
                  <li
                    key={index}
                    className={`box-border caret-transparent ${index > 0 ? "mt-2" : ""}`}
                  >
                    <a
                      href={link.url}
                      title={link.title}
                      className="text-base box-border caret-transparent h-[30px] leading-[22.8571px] pl-5 md:pl-0"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : (
        <>
          <h5 className="font-semibold box-border caret-transparent leading-[19.8px] mt-[12.5px] mb-[18px]">
            <a
              href={props.links[0]?.url}
              className="text-base box-border caret-transparent leading-[17.6px] underline"
            >
              {props.title}
            </a>
          </h5>
          {props.showSocialMedia && (
            <>
              <span className="relative text-base font-semibold box-border caret-transparent block float-left leading-6 min-h-px w-[41.6667%] mb-px pb-5 px-0.5 md:text-lg md:leading-[25.7143px] md:w-[91.6667%]">
                Síguenos en
              </span>
              <ul className="relative text-base font-semibold box-border caret-transparent float-left leading-6 list-none ml-[-5px] min-h-px w-[58.3333%] mb-px pb-5 px-0.5 md:text-lg md:leading-[25.7143px] md:w-[91.6667%]">
                {props.socialMediaLinks?.map((social, index) => (
                  <li
                    key={index}
                    className={`text-base box-border caret-transparent inline-block leading-6 px-[5px] md:text-lg md:leading-[25.7143px] ${
                      index === 1
                        ? "mx-0.5"
                        : index === 2
                          ? "ml-0.5 mr-[5px]"
                          : index === 3
                            ? "mx-0.5"
                            : ""
                    }`}
                  >
                    <a
                      href={social.url}
                      title={social.title}
                      className="text-blue-800 text-base box-border caret-transparent leading-6 underline md:text-lg md:leading-[25.7143px] hover:text-indigo-400 hover:border-indigo-400"
                    >
                      <img
                        alt={social.platform}
                        src={social.iconUrl}
                        className="text-base box-border caret-transparent leading-6 md:text-lg md:leading-[25.7143px]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="text-base box-border caret-transparent leading-6 list-none ml-[-5px] mb-[12.5px] pl-0 md:text-lg md:leading-[25.7143px]">
                <li className="text-base box-border caret-transparent inline-block leading-6 px-[5px] md:text-lg md:leading-[25.7143px]">
                  <div className="text-base box-border caret-transparent leading-6 w-full md:text-lg md:leading-[25.7143px]">
                    <a
                      href={`tel://${props.phoneNumber}`}
                      className="text-blue-800 text-base box-border caret-transparent leading-6 underline md:text-lg md:leading-[25.7143px] hover:text-indigo-400 hover:border-indigo-400"
                    >
                      <img
                        src={props.phoneImageUrl}
                        href="/"
                        alt="logo 079"
                        className="text-base box-border caret-transparent leading-6 w-full md:text-lg md:leading-[25.7143px]"
                      />
                    </a>
                  </div>
                </li>
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};
