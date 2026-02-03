export const SubNavbarToggle = () => {
  return (
    <button
      type="button"
      className="relative bg-transparent caret-transparent block float-right text-center mr-[15px] mt-5 mb-1.5 px-2.5 py-[9px] rounded-bl rounded-br rounded-tl rounded-tr md:hidden"
    >
      <span className="font-normal bg-white box-border caret-transparent block h-0.5 leading-4 w-[22px] rounded-[1px] font-icogobmx"></span>
      <span className="font-normal bg-white box-border caret-transparent block h-0.5 leading-4 w-[22px] mt-1 rounded-[1px] font-icogobmx"></span>
      <span className="font-normal bg-white box-border caret-transparent block h-0.5 leading-4 w-[22px] mt-1 rounded-[1px] font-icogobmx"></span>
    </button>
  );
};
