export const Breadcrumb = () => {
  return (
    <ol className="box-border caret-transparent list-none mb-[25px] pl-0 py-[35px] rounded-bl rounded-br rounded-tl rounded-tr">
      <li className="box-border caret-transparent inline-block">
        <a
          href="http://www.gob.mx/"
          className="text-neutral-700 box-border caret-transparent hover:underline"
        >
          <i className="text-sm font-normal box-border caret-transparent leading-[14px] font-icogobmx before:accent-auto before:box-border before:caret-transparent before:text-neutral-700 before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[14px] before:list-outside before:list-none before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:border-separate before:font-icogobmx"></i>
        </a>
      </li>
      <li className="box-border caret-transparent inline-block before:accent-auto before:box-border before:caret-transparent before:text-neutral-600 before:text-[10px] before:not-italic before:normal-nums before:font-light before:tracking-[normal] before:leading-[14.2857px] before:list-outside before:list-none before:pointer-events-auto before:text-start before:indent-[0px] before:normal-case before:visible before:px-[5px] before:border-separate before:font-icogobmx">
        <a
          href="#"
          className="text-neutral-700 box-border caret-transparent hover:underline"
        >
          Inicio
        </a>
      </li>
    </ol>
  );
};
