import React from 'react'
import AboutHeroBg from "../assets/ManpowerBg.png"
import cardBgPic from "../assets/AboutBg.jpg";
import pic1 from "../assets/I1.png";
import pic2 from "../assets/I2.png";
import pic3 from "../assets/I3.png";
import pic4 from "../assets/I4.png";
import pic5 from "../assets/I5.png";
import group from "../assets/grouppic.png"

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
                    Manpower Outsourcing
                </h1>
            </div>
        </section>
    );
}

const services = [
    {
        img: pic1,
        title: 'Comprehensive Recruitment Support',
        desc: 'Our manpower outsourcing solution offers end-to-end support for all your temporary or project-based workforce requirements.',
    },
    {
        img: pic2,
        title: 'Relief from Recruitment Burden',
        desc: 'By entrusting us with your manpower needs, you can alleviate the administrative burden associated with hiring and focus on your core business activities without the hassle of recruitment logistics.',
    },
    {
        img: pic3,
        title: 'Scalability and Flexibility',
        desc: 'Whether you require additional staff for seasonal projects, sudden spikes in workload, or specific skill sets for short-term assignments, our manpower outsourcing service provides the flexibility to scale your workforce up or down as needed.',
    },
    {
        img: pic4,
        title: 'Quality Assurance',
        desc: 'We maintain rigorous standards throughout the recruitment process to ensure the quality and reliability of the candidates we provide.',
    },
    {
        img: pic5,
        title: 'Continuous Support',
        desc: 'Our commitment does not end with recruitment. We offer ongoing support and management of outsourced personnel, including performance monitoring, training coordination, and HR administration, to ensure a seamless integration into your team.',
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
                            className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col bg-white border-b-4 border-b-[#C8102E] w-full lg:h-[480px] lg:w-[380px]"
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

                {/* Row 2 - 2 cards centered */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3 mx-auto">
                    {services.slice(3).map((service, idx) => (
                        <div
                            key={idx}
                            className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col bg-white border-b-4 border-b-[#C8102E] w-full lg:h-[480px] lg:w-[380px]"
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

function ManpowerInfoSection() {
    return (
        <section className="w-full py-16 font-sans bg-[#FFF5F5]">
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left - Blob Image — mobile: responsive size, desktop: original */}
                    <div className="relative flex-shrink-0 flex items-center justify-center w-full lg:w-auto">
                        <div
                            className="relative overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px]"
                            style={{
                                borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
                                borderTop: '5px solid #C8102E',
                                borderRight: '5px solid #C8102E',
                                borderBottom: '5px solid #C8102E',
                                borderLeft: 'none',
                            }}
                        >
                            <img
                                src={group}
                                alt="Manpower Outsourcing"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="flex flex-col gap-5 flex-1">
                        <h2 className="text-[#111111] font-bold text-3xl md:text-4xl leading-snug transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                            <span className="text-[#C8102E]">Reliable</span> Manpower Outsourcing <br />Solutions
                        </h2>

                        <p className="text-[#444444] text-base leading-relaxed">
                            Our manpower outsourcing services are designed to help businesses manage workforce
                            operations efficiently with flexible staffing solutions and skilled professionals.
                            We provide reliable manpower support that helps organizations improve productivity,
                            reduce operational burden, and maintain smooth business operations.
                        </p>

                        <p className="text-[#444444] text-base leading-relaxed">
                            With a strong focus on quality, scalability, and workforce efficiency, we deliver
                            customized outsourcing solutions tailored to your business requirements. Our
                            experienced team ensures seamless resource management, faster deployment, and
                            long-term workforce support for sustainable business growth.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

function Service2() {
    return (
        <div className="w-full bg-white">
            <AboutHero />
            <ServicesSection />
            <ManpowerInfoSection />
        </div>
    )
}

export default Service2