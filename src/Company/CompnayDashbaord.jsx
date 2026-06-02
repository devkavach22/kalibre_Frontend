import React from 'react';
import DashboardNavbar from '../dashboards/DashboardNavbar';

function CompnayDashbaord() {
  // Mock data representing the 6 job listing cards
  const jobCards = Array(6).fill({
    title: "Hiring For Technical Support",
    company: "Arsenaltech",
    rating: "4.5",
    reviews: "7 Reviews",
    experience: "0 - 1 Years",
    salary: "Not Disclosed",
    location: "Bengaluru",
    description: "Flexible And Open To Working In A 24x7 Environment With Rotating Shifts And Rotating...",
    tags: ["IT Service Desk", "Service Desk Management", "IT Helpdesk", "Helpdesk"],
    postedTime: "1 Day Ago"
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Existing Navbar Integration */}
      <DashboardNavbar />

      {/* --- PINK HERO SECTION ONLY (As per image_a9057c.png) --- */}
      <div
        className="w-full px-6 py-16 md:px-12 lg:px-16"
        style={{ background: 'linear-gradient(271.64deg, #FFE8E8 0%, #FFF5F5 99.92%)' }}
      >
        <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Find Hire Grow <br />
              With <span className="text-red-600">Kalibre.</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 max-w-xl leading-relaxed">
              Access Top Talent, Streamline Hiring And Build High-Performing Teams With Confidence.
            </p>
          </div>
          <button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 shrink-0">
            Create Job
          </button>
        </div>
      </div>

      {/* --- WHITE BACKGROUND CONTENT LOWER SECTION --- */}
      <div className="w-full bg-white px-6 py-12 md:px-12 lg:px-16">

        {/* --- Metrics Counter Section --- */}
        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 -mt-20 md:-mt-24 relative z-10">
          {/* Verification Metrics */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 border-b-4 border-b-red-500 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Verification</span>
                <span className="text-3xl font-bold text-slate-800">12</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">▲ 20% vs last month</span>
          </div>

          {/* Total Applications Metrics */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 border-b-4 border-b-red-500 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Total Applications</span>
                <span className="text-3xl font-bold text-slate-800">243</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">▲ 18% vs last month</span>
          </div>

          {/* Shortlisted Candidates Metrics */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 border-b-4 border-b-red-500 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Shortlisted Candidates</span>
                <span className="text-3xl font-bold text-slate-800">47</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">▲ 15% vs last month</span>
          </div>
        </div>

        {/* --- Job Grid Section --- */}
        {/* Changed lg:grid-cols-3 to lg:grid-cols-4 so 4 items come in one row */}
        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-6">
          {jobCards.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 transform hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[340px]"
            >
              <div>
                {/* Header: Company Icon, Title & Reviews */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg border border-slate-100 flex items-center justify-center font-bold text-indigo-600 bg-indigo-50 shrink-0">
                    {job.company.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-slate-600">{job.company}</span>
                      <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                        ★ <span className="text-slate-500">{job.rating}</span>
                      </div>
                      <span className="text-slate-300 text-xs">|</span>
                      <span className="text-xs text-slate-400">{job.reviews}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-details (Experience, Salary, Location) */}
                <div className="grid grid-cols-3 gap-1 py-2 border-b border-slate-100 text-[11px] text-slate-500 font-medium mb-3">
                  <div className="flex items-center gap-1">💼 {job.experience}</div>
                  <div className="flex items-center gap-1">₹ {job.salary}</div>
                  <div className="flex items-center gap-1 truncate">📍 {job.location}</div>
                </div>

                {/* Description Snippet */}
                <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                  {job.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full border border-slate-100">
                      • {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                    Walk-In
                  </span>
                  <span className="text-xs text-slate-400">{job.postedTime}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <button className="hover:text-slate-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CompnayDashbaord;