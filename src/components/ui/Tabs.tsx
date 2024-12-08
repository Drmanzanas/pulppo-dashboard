'use client';

import React, { useState } from 'react';

interface Tab {
  label: string;
  key: string;
}

interface TabsProps {
  tabs: Tab[];
  children: React.ReactNode;
  defaultActiveTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, children, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0].key);

  return (
    <div>
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 ${
              activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-500 font-bold'
                : 'text-gray-500 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child) && tabs[index].key === activeTab
            ? child
            : null
        )}
      </div>
    </div>
  );
};

export default Tabs;