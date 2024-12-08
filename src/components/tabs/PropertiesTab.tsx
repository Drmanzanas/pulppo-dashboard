'use client';

import PropertyTypePieChart from '@/components/charts/PieChart';
import RecentPropertiesTable from '../tables/RecentPropertiesTable';
import usePropertyTypes from 'src/hooks/usePropertyTypes';
import LocationFilterChart from '../LocationFilterChart';
import PriceRangesChartWithFilter from '../PriceRangeWithFilter';

const PropertiesTab = () => {
  const { propertyTypes, loading: loadingTypes } = usePropertyTypes();

  return (
    <div>
      <div>
        <RecentPropertiesTable />
      </div>
      <div className="mb-6">
        <PropertyTypePieChart
          data={propertyTypes}
          loading={loadingTypes}
          title="Properties Amount per Type"
        />
      </div>

      <div className="mb-6">
        <LocationFilterChart />
      </div>

      <div className="mb-6">
        <PriceRangesChartWithFilter
        />
      </div>

    </div>
  );
};

export default PropertiesTab;