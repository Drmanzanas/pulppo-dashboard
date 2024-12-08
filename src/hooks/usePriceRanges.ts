'use client';

import { useState, useEffect } from 'react';

type PriceRangeData = {
  range: string;
  count: number;
};

const usePriceRanges = () => {
  const [data, setData] = useState<PriceRangeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const fetchPriceRanges = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/properties/price-ranges?currency=${currency}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching price ranges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceRanges();
  }, [currency]);

  return { data, loading, setCurrency };
};

export default usePriceRanges;