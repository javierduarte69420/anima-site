export type ResultActionsProps = {
  onNewSearch: () => void;
  onPrint: () => void;
};

export const ResultActions = (props: ResultActionsProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={props.onNewSearch}
        className="text-white bg-pink-950 box-border px-6 py-2.5 rounded hover:opacity-80"
      >
        Nueva Búsqueda
      </button>
      <button
        onClick={props.onPrint}
        className="text-pink-950 bg-white box-border px-6 py-2.5 rounded border-2 border-pink-950 hover:bg-pink-950 hover:text-white"
      >
        Imprimir
      </button>
    </div>
  );
};
