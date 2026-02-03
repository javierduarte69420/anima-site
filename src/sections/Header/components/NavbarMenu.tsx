export const NavbarMenu = () => {
  return (
    <div className="box-border caret-transparent flex items-center">
      <ul className="box-border caret-transparent flex list-none m-0 p-0 gap-1">
        <li className="relative box-border caret-transparent">
          <a
            href="https://www.gob.mx/tramites"
            className="relative text-white box-border caret-transparent flex items-center h-16 md:h-18 leading-[25px] px-4 hover:text-orange-200 hover:bg-white/20"
          >
            Trámites
          </a>
        </li>
        <li className="relative box-border caret-transparent">
          <a
            href="https://www.gob.mx/gobierno"
            className="relative text-white box-border caret-transparent flex items-center h-16 md:h-18 leading-[25px] px-4 hover:text-orange-200 hover:bg-white/20"
          >
            Gobierno
          </a>
        </li>
        <li className="relative box-border caret-transparent">
          <a
            href="https://www.gob.mx/busqueda"
            className="relative text-white box-border caret-transparent flex items-center justify-center h-16 md:h-18 leading-[25px] px-4 hover:text-orange-200 hover:bg-white/20"
            title="Búsqueda"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <circle 
                cx="8" 
                cy="8" 
                r="6.5" 
                stroke="currentColor" 
                strokeWidth="2"
                fill="none"
              />
              <line 
                x1="13" 
                y1="13" 
                x2="18" 
                y2="18" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
};
