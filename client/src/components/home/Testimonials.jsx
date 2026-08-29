import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Title from "./Title";



const Testimonials = () => {
  const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta ",
    role: "Software Engineer",
    img: "/img-1.jpg",
    text: "Resumek AI made updating my resume incredibly fast and simple. I created a polished, professional resume in under 10 minutes!",
  },

  {
    id: 2,
    name: "Rohan Patel",
    role: "Data Analyst",
    img: "/img-2.jpg",
    text: "Resumek AI saved me hours and optimized my resume for ATS, leading to significantly more recruiter responses.",
  },

  {
    id: 3,
    name: "Anjali Rao",
    role: "Recent Graduate",
    img: "/img-3.jpg",
    text: "Resumek AI guided me step by step and helped me create my first professional resume, which landed me an internship!",
  },

  {
    id: 4,
    name: "David Garcia",
    role: "Sales Manager",
    img: "/img-4.jpg",
    text: "The AI helped me highlight my transferable skills and confidently transition my experience into a tech-focused role.",
  },

  {
    id: 5,
    name: "Firoz Khan",
    role: "UX/UI Designer",
    img: "/img-5.jpg",
    text: "The modern, customizable templates helped me create a visually appealing resume that truly reflects my personal brand.",
  },

  {
    id: 6,
    name: "Samantha Jones",
    role: "Director of Operations",
    img: "/img-6.jpg",
    text: "Resumek AI transformed my lengthy resume into a concise, powerful executive profile with valuable AI suggestions.",
  },

  {
    id: 7,
    name: "Chloe Davis",
    role: "Registered Nurse",
    img: "/img-7.jpg",
    text: "The AI's healthcare-specific keyword suggestions helped my nursing resume stand out to hospital hiring managers.",
  },

  {
    id: 8,
    name: "Isabella Rossi",
    role: "Freelance Content Strategist",
    img: "/img-8.jpg",
    text: "Resumek AI makes it effortless to duplicate and customize my resume for different projects in just minutes.",
  },

  {
    id: 9,
    name: "Kenji Tanaka",
    role: "Product Manager",
    img: "/img-9.jpg",
    text: "The AI optimized my resume with industry-specific keywords and helped me receive more callbacks from recruiters.",
  },

  {
    id: 10,
    name: "Aisha Ahmed",
    role: "University Student",
    img: "/img-10.jpg",
    text: "The academic templates made it easy to format my research experience and create a professional CV for my Master's applications.",
  },
];
  

