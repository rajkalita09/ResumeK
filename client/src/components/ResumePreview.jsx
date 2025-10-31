import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ElegantTemplate from '../assets/templates/ElegantTemplate'
import ModernImageTemplate from '../assets/templates/ModernImageTemplate'
import CreativeTemplate from '../assets/templates/CreativeTemplate'
import TechTemplate from '../assets/templates/TechTemplate'
import CompactTemplate from '../assets/templates/CompactTemplate'
import VisualImageTemplate from '../assets/templates/VisualImageTemplate'
import SleekImageTemplate from '../assets/templates/SleekImageTemplate'
import ClassicATSTemplate from '../assets/templates/ClassicATSTemplate'
import ModernATSTemplate from '../assets/templates/ModernATSTemplate'
import CompactATSTemplate from '../assets/templates/CompactATSTemplate'
import MinimalATSTemplate from '../assets/templates/MinimalATSTemplate'
import CreativeATSTemplate from '../assets/templates/CreativeATSTemplate'


const ResumePreview = ({data, template, accentColor, classes=""}) => {
  
  const renderTemplate = () => {
    switch (template) {
        case "modern":
            return <ModernTemplate data={data} accentColor={accentColor}/>;
        case "elegent":
            return <ElegantTemplate data={data} accentColor={accentColor}/>;
        case "minimal":
            return <MinimalTemplate data={data} accentColor={accentColor}/>;
        case "minimal-image":
            return <MinimalImageTemplate data={data} accentColor={accentColor}/>;
        case "modern-image":
            return <ModernImageTemplate data={data} accentColor={accentColor}/>;
        case "creative":
            return <CreativeTemplate data={data} accentColor={accentColor}/>;
        case "tech":
            return <TechTemplate data={data} accentColor={accentColor}/>;
        case "compact":
            return <CompactTemplate data={data} accentColor={accentColor}/>;
        case "visual":
            return <VisualImageTemplate data={data} accentColor={accentColor}/>;
        case "sleek":
            return <SleekImageTemplate data={data} accentColor={accentColor}/>;
         case "classic-ats":
            return <ClassicATSTemplate data={data} accentColor={accentColor}/>;
        case "modern-ats":
            return <ModernATSTemplate data={data} accentColor={accentColor}/>;
        case "compact-ats":
            return <CompactATSTemplate data={data} accentColor={accentColor}/>;
        case "minimal-ats":
            return <MinimalATSTemplate data={data} accentColor={accentColor}/>; 
        case "creative-ats":
            return <CreativeATSTemplate data={data} accentColor={accentColor}/>;    
        case "classic":
        default:
            return <ClassicTemplate data={data} accentColor={accentColor}/>;
    }
        }


    return (
    <div className='w-full bg-gray-100'>
        <div id='resume-preview' className={"border border-gray-200 print:shadow-none print:border-none" + classes }>
            {renderTemplate()}
        </div>

        <style jsx>
        {`
            @page {
    size: letter;
    margin: 0;
        }
    @media print {
    html, body {
    width: 8.5in;
    height: 11in;
    overflow: hidden;
        }
    body * {
    visibility: hidden;
    }
    #resume-preview, #resume-preview * {
    visibility: visible;
    }
    #resume-preview {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    box-shadow: none !important;
    border: none !important;
    }
        }
        `}
        </style>
      
    </div>
  )
}

export default ResumePreview
