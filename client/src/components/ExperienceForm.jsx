import { Briefcase, LoaderCircle, Plus, SparkleIcon, Trash, WandSparklesIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api';
import toast from 'react-hot-toast';

const ExperienceForm = ({ data = [], onChange }) => {

    const {token} = useSelector(state => state.auth)
    const [generatingIndex,setGeneratingIndex] = useState(-1)

const addExperience = () => {
    const newExperience = {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        is_current: false,
    };
    onChange([...data, newExperience]);
}

const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
}

const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = {...updated[index], [field]: value};
    onChange(updated);
}

const generateDescription = async (index) => {
  setGeneratingIndex(index);

  const experience = data[index];
  const prompt = `Enhance this job description: ${experience.description} for the position of ${experience.position} at ${experience.company}.`;

  try {
   const { data } = await api.post('api/ai/enhance-job-desc', {userContent: prompt}, { headers: { Authorization: token } }) 
   updateExperience (index, "description", data.enhancedContent)
  } catch (error) {
    toast.error(error.message)
  } finally {
    setGeneratingIndex(-1);
  }
};


return (
    <div className='space-y-6'>
        
        <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Professional Experience</h3>
          <p className="text-sm text-gray-500">Add your experience here</p>
        </div>
        <button onClick={addExperience} className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors">
          <Plus className="size-4" />
          Add Experience
        </button>
      
        </div>
      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
            <Briefcase className='size-6 mx-auto mb-3 text-gray-300'/>
            <p>Add Your 1st Experience</p>
            <p className='text-sm'>Click on "Add Experience"</p>

        </div>
      ): (
        <div className='space-y-4'>
            {data.map((experience, index) => (
                <div key={index} className='border border-gray-200 rounded-lg p-4'>
                    <div className='flex justify-between items-start'>
                        <h4 className='text-md font-semibold text-gray-900'>Experience #{index + 1}</h4>
                        <button onClick={() => removeExperience(index)} className='text-red-500 text-sm hover:underline'>
                            <Trash className='size-4' />
                        </button>
                        </div >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                     <input value={experience.company || ""} onChange={(e)=>updateExperience(index, "company", e.target.value)} type="text" placeholder='Company Name' className='px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none'/>
                        <input value={experience.position || ""} onChange={(e)=>updateExperience(index, "position", e.target.value)} type="text" placeholder='Job Name' className='px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none'/>
                        <input value={experience.start_date || ""} onChange={(e)=>updateExperience(index, "start_date", e.target.value)} type={experience.start_date ? "month" : "text"} onFocus={(e) => (e.target.type = "month")} placeholder="Working Date(From)"  className='px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none'/>
                        <input value={experience.end_date || ""} onChange={(e)=>updateExperience(index, "end_date", e.target.value)} type={experience.end_date ? "month" : "text"} onFocus={(e) => (e.target.type = "month")} placeholder="Working Date(To)" disabled={experience.is_current} className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none'/>
                    </div>

                    <label className='flex items-center gap-2'>
                        <input type="checkbox" checked={experience.is_current || false} onChange={(e)=> updateExperience(index, "is_current", e.target.checked ? true : false)} className='rounded border-gray-300 text-purple-600 focus:ring-purple-500' />
                        <span className='text-sm text-gray-700'>Currently Working Here</span>
                    </label>

                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <label className='text-sm font-medium text-gray-700 '>
                            Job Description
                            </label>
                            <button onClick={()=> generateDescription(index)} disabled={generatingIndex === index || !experience.position || !experience.company} className='flex items-center gap-1 px-2 py-1 text-xs bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                                {generatingIndex === index ? (
                                    <LoaderCircle className='h-5 w-5 animate-spin'/>
                                ) : (
                                    <WandSparklesIcon className="h-5 w-5 text-yellow-400 ml-2" />
                                ) }
                                Enhance with AI
                            </button>
                        </div>
                        <textarea value={experience.description || ""} onChange={(e)=>updateExperience(index, "description", e.target.value)} rows={4} className='w-full p-3 py-2  rounded-lg resize-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none' placeholder='Describe your role, responsibilities, and achievements...' />
                    </div>
                    
                </div>
            ))}

        </div>
      )}
    </div>
  )
}

export default ExperienceForm
