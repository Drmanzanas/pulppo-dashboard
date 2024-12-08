'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Heading from '../ui/Heading';

const CustomBarChart = ({
  data,
  title,
  loading,
}: {
  data: { label: string; price: number; currency: string }[];
  title: string;
  loading: boolean;
}) => (
  <div className="w-90 h-96 relative">
    <Heading>{title}</Heading>
    {loading && (
      <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}
    <ResponsiveContainer width="99%" height="100%" aspect={3}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) =>
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: props.payload.currency || 'USD',
            }).format(value as number)
          }
        />
        <Bar dataKey="price" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default CustomBarChart;