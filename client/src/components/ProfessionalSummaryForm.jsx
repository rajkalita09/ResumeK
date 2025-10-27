import React, { useState } from 'react'
import {LoaderCircle, LucideSparkles, SparkleIcon, SparklesIcon, WandSparklesIcon  } from 'lucide-react';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';

const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {

const {token} = useSelector(state => state.auth)
const [isGenerating, setIsGenerating] = useState(false)

const generateSummary = async () => {
  try {
    setIsGenerating(true)
    const prompt = `enhance my professional summary "${data}"`;
    const response = await api.post('/api/ai/enhance-pro-sum', {userContent: prompt}, {headers: {Authorization: token}})
    setResumeData(prev => ({...prev, professional_summary: response.data.enhancedContent}))
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  finally{
    setIsGenerating(false)
  }
  
}

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Professional Summary</h3>
          <p className="text-sm text-gray-500">Summarize your expertise here</p>
        </div>
        <button disabled={isGenerating} onClick={generateSummary} className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors  ">
          {isGenerating? (<LoaderCircle className='size-4 animate-spin'/>) : (<WandSparklesIcon className="h-5 w-5 text-yellow-400 ml-2"/>)}
          {isGenerating? "Enhancing..." : "Enhance with AI"}
          
        </button>
      </div>
      <div className="mt-6">
        <textarea value={data || ""} onChange={(e)=> onChange(e.target.value)} rows= {7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-1g focus: ring focus:ring-yellow-500 focus: border-yellow-500 outline-none transition-colors resize-none' placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...' />
      <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: Tailor your summary to match the job description and company goals.</p>
      </div>
    </div>
  )
}

export default ProfessionalSummaryForm
