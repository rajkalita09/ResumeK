import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Title from "./Title";



const Testimonials = () => {
  const testimonials = 
  [
   {
    id: 1,
    name: "Samantha Jones",
    role: "Software Engineer",
    img: "/img-1.jpg",
    text: "I dreaded updating my resume, but Resumek AI made it incredibly fast and simple. I created a professional, polished resume in under 10 minutes. An absolute lifesaver!",
  },
  {
    id: 2,
    name: "Rohan Patel",
    role: "Data Analyst",
    img: "/img-2.jpg",
    text: "As a data analyst, I appreciate efficiency. Resumek AI's platform is brilliant. It not only saved me hours but also optimized my resume for ATS, which led to a significant increase in responses from recruiters.",
  },
  {
    id: 3,
    name: "Anjali Rao",
    role: "Recent Graduate",
    img: "/img-3.jpg",
    text: "Starting with a blank page was intimidating. Resumek AI guided me through every step, suggesting skills and phrasing I hadn't thought of. I went from having no resume to a professional one that landed me my first internship!",
  },
  {
    id: 4,
    name: "David Garcia",
    role: "Sales Manager",
    img: "/img-4.jpg",
    text: "Transitioning to a new industry felt challenging. The AI was incredible at helping me rephrase my sales experience to highlight skills relevant for a tech role. It's the best tool for any career changer.",
  },
  {
    id: 5,
    name: "Fatima Khan",
    role: "UX/UI Designer",
    img: "/img-5.jpg",
    text: "Finally, a resume builder that understands design! The templates are modern, clean, and highly customizable. It allowed me to create a visually appealing resume that truly reflects my personal brand.",
  },
  {
    "id": 6,
    "name": "Arjun Mehta",
    "role": "Director of Operations",
    "img": "/img-6.jpg",
    "text": "With over 3 years of experience, my resume was cluttered and lengthy. Resumek AI helped me distill my extensive career into a powerful, concise executive resume. The AI suggestions for quantifying achievements were invaluable."
  },
  {
    "id": 7,
    "name": "Chloe Davis",
    "role": "Registered Nurse",
    "img": "/img-7.jpg",
    "text": "Writing a resume for the healthcare industry requires very specific terminology. Resumek AI's keyword suggestions were spot-on for the nursing positions I was targeting, helping my application get noticed by hospital hiring managers."
  },
  {
    "id": 8,
    "name": "Isabella Rossi",
    "role": "Freelance Content Strategist",
    "img": "/img-8.jpg",
    "text": "As a freelancer, I constantly need to tailor my resume for different projects. Resumek AI makes it effortless to duplicate and customize my master resume in minutes, saving me a huge amount of time while applying for gigs."
  },
  {
    "id": 9,
    "name": "Kenji Tanaka",
    "role": "Product Manager",
    "img": "/img-9.jpg",
    "text": "The AI's ability to analyze my experience and suggest industry-specific keywords was a game-changer. It optimized my resume perfectly for ATS screeners, leading to more callbacks. A truly intelligent feature!"
  },
  {
    "id": 10,
    "name": "Aisha Ahmed",
    "role": "University Student",
    "img": "/img-10.jpg",
    "text": "I needed a CV for my Master's applications, not a standard resume. Resumek AI had academic templates that helped me properly format my research experience and publications. It took all the stress out of the application process."
  },

  ]
  

 const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};


  return (
    <section id="testimonials" className="bg-white text-slate-800">
      <style>{`
        .testimonial {
          margin: 0 10px;
        }

        .testimonial .testimonial-content {
          margin: 20px 0 50px 0;
          position: relative;
        }

        .testimonial .testimonial-content:after {
          content: "";
          width: 20px;
          height: 20px;
          border-top: 20px solid #dca842;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          margin: 0 auto;
          position: absolute;
          bottom: -20px;
          left: 0;
          right: 0;
        }

        .testimonial .description {
          padding: 25px 35px;
          margin: 0;
          background: #dca842;
          border-radius: 15px;
          font-size: 20px;
          color: #fff;
          position: relative;
        }

        .testimonial .description:before,
        .testimonial .description:after {
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          width: 35px;
          height: 35px;
          line-height: 35px;
          border-radius: 8px;
          text-align: center;
          background: #dca842;
          position: absolute;
          color: #fff;
        }

        .testimonial .description:before {
          content: "\\f10d";
          top: -18px;
          left: 25px;
        }

        .testimonial .description:after {
          content: "\\f10e";
          bottom: -18px;
          right: 25px;
        }

        .testimonial .testimonial-profile {
          display: table;
          padding: 15px;
          border: 1px solid #dca842;
          border-radius: 20px;
          margin: 0 auto;
          position: relative;
        }

        .testimonial .pic {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 1px solid #dca842;
          float: left;
          overflow: hidden;
        }

        .testimonial .pic img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .testimonial .title {
          display: inline-block;
          margin: 0 0 0 30px;
          font-size: 19px;
          font-weight: bold;
          color: #dca842;
          position: relative;
          top: 22px;
        }

        .testimonial .title:before {
          content: "";
          width: 1px;
          height: 70px;
          background: #dca842;
          position: absolute;
          top: -8px;
          left: -15px;
        }

        .testimonial .post {
          display: block;
          font-size: 14px;
          font-weight: normal;
          color: #888;
          margin-top: 10px;
        }

        .owl-theme .owl-dots .owl-dot span {
          background: transparent;
          border: 1px solid #dca842;
          opacity: 1;
        }

        .owl-theme .owl-dots .owl-dot.active span {
          background: #dca842;
          border: 1px solid #dca842;
        }

        @media only screen and (max-width: 479px) {
          .testimonial .description {
            padding: 20px;
            font-size: 16px;
          }

          .testimonial .testimonial-profile {
            padding: 10px;
          }

          .testimonial .title {
            font-size: 16px;
          }

          .testimonial .post {
            font-size: 13px;
          }
        }
      `}</style>
       <Title title="What Our Users Say" description="Recent feedbacks from our valued users" />
      <div className="container testimonial-container my-10">
        <div className="row justify-center">
          <div className="col-md-8 col-md-offset-2">
            <Slider {...settings}>

              {testimonials.map((t) => (
                <div className="testimonial" key={t.id}>
                  <div className="testimonial-content">
                    <p className="description">{t.text}</p>
                  </div>
                 
                  <div className="testimonial-profile">
                    <div className="pic">
                      <img src={t.img} alt={t.name} />
                    </div>
                    <h3 className="title">
                      {t.name}
                      <span className="post">{t.role}</span>
                    </h3>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
    );
};

export default Testimonials;
