'use client';

import StatusBarChart from '@/components/charts/StatusBarChart';
import TrendGraph from '@/components/charts/TrendGraph';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Published vs Cancelled Properties</h2>
        <StatusBarChart />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Property Trends</h2>
        <TrendGraph />
      </div>
    </div>
  );
};

export default DashboardPage;