'use client';

import React from 'react';
import TopPerformingAgents from '@/components/agents/TopPerformingAgents';
import TopAgentCard from '@/components/agents/TopAgentCard';
import AllAgentsTable from '@/components/agents/AllAgentsTable';

const AgentsTab: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <TopPerformingAgents />
        {/* <TopAgentCard /> */}
      </div>

      <div className="mb-6">
        {/* <AllAgentsTable /> */}
      </div>
    </div>
  );
};

export default AgentsTab;