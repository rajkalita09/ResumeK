import { Check, Layout } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const templates = [
    { id: 'classic', name: 'Classic', preview: "A classic resume template with a clean and professional layout." },
    { id: 'modern', name: 'Modern', preview: "A modern resume template with a sleek and contemporary design." },
    { id: 'minimal-image', name: 'Minimal Image', preview: "A minimal resume template that includes a profile image for a personal touch." },
    { id: 'minimal', name: 'Minimal', preview: "A minimal resume template with a focus on simplicity and clarity." },
  ];

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-yellow-600 bg-gradient-to-br from-yellow-50 to-yellow-100 ring-yellow-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout className="size-4" /> <span className="max-sm:hidden">Templates</span>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] overflow-auto max-h-80"
        >
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-4 hover:bg-gray-100 cursor-pointer border-l-4 ${
                selectedTemplate === template.id
                  ? 'border-yellow-500 bg-yellow-100'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-gray-500 italic">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
