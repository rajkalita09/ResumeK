import { FilePenLineIcon, LoaderCircle, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import  { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import  pdfToText  from 'react-pdftotext';

const Dashboard = () => {

  const {user, token} = useSelector(state => state.auth);

const colours = ['#6366F1', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#3B82F6']
const [allResumes, setAllResumes] = useState([])
const [showCreateResume,setShowCreateResume] = useState(false)
const [showUploadResume,setShowUploadResume] = useState(false)
const [title,setTitle] = useState('')
const [resume,setResume] = useState(null)
const [editResumeId,setEditResumeId] = useState('')

const [isLoading,setIsLoading] = useState(false)
const navigate= useNavigate()

const loadAllResumes = async () => {
 try {
  const {data} = await api.get('/api/users/resumes', {headers: {Authorization: token}})
  setAllResumes(data.resumes)
 } catch (error) {
  toast.error(error?.response?.data?.message || error.message);
 }
}

const createResume = async (e) => {
 try {
    e.preventDefault()
    const {data} = await api.post('/api/resumes/create', {title}, {headers: {Authorization: token}})
    setAllResumes([...allResumes, data.resume])
    setTitle('')
    setShowCreateResume(false)
    navigate(`/app/builder/${data.resume._id}`)
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
}
const uploadResume = async (e) => {
 e.preventDefault()
 setIsLoading(true)
 try {
  const resumeText = await pdfToText(resume);
  console.log("📏 Resume text length:", resumeText?.length);
  if (!resumeText) {
      toast.error("Unable to extract text from PDF. Try another file.");
      setIsLoading(false);
      return;
    }
  const {data} = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers: {Authorization: token}})
   setTitle('')
    setResume(null)
    setShowUploadResume(false)
    navigate(`/app/builder/${data.resumeId}`)
 } catch (error) {
   toast.error(error?.response?.data?.message || error.message);
 }
  setIsLoading(false)
  
}
const editTitle = async (e) => {
  try {
     e.preventDefault()
      const {data} = await api.put(`/api/resumes/update`, {resumeId:editResumeId, resumeData: {title}}, {headers: {Authorization: token}})
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume, title} : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)

  } catch (error) {
     toast.error(error?.response?.data?.message || error.message);
  }

  }

const deleteResume = async (resumeId) => {
  try {
    const confirm = window.confirm('Are you sure you want to delete this resume?')
 if(confirm){
  const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: {Authorization: token}})
  setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
  toast.success(data.message)
  }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
  }

useEffect(() => {
  loadAllResumes()
}, [])

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome,Joe Doe </p>
      <div className='flex gap-4'>
        <button onClick={()=> setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-1g gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
          <p className='text-sm mt-1 text-slate-700'>
            Create New Resume
          </p>
        </button>

         <button onClick={()=> setShowUploadResume(true) } className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-1g gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-red-300 to-red-500 text-white rounded-full' />
          <p className='text-sm mt-1 text-slate-700'>
            Upload Existing
          </p>
        </button>

      </div>

    <hr className='border-slate-300 my-6 sm:w-[305px]'/>

    <div className='grid sm:grid-cols-2 sm:flex flex-wrap gap-4'>
      {allResumes.map((resume, index)=>{
        const baseColor = colours[index % colours.length];
        return (
          <button key={index} onClick={()=> navigate(`/app/builder/${resume._id}`)} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-1g gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40' }}>
          <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{color: baseColor}}/>
          <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color: baseColor}}>
            {resume.title}
          </p>
          <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover: text-slate-500 transition-all duration-300 px-2 text-center' style={{ color: baseColor + '90' }}>
             Updated on {new Date(resume.updatedAt).toLocaleDateString()} 
          </p>
          <div onClick={e=> e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
             <TrashIcon onClick={()=>deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"/>
              <PencilIcon onClick={()=> {setEditResumeId(resume._id); setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"/>
           </div>

          </button>
        )
      })}

    </div>


    {showCreateResume && ( 
      <form onSubmit={createResume} onClick={()=> setShowCreateResume (false)}
       className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'> 
        <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'> 
        <h2 className='text-xl font-bold mb-4'>Create a Resume</h2> 
        <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-yellow-600 ring-yellow-600' required/>
         <button className='w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors'>Create Resume</button>
          <XIcon className='absolute top-4 right-4 text-slate-400 hover: text-slate-600 cursor-pointer transition-colors' onClick={()=> 
          {setShowCreateResume (false); setTitle('') }}/>
           </div>
          </form>
    )
    }

    {showUploadResume && (
      <div
        onClick={() => setShowUploadResume(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
      >
        <form
          onSubmit={uploadResume}
          onClick={(e) => e.stopPropagation()} // stop close when clicking inside
          className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
        >
          <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter resume title"
            className="w-full px-4 py-2 mb-4 focus:border-yellow-600 ring-yellow-600"
            required
          />

          <div>
            <label
              htmlFor="resume-input"
              className="block text-sm text-slate-700"
            >
              Select Resume File
              <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-yellow-500 hover:text-yellow-700 cursor-pointer transition-colors">
                {resume ? (
                  <p className="text-sm text-yellow-600">{resume.name}</p>
                ) : (
                  <>
                    <UploadCloud className="size-14 stroke-1" />
                    <p className="text-sm">Upload Resume</p>
                  </>
                )}
              </div>
            </label>

            <input
              id="resume-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </div>

          <button disabled={isLoading}
            type="submit"
            className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2">
            {isLoading && <LoaderCircle className="size-4 text-white animate-spin" />}
            {isLoading ? 'Uploading...' : 'Upload Resume' }
            
          </button>

          <XIcon
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
            onClick={() => {
              setShowUploadResume(false);
              setTitle("");
            }}
          />
        </form>
      </div>
    )}


    {editResumeId && ( 
      <form onSubmit={editTitle} onClick={()=> setEditResumeId ('')}
       className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'> 
        <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'> 
        <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2> 
        <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-yellow-600 ring-yellow-600' required/>
         <button className='w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors'>Update</button>
          <XIcon className='absolute top-4 right-4 text-slate-400 hover: text-slate-600 cursor-pointer transition-colors' onClick={()=> 
          {setEditResumeId (''); setTitle('') }}/>
           </div>
          </form>
    )
    }
      
    

      </div>
    </div>
  )
}

export default Dashboard
