'use client';

import PriceChart from '@/components/PriceChart';
import Table from '@/components/Table';
import { useEffect, useState } from 'react';


type MlsData = {
  _id: string;
  referenceCode: string;
  type: string;
  listing: { title: string; price: { price: number; currency: string } };
  agent: { firstName: string; lastName: string };
  pictures: { url: string }[];
  videos: { url: string }[];
};

export default function HomePage() {
  const [mlsData, setMlsData] = useState<MlsData[]>([]);

  useEffect(() => {
    fetch('/api/test-db')
      .then((res) => res.json())
      .then((data) => setMlsData(data.data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pulppo MLS Dashboard</h1>
      <PriceChart data={mlsData} />
      <Table data={mlsData} />
    </div>
  );
}