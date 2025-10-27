import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({data, onChange, removeBackground, setRemoveBackground}) => {
  
    const handleChange = (field, value)=>{
        onChange({...data, [field]: value})
    }

    const fields = [
        {key: 'full_name', label: 'Full Name', icon: User, type: 'text', required: true},
        {key: 'email', label: 'Email Address', icon: Mail, type: 'email', required: true},
        {key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' },
        {key: 'location', label: 'Location', icon: MapPin, type: 'text' },
        {key: 'profession', label: 'Profession', icon: BriefcaseBusiness, type: 'text' },
        {key: 'linkedin', label: 'Linkedin url', icon: Linkedin, type: 'url' },
        {key: 'website', label: 'Personal website url', icon: Globe, type: 'url' },
    ]
    
    return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
      <p className='text-sm text-gray-500'>Get Started With Your Personal Informatioon</p>
      <div className="flex items-center gap-3 mt-5">
        <label>
            {data.image ? (
                <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user-image" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80 cursor-pointer'/>
            ) : (
                <div className='w-20 h-20 rounded-full bg-slate-100 mt-5 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-200 cursor-pointer ring ring-slate-300 text-center leading-tight'>
                <User className="size-10 p-2.5 border rounded-full mb-1" />
                <span className="text-[10px]">
                upload your photo
                </span>

            </div>

            )}
            <input type="file" accept='image/jpeg, image/png, image/jpg' className='hidden' onChange={(e)=> handleChange("image", e.target.files[0])}/>
        </label>
        {typeof data.image === 'object' && (
            <div className="flex flex-col gap-1 pl-4 text-sm">
                <p>Remove Background</p>
                <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                    <input type="checkbox" className='sr-only peer'  onChange={()=> setRemoveBackground(prev => !prev)} checked={removeBackground}/>
                    <div className='w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-yellow-600 transition-colors duration-200'>
                    </div>
                    <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked: translate-x-4'>
                    </span>

                </label>
            </div>
        )}
        </div>

        {fields.map((field)=>{
            const Icon = field.icon;
            return (
                <div key={field.key} className='space-y-1 mt-5'>
            <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                <Icon className='size-4'/>
                {field.label} {field.required && <span className='text-red-500'>*</span>}
            </label>
            <input
                type={field.type} 
                value={data[field.key] || ''}
                onChange={(e)=> handleChange(field.key, e.target.value)}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all' placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
            />
                    </div> )
        }

        )}

    </div>
  )
}

export default PersonalInfoForm
