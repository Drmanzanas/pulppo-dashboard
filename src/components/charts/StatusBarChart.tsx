'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type StatusCounts = {
  published: number;
  cancelled: number;
};

const StatusBarChart: React.FC = () => {
  const [statusCounts, setStatusCounts] = useState<StatusCounts | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStatusCounts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/properties/status');
      const data = await response.json();
      setStatusCounts(data);
    } catch (error) {
      console.error('Error fetching status counts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStatusCounts();
  }, []);

  const chartData = statusCounts
    ? [
        { status: 'Published', count: statusCounts.published, fill: '#4caf50' },
        { status: 'Cancelled', count: statusCounts.cancelled, fill: '#f44336' },
      ]
    : [];

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" isAnimationActive={true}>
            {chartData.map((entry, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey="count"
                fill={entry.fill}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusBarChart;