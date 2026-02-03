export type PageHeaderProps = {
  variant: "logo" | "title";
  logoUrl?: string;
  logoAlt?: string;
  title?: string;
};

export const PageHeader = (props: PageHeaderProps) => {
  return (
    <div className="mb-6">
      {props.variant === "logo" && (
        <img
          alt={props.logoAlt || "Logo"}
          src={props.logoUrl || ""}
          className="h-auto max-w-[200px] md:max-w-[309px] w-full"
        />
      )}
      {props.variant === "title" && (
        <h1 className="text-xl md:text-2xl lg:text-3xl text-neutral-700 font-normal mt-4 md:mt-6 mb-6 md:mb-8">
          {props.title}
        </h1>
      )}
    </div>
  );
};
