import { NavbarToggle } from "@/sections/Header/components/NavbarToggle";
import { NavbarLogo } from "@/sections/Header/components/NavbarLogo";
import { NavbarMenu } from "@/sections/Header/components/NavbarMenu";

export const Navbar = () => {
  return (
    <nav
      role="navigation"
      className="fixed text-sm md:text-base bg-[#691b32] box-border caret-transparent h-auto leading-[22.8571px] min-h-16 md:min-h-18 z-[1030] top-0 left-0 right-0 w-full"
    >
      <div className="box-border caret-transparent w-full max-w-[1170px] mx-auto px-[15px]">
        <div className="box-border caret-transparent flex items-center justify-between h-16 md:h-18">
          <NavbarLogo />
          <NavbarMenu />
        </div>
      </div>
    </nav>
  );
};
