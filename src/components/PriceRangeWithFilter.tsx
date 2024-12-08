'use client';

import { useState } from 'react';
import FilterDropdown from '@/components/ui/FilterDropdown';
import usePriceRanges from 'src/hooks/usePriceRanges';
import Heading from '@/components/ui/Heading';
import PriceRangesBarChart from './charts/PriceRangesChart';

const PriceRangesChartWithFilter = () => {
  const { data: priceRanges, loading: loadingPriceRanges, setCurrency } = usePriceRanges();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    setCurrency(currency); 
  };

  return (
    <div className="mb-6">
      <Heading>Amount of Properties Published Price Range </Heading>
      <div className="flex justify-end mb-4">
        <FilterDropdown
          options={[
            { value: 'USD', label: 'USD' },
            { value: 'MXN', label: 'MXN' },
          ]}
          onChange={handleCurrencyChange}
          label="Currency"
          loading={loadingPriceRanges}
        />
      </div>
      <PriceRangesBarChart
        data={priceRanges}
        loading={loadingPriceRanges}
        title={`Price Ranges (${selectedCurrency})`}
      />
    </div>
  );
};

export default PriceRangesChartWithFilter;