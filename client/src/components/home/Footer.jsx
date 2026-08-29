
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-white via-yellow-50 to-white border-t border-yellow-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer */}
        <div className="py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            {/* Brand Section */}
            <div className="max-w-lg">
              <a href="/" className="inline-block mb-5">
                <img
                  src="/logo.png"
                  alt="ResumeK AI"
                  className="h-10"
                />
              </a>

              <p className="text-gray-600 leading-relaxed text-base">
                Build professional, ATS-friendly resumes in minutes with
                AI-powered suggestions designed to help you stand out.
              </p>
            </div>


            {/* Right Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-10">

              {/* Contact */}
              <div>
                <p className="text-xs font-semibold tracking-wider text-yellow-600 mb-3">
                  GET IN TOUCH
                </p>

                <a
                  href="mailto:resumekai.official@gmail.com"
                  className="text-base font-medium text-gray-800 hover:text-yellow-600 transition-colors"
                >
                  resumekai.official@gmail.com
                </a>
              </div>


              {/* Social */}
              <div>
                <p className="text-xs font-semibold tracking-wider text-yellow-600 mb-3">
                  FOLLOW US
                </p>

                <div className="flex gap-3">

                  {/* Instagram */}
                  <SocialLink
                    href="https://instagram.com"
                    title="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.171 0-3.53.012-4.762.069-2.76.126-3.951 1.309-4.078 4.078-.057 1.232-.068 1.592-.068 4.762s.011 3.53.068 4.762c.127 2.769 1.318 3.951 4.078 4.078 1.232.057 1.592.068 4.762.068s3.53-.011 4.762-.068c2.76-.127 3.951-1.309 4.078-4.078.057-1.232.068-1.592.068-4.762s-.011-3.53-.068-4.762c-.127-2.769-1.318-3.951-4.078-4.078-1.232-.057-1.592-.068-4.762-.068zM12 6.845a5.155 5.155 0 100 10.31 5.155 5.155 0 000-10.31zm0 8.414a3.255 3.255 0 110-6.51 3.255 3.255 0 010 6.51zm6.205-8.033a1.225 1.225 0 100 2.449 1.225 1.225 0 000-2.449z" />
                    </svg>
                  </SocialLink>


                  {/* GitHub */}
                  <SocialLink
                    href="https://github.com"
                    title="GitHub"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.309.678.922.678 1.859 0 1.341-.012 2.42-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </SocialLink>


                  {/* LinkedIn */}
                  <SocialLink
                    href="https://linkedin.com"
                    title="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M6.94 5.00002C6.93985 5.53046 6.72883 6.03953 6.35351 6.41402C5.9782 6.78852 5.46931 7.00002 4.939 7.00002C4.40869 7.00002 3.89981 6.78852 3.52449 6.41402C3.14918 6.03953 2.93816 5.53046 2.938 5.00002C2.93816 4.46957 3.14918 3.9605 3.52449 3.58601C3.89981 3.21151 4.40869 3 4.939 3C5.46931 3 5.9782 3.21151 6.35351 3.58601C6.72883 3.9605 6.93985 4.46957 6.94 5.00002ZM7 8.48002H3V21H7V8.48002ZM13.32 8.48002H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 8.07002 14.92 8.25002 13.32 11.18V8.48002Z" />
                    </svg>
                  </SocialLink>

                </div>
              </div>

            </div>
          </div>
        </div>


        {/* Bottom Section */}
        <div className="border-t border-yellow-100 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500">
              © 2025–26 ResumeK AI. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-yellow-600 transition-colors"
              >
                Privacy
              </a>

              <a
                href="#"
                className="text-sm text-gray-500 hover:text-yellow-600 transition-colors"
              >
                Terms
              </a>

              <a
                href="#"
                className="text-sm text-gray-500 hover:text-yellow-600 transition-colors"
              >
                Support
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


const SocialLink = ({ href, title, children }) => (
  <a
    href={href}
    title={title}
    target="_blank"
    rel="noopener noreferrer"
    className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      border border-gray-200
      bg-white
      text-gray-600
      shadow-sm
      transition-all duration-300
      hover:-translate-y-1
      hover:border-yellow-400
      hover:bg-yellow-400
      hover:text-white
      hover:shadow-md
    "
  >
    {children}
  </a>
);

