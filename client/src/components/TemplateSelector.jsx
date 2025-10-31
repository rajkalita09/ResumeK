import { Check, Layout } from 'lucide-react';
import  { useState, useEffect, useRef } from 'react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const templates = [
  { id: 'classic', name: 'Classic', preview: "A classic resume template with a timeless, professional layout." },
  { id: 'modern', name: 'Modern', preview: "A modern resume template with a sleek, stylish, and contemporary design." },
  { id: 'creative', name: 'Creative', preview: "A creative resume template with unique styling and visual flair." },
  { id: 'tech', name: 'Tech', preview: "A tech resume template designed for developers and IT professionals with structured sections." },
  { id: 'compact', name: 'Compact', preview: "A compact resume template that efficiently fits all key details in a concise format." },
  { id: 'classic-ats', name: 'Classic-ATS', preview: "An ATS-friendly version of the classic resume template optimized for keyword scanning." },
  { id: 'modern-ats', name: 'Modern-ATS', preview: "An ATS-compatible modern resume template combining readability and design." },
  { id: 'minimal', name: 'Minimal-ATS-01', preview: "A minimal resume template emphasizing simplicity and clean presentation with ATS friendly." },
  { id: 'minimal-ats', name: 'Minimal-ATS-02', preview: "An ATS-optimized minimal resume template focusing on clarity and structure." },
  { id: 'creative-ats', name: 'Creative-ATS', preview: "An ATS-safe creative resume template balancing originality with system compatibility." },
  { id: 'compact-ats', name: 'Compact-ATS', preview: "An ATS-ready compact resume template built for concise and efficient presentation." },
  { id: 'minimal-image', name: 'Minimal (Image)', preview: "A minimal resume template with a profile image, maintaining elegance and simplicity." },
  { id: 'elegent', name: 'Elegent (Image)', preview: "An elegant resume template featuring a refined layout and profile image for a classy look." },
  { id: 'modern-image', name: 'Modern (Image)', preview: "A modern image-based resume template with bold accents and visual appeal." },
  { id: 'visual', name: 'Visual (Image)', preview: "A visually engaging resume template that highlights your profile image and key achievements." },
  { id: 'sleek', name: 'Sleek (Image)', preview: "A sleek, image-based resume template with a smooth and polished aesthetic." },
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
