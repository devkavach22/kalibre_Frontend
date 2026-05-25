import React from 'react'
import AboutHeroBg from "../assets/ProcessBg.png";
import S1 from "../assets/S1.png";
import S2 from "../assets/S2.png";
import S3 from "../assets/S3.png";
import S4 from "../assets/S4.png";
import S5 from "../assets/S5.png";
import S6 from "../assets/S6.png";
import S7 from "../assets/S7.png";
import S8 from "../assets/S8.png";
import S9 from "../assets/S9.png";
import S10 from "../assets/S10.png";
import S11 from "../assets/S11.png";
import S12 from "../assets/S12.png";
import S13 from "../assets/S13.png";
import S14 from "../assets/S14.png";
import S15 from "../assets/S15.png";
import S16 from "../assets/S16.png";
import S17 from "../assets/S17.png";
import S18 from "../assets/S18.png";

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
          A Strategic Approach To <br />
          Smarter Hiring
        </h1>
        <div className="flex items-center gap-2 text-white font-semibold text-2xl mt-5">
          <span className="text-[#C8102E] hover:-translate-y-2 transition-transform duration-300 inline-block">Our Process</span>
        </div>
      </div>
    </section>
  );
}

function StandardOperatingProcedure() {
  const steps = [
    { id: 1, icon: S1, label: "Step-1", desc: "Insights - Client & Requirement", left: true },
    { id: 2, icon: S2, label: "Step-2", desc: "The Search Initiation (Screening relevant CVs)", left: false },
    { id: 3, icon: S3, label: "Step-3", desc: "Talk to the candidate & convince, Email / WhatsApp details to candidates after the call.", left: true },
    { id: 4, icon: S4, label: "Step-4", desc: "Comments on Portal", left: false },
    { id: 5, icon: S5, label: "Step-5", desc: "Updating HC/ Google Sheet", left: true },
    { id: 6, icon: S6, label: "Step-6", desc: "Delivering CVs to the SPOC/Leader.", left: false },
    { id: 7, icon: S7, label: "Step-7", desc: "Follow-up with Leaders for feedback on the CVs proposed.", left: true },
    { id: 8, icon: S8, label: "Step-8", desc: "Interview Scheduling (Talk & Schedule / Trackers)", left: false },
    { id: 9, icon: S9, label: "Step-9", desc: "Interview Details to be sent to SPOC & Candidate. And, update HC/G-Sheet.", left: true },
    { id: 10, icon: S10, label: "Step-10", desc: "Interview Follow-ups (Morning & Evening)", left: false },
    { id: 11, icon: S11, label: "Step-11", desc: "Prepare the candidate for the Interview. (Test calls (Audio/Video)", left: true },
    { id: 12, icon: S12, label: "Step-12", desc: "Post Interview Feedback from the candidate.", left: false },
    { id: 13, icon: S13, label: "Step-13", desc: "Feedback Request to POC & update HC/G-Sheet accordingly.", left: true },
    { id: 14, icon: S14, label: "Step-14", desc: "If reject, inform the candidate, if not, next process.", left: false },
    { id: 15, icon: S15, label: "Step-15", desc: "If select, collect documents.", left: true },
    { id: 16, icon: S16, label: "Step-16", desc: "Selection >> Offer Negotiation >> Closure", left: false },
    { id: 17, icon: S17, label: "Step-17", desc: "Joining", left: true },
    { id: 18, icon: S18, label: "Step-18", desc: "Replacement & Payment", left: false },
  ];

  return (
    <section className="w-full bg-white py-20 font-sans overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-[#111111] font-extrabold text-3xl md:text-4xl tracking-wide">
          Standard <span className="text-[#C8102E]">Operating</span> Procedure
        </h2>
      </div>

      <div className="relative w-full max-w-[972px] mx-auto px-4">
        {/* Center vertical line */}
        {/* Center vertical line with top & bottom horizontal border */}
        <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 z-0 flex flex-col items-center">
          {/* Top horizontal bar */}
          <div style={{ width: '20px', height: '2px', backgroundColor: '#d1d5db' }} />
          {/* Vertical line */}
          <div style={{ flex: 1, width: '2px', backgroundColor: '#d1d5db' }} />
          {/* Bottom horizontal bar */}
          <div style={{ width: '20px', height: '2px', backgroundColor: '#d1d5db' }} />
        </div>


        <div className="flex flex-col">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative flex w-full"
              style={{ minHeight: '180px' }}
            >
              {step.left ? (
                <>
                  <div className="w-[50%] flex flex-col justify-start">
                    <div className="flex items-center justify-end w-full pt-8">

                      {/* <div className="w-12 h-12 rounded-full bg-white border-2 border-[#C8102E] flex items-center justify-center flex-shrink-0">
                        <img src={step.icon} alt={step.label} className="w-6 h-6 object-contain" />
                      </div> */}
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#C8102E] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-[#C8102E] hover:scale-110 group">
                        <img src={step.icon} alt={step.label} className="w-6 h-6 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
                      </div>

                      <div style={{ width: '250px', borderTop: '2px dashed #999', marginLeft: '8px' }} />
                    </div>
                    <div className="text-right mt-1 pr-9">
                      <p className="text-[#C8102E] font-bold text-base mb-1">{step.label}</p>
                      <p className="text-[#333333] text-base leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  <div className="w-[50%]" />
                </>


              ) : (
                <>
                  <div className="w-[50%]" />
                  <div className="w-[50%] flex flex-col justify-start">
                    <div className="flex items-center w-full pt-8">
                      {/* RIGHT dashed — maxWidth keeps it short */}
                      <div style={{ flex: 1, borderTop: '2px dashed #999', marginRight: '8px', maxWidth: '250px' }} />
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#C8102E] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-[#C8102E] hover:scale-110 group">
                        <img src={step.icon} alt={step.label} className="w-6 h-6 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
                      </div>
                    </div>
                    <div className="text-left mt-1 pl-9">
                      <p className="text-[#C8102E] font-bold text-base mb-1">{step.label}</p>
                      <p className="text-[#333333] text-base leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </>
              )}

              {/* CENTER RED DOT */}
              <div
                className="absolute left-1/2 z-10"
                style={{ top: '47px', transform: 'translate(-50%, 0)' }}
              >
                <div className="w-4 h-4 rounded-full bg-[#C8102E]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessFlowchartDeciphered() {
  const cards = [
    {
      id: "01",
      desc: "The incumbent is expected to understand the client's USPs to convince candidates and the requirement thoroughly so that they can explain the candidates about their job role and client's expectation. the relevant search, precisely matching the skillsets shared by the client.",
    },
    {
      id: "02",
      desc: "The recruiter thereafter needs to put the relevant search, precisely matching the skillsets shared by the client.",
    },
    {
      id: "03",
      desc: "The headhunter needs to talk to relevant candidates to give them in-depth insights about the client and share the job role with them. The recruiter is supposed to share the job role, client details via email and WhatsApp and get a written confirmation of their interest.",
    },
    {
      id: "04",
      desc: "The recruiter needs to then deliver the profiles to the concerned POC / Leader.",
    },
    {
      id: "05",
      desc: "Every alternate day from the delivery of profiles, the recruiter needs to follow up with the POC / Leader for feedback on their CVs shared with the client. Once you receive the feedback, you need to update the MIS, talk to the candidates, make them available for the interview as per the client's feasibility.",
    },
    {
      id: "06",
      desc: "The recruiter need to send all the interview related details; interview call letter, interview link, JD, and all required specifications on Email and WhatsApp.",
    },
    {
      id: "07",
      desc: "The recruiter needs to share the final interview schedule with the POC / Leader once the candidate confirms his/her presence for the interview. And, then update the G-Sheet or MIS accordingly.",
    },
    {
      id: "08",
      desc: "Interview day; the recruiter is supposed to keep the POC / Leader in the loop about the status — previous day evening and the interview day morning status.",
    },
    {
      id: "09",
      desc: "The recruiter needs to prepare the candidate for the interview so that they can perform well, conduct a test audio/video call with them well in prior.",
    },
    {
      id: "10",
      desc: "Post interview; the recruiter needs to check with the candidate on the interview to understand the kind of questions being asked and to use for future purpose.",
    },
    {
      id: "11",
      desc: "Post that send a feedback request to the POC / Leader requesting the feedback and update the G sheet and HC accordingly. Incase, if you don't receive feedback in two working days, please follow up with your POC again for the feedback. To get the feedback for each of your candidates is the recruiter's accountability. If rejected, please inform the candidate accordingly, only if the candidate follows-up persistently.",
    },
    {
      id: "12",
      desc: "Congratulations on the selection! Once the candidate is selected, please follow-up on getting the required documents, share them with the POC. You need to play a pivotal role in offer negotiation to ensure a win-win situation. Once the candidate accepts the offer, you need to ensure the candidate is resigning from his present employer, ensure you get the resignation copy, follow-up on the resignation acceptance, request for a copy and share it with the POC. Keep active follow-up for the same.",
    },
    {
      id: "13",
      desc: "You need to ensure the candidate joins and inform the POC and Leader about the same.",
    },
    {
      id: "14",
      desc: "You need to also simultaneously remind your POC/Leader and follow-up on the payment against the invoice raised for the candidate.",
    },
    {
      id: "15",
      desc: "Since the replacement generally varies between 3 to 6 months, you need to accordingly ensure you are tracking the candidate and talking to them regularly to understand their presence in the organization till the replacement period ends.",
      steps: [
        { label: "Step 1", text: ": First follow-up to be done once the candidates completes 10 days with the organisation. Reminders to be set accordingly." },
        { label: "Step 2", text: ": Second follow-up to be done once the candidates completes 30 days with the organisation. Reminders in outlook/phone to be set accordingly." },
        { label: "Step 3", text: ":  Regular follow-ups to be done thereafter every last working day of the month for every candidate that has joined as a process. Reminders in outlook/phone to be set accordingly. An email needs to be sent to the POC/Leader updating on the same after every follow-up." },
      ],
    },
  ];

  const cols = 4;
  const totalCards = cards.length;
  const lastRowCount = totalCards % cols;
  const spacersBefore = lastRowCount === 0 ? 0 : Math.floor((cols - lastRowCount) / 2);

  return (
    <section
      className="w-full py-20 font-sans"
      style={{ background: 'linear-gradient(180deg, #FFF0F1 0%, #FFFFFF 100%)' }}
    >
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-[#111111] font-extrabold text-3xl md:text-4xl tracking-wide">
          Process <span className="text-[#C8102E]">Flowchart</span> Deciphered
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div
          className="flex flex-wrap justify-center gap-6"
        >
          {cards.map((card, idx) => {
            const isFirstOfLastRow = lastRowCount > 0 && idx === totalCards - lastRowCount;
            return (
              <>
                {isFirstOfLastRow &&
                  Array.from({ length: spacersBefore }).map((_, i) => (
                    <div key={`spacer-${i}`}
                      style={{ width: '340px' }} className="pt-10 invisible" />
                  ))
                }
                <div key={card.id} className="relative pt-10" style={{ width: '400px' }}>
                  {/* Number badge */}
                  <div
                    className="absolute top-2 left-6 w-16 h-16 rounded-full flex items-center justify-center z-10"
                    style={{ background: 'linear-gradient(90deg, #FB2C36 0%, #C1272D 100%)' }}
                  >
                    <span className="text-white font-bold text-xl">{card.id}</span>
                  </div>


                  {/* Card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 pt-12 pb-6 px-5 h-full min-h-[200px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#C8102E]">                    <p className="text-[#111111] text-base leading-relaxed">
                    {card.desc}
                  </p>
                    {card.steps && (
                      <div className="mt-4 space-y-3">
                        {card.steps.map((s) => (
                          <p key={s.label} className="text-sm leading-relaxed">
                            <span className="text-[#C8102E] font-semibold">{s.label}</span>
                            <span className="text-[#111111]">{s.text}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OurProcess() {
  return (
    <div className="w-full bg-white">
      <AboutHero />
      <StandardOperatingProcedure />
      <ProcessFlowchartDeciphered />
    </div>
  )
}

export default OurProcess