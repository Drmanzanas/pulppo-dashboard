import React from 'react';

const TableText = ({
  primary,
  secondary,
  tooltip,
}: {
  primary: string;
  secondary?: string; 
  tooltip?: string;
}) => (
  <div className="flex flex-col">
    <div
      className="text-sm font-semibold text-gray-800 truncate"
      title={tooltip || primary}
    >
      {primary}
    </div>
    {secondary && (
      <div className="text-xs text-gray-500">{secondary}</div>
    )}
  </div>
);

export default TableText;