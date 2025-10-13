import React from 'react';

interface TabsSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsSection: React.FC<TabsSectionProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['overview', 'interviews'];
  
  return (
    <div className="mb-6 border-b border-slate-200">
      <div className="flex gap-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 font-medium capitalize transition-colors relative ${
              activeTab === tab 
                ? 'text-blue-600' 
                : 'text-slate-100 hover:text-slate-400'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsSection;
