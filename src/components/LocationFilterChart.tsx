'use client';

import { useEffect, useState } from 'react';
import CustomBarChart from '@/components/charts/BarChart';
import FilterDropdown from '@/components/ui/FilterDropdown';
import Heading from '@/components/ui/Heading';
import useAveragePrices from 'src/hooks/useAveragePrices';
import useFilters from 'src/hooks/useLocationFilters';

const LocationFilterChart = () => {
  const { data: averagePrices, loading, setFilters } = useAveragePrices();
  const { 
    countries, 
    states, 
    cities, 
    loading: filtersLoading, 
    fetchStates, 
    fetchCities, 
    fetchCountries 
  } = useFilters();

  const [country, setCountry] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);

  
  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (countries.length > 0 && !country) {
      const firstCountry = countries[0].id;
      handleFilterChange('country', firstCountry);
    }
  }, [countries]);

  const handleFilterChange = (field: 'country' | 'state' | 'city' | 'currency', value: string) => {
    if (field === 'country') {
      setCountry(value || null); 
      setState(null); 
      setCity(null); 
      fetchStates(value); 
    } else if (field === 'state') {
      setState(value || null); 
      setCity(null); 
      fetchCities(value); 
    } else if (field === 'city') {
      setCity(value || null); 
    } else if (field === 'currency') {
      setCurrency(value || null); 
    }

    
    setFilters({
      countryId: country, 
      stateId: state, 
      cityId: city,
      currency,
      [`${field}Id`]: value || null, 
    });
  };

  return (
    <div>
      <Heading>Average Published Price by Location</Heading>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <FilterDropdown
          options={countries.map((c) => ({ value: c.id, label: c.name }))}
          onChange={(value) => handleFilterChange('country', value)}
          label="Country"
        />
        <FilterDropdown
          options={[
            { value: '', label: 'All States' }, 
            ...states.map((s) => ({ value: s.id, label: s.name })),
          ]}
          onChange={(value) => handleFilterChange('state', value)}
          label="State"
          loading={filtersLoading || !country}
          disabled={!country}
        />
        <FilterDropdown
          options={[
            { value: '', label: 'All Cities' }, 
            ...cities.map((c) => ({ value: c.id, label: c.name })),
          ]}
          onChange={(value) => handleFilterChange('city', value)}
          label="City"
          loading={filtersLoading || !state}
          disabled={!state}
        />
      </div>
      <div className="grid grid-cols-1 mb-4">
        <CustomBarChart
          data={averagePrices.map((item) => ({
            label: item?.currency,
            price: item.averagePrice,
            currency: item?.currency,
          }))}
          loading={loading}
          title=""
        />
      </div>
    </div>
  );
};

export default LocationFilterChart;