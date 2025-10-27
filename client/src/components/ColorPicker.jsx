import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react';

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: 'Blue', value: '#3882F6' },
    { name: 'Red', value: '#F53855' },
    { name: 'Green', value: '#34A853' },
    { name: 'Purple', value: '#8A2BE2' },
    { name: 'Orange', value: '#FB8C00' },
    { name: 'Teal', value: '#008080' },
    { name: 'Pink', value: '#FF69B4' },
    { name: 'Brown', value: '#A52A2A' },
    { name: 'Gray', value: '#808080' },
    { name: 'Black', value: '#000000' },
    { name: 'Yellow', value: '#F9AB00' },
    { name: 'Cyan', value: '#00FFFF' },
    { name: 'Magenta', value: '#FF00FF' },
    { name: 'Lime', value: '#00FF00' },
    { name: 'Maroon', value: '#800000' },
    { name: 'Navy', value: '#000080' },
    { name: 'Olive', value: '#808000' },
    { name: 'Silver', value: '#C0C0C0' },
    { name: 'Gold', value: '#FFD700' },
    { name: 'Coral', value: '#FF7F50' },
    { name: 'Turquoise', value: '#40E0D0' },
    { name: 'Violet', value: '#EE82EE' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} /> <span className="max-sm:hidden">Colors</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] overflow-auto max-h-80 p-2 grid grid-cols-4 gap-3">
          {colors.map((color) => (
            <div
              key={color.value}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor === color.value
                    ? 'border-purple-600 scale-110'
                    : 'border-gray-200 group-hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.value }}
              >
                {selectedColor === color.value && (
                  <Check className="absolute inset-0 m-auto text-white size-5 drop-shadow-md" />
                )}
              </div>
              <p className="text-xs mt-1 text-gray-700 font-medium">{color.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
