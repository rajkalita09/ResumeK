import React from 'react';

const Features = () => {
  return (
    <section id="features" className="bg-white text-slate-800">
      <div className="container px-6 py-16 mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-800 capitalize lg:text-3xl">
            Explore our <br /> Powerful Resume Builder Features
          </h1>

          <div className="mt-2">
            <span className="inline-block w-40 h-1 bg-yellow-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 ml-1 bg-yellow-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 ml-1 bg-yellow-500 rounded-full"></span>
          </div>
        </div>

        <div className="mt-10 xl:mt-14 lg:flex lg:items-center">
          <div className="grid w-full grid-cols-1 gap-8 lg:w-1/2 xl:gap-16 md:grid-cols-2">

            {/* Feature 1 */}
            <div className="space-y-3">
              <span className="inline-block p-3 text-yellow-600 bg-yellow-100 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              <h1 className="text-xl font-semibold text-slate-800 capitalize">AI-Powered Resume Creation</h1>
              <p className="text-slate-600">
                Instantly generate professional, ATS-friendly resumes with personalized AI suggestions and layouts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3">
              <span className="inline-block p-3 text-yellow-600 bg-yellow-100 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </span>
              <h1 className="text-xl font-semibold text-slate-800 capitalize">Smart AI Suggestions</h1>
              <p className="text-slate-600">
                Get intelligent keyword and phrasing recommendations to help your resume stand out to recruiters.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3">
              <span className="inline-block p-3 text-yellow-600 bg-yellow-100 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </span>
              <h1 className="text-xl font-semibold text-slate-800 capitalize">Easy Customization</h1>
              <p className="text-slate-600">
                Choose colors, fonts, and layouts effortlessly to reflect your personality and professional style.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="space-y-3">
              <span className="inline-block p-3 text-yellow-600 bg-yellow-100 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </span>
              <h1 className="text-xl font-semibold text-slate-800 capitalize">Modern & Clean Templates</h1>
              <p className="text-slate-600">
                Pick from beautifully crafted templates optimized for clarity, elegance, and hiring success.
              </p>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-1/2 lg:justify-center">
            <img 
              className="w-[28rem] h-[28rem] flex-shrink-0 object-cover xl:w-[33rem] xl:h-[33rem] rounded-full shadow-lg shadow-yellow-200" 
              src="/resume.jpg" 
              alt="AI Resume Builder interface" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;