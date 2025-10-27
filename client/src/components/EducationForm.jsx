import { GraduationCap, GraduationCapIcon, Plus, Trash } from 'lucide-react';
import React from 'react'

const EducationForm = ({ data = [], onChange }) => {

const addEducation = () => {
    const newEducation = {
        institution: '',
        degree: '',
        field: '',
        endDate: '',
        graduation_date: '',
        gpa: false,
    };
    onChange([...data, newEducation]);
}

const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
}

const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = {...updated[index], [field]: value};
    onChange(updated);
}
  
    return (
    <div className='space-y-6'>
        
        <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Education </h3>
          <p className="text-sm text-gray-500">Add your education details here</p>
        </div>
        <button onClick={addEducation} className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors">
          <Plus className="size-4" />
          Add Education
        </button>
      
        </div>
      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
            <GraduationCap className='size-6 mx-auto mb-3 text-gray-300'/>
            <p>No Education Details Added Yet</p>
            <p className='text-sm'>Click on "Add Education"</p>

        </div>
      ): (
        <div className='space-y-4'>
            {data.map((education, index) => (
                <div key={index} className='border border-gray-200 rounded-lg p-4'>
                    <div className='flex justify-between items-start'>
                        <h4 className='text-md font-semibold text-gray-900'>Education #{index + 1}</h4>
                        <button onClick={() => removeEducation(index)} className='text-red-500 text-sm hover:underline'>
                            <Trash className='size-4' />
                        </button>
                        </div >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                     <input value={education.institution || ""} onChange={(e)=>updateEducation(index, "institution", e.target.value)} type="text" placeholder='Institute Name' className='px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none'/>
                        <input value={education.degree || ""} onChange={(e)=>updateEducation(index, "degree", e.target.value)} type="text" placeholder='Degree' className='px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none'/>
                        <input value={education.field || ""} onChange={(e)=>updateEducation(index, "field", e.target.value)} type="text"  className='px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none' placeholder='Field of Study'/>
                        <input value={education.graduation_date || ""} onChange={(e) => updateEducation(index, "graduation_date", e.target.value)} type={education.graduation_date ? "month" : "text"} onFocus={(e) => (e.target.type = "month")} className="px-3 py-2 text-sm w-full border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none" placeholder="Completion Year"/>
                        <input value={education.gpa || ""} onChange={(e)=>updateEducation(index, "gpa", e.target.value)} type="text"  className='px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none' placeholder='GPA (Optional)'/>
                    </div>

                    
                    
                </div>
            ))}

        </div>
      )}
    </div>
  )
}

export default EducationForm
