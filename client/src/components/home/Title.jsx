import React from 'react'

const Title = ({title, description}) => {
  return (
    <div className='text-center mt-6 text-slate-700'>
        <h2 className='text-3xl font-bold mb-2'>{title}</h2>
        <p className='text-slate-600'>{description}</p>
        <div className="mt-2">
            <span className="inline-block w-40 h-1 bg-yellow-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 ml-1 bg-yellow-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 ml-1 bg-yellow-500 rounded-full"></span>
          </div>
      </div>
      
  )
}

export default Title
