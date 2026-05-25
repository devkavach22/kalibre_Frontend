import React from 'react'
import AboutHeroBg from "../assets/RBg.png"
import cardBgPic from "../assets/AboutBg.jpg";
import pic1 from "../assets/R1.png";
import pic2 from "../assets/R2.png";
import pic3 from "../assets/R3.png";
import remoteImg from "../assets/CleanImage.png"

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
          Remote Staffing
        </h1>
      </div>
    </section>
  );
}

const services = [
  {
    img: pic1,
    title: 'Global Talent Access',
    desc: 'Our remote staffing service opens doors to a diverse talent pool spanning the globe. Regardless of geographical constraints, we connect you with skilled professionals who possess the expertise and flexibility to work remotely, ensuring access to top talent regardless of location.',
  },
  {
    img: pic2,
    title: 'Tailored Remote Workforce Solutions',
    desc: 'Whether you seek full-time remote employees, part-time contractors, or project-based freelancers, we customize our remote staffing solutions to meet your specific needs.',
  },
  {
    img: pic3,
    title: 'Performance Monitoring and Support',
    desc: 'Our remote staffing service includes ongoing performance monitoring and support to ensure productivity and engagement. We provide regular check-ins and support services to address any challenges or concerns that may arise.',
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

        {/* Row 1 - 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {services.slice(0, 3).map((service, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col bg-white border-b-4 border-b-[#C8102E] w-full lg:h-[490px] lg:w-[380px]"
            >
              <div className="relative overflow-hidden flex-shrink-0 h-[220px] lg:h-[240px]">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-6 gap-3 overflow-hidden">
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

function RemoteInfoSection() {
  return (
    <section className="w-full py-16 font-sans bg-[#FFF5F5]">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left - Image with red background box — mobile: responsive, desktop: original */}
          <div className="relative flex-shrink-0 w-full flex justify-center lg:w-[480px] h-[300px] sm:h-[360px] lg:h-[420px]">
            {/* Red background box */}
            <div
              className="absolute"
              style={{
                width: 'min(380px, 80%)',
                height: 'min(360px, 90%)',
                top: '16px',
                left: '50%',
                transform: 'translateX(-40%)',
                borderRadius: '30px',
                background: 'linear-gradient(227.61deg, #C1272D 2.08%, #FB2C36 97.92%)',
                zIndex: 1,
              }}
            />
            {/* Image on top */}
            <div
              className="absolute overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                width: 'min(400px, 85%)',
                height: 'min(370px, 95%)',
                top: '30px',
                left: '50%',
                transform: 'translateX(-35%)',
                borderRadius: '30px',
                zIndex: 2,
              }}
            >
              <img
                src={remoteImg}
                alt="Remote Staffing"
                className="w-full h-full object-cover brightness-125"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-[#111111] font-bold text-3xl md:text-4xl leading-snug transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
              Smart <span className="text-[#C8102E]">Remote</span> Staffing Solutions
            </h2>

            <p className="text-[#444444] text-base leading-relaxed">
              Our remote staffing services help businesses build flexible and productive
              remote teams with access to skilled professionals across multiple industries.
              We provide cost-effective workforce solutions that support business growth
              while ensuring seamless collaboration and operational efficiency.
            </p>

            <p className="text-[#444444] text-base leading-relaxed">
              With customized hiring models and dedicated remote workforce support, we
              help organizations scale faster, reduce operational costs, and manage
              remote teams effectively. Our goal is to deliver the right talent that aligns
              with your business needs and long-term objectives.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

function Service3() {
  return (
    <div className="w-full bg-white">
      <AboutHero />
      <ServicesSection />
      <RemoteInfoSection />
    </div>
  )
}

export default Service3