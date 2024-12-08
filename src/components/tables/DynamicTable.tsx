'use client';

import React from 'react';
import Heading from '../ui/Heading';

const DynamicTable = ({
  data,
  columns,
  loading,
  title,
  tableConfig,
}: {
  data: any[];
  columns: {
    header: string;
    key: string;
    render?: (value: any, row: any) => React.ReactNode;
    renderHeader?: () => React.ReactNode;
  }[];
  loading: boolean;
  title: string;
  tableConfig?: {
    enableScroll?: boolean;
    minWidth?: string;
    fixedHeight?: string;
  };
}) => {
  const renderSkeleton = () => (
    <div
      className={`relative ${
        tableConfig?.enableScroll ? 'overflow-x-auto' : ''
      }`}
    >
      <div
        className={`overflow-y-auto ${
          tableConfig?.fixedHeight ? `h-[${tableConfig.fixedHeight}]` : ''
        }`}
      >
        <table
          className={`w-full bg-white border border-gray-300 rounded-md ${
            tableConfig?.minWidth || ''
          }`}
        >
          <thead>
            <tr className="bg-gray-200 text-left">
              {columns.map((column, index) => (
                <th key={index} className="py-2 px-4">
                  <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {columns.map((_, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`} className="py-2 px-4">
                    <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-white border rounded-lg">
      <Heading>{title}</Heading>
      {loading ? (
        renderSkeleton()
      ) : data.length > 0 ? (
        <div
          className={`relative ${
            tableConfig?.enableScroll ? 'overflow-x-auto' : ''
          }`}
        >
          <div
            className={`overflow-y-auto ${
              tableConfig?.fixedHeight ? `h-[${tableConfig.fixedHeight}]` : ''
            }`}
          >
            <table
              className={`w-full bg-white border border-gray-300 rounded-md ${
                tableConfig?.minWidth || ''
              }`}
            >
              <thead>
                <tr className="bg-gray-200 text-left">
                  {columns.map((column) => (
                    <th key={column.header} className="py-2 px-4">
                      {column.renderHeader
                        ? column.renderHeader()
                        : column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={row.id || rowIndex} className="border-b">
                    {columns.map((column, colIndex) => (
                      <td key={`${rowIndex}-${colIndex}`} className="py-2 px-4">
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No data available.</p>
      )}
    </div>
  );
};

export default DynamicTable;