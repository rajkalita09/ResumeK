import { GraduationCap, Plus, Trash } from 'lucide-react';
import React from 'react'

const ProjectForm = ({ data = [], onChange }) => {


const addProject = () => {
    const newProject = {
        name: '',
        type: '',
        description: '',
        link: '',
    };
    onChange([...data, newProject]);
}

const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
}

const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = {...updated[index], [field]: value};
    onChange(updated);
}

  return (
    <div className='space-y-6'>
        
        <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Project </h3>
          <p className="text-sm text-gray-500">Add your Project details here</p>
        </div>
        <button onClick={addProject} className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors">
          <Plus className="size-4" />
          Add Project
        </button>
      
        </div>
      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
            <GraduationCap className='size-6 mx-auto mb-3 text-gray-300'/>
            <p>No Project Details Added Yet</p>
            <p className='text-sm'>Click on "Add Project"</p>

        </div>
      ): (
        <div className='space-y-4'>
            {data.map((project, index) => (
                <div key={index} className='border border-gray-200 rounded-lg p-4'>
                    <div className='flex justify-between items-start'>
                        <h4 className='text-md font-semibold text-gray-900'>Project #{index + 1}</h4>
                        <button onClick={() => removeProject(index)} className='text-red-500 text-sm hover:underline'>
                            <Trash className='size-4' />
                        </button>
                        </div >
                    <div className='grid gap-4'>
                     <input value={project.name || ""} onChange={(e)=>updateProject(index, "name", e.target.value)} type="text" placeholder='Project Name' className='px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none'/>
                        <input value={project.type || ""} onChange={(e)=>updateProject(index, "type", e.target.value)} type="text" placeholder='Project Type(optional)' className='px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none'/>
                        <textarea rows={4} value={project.description || ""} onChange={(e)=>updateProject(index, "description", e.target.value)}  className='w-full px-3 py-2 text-sm rounded-lg resize-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none' placeholder='Describe your project'/>
                        <input value={project.link || ""} onChange={(e)=>updateProject(index, "link", e.target.value)} type="url" placeholder='Project/Demo Link(optional)' className='px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none'/>
                    </div>

                    
                    
                </div>
            ))}

        </div>
      )}
    </div>
  )
}

export default ProjectForm
