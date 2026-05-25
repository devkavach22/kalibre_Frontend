import React, { useState, useRef } from "react";
import HeroImage from "../assets/LandingHero.png";
import AboutBg from "../assets/AboutBg.jpg";
import girl1 from "../assets/girl1.png";
import girl2 from "../assets/girl2.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.jpg";
import C1 from "../assets/C1.png";
import C2 from "../assets/C2.png";
import C3 from "../assets/C3.png";
import C4 from "../assets/C4.png";
import C5 from "../assets/C5.png";
import C6 from "../assets/C6.png";
import person from "../assets/Log.png";
import building from "../assets/Building.png";
import hand from "../assets/Hand.png";
import ThreeCardBg from "../assets/Threecard.jpg";
import company1 from "../assets/Compnay1.png";
import company2 from "../assets/Compnay2.png";
import company3 from "../assets/Compnay3.png";
import company4 from "../assets/Compnay4.png";
import Transport from "../assets/Trasnsport.png"
import Energy from "../assets/Energy.png"
import unity from "../assets/unity.png"
import bulding from "../assets/Bulding.png"
import Power from "../assets/Power.png"
import medical from "../assets/Medical.png"
import Enginer from "../assets/Enginer.png"






function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex items-center pt-[120px] pb-10">
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{
          width: "1000px",
          height: "1000px",
          top: "50%",
          right: "-290px",
          transform: "translateY(-50%) rotate(46.16deg)",
          borderRadius: "140px",
          background: "linear-gradient(223.65deg, #FFBEC4 3.22%, #FFFAFA 96.78%)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none block sm:hidden"
        style={{
          width: "300px",
          height: "300px",
          top: "10%",
          right: "-60px",
          transform: "rotate(46.16deg)",
          borderRadius: "60px",
          background: "linear-gradient(223.65deg, #FFBEC4 3.22%, #FFFAFA 96.78%)",
          zIndex: 0,
        }}
      />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="flex-1 max-w-[580px]">
          <div className="inline-flex items-center mb-5">
            <span
              className="text-[#C8102E] font-semibold text-[13px] px-4 py-1.5 rounded-full"
              style={{ border: "1.5px solid #FFBEC4", background: "#FFF5F6" }}
            >
              Trusted by over 2M+ users
            </span>
          </div>
          <h1
            className="text-[#111111] font-bold mb-5 leading-[1.08]"
            style={{
              fontSize: "clamp(38px, 4.2vw, 60px)",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            Build Your Dream Team
            <br />
            with{" "}
            <span style={{ color: "#C8102E", fontStyle: "normal" }}>India's</span>{" "}
            Trusted
            <br />
            Staffing Partner
          </h1>
          <p
            className="text-[#555555] leading-[1.75] mb-9"
            style={{ fontSize: "clamp(14px, 1.1vw, 16px)", fontWeight: 400, maxWidth: "480px" }}
          >
            Kalibre helps businesses scale faster with expert recruitment,
            manpower outsourcing, remote staffing, and end-to-end HR solutions
            tailored for modern organizations.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/register"
              className="inline-flex items-center gap-2 text-white font-semibold rounded-full px-7 py-3.5 transition-all duration-200 hover:opacity-90"
              style={{ background: "#C8102E", fontSize: "15px" }}
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3.5 transition-all duration-200 text-[#C8102E] hover:bg-[#C8102E] hover:text-white"
              style={{ border: "2px solid #C8102E", fontSize: "15px" }}
            >
              Book Free Consultation
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end items-center">
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: "clamp(260px, 38vw, 500px)",
                height: "clamp(260px, 38vw, 500px)",
                borderRadius: "52px",
                transform: "rotate(45deg)",
                overflow: "hidden",
                position: "relative",
                zIndex: 1,
              }}
            >
              <img
                src={HeroImage}
                alt="Kalibre Team"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: "rotate(-45deg) scale(1.45)",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "clamp(260px, 38vw, 500px)",
                height: "clamp(260px, 38vw, 500px)",
                borderRadius: "52px",
                transform: "rotate(45deg)",
                borderTop: "3px solid transparent",
                borderLeft: "3px solid transparent",
                borderBottom: "6px solid #C8102E",
                borderRight: "6px solid #C8102E",
                pointerEvents: "none",
                zIndex: 2,
                boxSizing: "border-box",
              }}
            />
          </div>
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
        <div className="flex items-center gap-4 md:gap-6 w-full lg:w-auto justify-center lg:justify-start lg:sticky lg:top-10 z-20 order-1">
          <div className="about-img-box about-img-left">
            <img src={girl1} alt="Kalibre Workspace" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="about-img-box about-img-right">
            <img src={girl2} alt="Kalibre Meeting" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        <div
          className="w-full lg:max-w-[680px] xl:max-w-[820px] flex flex-col pt-4 lg:pt-16 text-center lg:text-left items-center lg:items-start order-2 px-4 sm:px-0"
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

