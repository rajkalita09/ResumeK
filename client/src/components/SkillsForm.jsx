import { Plus,  Sparkles, X } from 'lucide-react';
import  {React, useState } from 'react'

const SkillsForm = ({ data = [], onChange }) => {
const[newSkill, setNewSkill] = useState("")

const addSkill = () => {
    if(newSkill.trim() && !data.includes(newSkill.trim())){
        onChange([...data, newSkill.trim()]);
        setNewSkill("");
    }
}

const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
}

const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        addSkill();
    }
}

  return (
    <div className='space-y-4'>
        <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Skills </h3>
            <p className="text-sm text-gray-500">Add your skills here</p>
        </div>

        <div className='flex gap-2'>
            <input type='text' placeholder='Enter a skill (eg:HTML,Java,Management,etc)' className='flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors'
            onChange={(e)=>setNewSkill(e.target.value)}
            value={newSkill}
            onKeyDown={handleKeyPress}
            />
            <button onClick={addSkill} disabled={!newSkill.trim()} className='flex items-center gap-1 px-3 py-2 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors disable:opacity-50 disable:cursor-not-allowed'>
                <Plus className="size-4" /> Add
            </button>

        </div>
      {data.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
            {data.map((skill, index) => (
                <span key={index} className='flex items-center gap-2 bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm'>
                    {skill}
                    <button onClick={() => removeSkill(index)} className='text-red-500 font-bold hover:underline'>
                    <X className='size-4' />    
                    </button>
                </span>
            ))}
         </div>
      ): (
        <div className='text-center py-8 text-gray-500'>
            <Sparkles className='w-10 h-10 mx-auto mb-2 text-gray-300'/>
            <p>No Skills Added Yet</p>
            <p >Add Your Skills</p>
        </div>
      )}
      <div className='bg-purple-50 p-3 rounded=lg'>
        <p className='text-sm text-purple-500'>
            <strong>Tip:</strong> Add skills that are relevant to the job you are applying for to make your resume stand out.
        </p>
      </div>
    </div>
  
)
}


export default SkillsForm
