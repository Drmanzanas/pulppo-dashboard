import { useState } from 'react';

type FilterDropdownProps = {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  label: string;
  loading?: boolean;
  disabled?: boolean;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  onChange,
  label,
  loading = false,
  disabled = false,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div>
      <label className="block text-black font-semibold mb-2">{label}</label>
      <select
        className={`w-full px-4 py-2 border border-gray-300 rounded-md text-black ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
        value={selectedValue}
        onChange={handleChange}
        disabled={disabled || loading}
      >
        <option value="" disabled>
          {loading ? 'Loading...' : 'All'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;