const settings = {
  dots: false,
  arrows: false,

  infinite: true,

  slidesToShow: 3,
  slidesToScroll: 1,

  autoplay: true,

  autoplaySpeed: 0,

  speed: 7000,

  cssEase: "linear",

  pauseOnHover: true,

  pauseOnFocus: false,

  swipe: true,

  draggable: true,

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },

    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
      },
    },

    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


  return (
   <section
  id="testimonials"
  className="testimonial-section bg-white text-slate-800 overflow-hidden"
>
  <style>{`
    /* ==============================
       SECTION
    ============================== */

    .testimonial-section {
      position: relative;
      padding: 55px 0 65px;
      background: #ffffff;
      overflow: hidden;
    }

    .testimonial-container {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      margin-top: 35px;
    }


    /* ==============================
       SLICK SLIDER
    ============================== */

    .testimonial-section .slick-list {
      overflow: hidden;
      padding: 10px 0 20px;
    }

    .testimonial-section .slick-track {
      display: flex !important;
      align-items: stretch;
    }

    .testimonial-section .slick-slide {
      height: inherit !important;
    }

    .testimonial-section .slick-slide > div {
      height: 100%;
    }

    /* Remove arrows and dots */

    .testimonial-section .slick-prev,
    .testimonial-section .slick-next,
    .testimonial-section .slick-dots {
      display: none !important;
    }


    /* ==============================
       TESTIMONIAL ITEM
    ============================== */

    .testimonial {
      padding: 0 14px;
      height: 100%;
      outline: none;
    }


    /* ==============================
       CARD
    ============================== */

    .testimonial-card {
      position: relative;

      width: 100%;
      min-height: 285px;

      padding: 28px 32px 24px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      background: #ffffff;

      border: 1px solid #ecd9ad;

      border-radius: 22px;

      box-shadow:
        0 8px 25px rgba(15, 23, 42, 0.06);

      cursor: pointer;

      overflow: hidden;

      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease,
        border-color 0.3s ease;
    }


    /* Soft yellow corner */

    .testimonial-card::before {
      content: "";

      position: absolute;

      width: 150px;
      height: 150px;

      top: -90px;
      right: -70px;

      border-radius: 50%;

      background: rgba(220, 168, 66, 0.06);

      pointer-events: none;
    }


    /* Hover */

    .testimonial-card:hover {
      transform: translateY(-7px);

      border-color: #dca842;

      box-shadow:
        0 18px 40px rgba(15, 23, 42, 0.1),
        0 8px 20px rgba(220, 168, 66, 0.08);
    }


    /* ==============================
       STARS
    ============================== */

    .testimonial-rating {
      position: relative;

      display: flex;
      gap: 5px;

      margin-bottom: 16px;

      color: #dca842;

      font-size: 19px;

      z-index: 2;
    }


    /* ==============================
       REVIEW TEXT
    ============================== */

    .description {
      position: relative;

      margin: 0;

      font-size: 16px;

      line-height: 1.7;

      color: #64748b;

      z-index: 2;
    }


    /* Quote mark */

    .quote-mark {
      position: absolute;

      top: 18px;
      right: 25px;

      font-family: Georgia, serif;

      font-size: 65px;

      line-height: 1;

      color: rgba(220, 168, 66, 0.09);

      pointer-events: none;
    }


    /* ==============================
       USER PROFILE
    ============================== */

    .testimonial-profile {
      position: relative;

      display: flex;

      align-items: center;

      gap: 13px;

      margin-top: 22px;

      z-index: 2;
    }


    /* PHOTO */

    .testimonial .pic {
      width: 52px;
      height: 52px;

      min-width: 52px;

      border-radius: 50%;

      overflow: hidden;

      border: 2px solid #dca842;

      background: #f7f0df;

      transition: transform 0.3s ease;
    }


    .testimonial-card:hover .pic {
      transform: scale(1.08);
    }


    .testimonial .pic img {
      width: 100%;
      height: 100%;

      object-fit: cover;

      display: block;
    }


    /* NAME */

    .testimonial .title {
      margin: 0;

      font-size: 16px;

      font-weight: 700;

      color: #1e293b;
    }


    /* ROLE */

    .testimonial .post {
      display: block;

      margin-top: 3px;

      font-size: 13px;

      color: #94a3b8;
    }


    /* ==============================
       TABLET
    ============================== */

    @media (max-width: 1024px) {

      .testimonial {
        padding: 0 10px;
      }

      .testimonial-card {
        min-height: 275px;

        padding: 26px;
      }

    }


    /* ==============================
       MOBILE
    ============================== */

    @media (max-width: 768px) {

      .testimonial-section {
        padding: 45px 0 55px;
      }

      .testimonial-container {
        margin-top: 25px;
      }

      .testimonial {
        padding: 0 8px;
      }

      .testimonial-card {
        min-height: 255px;

        padding: 22px 20px;
      }

      .description {
        font-size: 15px;

        line-height: 1.65;
      }

      .testimonial-rating {
        font-size: 18px;
      }

    }
  `}</style>


  <Title
    title="What Users Say"
    description="Recent feedback from our valued users"
  />


  {/* FULL WIDTH FLOATING REVIEWS */}

  <div className="testimonial-container">

    <Slider {...settings}>

      {testimonials.map((t) => (

        <div
          className="testimonial"
          key={t.id}
        >

          <div className="testimonial-card">

            <div>

              {/* Stars */}

              <div className="testimonial-rating">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>


              {/* Quote */}

              <div className="quote-mark">
                “
              </div>


              {/* Review */}

              <p className="description">
                “{t.text}”
              </p>

            </div>


            {/* Profile */}

            <div className="testimonial-profile">

              <div className="pic">
                <img
                  src={t.img}
                  alt={t.name}
                />
              </div>


              <div>

                <h3 className="title">
                  {t.name}
                </h3>

                <span className="post">
                  {t.role}
                </span>

              </div>

            </div>

          </div>

        </div>

      ))}

    </Slider>

  </div>

</section>
    );
};

export default Testimonials;
