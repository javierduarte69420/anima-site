export const LoadingIndicator = () => {
  return (
    <div role="status" className="box-border caret-transparent hidden">
      <br className="box-border caret-transparent" />
      <div className="box-border caret-transparent"></div>
      <div className="box-border caret-transparent">
        <img
          src="https://c.animaapp.com/ml5pbkbosP02ek/assets/ajax-loader.gif"
          className="box-border caret-transparent float-left mt-[5px]"
        />
        <h2 className="text-base font-semibold box-border caret-transparent float-left leading-[21.44px] w-[200px] mt-[25px] mb-[43.33px] font-patria">
          Buscando CFDI...
        </h2>
      </div>
    </div>
  );
};
