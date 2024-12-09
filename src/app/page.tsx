'use client';

import Tabs from '@/components/ui/Tabs';
import Title from '@/components/ui/Title';
import PropertiesTab from '@/components/tabs/PropertiesTab';
import AgentsTab from '@/components/tabs/AgentsTab';

const DashboardPage: React.FC = () => {
  const tabs = [
    { label: 'Properties', key: 'properties' },
    { label: 'Agents', key: 'agents' },
  ];

  return (
    <div className="container mx-auto p-6">
      <Title>Dashboard</Title>
      <Tabs tabs={tabs}>
        <PropertiesTab />
        <AgentsTab />
      </Tabs>
    </div>
  );
};

export default DashboardPage;