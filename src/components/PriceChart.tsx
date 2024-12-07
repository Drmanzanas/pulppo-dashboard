import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type ChartProps = {
  data: {
    type: string;
    listing: { price: { price: number } };
  }[];
};

export default function PriceChart({ data }: ChartProps) {
  const chartData = data.map((item) => ({
    type: item.type,
    price: item.listing?.price?.price || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="price" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}