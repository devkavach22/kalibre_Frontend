import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../dashboards/DashboardNavbar';
import AddJobModal, { CompanyAvatar } from './AddJobModal'; 
import useHr from '../APIs/hooks/useHr'; 

export default function HrDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // ✅ Added publishJob
  const { fetchRecruiterJobs, publishJob, loading } = useHr();

  useEffect(() => {
    if (typeof fetchRecruiterJobs === 'function') {
      fetchRecruiterJobs(setJobs);
    }
  }, []);

  const handleCreateJob = () => {
    setShowModal(false);
    if (typeof fetchRecruiterJobs === 'function') {
      fetchRecruiterJobs(setJobs);
    }
  };

  const formatBudget = (budget) => {
    if (!budget) return "Not Disclosed";
    return `${budget / 100000} Lakhs`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      const date = new Date(dateString.replace(' ', 'T'));
      if (isNaN(date.getTime())) return "Recent";
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return "Recent";
    }
  };

  const handleCardClick = (job) => {
    navigate(`/hrDashboard/job/${job.id}`, { state: { job } });
  };

  return (
    <div className="min-h-screen pb-12" style={{ background: 'linear-gradient(180deg, #FFEFEF 0%, #FFFFFF 100%)' }}>
      <DashboardNavbar />
      {showModal && <AddJobModal onClose={() => setShowModal(false)} onCreateJob={handleCreateJob} />}

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* HERO HEADER SECTION */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 gap-4">
          <div className="flex-1 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-[#C1272D] tracking-tight">Post & Manage Jobs</h1>
            <p className="text-gray-500 text-xs sm:text-base mt-1.5">Create new job openings, track applicants, and manage your hiring pipeline.</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C1272D] hover:bg-[#a61f24] active:scale-98 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all cursor-pointer">
            <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Job
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C1272D]"></div>
          </div>
        ) : (
          <div className="w-full bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {jobs && jobs.map((job, index) => {
                
                const details = job?.job_details || {};
                const company = job?.company_details || {};
                const preferences = job?.candidate_preferences || {};
                const description = job?.job_description || {};

                const isItemPublished = details?.is_published ?? false;
                const displayTitle = details?.name || "Untitled Role";
                const displayCompany = details?.client_selection || "Company Name";
                const displayLocation = details?.location || "Not Specified";
                const displayDesc = description?.about_the_role || "No description provided.";
                const createdDate = details?.create_date || "";
                
                const displaySkills = preferences?.skills 
                  ? preferences.skills.split(',').map(s => s.trim()) 
                  : [];

                const expFrom = details?.experience_from ? Math.floor(details.experience_from) : 0;
                const expTo = details?.experience_to ? Math.floor(details.experience_to) : 0;
                const experienceRange = `${expFrom} - ${expTo} Years`;

                const salaryRange = details?.budget_from 
                  ? `${formatBudget(details.budget_from)} - ${formatBudget(details.budget_to)}`
                  : "Not Disclosed";

                return (
                  <div key={job.id || index}
                    onClick={() => handleCardClick(job)}
                    className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-red-100 flex flex-col justify-between group cursor-pointer">
                    <div>
                      <div className="flex items-start gap-4">
                        {company?.company_logo ? (
                          <img 
                            src={`data:image/svg+xml;base64,${company.company_logo}`}
                            onError={(e) => { e.target.onerror = null; e.target.src = `data:image/png;base64,${company.company_logo}`; }}
                            alt={displayCompany} 
                            className="w-12 h-12 rounded-xl object-contain border border-gray-100 flex-shrink-0 bg-white"
                          />
                        ) : (
                          <CompanyAvatar label={displayCompany.slice(0, 4).toUpperCase()} colorIndex={index} />
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-base font-bold text-gray-800 tracking-tight line-clamp-2 leading-snug group-hover:text-[#C1272D] transition-colors">
                              {displayTitle}
                            </h3>
                            {details?.end_date && (
                              <span className="text-[10px] font-bold text-[#C1272D] whitespace-nowrap flex-shrink-0 mt-0.5">
                                Till {formatDate(details.end_date)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-sm font-semibold text-gray-500 truncate">{displayCompany}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-1 py-3.5 my-4 border-y border-gray-100 text-[13px] font-semibold text-gray-600">
                        <div className="flex items-center gap-1.5 min-w-0 w-full sm:w-auto">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          <span className="truncate">{experienceRange}</span>
                        </div>
                        <div className="flex items-center gap-1.5 min-w-0 w-full sm:w-auto sm:justify-center">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 4h3.5a2.5 2.5 0 110 5H9m2-9V4m0 16v-2" /></svg>
                          <span className="truncate">{salaryRange}</span>
                        </div>
                        <div className="flex items-center gap-1.5 min-w-0 w-full sm:w-auto sm:justify-end">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span className="truncate">{displayLocation}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 leading-relaxed font-normal line-clamp-3">{displayDesc}</p>
                      
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mt-4.5">
                        {displaySkills.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-gray-500 text-xs font-semibold">
                            <span className="text-gray-300 text-[6px]">●</span>
                            <span className="truncate max-w-[120px]">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-y-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="border border-red-200 text-[#C1272D] bg-red-50/40 px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wider uppercase">
                          {details?.department_names?.[0] || "General"}
                        </span>
                        <span className="text-gray-400 font-semibold text-[11px]">{formatDate(createdDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto sm:ml-0">

                        {/* ✅ UPDATED - Real publish API call */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isItemPublished) {
                              publishJob(job.id, setJobs);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center gap-1 border ${
                            isItemPublished
                              ? "bg-green-50 text-green-600 border-green-200 shadow-none cursor-default active:scale-100"
                              : "bg-[#C1272D] text-white border-transparent hover:bg-[#a61f24] cursor-pointer"
                          }`}
                        >
                          {isItemPublished && (
                            <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {isItemPublished ? "Published" : "Publish Job"}
                        </button>

                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg p-0.5 text-gray-400">
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-red-500 transition-colors p-1.5 cursor-pointer rounded-md hover:bg-white" title="Bookmark Job">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}