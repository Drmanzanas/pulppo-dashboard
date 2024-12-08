'use client';

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RecentPropertiesTable = ({
  data,
  loading,
  title
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  loading: boolean;
  title?: string
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : data.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
          {data.map((property, index) => (
            <tr key={property.id || index} className="border-b">
              <td className="py-2 px-4">{property.name}</td>
              <td className="py-2 px-4">{property.price}</td>
              <td className="py-2 px-4">{property.location}</td>
              <td className="py-2 px-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    property.status.last === 'Published'
                      ? 'bg-green-100 text-green-800'
                      : property.status.last === 'Cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {property.status.last}
                </span>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No recent properties to display.</p>
      )}
    </div>
  );
};

export default RecentPropertiesTable;