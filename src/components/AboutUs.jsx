import React from 'react';
import AboutHeroBg from "../assets/AboutPageBg.png";
import AboutBg from "../assets/AboutBg.jpg";
import girl1 from "../assets/girl1.png";
import girl2 from "../assets/girl2.png";
import Taksh from "../assets/Taksh.png";
import bhumika from "../assets/bhumika.png";
import Rajwant from "../assets/Rajwant.png";
import C1 from "../assets/C1.png";
import C2 from "../assets/C2.png";
import C3 from "../assets/C3.png";
import C4 from "../assets/C4.png";
import C5 from "../assets/C5.png";
import C6 from "../assets/C6.png";
import ThreeCardBg from "../assets/Threecard.jpg";

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
          Your Trusted <br />
          Recruitment & Staffing Partner
        </h1>
        <div className="flex items-center gap-2 text-white font-semibold text-2xl mt-5">
          <span className="text-[#C8102E] hover:-translate-y-2 transition-transform duration-300 inline-block">About Kalibre</span>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      className="relative w-full py-12 md:py-20 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${AboutBg})` }}
    >
      <style>{`
        .about-img-box {
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
          border: 1px solid rgba(0,0,0,0.08);
          background: #f3f4f6;
          overflow: hidden;
          width: 320px;
          height: 460px;
          border-radius: 20px;
        }
        .about-img-left {
          transform: translateY(-24px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        }
        .about-img-left:hover {
          transform: translateY(-32px) scale(1.03);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .about-img-right {
          transform: translateY(24px);
          box-shadow: 0 10px 35px rgba(0,0,0,0.08);
        }
        .about-img-right:hover {
          transform: translateY(16px) scale(1.03);
          box-shadow: 0 20px 45px rgba(0,0,0,0.15);
        }
        .about-img-box img {
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .about-img-box:hover img {
          transform: scale(1.04);
        }
        @media (max-width: 768px) {
          .about-img-box {
            width: 46%;
            height: 320px;
            border-radius: 16px;
          }
          .about-img-left { transform: translateY(-12px); }
          .about-img-left:hover { transform: translateY(-16px) scale(1.02); }
          .about-img-right { transform: translateY(12px); }
          .about-img-right:hover { transform: translateY(8px) scale(1.02); }
        }
        @media (max-width: 480px) {
          .about-img-box {
            width: 140px;
            height: 200px;
            border-radius: 12px;
          }
          .about-img-left { transform: translateY(-8px); }
          .about-img-left:hover { transform: translateY(-12px) scale(1.02); }
          .about-img-right { transform: translateY(8px); }
          .about-img-right:hover { transform: translateY(4px) scale(1.02); }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8">

        {/* IMAGE SECTION */}
        <div className="flex items-center gap-4 md:gap-6 w-full lg:w-auto justify-center lg:justify-start lg:sticky lg:top-10 z-20 order-1">
          <div className="about-img-box about-img-left">
            <img src={girl1} alt="Kalibre Workspace" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="about-img-box about-img-right">
            <img src={girl2} alt="Kalibre Meeting" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div
          className="w-full lg:max-w-[680px] xl:max-w-[820px] flex flex-col pt-4 lg:pt-16 text-center lg:text-left items-center lg:items-start order-2 px-4 sm:px-6 lg:px-0"
          style={{ minHeight: "auto" }}
        >
          <h2 className="text-[#111111] text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-wide leading-tight">
            About Kalibre
          </h2>

          <div className="text-[#555555] font-normal space-y-6 text-sm md:text-[15px] leading-relaxed max-w-[780px]">
            <p>
              Established in 2009, Kalibre is a Human Resource outsourcing company. We
              provide staffing solutions for diverse functional roles across various
              industries. With 10+ years of experience, we offer services covering Talent
              Acquisition, Manpower Outsourcing, Remote Staffing, and Recruitment
              Process Outsourcing. Kalibre can help you hire skilled professionals for full-
              time and freelance positions for short- or long-term assignments.
            </p>
            <p>
              Our central Recruitment team believes in delivering quality assets to our
              client's company. To achieve this, our recruitment team delves deep into the
              industries we cater to and does thorough research about the client's
              company values, culture, and beliefs.
            </p>
            <p>
              We mark our presence in 4 countries – India, Ireland, Singapore, and UAE. We
              also cater to other parts of the world when needed.
            </p>
          </div>

          <div className="mt-10 mb-4">
            <a
              href="/register"
              className="inline-flex items-center justify-center text-white font-semibold shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
              style={{
                width: "228px",
                height: "57px",
                borderRadius: "40px",
                padding: "15px 40px",
                gap: "10px",
                background: "linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)",
                fontSize: "15px"
              }}
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function OurTeam() {
  const teamMembers = [
    {
      name: "Dr. Rajwant Kumar Rai",
      role: "Founder of Kavach and Kalibre",
      image: Rajwant,
      description: "Dr. Rajwant Kumar Rai leads Kavach and Kalibre, pioneering companies in human resources and logistics. As founder, his expertise has driven the company's success, employing over 20,000 people. At 45, with an MCA in IT, Dr. Rai's notable career includes a transformative role at a large PSU worth 10000 crores for seven years. His decade plus long strategic leadership has made Kavach and Kalibre leaders in manpower outsourcing, integrating cutting-edge technologies and setting industry benchmarks.",
      imageLeft: true
    },
    {
      name: "Bhumika Iyer",
      role: "Founder & Director",
      image: bhumika,
      description: "Bhumika Iyer comes with a sound experience of more than 23 years of experience in the Talent Acquisition industry. Having been in the industry for almost 2 decades, she confidently oversees the Global Recruitment strategy, its operations, and Business Development at Kalibre. She has witnessed the change happening in the recruitment industry throughout her vast experience which enables her to face challenges head on and mentor the team for industry-specific requirements. Her expertise lies in making seamless and timely closures for clients. She brings a unique and diverse experience, partnering with the HR (single window solution) domain responsible for Recruitment, Training & Development, and Outsourcing. Her wide-ranging experience in several industries, her passion for aligning recruitment with quality, and her strong belief in long-term client relationships make her a competent recruitment partner.\n\nShe has been awarded Top 25 Women who have made a difference in TA. She also received the Companies International Women Entrepreneur Award 2024.",
      imageLeft: false
    },
    {
      name: "Taksh Rawal",
      role: "Director of Marketing",
      image: Taksh,
      description: "Taksh Rawal, second generation in the business is Director of Marketing and Operations at Kalibre Global and Kavach, has over a decade of industry experience. As a second-generation entrepreneur, he influences recruiting, staffing, and HR services. Leading marketing and operations, Taksh enhances service delivery through advanced analytics. At Kalibre Global, he oversees elite recruiting services for CXO roles, particularly in IT and finance, while at Kavach, he manages operations and data for major organizations. His strategic leadership has significantly impacted both companies, driving growth and excellence.",
      imageLeft: true
    }
  ];

  return (
    <section
      className="w-full relative overflow-hidden font-sans"
      style={{
        maxWidth: '1931px',
        margin: '0 auto',
        padding: '34px 0px',
        boxSizing: 'border-box'
      }}
    >
      {/* Title */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-[#111111] text-3xl md:text-4xl font-extrabold tracking-wide">
          Leadership Team
        </h2>
      </div>

      {/* Team Members */}
      <div className="flex flex-col gap-0">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${member.imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 w-full px-6 sm:px-10 md:px-24 py-10 transition-all duration-300`}
            style={{
              background: member.imageLeft
                ? 'linear-gradient(270deg, #FFFFFF 0%, #FFF0F1 100%)'
                : 'linear-gradient(90deg, #FFFFFF 0%, #FFF0F1 100%)'
            }}
          >
            {/* Image */}
            <div className="flex-shrink-0 w-[280px] h-[320px] rounded-xl overflow-hidden border-l-4 border-b-4 border-[#C8102E]">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col text-left flex-1 px-2 sm:px-0">
              <h4 className="text-2xl font-bold text-[#111111]">{member.name}</h4>
              <p className="text-[#C8102E] font-semibold text-base mt-1 mb-3">{member.role}</p>
              {member.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-[#333333] text-base leading-relaxed mb-3">{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BrandsLogoSection() {
  const brands = [C1, C2, C3, C4, C5, C6];

  return (
    <section className="w-full py-12 bg-[#FFFFFF] flex items-center justify-center border-b border-gray-100">
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

function IndustriesWeServe() {
  const industries = [
    "Information Technology",
    "Healthcare",
    "Banking & Finance",
    "Manufacturing",
    "Retail & E-commerce",
    "Logistics & Supply Chain",
    "Telecommunications",
    "Education & Training"
  ];

  const [hoveredIdx, setHoveredIdx] = React.useState(null);

  return (
    <section
      className="w-full relative overflow-hidden font-sans py-16"
      style={{
        backgroundImage: `url(${ThreeCardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col items-center text-center">

        {/* Tag */}
        <span className="inline-block border border-[#C8102E] text-[#C8102E] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
          Industries
        </span>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: '40px',
            lineHeight: '100%',
            letterSpacing: '1px',
            textAlign: 'center',
          }}
          className="mb-10"
        >
          <span className="text-[#C8102E]">Industries</span>{" "}
          <span className="text-[#111111]">We Serve</span>
        </h2>

        {/* Industry Tags */}
        <div className="flex flex-wrap justify-center gap-4 max-w-[950px] w-full">
          {industries.map((industry, idx) => (
            <span
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                minWidth: '140px',
                height: '46.79px',
                borderRadius: '7.54px',
                border: `1.7px solid ${hoveredIdx === idx ? '#C8102E' : '#CCCCCC'}`,
                paddingTop: '7.39px',
                paddingBottom: '7.39px',
                paddingLeft: '20px',
                paddingRight: '20px',
                backgroundColor: hoveredIdx === idx ? '#C8102E' : 'white',
                color: hoveredIdx === idx ? 'white' : '#111111',
                transform: hoveredIdx === idx ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              {industry}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <div className="w-full bg-white">
      <AboutHero />
      <AboutSection />
      <OurTeam />
      <BrandsLogoSection />
      <IndustriesWeServe />
    </div>
  );
}

export default AboutUs;

