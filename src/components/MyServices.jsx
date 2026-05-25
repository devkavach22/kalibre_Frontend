// import React from 'react'
// import { Link } from "react-router-dom";
// import AboutHeroBg from "../assets/AboutPageBg.png";
// import cardBgPic from "../assets/AboutBg.jpg";
// import pic1 from "../assets/pic1.png";
// import pic2 from "../assets/pic2.png";
// import pic3 from "../assets/pic3.png";
// import pic4 from "../assets/pic4.png";
// import hands from "../assets/hands.png"

// function AboutHero() {
//   return (
//     <section className="relative w-full overflow-hidden font-sans">
//       <div
//         className="absolute bg-cover bg-center bg-no-repeat pointer-events-none"
//         style={{
//           width: '100%',
//           maxWidth: '2044px',
//           height: '818px',
//           top: '-38px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           backgroundImage: `url(${AboutHeroBg})`,
//           opacity: 1,
//           zIndex: 1,
//         }}
//       />
//       <div className="absolute inset-0 bg-black/10 z-10 h-[780px]" />
//       <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 h-[680px] md:h-[750px] flex flex-col justify-center items-center text-center">
//         <h1 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-[52px] tracking-wide max-w-6xl leading-tight hover:-translate-y-2 transition-transform duration-300">
//           Smart Workforce Solutions For <br />
//           Modern Businesses
//         </h1>
//         <div className="flex items-center gap-2 text-white font-semibold text-2xl mt-5">
//           <span className="text-[#C8102E] hover:-translate-y-2 transition-transform duration-300 inline-block">Services</span>
//         </div>
//       </div>
//     </section>
//   );
// }

// const services = [
//   {
//     img: pic1,
//     title: 'Talent Acquisition Services',
//     desc: 'We help businesses hire skilled professionals through smart recruitment solutions, quality candidate screening, and a faster, seamless hiring process.',
//     path: '/talent',
//   },
//   {
//     img: pic2,
//     title: 'Manpower Outsourcing',
//     desc: 'Flexible and scalable workforce solutions designed to help businesses manage operations efficiently with skilled professionals and reliable staffing support.',
//     path: '/manpower',
//   },
//   {
//     img: pic3,
//     title: 'Remote Staffing',
//     desc: 'Build a productive remote workforce with skilled professionals, flexible hiring models, and cost-effective staffing solutions tailored to your business needs.',
//     path: '/remote-staffing',
//   },
//   {
//     img: pic4,
//     title: 'Recruitment Process Outsourcing',
//     desc: 'Streamline your hiring process with end-to-end recruitment solutions designed to improve efficiency, reduce hiring costs, and deliver quality talent faster.',
//     path: '/rpo',
//   },
// ];

// const badges = [
//   'Experienced Recruitment Specialists',
//   'Faster Hiring Process',
//   'Industry-Focused Talent Solutions',
//   'Scalable Workforce Support',
//   'Quality Candidate Screening',
//   'Customized Staffing Strategies',
//   'Reliable HR & Payroll Support',
//   'Dedicated Client Assistance',
// ];

// function ServicesSection() {
//   return (
//     <section
//       className="w-full py-16 font-sans"
//       style={{
//         backgroundImage: `url(${cardBgPic})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">        {/* Heading */}
//         <h2 className="text-[#111111] font-bold text-3xl md:text-4xl text-center mb-10">
//           Our <span className="text-[#C8102E]">Recruitment</span> & Staffing Services
//         </h2>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map((service, idx) => (
//             <div
//               key={idx}
//               className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col bg-white border-b-4 border-b-[#C8102E]"
//             >
//               {/* Image */}
//               <div className="relative overflow-hidden" style={{ height: '220px' }}>
//                 <img
//                   src={service.img}
//                   alt={service.title}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>

