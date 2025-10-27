import React, { useState, useEffect } from 'react'
import {data, Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, Download, EyeIcon, EyeOff, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {

  const {resumeId} = useParams()
  const {token} = useSelector(state => state.auth)

const [resumeData, setResumeData] = useState({
  _id: '',
  title: '',
  personal_info: {},
  professional_summary: '',
  experience: [],
  education: [],
  project: [],
  skills: [],
  template: "classic",
  accent_color: "#3882F6",
  public: false,

})

const loadExistingResume = async () => {
  try {
    const {data} = await api.get('/api/resumes/get/' + resumeId, {headers: {Authorization: token}})
    if (data.resume){
      setResumeData(data.resume)
      document.title = data.resume.title;
    }
  } catch (error) {
    console.log("Error loading resume: ", error.message);
  }
}

const [activeSectionIndex, setActiveSectionIndex] = useState(0)
const [removeBackground, setRemoveBackground] = useState(false);

const sections = [
  { id: 'personal', name: 'Personal Info', icon: User },
  { id: 'summary', name: 'Summary', icon: FileText },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'projects', name: 'Projects', icon: FolderIcon },
  { id: 'skills', name: 'Skills', icon: Sparkles },
]

const activeSection = sections[activeSectionIndex];

useEffect(() => {
  loadExistingResume()
}, [])

const changeResumeVisibility = async () => {
  try {
    const formData = new FormData()
    formData.append("resumeId", resumeId)
    formData.append("resumeData", JSON.stringify({public: !resumeData.public}))

    const {data} = await api.put('/api/resumes/update', formData, {headers: {Authorization: token}})
    setResumeData({...resumeData, public: !resumeData.public})
    toast.success(data.message)
  } catch (error) {
    console.error("Error in saving resume:", error)
  }
}

const handleShare = () => {
  const frontendUrl = window.location.origin;
  const resumeUrl = `${frontendUrl}/view/${resumeId}`;

  if (navigator.share) {
    navigator.share({
      title: 'My Resume',
      text: 'Check out my resume!',
      url: resumeUrl,
    });
  } else {
    alert(`Sharing not supported in this browser. Please copy the link:\n${resumeUrl}`);
  }
};


const downloadResume = () => {
  window.print();
}

const saveResume = async () => {
  try {
    let updatedResumeData = structuredClone(resumeData)

    // remove image from updated resume data
    if(typeof resumeData.personal_info.image === 'object'){
      delete updatedResumeData.personal_info.image
    }
    const formData = new FormData();
    formData.append("resumeId", resumeId)
    formData.append('resumeData', JSON.stringify(updatedResumeData))
    removeBackground && formData.append("removeBackground", "yes")
    typeof resumeData.personal_info.image === 'object' && formData.append("image",resumeData.personal_info.image)

    const {data} = await api.put('/api/resumes/update', formData, {headers: {Authorization: token}})

    setResumeData(data.resume)
    toast.success(data.message)
  } catch (error) {
    console.error("Error saving resume:", error)
  }
  
}

return (
    <div>
      
      <div className='max-w-7xl mx-auto px-4 py-6 flex items-center gap-2'>
        <Link to={'/app'} className='flex items-center gap-2 hover:text-slate-800 text-slate-600 transition-colors'>
        <ArrowLeftIcon className="size-4"/>
        Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form  */}
          
          {/* THIS IS THE FIX: I removed 'overflow-hidden' from this line.
          */}
          <div className='relative lg:col-span-5 rounded-lg overflow-visible'>

          
            <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 p-6 pt-1 overflow-visible'>
              {/* progress bar using activeSectionIndex  */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200'/>
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 border-none transition-all duration-2000'
              style={{ width: `${((activeSectionIndex + 1) / sections.length) * 100}%` }}/>

              {/* Section Navigation */}
              {/* THIS IS THE FIX: Added 'relative z-10' to this div 
                to make it stack on top of the form content below.
              */}
              <div className="relative z-10 flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-3">
                <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=> setResumeData(prev => ({...prev, template}))}/>
                <ColorPicker selectedColor={resumeData.accent_color} onChange={(accent_color)=> setResumeData(prev => ({...prev, accent_color}))}/>
                </div>
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.max(prevIndex - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0} >
                      <ChevronLeft className='size-4'/>
                      Previous
                    </button>
                  )}

                  <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.min(prevIndex + 1, sections.length -1))} className={ `flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length -1 && 'opacity-50'}`} disabled={activeSectionIndex === sections.length - 1}> 
                    Next <ChevronRight className="size-4"/> </button>

                </div>

              </div>


              {/* Form content */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm data={resumeData.personal_info} onChange=
                  {(data)=>setResumeData(prev => ({...prev, personal_info:data}))} 
                  removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                )}
                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm data={resumeData.professional_summary} onChange=
                  {(data)=>setResumeData(prev => ({...prev, professional_summary:data}))} setResumeData={setResumeData} />
                )}
                 {activeSection.id === 'experience' && (
                  <ExperienceForm data={resumeData.experience} onChange=
                  {(data)=>setResumeData(prev => ({...prev, experience:data}))}  />
                )}
                {activeSection.id === 'education' && (
                  <EducationForm data={resumeData.education} onChange=
                  {(data)=>setResumeData(prev => ({...prev, education:data}))}  />
                )}
                {activeSection.id === 'projects' && (
                  <ProjectForm data={resumeData.project} onChange=
                  {(data)=>setResumeData(prev => ({...prev, project:data}))}  />
                )}
                {activeSection.id === 'skills' && (
                  <SkillsForm data={resumeData.skills} onChange=
                  {(data)=>setResumeData(prev => ({...prev, skills:data}))}  />
                )}
              
                

              </div>
                <button onClick={()=> {toast.promise(saveResume, {loading: 'Saving...'})}} className='mt-6 px-4 py-2 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors'>
                Save Changes
                </button>
            </div>

          </div>

          {/* Right Panel - Resume Preview */}
          <div className='lg:col-span-7  max-lg:mt-6'>
            <div className='relative w-full'>
              <div className='absolute bottom-3 left-0 right-3 flex justify-end items-center gap-2'>
                {resumeData.public && (
                  <button onClick={handleShare} className='flex items-center gap-1 px-3 py-2 bg-gradient-to-br from-green-50 to-green-100 text-green-600 rounded hover:bg-green-200 transition-colors'>
                    <Share2Icon className='size-4'/> Share
                  </button>
                )}
                <button onClick={changeResumeVisibility} className='flex items-center gap-1 px-3 py-2 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors'>
                  {resumeData.public ? <EyeIcon className='size-4'/> : 
                  <EyeOff className='size-4'/>}
                  {resumeData.public ? 'Public' : ' Private'}
                </button>
                <button onClick={downloadResume} className='flex items-center gap-1 px-3 py-2 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors'>
                  <Download className='size-4'/> Download
                </button>

              </div>
            </div>

            {/*---resume preview---*/}
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes="mx-auto shadow-lg"/>

          </div>

        </div>
      </div>

    </div>
  )
}

export default ResumeBuilder