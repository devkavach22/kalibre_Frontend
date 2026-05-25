import React from 'react'
import AboutHeroBg from "../assets/IndustryBg.png";
import IndustryBg from "../assets/AboutBg.jpg";
import image1 from "../assets/Industry.png"
import image2 from "../assets/Industry2.png"
import C1 from "../assets/C1.png";
import C2 from "../assets/C2.png";
import C3 from "../assets/C3.png";
import C4 from "../assets/C4.png";
import C5 from "../assets/C5.png";
import C6 from "../assets/C6.png";
import Transport from "../assets/Trasnsport.png"
import Energy from "../assets/Energy.png"
import unity from "../assets/unity.png"
import bulding from "../assets/Bulding.png"
import Power from "../assets/Power.png"
import medical from "../assets/Medical.png"
import Enginer from "../assets/Enginer.png"

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
          A Strategic Approach To  <br />
          Smarter Hiring        </h1>
        <div className="flex items-center gap-2 text-white font-semibold text-2xl mt-5">
          <span className="text-[#C8102E] hover:-translate-y-2 transition-transform duration-300 inline-block">Industry</span>
        </div>
      </div>
    </section>
  );
}

function IndustrySection() {
  return (
    <section
      className="w-full relative overflow-hidden font-sans py-16"
      style={{
        backgroundImage: `url(${IndustryBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-16">

        {/* Images — mobile: stacked full width, desktop: original overlapping fixed layout */}
        <div className="relative flex-shrink-0 w-full lg:w-[450px] h-[320px] sm:h-[380px] lg:h-[450px]">
          {/* Image 1 - Back */}
          <img
            src={image1}
            alt="Industry 1"
            className="absolute rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
            style={{
              width: 'min(380px, 85%)',
              height: 'min(280px, 55%)',
              top: '0px',
              left: '0px',
              zIndex: 1,
            }}
          />
          {/* Image 2 - Front overlapping */}
          <img
            src={image2}
            alt="Industry 2"
            className="absolute rounded-2xl object-cover shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
            style={{
              width: 'min(340px, 80%)',
              height: 'min(260px, 50%)',
              bottom: '0px',
              left: 'min(80px, 15%)',
              zIndex: 2,
            }}
          />
        </div>

        {/* Content Right */}
        <div className="flex flex-col text-left flex-1 w-full" style={{ gap: '28px' }}>
          <h2 className="text-[#111111] font-bold text-3xl md:text-4xl leading-tight hover:-translate-y-1 transition-transform duration-300">
            Industry-Focused <span className="text-[#C8102E]">Recruitment</span><br />
            Expertise
          </h2>
          <div className="flex flex-col gap-4 text-[#333333] text-base leading-relaxed">
            <p>
              We understand that every industry has unique workforce requirements, hiring
              challenges, and business goals. Our specialized recruitment and staffing
              solutions are designed to help organizations find skilled professionals who
              align with their industry demands and company culture.
            </p>
            <p>
              With deep market knowledge and a strong talent network, we deliver
              customized workforce solutions across multiple sectors, ensuring faster
              hiring, improved productivity, and long-term business success.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)',
              borderRadius: '40px',
              width: 'fit-content',
            }}
          >
            Let's Connect
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function BrandsLogoSection() {
  const brands = [C1, C2, C3, C4, C5, C6];

  return (
    <section className="w-full py-12 bg-[#FFFFFF] flex items-center justify-center border border-gray-200 rounded-2xl">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-10">
          {brands.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center max-w-[180px] h-[65px] transition-transform duration-200 hover:scale-105">
              <img src={logo} alt={`Brand Logo ${idx + 1}`} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const industriesData = [
    {
      id: 1,
      img: Transport,
      title: "Transport",
      tags: ["Road", "Highway", "Bridge", "Metro", "Rail", "Airport"],
    },
    {
      id: 2,
      img: Energy,
      title: "Energy",
      tags: ["Solar", "Wind", "Hydro", "Renewable", "Waste", "Thermal"],
    },
    {
      id: 3,
      img: unity,
      title: "Utilities",
      tags: ["Water", "Electricity", "Gas"],
    },
    {
      id: 4,
      img: bulding,
      title: "Infra",
      tags: ["Residential", "Commercial", "Industrial"],
    },
    {
      id: 5,
      img: medical,
      title: "Pharma",
      tags: ["API", "Injectable", "Formulation", "R & D", "Sales"],
    },
    {
      id: 6,
      img: Enginer,
      title: "Engineering",
      tags: ["Steel", "Mines", "Auto", "Cement", "Auto Ancillary"],
    },
    {
      id: 7,
      img: Power,
      title: "Power",
      tags: ["Transmission", "Distribution", "Cables"],
    },
    {
      id: 8,
      img: bulding,
      title: "Furniture",
      tags: ["Plywood", "Veneer", "PVC", "Laminates"],
    },
  ];

  return (
    <section className="w-full py-16 flex flex-col items-center justify-center" style={{ background: "linear-gradient(270deg, #FFFFFF 0%, #FFF0F1 100%)" }}>
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center">

        {/* Badge */}
        <div className="inline-flex items-center mb-4">
          <span
            className="text-[#C8102E] font-semibold text-[13px] px-10 py-2 rounded-full"
            style={{ background: "linear-gradient(90deg, rgba(255, 216, 218, 0) 0%, #FFD8DA 50%, rgba(255, 216, 218, 0) 100%)" }}
          >
            Industry
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#111111] text-3xl md:text-[42px] font-bold text-center mb-12">
          The <span className="text-[#C8102E]">industries</span> we cater to are
        </h2>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriesData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
              style={{
                borderBottom: "3px solid #C8102E",
              }}
            >
              {/* Image */}
              <div className="w-full h-[200px] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[#111111] text-lg font-bold mb-3">
                  {item.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[12px] px-3 py-1 rounded-full font-medium"
                      style={{
                        color: "#C8102E",
                        background: "#FFE8EA",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Industry() {
  return (
    <div className="w-full bg-white">
      <AboutHero />
      <IndustrySection />
      <BrandsLogoSection />
      <IndustriesSection />
    </div>
  )
}

export default Industry