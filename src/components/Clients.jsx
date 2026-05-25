import React from 'react'
import AboutHeroBg from "../assets/ClientBg.png";
import LogoBg from "../assets/AboutBg.jpg";

import C1 from "../assets/C1.png";
import C2 from "../assets/C2.png";
import C3 from "../assets/C3.png";
import C4 from "../assets/C4.png";
import C5 from "../assets/C5.png";
import C6 from "../assets/C6.png";
import client1 from "../assets/Client1.png";
import client2 from "../assets/client2.png";
import client3 from "../assets/client3.png";
import client4 from "../assets/client4.png";
import client5 from "../assets/client5.png";
import client6 from "../assets/client6.png";
import client7 from "../assets/client7.png";
import client8 from "../assets/client8.png";
import client9 from "../assets/client9.png";
import client10 from "../assets/client10.png";
import client11 from "../assets/client11.png";
import client12 from "../assets/client12.png";
import client13 from "../assets/client13.png";
import client14 from "../assets/client15.png";
import Cl1 from "../assets/CL1.png"
import Cl2 from "../assets/Cl2.png"
import client15 from "../assets/client8.png";

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
          Building Long-Term  <br />
          Client Partnerships        </h1>
        <div className="flex items-center gap-2 text-white font-semibold text-2xl mt-5">
          <span className="text-[#C8102E] hover:-translate-y-2 transition-transform duration-300 inline-block">Clients</span>
        </div>
      </div>
    </section>
  );
}

function ClientLogosGrid() {
  const corporateLogos = [
    C1, C2, C3, C4, C5, C6,
    client1, client2, client3, client4,
    client5, client6, client7, client8,
    client9, client10, client11, client12,
    client13, client14, Cl1, Cl2, client15
  ];

  const totalLogos = corporateLogos.length;
  const cols = 5;
  const lastRowCount = totalLogos % cols;
  const spacersBefore = lastRowCount === 0 ? 0 : Math.floor((cols - lastRowCount) / 2);

  return (
    <div
      className="w-full bg-cover bg-center py-16 md:py-24 px-4 sm:px-8 lg:px-16"
      style={{
        backgroundImage: `url(${LogoBg})`,
        border: '2px solid #e5e7eb',
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-white/60 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-200">

          {/* Desktop: original 5-col fixed grid — untouched */}
          <div className="hidden md:grid gap-3" style={{ gridTemplateColumns: 'repeat(5, 200px)', justifyContent: 'center' }}>
            {corporateLogos.map((logo, idx) => {
              const isFirstOfLastRow = lastRowCount > 0 && idx === totalLogos - lastRowCount;
              return (
                <>
                  {isFirstOfLastRow &&
                    Array.from({ length: spacersBefore }).map((_, i) => (
                      <div key={`spacer-${i}`} className="w-[200px] h-24 invisible" />
                    ))
                  }
                  <div
                    key={idx}
                    className="w-[200px] h-24 bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex items-center justify-center hover:shadow-md hover:scale-[1.03] transition-all duration-300"
                  >
                    <img
                      src={logo}
                      alt={`Partner Client Logo ${idx + 1}`}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </>
              );
            })}
          </div>

          {/* Mobile only: 2-column responsive grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {corporateLogos.map((logo, idx) => (
              <div
                key={idx}
                className="w-full h-20 bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex items-center justify-center hover:shadow-md hover:scale-[1.03] transition-all duration-300"
              >
                <img
                  src={logo}
                  alt={`Partner Client Logo ${idx + 1}`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function Clients() {
  return (
    <div className="w-full bg-white">
      <AboutHero />
      <ClientLogosGrid />
    </div>
  )
}

export default Clients


