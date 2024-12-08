'use client';

import PropertyTypePieChart from '@/components/charts/PieChart';
import RecentPropertiesTable from '../tables/RecentPropertiesTable';
import usePropertyTypes from 'src/hooks/usePropertyTypes';
import useRecentProperties from 'src/hooks/useRecentProperties';
import LocationFilterChart from '../LocationFilterChart';
import PriceRangesChartWithFilter from '../PriceRangeWithFilter';

const PropertiesTab = () => {
  const { propertyTypes, loading: loadingTypes } = usePropertyTypes();
  const { recentProperties, loading: loadingRecent } = useRecentProperties();

  return (
    <div>
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

      <div>
        <RecentPropertiesTable
          data={recentProperties}
          loading={loadingRecent}
          title="Recent Properties"
        />
      </div>
    </div>
  );
};

export default PropertiesTab;