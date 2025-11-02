import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section id="calltoaction" className="bg-white text-gray-900 py-16 px-6 text-center">
      <style>{`
        .cta-button {
          background-color: #d0ac29ff;
          color: #fff;
          padding: 12px 30px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .cta-button:hover {
          background-color: #854d0e;
        }

        .cta-heading {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: #111827;
        }

        .cta-text {
          font-size: 1.1rem;
          color: #6b7280;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .cta-heading {
            font-size: 1.8rem;
          }

          .cta-text {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="text-center mt-6 text-slate-700">
        <h2 className="text-3xl font-bold mb-2">Begin your career journey</h2>
        <p className="cta-text">
          Design your perfect resume in minutes.
        </p>
        <Link to='/app?state=register' className="cta-button">
            Get Started Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