//               {/* Content */}
//               <div className="flex flex-col flex-1 p-6 gap-3">
//                 <h3 className="text-[#111111] font-bold text-base leading-snug group-hover:text-[#C8102E] transition-colors duration-300">
//                   {service.title}
//                 </h3>
//                 <p className="text-[#444444] text-base leading-relaxed flex-1">
//                   {service.desc}
//                 </p>
//                 <Link
//                   to={service.path}
//                   className="inline-flex items-center gap-1.5 text-[#C8102E] font-semibold text-sm mt-1 transition-all duration-300 hover:gap-3"
//                 >
//                   Read More
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function WhyTrustSection() {
//   return (
//     <section className="w-full bg-white py-16 font-sans border border-gray-200 rounded-lg shadow-sm">
//       <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24">
//         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

//           <div className="relative flex-shrink-0 flex items-center justify-center animate-fade-in" style={{ width: '520px', height: '520px' }}>
//             <div
//               className="relative overflow-hidden transition-transform duration-500 hover:scale-105"
//               style={{
//                 width: '500px',
//                 height: '500px',
//                 borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
//                 borderTop: '6px solid #C8102E',
//                 borderRight: '6px solid #C8102E',
//                 borderLeft: 'none',
//                 borderBottom: 'none',
//               }}
//             >
//               <img
//                 src={hands}
//                 alt="Teamwork"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>

//           {/* Right — Content */}
//           <div className="flex flex-col flex-1 gap-6">
//             <h2 className="text-[#111111] font-bold text-3xl md:text-4xl leading-tight hover:-translate-y-1 transition-transform duration-300">
//               Why Businesses Trust <span className="text-[#C8102E]">Kalibre</span>
//             </h2>
//             <p className="text-[#444444] text-base leading-relaxed max-w-xl">
//               We combine industry expertise, smart hiring strategies, and customized
//               workforce solutions to help businesses find the right talent faster and more
//               efficiently. Our client-focused approach ensures quality hiring, seamless
//               workforce management, and long-term business success.
//             </p>

//             <div>
//               <h4 className="text-[#111111] font-bold text-base mb-4">What Makes Us Different</h4>
//               <div className="flex flex-wrap gap-3">
//                 {badges.map((badge, idx) => (
//                   <span
//                     key={idx}
//                     className="text-sm font-medium text-[#333333] bg-white border border-pink-300 px-4 py-2 rounded-md transform transition-all duration-300 hover:-translate-y-1 hover:border-[#C8102E] hover:text-[#C8102E] hover:bg-[#FFF0F1] hover:shadow-sm cursor-default"
//                   >
//                     {badge}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <a
//                 href="#"
//                 className="inline-flex items-center gap-2 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                 style={{
//                   background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)',
//                   width: 'fit-content',
//                 }}
//               >
//                 Let's Connect
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// function MyServices() {
//   return (
//     <div className="w-full bg-white">
//       <AboutHero />
//       <ServicesSection />
//       <WhyTrustSection />
//     </div>
//   );
// }

// export default MyServices;

import React from 'react'
import { Link } from "react-router-dom";
import AboutHeroBg from "../assets/AboutPageBg.png";
import cardBgPic from "../assets/AboutBg.jpg";
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";
import pic4 from "../assets/pic4.png";
import hands from "../assets/hands.png"

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
          Smart Workforce Solutions For <br />
          Modern Businesses
        </h1>
        <div className="flex items-center gap-2 text-white font-semibold text-2xl mt-5">
          <span className="text-[#C8102E] hover:-translate-y-2 transition-transform duration-300 inline-block">Services</span>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    img: pic1,
    title: 'Talent Acquisition Services',
    desc: 'We help businesses hire skilled professionals through smart recruitment solutions, quality candidate screening, and a faster, seamless hiring process.',
    path: '/talent',
  },
  {
    img: pic2,
    title: 'Manpower Outsourcing',
    desc: 'Flexible and scalable workforce solutions designed to help businesses manage operations efficiently with skilled professionals and reliable staffing support.',
    path: '/manpower',
  },
  {
    img: pic3,
    title: 'Remote Staffing',
    desc: 'Build a productive remote workforce with skilled professionals, flexible hiring models, and cost-effective staffing solutions tailored to your business needs.',
    path: '/remote-staffing',
  },
  {
    img: pic4,
    title: 'Recruitment Process Outsourcing',
    desc: 'Streamline your hiring process with end-to-end recruitment solutions designed to improve efficiency, reduce hiring costs, and deliver quality talent faster.',
    path: '/rpo',
  },
];

const badges = [
  'Experienced Recruitment Specialists',
  'Faster Hiring Process',
  'Industry-Focused Talent Solutions',
  'Scalable Workforce Support',
  'Quality Candidate Screening',
  'Customized Staffing Strategies',
  'Reliable HR & Payroll Support',
  'Dedicated Client Assistance',
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <Link
                  to={service.path}
                  className="inline-flex items-center gap-1.5 text-[#C8102E] font-semibold text-sm mt-1 transition-all duration-300 hover:gap-3"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyTrustSection() {
  return (
    <section className="w-full bg-white py-16 font-sans border border-gray-200 rounded-lg shadow-sm">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Blob image — mobile: full width scaled down, desktop: original fixed size */}
          <div className="relative flex-shrink-0 flex items-center justify-center w-full lg:w-[520px] h-[300px] sm:h-[400px] lg:h-[520px]">
            <div
              className="relative overflow-hidden transition-transform duration-500 hover:scale-105 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[500px] lg:h-[500px]"
              style={{
                borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
                borderTop: '6px solid #C8102E',
                borderRight: '6px solid #C8102E',
                borderLeft: 'none',
                borderBottom: 'none',
              }}
            >
              <img
                src={hands}
                alt="Teamwork"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex flex-col flex-1 gap-6">
            <h2 className="text-[#111111] font-bold text-3xl md:text-4xl leading-tight hover:-translate-y-1 transition-transform duration-300">
              Why Businesses Trust <span className="text-[#C8102E]">Kalibre</span>
            </h2>
            <p className="text-[#444444] text-base leading-relaxed max-w-xl">
              We combine industry expertise, smart hiring strategies, and customized
              workforce solutions to help businesses find the right talent faster and more
              efficiently. Our client-focused approach ensures quality hiring, seamless
              workforce management, and long-term business success.
            </p>

            <div>
              <h4 className="text-[#111111] font-bold text-base mb-4">What Makes Us Different</h4>
              <div className="flex flex-wrap gap-3">
                {badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-sm font-medium text-[#333333] bg-white border border-pink-300 px-4 py-2 rounded-md transform transition-all duration-300 hover:-translate-y-1 hover:border-[#C8102E] hover:text-[#C8102E] hover:bg-[#FFF0F1] hover:shadow-sm cursor-default"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)',
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

        </div>
      </div>
    </section>
  );
}

function MyServices() {
  return (
    <div className="w-full bg-white">
      <AboutHero />
      <ServicesSection />
      <WhyTrustSection />
    </div>
  );
}

export default MyServices;