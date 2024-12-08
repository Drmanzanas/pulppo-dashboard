'use client';

import { useState } from 'react';

type DropdownMultiSelectProps = {
  options: { value: string; label: string }[]; 
  selectedValues: string[]; 
  onChange: (values: string[]) => void; 
  placeholder?: string; 
  disabled?: boolean; 
};

const DropdownMultiSelect: React.FC<DropdownMultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select...',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleCheckboxChange = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((item) => item !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-md bg-white shadow-sm text-left focus:outline-none ${
          disabled ? 'cursor-not-allowed bg-gray-100' : ''
        }`}
        disabled={disabled}
      >
        {selectedValues.length > 0
          ? `${selectedValues.length} selected`
          : placeholder}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-black"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                disabled={disabled}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMultiSelect;