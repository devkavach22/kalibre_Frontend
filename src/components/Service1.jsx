import React from 'react'
import AboutHeroBg from "../assets/Talent.png";
import cardBgPic from "../assets/AboutBg.jpg";
import pic1 from "../assets/T1.png";
import pic2 from "../assets/T2.png";
import pic3 from "../assets/T3.png";
import pic4 from "../assets/T4.png";
import Image1 from "../assets/ImageS1.png"
import Image2 from "../assets/ImageS2.png"


const services = [
  {
    img: pic1,
    title: 'Identification of Top-tier Talent',
    desc: 'Our talent acquisition service is dedicated to sourcing, attracting, and securing the best talent tailored to your organization\'s unique needs. We meticulously identify individuals who not only possess the requisite skills but also align with your company culture and long-term objectives.',
  },
  {
    img: pic2,
    title: 'Industry Knowledge',
    desc: 'We begin by gaining a thorough understanding of your industry dynamics, market trends, and specific talent requirements. This insight allows us to develop targeted strategies that resonate with potential candidates and effectively address your hiring needs.',
  },
  {
    img: pic3,
    title: 'Streamlined Hiring Process',
    desc: 'We believe in efficiency and effectiveness. Our streamlined hiring process ensures a seamless experience for both candidates and clients, from initial screening to final offer acceptance.',
  },
  {
    img: pic4,
    title: 'Personalized Approach',
    desc: 'Recognizing that every organization is unique, we tailor our approach to align with your specific goals, values, and expectations. Whether you require executive search services or high-volume recruitment, we customize our solutions to meet your evolving needs.',
  },
];

function ServicesSection() {
  return (
    <section
      className="w-full py-16 font-sans"
      style={{
        backgroundImage: `url(${cardBgPic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Heading */}
        <h2 className="text-[#111111] font-bold text-3xl md:text-4xl text-center mb-10">
          Our <span className="text-[#C8102E]">Recruitment</span> & Staffing Services
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col bg-white border-b-4 border-b-[#C8102E]"
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-3">
                <h3 className="text-[#111111] font-bold text-base leading-snug group-hover:text-[#C8102E] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#444444] text-base leading-relaxed flex-1">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden font-sans">
      <div
        className="absolute bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          width: '100%',
          maxWidth: '2044px',
          height: '818px',
          top: '-38px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundImage: `url(${AboutHeroBg})`,
          opacity: 1,
          zIndex: 1,
        }}
      />
      <div className="absolute inset-0 bg-black/10 z-10 h-[780px]" />
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 h-[680px] md:h-[750px] flex flex-col justify-center items-center text-center">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-[52px] tracking-wide max-w-6xl leading-tight hover:-translate-y-2 transition-transform duration-300">
          Talent Acquisition
        </h1>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    'Access To Top Talent',
    'Reduced Hiring Time',
    'Improved Candidate Quality',
    'Cost-Effective Recruitment Solutions',
    'Scalable Hiring Support',
    'Better Workforce Planning',
    'Enhanced Employee Retention',
    'Dedicated Recruitment Experts',
  ];

  return (
    <section className="w-full py-16 font-sans bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.10)] rounded-2xl p-10">

          {/* Left - Overlapping Images */}
          <div className="relative w-full lg:w-1/2 h-[480px] flex-shrink-0">
            {/* Back image - taller, narrower */}
            <div className="absolute top-0 left-0 w-[60%] rounded-2xl overflow-hidden shadow-lg z-10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img
                src={Image1}
                alt="Team meeting"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ height: '320px' }}
              />
            </div>
            {/* Front image - wider */}
            <div className="absolute bottom-0 right-0 w-[68%] rounded-2xl overflow-hidden shadow-xl z-20 border-4 border-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img
                src={Image2}
                alt="Business handshake"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ height: '260px' }}
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <h2 className="text-[#111111] font-bold text-3xl md:text-4xl leading-snug transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
              Benefits Of Our Talent{' '}
              <span className="text-[#C8102E]">Acquisition</span> Services
            </h2>

            <p className="text-[#444444] text-base leading-relaxed">
              Our talent acquisition solutions are designed to help businesses build
              stronger teams with skilled professionals, efficient hiring strategies, and a
              seamless recruitment experience.
            </p>

            <p className="text-[#111111] font-bold text-base">Why Businesses Choose Us</p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {benefits.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-[#444444] text-sm transition-colors duration-200 hover:text-[#C8102E] cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#444444] flex-shrink-0 transition-colors duration-200 group-hover:bg-[#C8102E]"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
function Service1() {
  return (
    <div className="w-full bg-white">
      <AboutHero />
      <ServicesSection />
      <BenefitsSection />
    </div>
    )
}

export default Service1