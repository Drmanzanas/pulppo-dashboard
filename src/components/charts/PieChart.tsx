'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import Heading from '../ui/Heading';
import DropdownMultiSelect from '../ui/DropdownMultiSelect.tsx';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56'];

const PropertyTypePieChart = ({
  data,
  title,
  loading,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]; 
  title: string; 
  loading: boolean; 
}) => {
  const options = data.map((item) => ({
    value: item._id || 'Unknown',
    label: item._id || 'Unknown',
  }));

  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    options.slice(0, 2).map((option) => option.value)
  );

  useEffect(() => {
    if (initialLoad && options.length > 0) {
      setSelectedTypes(
        options.slice(0, 2).map((option) => option.value)
      );
      setInitialLoad(false);
    }
  }, [options, initialLoad]);
  
  const chartData = data
    .filter((item) => selectedTypes.includes(item._id || 'Unknown')) 
    .map((item) => ({
      name: item._id || 'Unknown',
      count: item.count,
    }));

  return (
    <div>
      <Heading>{title}</Heading>

      <DropdownMultiSelect
        options={options}
        selectedValues={selectedTypes}
        onChange={setSelectedTypes}
        placeholder="Select Property Types"
        disabled={loading}
      />

      {loading ? (
        <div className="flex justify-center items-center h-72">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name }) => name}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PropertyTypePieChart;