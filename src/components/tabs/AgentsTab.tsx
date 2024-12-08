'use client';

import React from 'react';
import TopPerformingAgents from '@/components/agents/TopPerformingAgents';
import TopAgentCard from '@/components/agents/TopAgentCard';
import AllAgentsTable from '@/components/agents/AllAgentsTable';

const AgentsTab: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-3">
          <TopPerformingAgents />
        </div>
        <div className="col-span-1">
          <TopAgentCard />
        </div>
      </div>

      <div className="mb-6">
        <AllAgentsTable />
      </div>
    </div>
  );
};

export default AgentsTab;