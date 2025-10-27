import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview';
import Loader from '../components/Loader';
import { ArrowLeftCircle } from 'lucide-react';
import api from '../configs/api';

const Preview = () => {
const {resumeId} = useParams()

const [isLoading, setIsLoading] = useState(true);
const [resumeData, setResumeData] = useState(null);

const loadResumeData = async () => {
  try {
    const {data} = await api.get(`${import.meta.env.VITE_API_BASE_URL}/api/resumes/public/${resumeId}`)

    setResumeData (data.resume)
  } catch (error) {
    console.log(error.message)
  }finally{
    setIsLoading(false)
  }
}

useEffect(() => {
  loadResumeData()
}, [])

  return resumeData ? (
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classess='py-4 bg-white'/>

      </div>
      
    </div>
  ) : (
    <div>
      {isLoading ?<Loader /> : (
        <div className='flex flex-col justify-center items-center h-screen '>
          <p className='text-center text-6xl text-slate-400 font-medium'>Resume Not Found</p>
          <a href='/' className='mt-6 flex items-center text-purple-600 hover:underline font-medium' >
            <ArrowLeftCircle className='mr-2 size-4'/> Go to Home
          </a>
        </div>
      )}
    </div>

  )
}

export default Preview
