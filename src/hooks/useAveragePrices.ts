import { useState, useEffect } from 'react';

type AveragePrice = {
  country: string;
  city: string;
  currency: string;
  state: string;
  _id: {
    country?: string;
    state?: string;
    city?: string;
  };
  averagePrice: number;
};

type UseAveragePricesReturn = {
  data: AveragePrice[];
  loading: boolean;
  error: string | null;
  setFilters: (filters: { countryId?: string | null; stateId?: string | null; cityId?: string | null, currency?: string | null }) => void;
};

const useAveragePrices = (): UseAveragePricesReturn => {
  const [data, setData] = useState<AveragePrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ countryId?: string | null; stateId?: string | null; cityId?: string | null, currency?: string | null}>({});

  useEffect(() => {
    const fetchAveragePrices = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({
          ...(filters.countryId && { countryId: filters.countryId }),
          ...(filters.stateId && { stateId: filters.stateId }),
          ...(filters.cityId && { cityId: filters.cityId }),
          ...(filters.currency && { currency: filters.currency }),
        }).toString();

        const response = await fetch(`/api/properties/average-price?${query}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data || []); 
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAveragePrices();
  }, [filters]);

  return {
    data,
    loading,
    error,
    setFilters,
  };
};

export default useAveragePrices;