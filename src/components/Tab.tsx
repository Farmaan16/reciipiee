import { FC } from "react";

type TabProps = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
  tabName: string;
};

const Tab: FC<TabProps> = ({ activeTab, setActiveTab, tabName }) => {
  return (
   
      <button
      role="tab"
      aria-selected={activeTab === tabName}
      type="button"
      className={`border border-black w-32 h-12 cursor-pointer capitalize ${
        activeTab === tabName && "bg-black text-white"
      }`}
      onClick={() => setActiveTab(tabName)}
    >
      {tabName}
    </button>
  );
};

export default Tab;
