export type VerificationTabsProps = {
  activeTab: 'folio-fiscal' | 'archivo-xml';
  onTabChange: (tab: 'folio-fiscal' | 'archivo-xml') => void;
};

export const VerificationTabs = (props: VerificationTabsProps) => {
  return (
    <div className="flex items-center gap-8 mb-6">
      <div className="flex items-center gap-2">
        <input
          type="radio"
          name="tabs"
          id="folio-fiscal"
          checked={props.activeTab === 'folio-fiscal'}
          onChange={() => props.onTabChange('folio-fiscal')}
          className="w-4 h-4 accent-pink-950 cursor-pointer"
        />
        <label htmlFor="folio-fiscal" className="text-neutral-700 cursor-pointer select-none">
          Consulta por Folio Fiscal
        </label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="radio"
          name="tabs"
          id="archivo-xml"
          checked={props.activeTab === 'archivo-xml'}
          onChange={() => props.onTabChange('archivo-xml')}
          className="w-4 h-4 accent-pink-950 cursor-pointer"
        />
        <label htmlFor="archivo-xml" className="text-neutral-700 cursor-pointer select-none">
          Consulta por archivo XML
        </label>
      </div>
    </div>
  );
};