function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const servicesData = [
    {
      img: image1,
      title: "Talent Acquisition",
      desc: "Our talent acquisition service is dedicated to sourcing, attracting, and securing the best talent.",
      link: "/talent"
    },
    {
      img: image2,
      title: "Manpower Outsourcing",
      desc: "Our manpower outsourcing solution offers end-to-end support for all your temporary or project-based.",
      link: "/manpower"
    },
    {
      img: image3,
      title: "Remote Staffing",
      desc: "Our remote staffing service opens doors to a diverse talent pool spanning the globe.",
      link: "/remote-staffing"
    },
    {
      img: image4,
      title: "Recruitment Process Outsourcing (RPO)",
      desc: "Our RPO service delivers seamless, scalable hiring support to optimize your recruitment process and secure top talent with efficiency.",
      link: "/rpo"
    }
  ];

  const scrollToIndex = (index) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      const totalScrollWidth = container.scrollWidth;
      const numCards = servicesData.length;
      const gap = 24;
      const totalGaps = (numCards - 1) * gap;
      const cardWidth = (totalScrollWidth - totalGaps) / numCards;

      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth"
      });
    }
  };

  const handleScrollUpdate = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const totalScrollWidth = container.scrollWidth;
      const numCards = servicesData.length;
      const gap = 24;
      const totalGaps = (numCards - 1) * gap;
      const cardWidth = (totalScrollWidth - totalGaps) / numCards;

      const computedIndex = Math.round(container.scrollLeft / (cardWidth + gap));
      if (computedIndex !== activeIndex && computedIndex >= 0 && computedIndex < servicesData.length) {
        setActiveIndex(computedIndex);
      }
    }
  };

  return (
    <section
      style={{
        width: "100%",
        minHeight: "958px",
        paddingTop: "40px",
        paddingBottom: "40px",
        background: "linear-gradient(270deg, #FFFFFF 0%, #FFF0F1 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
      className="px-6 md:px-12 xl:px-[97px]"
    >
      <div className="w-full max-w-[1728px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <span
            className="text-[#C8102E] font-semibold text-[13px] px-4 py-1.5 rounded-full inline-block mb-3"
            style={{ border: "1.5px solid #FFBEC4", background: "#FFF5F6" }}
          >
            Our Service
          </span>
          <h2 className="text-[#111111] font-bold tracking-wide leading-tight text-3xl md:text-4xl lg:text-[42px]">
            What We Offer Connecting <br className="hidden sm:inline" />
            Talent with <span className="text-[#FA2329]">Opportunity</span>
          </h2>
        </div>
        <a
          href="/services"
          className="inline-flex items-center gap-2 text-white font-semibold rounded-full transition-transform duration-200 hover:scale-[1.02]"
          style={{
            padding: "15px 35px",
            background: "linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)",
            fontSize: "15px"
          }}
        >
          View All Service
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScrollUpdate}
        className="w-full max-w-[1728px] mx-auto overflow-x-auto pb-6 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          touchAction: "pan-x",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex gap-6 md:gap-8 flex-nowrap">
          {servicesData.map((service, index) => {
            const isCurrentlyActive = activeIndex === index;
            return (
              <div
                key={index}
                className={`bg-white flex flex-col justify-between overflow-hidden border transition-all duration-500 snap-start group
                  ${isCurrentlyActive ? "shadow-xl scale-[1.01] border-[rgba(250,35,41,0.3)]" : "shadow-sm border-[rgba(254,190,196,0.4)] hover:shadow-xl hover:scale-[1.01] hover:border-[rgba(250,35,41,0.3)]"}
                `}
                style={{
                  width: "clamp(300px, 80vw, 380px)",
                  height: "487px",
                  borderRadius: "30px",
                  flexShrink: 0,
                }}
              >
                <div className="w-full h-[360px] overflow-hidden relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-transform duration-500 
                      ${isCurrentlyActive ? "scale-110" : "group-hover:scale-110"}
                    `}
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: "24px" }} className="text-[#111111] mb-2">
                      {service.title}
                    </h3>
                    <p style={{ fontWeight: 500, fontSize: "15px" }} className="text-[#555555] line-clamp-3">
                      {service.desc}
                    </p>
                  </div>
                  <a href={service.link} className="text-[#FA2329] font-bold text-sm hover:underline inline-flex items-center gap-1">
                    Read More
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        {servicesData.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 ${activeIndex === index ? "w-12 bg-[#FA2329]" : "w-3 bg-[#FEBEBE] hover:bg-[#FA2329]/60"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
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

function StatsSection() {
  const stats = [
    {
      icon: person,
      number: "4000+",
      text: "With the expertise of finding the right candidate for the right job, we have successfully placed 4000+ people."
    },
    {
      icon: building,
      number: "50+",
      text: "Industry verticals served with the understanding of their entire operations like the back of our hand."
    },
    {
      icon: hand,
      number: "200+",
      text: "Satisfied Clients across India who have passed on their hiring baton to us and refer Kalibre's services among their contacts."
    }
  ];

  return (
    <section
      className="w-full py-20 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${ThreeCardBg})` }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-row flex-wrap lg:flex-nowrap justify-center items-center gap-6 xl:gap-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md w-full sm:w-auto"
            style={{
              width: "459px",
              height: "305px",
              gap: "10px",
              borderRadius: "20px",
              backgroundColor: "#FFFFFF",
              boxSizing: "border-box",
              paddingTop: "33px",
              paddingRight: "17px",
              paddingBottom: "32px",
              paddingLeft: "17px",
              borderBottom: "5px solid #C1272D"
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <img src={stat.icon} alt="Metric Icon" className="max-w-full max-h-full object-contain" />
            </div>
            <h3 className="text-[#C1272D] text-3xl md:text-[36px] font-bold leading-tight">
              {stat.number}
            </h3>
            <p className="text-[#111111] text-[14px] md:text-[15px] font-medium leading-relaxed max-w-[400px]">
              {stat.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrendingJobsSection() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const jobsData = [
    {
      id: 1,
      category: "IT Services",
      logo: company1,
      title: "UX/UI Designer",
      company: "Averox Construction",
      location: "800 Robson St, Vancouver, BC V6Z 3B7, Canada",
      salary: "$111 – $125",
      tags: ["Freelance", "Full-time"],
    },
    {
      id: 2,
      category: "BFSI",
      logo: company2,
      title: "Product Manager",
      company: "NovaTech Solutions",
      location: "120 Queen St, Toronto, ON M5H 2N2, Canada",
      salary: "$95 – $110",
      tags: ["Permanent", "Full-time"],
    },
    {
      id: 3,
      category: "Analytics",
      logo: company3,
      title: "Data Scientist",
      company: "BlueWave Analytics",
      location: "450 King St, San Francisco, CA 94107, USA",
      salary: "$130 – $150",
      tags: ["Contract", "Part-time"],
    },
    {
      id: 4,
      category: "Marketing jobs",
      logo: company4,
      title: "Marketing Coordinator",
      company: "GreenLeaf Marketing",
      location: "33 Oxford Rd, London, UK W1D 1BP",
      salary: "£45,000 – £52,000",
      tags: ["Temporary", "Full-time"],
    },
    {
      id: 5,
      category: "Sale & Marketing",
      logo: company4,
      title: "Marketing Coordinator",
      company: "GreenLeaf Marketing",
      location: "33 Oxford Rd, London, UK W1D 1BP",
      salary: "£45,000 – £52,000",
      tags: ["Temporary", "Full-time"],
    },
    {
      id: 6,
      category: "IT Services",
      logo: company1,
      title: "UX/UI Designer",
      company: "Averox Construction",
      location: "800 Robson St, Vancouver, BC V6Z 3B7, Canada",
      salary: "$111 – $125",
      tags: ["Freelance", "Full-time"],
    },
    {
      id: 7,
      category: "BFSI",
      logo: company2,
      title: "Product Manager",
      company: "NovaTech Solutions",
      location: "120 Queen St, Toronto, ON M5H 2N2, Canada",
      salary: "$95 – $110",
      tags: ["Permanent", "Full-time"],
    },
    {
      id: 8,
      category: "Remote",
      logo: company3,
      title: "Data Scientist",
      company: "BlueWave Analytics",
      location: "450 King St, San Francisco, CA 94107, USA",
      salary: "$130 – $150",
      tags: ["Contract", "Part-time"],
    },
  ];

  const filters = ["All", "IT Services", "BFSI", "Remote", "Marketing jobs", "Sale & Marketing", "Analytics"];

  const filteredJobs = selectedFilter === "All"
    ? jobsData
    : jobsData.filter((job) => job.category === selectedFilter);

  return (
    <section className="w-full py-16 bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center">

        <div className="inline-flex items-center mb-4">
          <span
            className="text-[#C8102E] font-semibold text-[13px] px-10 py-2 rounded-full"
            style={{ background: "linear-gradient(90deg, rgba(255,216,218,0) 0%, #FFD8DA 50%, rgba(255,216,218,0) 100%)" }}
          >
            Trending jobs
          </span>
        </div>

        <h2 className="text-[#111111] text-3xl md:text-[42px] font-bold text-center mb-8">
          Find Your Perfect <span className="text-[#C8102E]">Career</span> Opportunity
        </h2>

        <div className="flex flex-col items-center gap-3 mb-12 w-full">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.slice(0, 5).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className="px-5 py-2 font-medium text-sm transition-all duration-200 border whitespace-nowrap hover:scale-105"
                style={{
                  borderRadius: "8px",
                  backgroundColor: selectedFilter === filter ? "#C8102E" : "#FFFFFF",
                  color: selectedFilter === filter ? "#FFFFFF" : "#555555",
                  borderColor: selectedFilter === filter ? "#C8102E" : "#E0E0E0",
                }}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {filters.slice(5).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className="px-5 py-2 font-medium text-sm transition-all duration-200 border whitespace-nowrap hover:scale-105"
                style={{
                  borderRadius: "8px",
                  backgroundColor: selectedFilter === filter ? "#C8102E" : "#FFFFFF",
                  color: selectedFilter === filter ? "#FFFFFF" : "#555555",
                  borderColor: selectedFilter === filter ? "#C8102E" : "#E0E0E0",
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white flex flex-col justify-between relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-pointer"
              style={{
                borderRadius: "16px",
                border: "1.5px solid #F0F0F0",
                padding: "28px 24px",
                minHeight: "380px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex justify-end mb-3">
                <button className="text-gray-300 hover:text-[#C8102E] transition-all duration-200 hover:scale-125">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ width: "72px", height: "72px", borderRadius: "14px", background: "#F5F5F5" }}
                >
                  <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-[#C8102E] font-bold text-[15px] leading-tight group-hover:underline transition-all">
                    {job.title}
                  </p>
                  <p className="text-[#888888] text-[13px] mt-1">{job.company}</p>
                </div>
              </div>

              <p className="text-[#666666] text-[13px] leading-relaxed mb-3 line-clamp-2">
                {job.location}
              </p>

              <p className="text-[#111111] text-[18px] font-bold mb-3">
                {job.salary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[12px] px-3 py-1 rounded-full font-medium transition-all duration-200 hover:bg-[#C8102E] hover:text-white cursor-pointer"
                    style={{ background: "#FFF0F1", color: "#C8102E", border: "1px solid #FFCDD0" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a

                href="#"
                className="w-full inline-flex items-center justify-center gap-2 text-white font-semibold rounded-full py-3.5 transition-all duration-200 hover:bg-[#a50d25] hover:scale-[1.02] active:scale-95"
                style={{ background: "#C8102E", fontSize: "14px" }}
              >
                Apply Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function IndustriesSection() {
  const industriesData = [
    { id: 1, img: Transport, title: "Transport", tags: ["Road", "Highway", "Bridge", "Metro", "Rail", "Airport"] },
    { id: 2, img: Energy, title: "Energy", tags: ["Solar", "Wind", "Hydro", "Renewable", "Waste", "Thermal"] },
    { id: 3, img: unity, title: "Utilities", tags: ["Water", "Electricity", "Gas"] },
    { id: 4, img: bulding, title: "Infra", tags: ["Residential", "Commercial", "Industrial"] },
    { id: 5, img: medical, title: "Pharma", tags: ["API", "Injectable", "Formulation", "R & D", "Sales"] },
    { id: 6, img: Enginer, title: "Engineering", tags: ["Steel", "Mines", "Auto", "Cement", "Auto Ancillary"] },
    { id: 7, img: Power, title: "Power", tags: ["Transmission", "Distribution", "Cables"] },
    { id: 8, img: bulding, title: "Furniture", tags: ["Plywood", "Veneer", "PVC", "Laminates"] },
  ];

  return (
    <section className="w-full py-16 flex flex-col items-center justify-center" style={{ background: "linear-gradient(270deg, #FFFFFF 0%, #FFF0F1 100%)" }}>
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center">
        <div className="inline-flex items-center mb-4">
          <span
            className="text-[#C8102E] font-semibold text-[13px] px-10 py-2 rounded-full"
            style={{ background: "linear-gradient(90deg, rgba(255, 216, 218, 0) 0%, #FFD8DA 50%, rgba(255, 216, 218, 0) 100%)" }}
          >
            Industry
          </span>
        </div>
        <h2 className="text-[#111111] text-3xl md:text-[42px] font-bold text-center mb-12">
          The <span className="text-[#C8102E]">industries</span> we cater to are
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriesData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
              style={{ borderBottom: "3px solid #C8102E" }}
            >
              <div className="w-full h-[200px] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5">
                <h3 className="text-[#111111] text-lg font-bold mb-3">{item.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[12px] px-3 py-1 rounded-full font-medium" style={{ color: "#C8102E", background: "#FFE8EA" }}>
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

function LandingPage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BrandsLogoSection />
      <StatsSection />
      <TrendingJobsSection />
      <IndustriesSection />
    </div>
  );
}

export default LandingPage;