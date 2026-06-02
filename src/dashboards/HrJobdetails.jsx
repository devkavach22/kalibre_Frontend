import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useHr from '../APIs/hooks/useHr';
import DashboardNavbar from '../dashboards/DashboardNavbar';

const AVATAR_PALETTES = [
  { bg: '#E8F0FE', text: '#1a73e8' },
  { bg: '#FFF0F0', text: '#C1272D' },
  { bg: '#F0F4FF', text: '#4F46E5' },
  { bg: '#ECFDF5', text: '#059669' },
  { bg: '#FFFBEB', text: '#D97706' },
  { bg: '#F5F3FF', text: '#7C3AED' },
  { bg: '#F0FDF4', text: '#16A34A' },
  { bg: '#FFF7ED', text: '#EA580C' },
];

export default function HrJobdetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('role');
  const { fetchRecruiterJobs, loading } = useHr();

  const stateJob = location.state?.job;

  useEffect(() => {
    if (!stateJob && typeof fetchRecruiterJobs === 'function') {
      fetchRecruiterJobs(setJobs);
    }
  }, []);

  const rawJob = stateJob || jobs.find(j => String(j.id) === String(id));

  if (!stateJob && loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
        <DashboardNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#C1272D] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!rawJob) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
        <DashboardNavbar />
        <p className="text-gray-500 text-base mt-20">Job not found.</p>
        <button onClick={() => navigate('/hrDashbaord')} className="mt-4 text-[#C1272D] text-base font-semibold underline hover:text-[#a61f24] transition-colors">
          ← Back to HR Dashboard
        </button>
      </div>
    );
  }

  const details = rawJob.job_details || {};
  const preferences = rawJob.candidate_preferences || {};
  const screening = rawJob.screening_questions || {};
  const description = rawJob.job_description || {};
  const communications = rawJob.communication_preferences || {};
  const company = rawJob.company_details || {};

  const palette = AVATAR_PALETTES[Number(rawJob.id || 0) % AVATAR_PALETTES.length];
  const companyLetter = (details.client_selection?.[0] || details.name?.[0] || 'C').toUpperCase();

  const formatLakhs = (val) => (val ? `${(val / 100000).toFixed(1).replace(/\.0$/, '')} LPA` : 'N/A');

  const skillsList = preferences.skills
    ? preferences.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const responsibilitiesList = description.key_responsibilities
    ? description.key_responsibilities.split('\n').map(s => s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen pb-12" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
      <DashboardNavbar />

      <div className="w-full max-w-[96%] mx-auto px-2 sm:px-4 lg:px-6 py-6">

        {/* Back Button */}
        <button
          onClick={() => navigate('/hrDashbaord')}
          className="flex items-center gap-2 text-[13px] font-bold text-white bg-[#C1272D] hover:bg-[#a61f24] active:scale-95 px-5 py-2.5 rounded-xl mb-5 shadow-sm transition-all duration-200 w-fit"
        >
          <svg className="w-4 h-4 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to HR Pipeline
        </button>

        <div className="flex flex-col gap-5 w-full">

          {/* ── 1. HEADER CARD (Pure White Background) ── */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {company?.company_logo ? (
                  <img
                    src={`data:image/svg+xml;base64,${company.company_logo}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `data:image/png;base64,${company.company_logo}`;
                    }}
                    alt={details.client_selection || 'Company Logo'}
                    className="w-16 h-16 rounded-xl object-contain border border-gray-100 flex-shrink-0 bg-white shadow-inner"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl flex-shrink-0 border border-gray-100 shadow-inner"
                    style={{ background: palette.bg, color: palette.text }}
                  >
                    {companyLetter}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-black text-gray-900 tracking-tight">{details.name || 'Untitled Position'}</h1>
                  <p className="text-[15px] text-gray-500 font-bold mt-0.5">{details.client_selection || 'Direct Placement'}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <span className="flex items-center gap-2 bg-gray-50 text-gray-700 text-[13px] font-bold px-4 py-2 rounded-xl border border-gray-100">
                  📍 {details.location || 'Not Specified'}
                </span>
                <span className="flex items-center gap-2 bg-gray-50 text-gray-700 text-[13px] font-bold px-4 py-2 rounded-xl border border-gray-100">
                  💼 {details.experience_from} - {details.experience_to} Years
                </span>
                <span className="flex items-center gap-2 bg-gray-50 text-gray-700 text-[13px] font-bold px-4 py-2 rounded-xl border border-gray-100">
                  💰 {formatLakhs(details.budget_from)} - {formatLakhs(details.budget_to)}
                </span>
              </div>
            </div>

            <hr className="my-5 border-gray-100" />

            {/* Meta Information Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px]">
              <div className="bg-stone-300/60 p-3.5 rounded-xl border border-gray-100/70">
                <span className="block text-[#C1272D] font-bold text-[10px] uppercase tracking-wider">Total Openings</span>
                <span className="text-base font-black text-gray-800 block mt-0.5">{details.no_of_recruitment || 1} Vacancies</span>
              </div>
              <div className="bg-stone-300/60 p-3.5 rounded-xl border border-gray-100/70">
                <span className="block text-[#C1272D] font-bold text-[10px] uppercase tracking-wider">Target Department</span>
                <span className="text-base font-black text-gray-800 block mt-0.5 truncate">{details.department_names?.[0] || 'General'}</span>
              </div>
              <div className="bg-stone-300/60 p-3.5 rounded-xl border border-gray-100/70">
                <span className="block text-[#C1272D] font-bold text-[10px] uppercase tracking-wider">Gender Preference</span>
                <span className="text-base font-black text-gray-800 block mt-0.5 capitalize">{details.gender || 'Open to All'}</span>
              </div>


              <div className="bg-stone-300/60 p-3.5 rounded-xl border border-gray-100/70 flex flex-col justify-center">
                <span className="block text-[#C1272D] font-bold text-[10px] uppercase tracking-wider mb-1">Pipeline Visibility</span>
                <div className="flex gap-2">
                  <span className={`inline-flex items-center gap-1 font-bold text-[11px] px-2.5 py-0.5 rounded-md border capitalize ${details.is_published ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-red-50 text-[#C1272D] border-red-100'}`}>
                    {details.is_published ? 'Published' : 'Unpublished'}
                  </span>
                  {details.position_status && (
                    <span className={`inline-flex items-center font-bold text-[11px] px-2.5 py-0.5 rounded-md border capitalize ${details.position_status === 'active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                      {details.position_status}
                    </span>
                  )}
                </div>
                {/* ✅ Show applied candidates count only if published */}
                {details.is_published && (
                  <span className="mt-2 text-[12px] font-black text-gray-700">
                    👤  {details.applied_candidates_count ?? 0} Applied
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* ── 2. DYNAMIC TAB ARCHITECTURE ── */}
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-xs overflow-hidden">
            <div className="flex border-b border-gray-100 bg-gray-50/70 p-2 gap-2">
              <button
                onClick={() => setActiveTab('role')}
                className={`px-6 py-3 text-sm font-extrabold rounded-xl transition-all duration-150 ${activeTab === 'role' ? 'bg-white text-[#C1272D] shadow-xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
              >
                About The Role
              </button>
              {responsibilitiesList.length > 0 && (
                <button
                  onClick={() => setActiveTab('responsibilities')}
                  className={`px-6 py-3 text-sm font-extrabold rounded-xl transition-all duration-150 ${activeTab === 'responsibilities' ? 'bg-white text-[#C1272D] shadow-xs' : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                  Key Responsibilities ({responsibilitiesList.length})
                </button>
              )}
              {company.company_overview && (
                <button
                  onClick={() => setActiveTab('company')}
                  className={`px-6 py-3 text-sm font-extrabold rounded-xl transition-all duration-150 ${activeTab === 'company' ? 'bg-white text-[#C1272D] shadow-xs' : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                  Company Overview
                </button>
              )}
            </div>

            <div className="p-6 min-h-[160px]">
              {activeTab === 'role' && description.about_the_role && (
                <div>
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium max-w-[95%]">{description.about_the_role}</p>
                </div>
              )}

              {activeTab === 'responsibilities' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {responsibilitiesList.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50/40 p-4 rounded-xl border border-gray-100 group hover:bg-white hover:shadow-xs transition-all duration-200">
                      <span className="w-6 h-6 rounded-lg bg-red-50 text-[#C1272D] flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-[14px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors pt-0.5">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'company' && (
                <div className="space-y-5">
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium max-w-[95%]">{company.company_overview}</p>
                  <div className="flex flex-wrap gap-5 text-[13px] font-bold text-gray-500 border-t border-gray-100 pt-4">
                    {company.company_email && <span>📧 Email: <span className="text-gray-800">{company.company_email}</span></span>}
                    {company.company_phone && <span>📞 Contact: <span className="text-gray-800">{company.company_phone}</span></span>}
                    {company.company_website && (
                      <a href={company.company_website} target="_blank" rel="noreferrer" className="text-[#C1272D] hover:underline flex items-center gap-1">
                        🌐 Corporate Site
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── 3. KEY SKILLS PANEL ── */}
          {skillsList.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs">
              <h2 className="text-[13px] font-black uppercase tracking-wider text-gray-400 mb-4">Core Skillsets & Expertise</h2>
              <div className="flex flex-wrap gap-2.5">
                {skillsList.map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 text-[13px] font-extrabold px-5 py-2.5 rounded-xl transition-all duration-150 border cursor-default"
                    style={i === 0
                      ? { background: 'linear-gradient(92.62deg,#C1272D 0.91%,#a61f24 99.09%)', color: '#fff', border: 'none' }
                      : { borderColor: '#e5e7eb', color: '#4b5563', background: '#f9fafb' }}
                  >
                    {i === 0 && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── 4. REQUIREMENTS & SCREENING TWO-GRID (FONT SIZE & BG FIXED) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">

            {/* Left Box: Qualifications & Parameters */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-[14px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2 mb-4">
                  Qualifications & Parameters
                </h2>
                <div className="space-y-4 text-[15px] text-gray-600 font-medium">
                  {preferences.required_qualifications && (
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                      <span className="text-gray-400 font-extrabold text-[12px] uppercase tracking-wider">Minimum Education</span>
                      <span className="font-black text-gray-900 text-base">{preferences.required_qualifications}</span>
                    </div>
                  )}
                  {Array.isArray(preferences.language_name) && preferences.language_name.length > 0 && (
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                      <span className="text-gray-400 font-extrabold text-[12px] uppercase tracking-wider">Language Fluency</span>
                      <span className="font-black text-gray-900 text-base">{preferences.language_name.join(', ')}</span>
                    </div>
                  )}
                  {preferences.certifications && (
                    <div className="pt-2">
                      <span className="text-gray-400 block font-extrabold text-[12px] uppercase tracking-wider mb-2">Key Certifications</span>
                      <p className="text-gray-800 text-[14px] bg-gray-50/60 p-4 rounded-xl border border-gray-100/80 leading-relaxed font-medium">
                        {preferences.certifications}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Box: Pre-Screening Criteria */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs">
              <h2 className="text-[14px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2 mb-4">
                Pre-Screening Criteria
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-gray-50/60 p-3.5 rounded-xl border border-gray-100/80 text-center">
                  <p className="text-gray-400 font-extrabold text-[11px] uppercase tracking-wider">Notice Period Max</p>
                  <p className="font-black text-gray-900 mt-1 text-base">{screening.screening_notice_period || 'N/A'}</p>
                </div>
                <div className="bg-gray-50/60 p-3.5 rounded-xl border border-gray-100/80 text-center">
                  <p className="text-gray-400 font-extrabold text-[11px] uppercase tracking-wider">Immediate Joining</p>
                  <p className={`font-black mt-1 text-base ${screening.screening_immediate_joining ? 'text-green-600' : 'text-gray-500'}`}>
                    {screening.screening_immediate_joining ? 'Mandatory' : 'Flexible'}
                  </p>
                </div>
              </div>

              {Array.isArray(screening.screening_questions) && screening.screening_questions.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-wider">Evaluation Questionnaire</p>
                  <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                    {screening.screening_questions.map((q, i) => (
                      <div key={i} className="text-[14px] text-gray-700 bg-gray-50/60 p-3.5 rounded-xl border border-gray-100/80 font-medium flex items-start gap-2.5">
                        <span className="font-black text-[#C1272D] text-base">Q{i + 1}:</span>
                        <span className="leading-relaxed">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── 5. NOTIFICATION CHANNELS ── */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs">
            <h2 className="text-[13px] font-black uppercase tracking-wider text-gray-400 mb-3">Active Recruitment Notification Channels</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Email Automation', active: communications.comm_email },
                { label: 'SMS Carrier Integration', active: communications.comm_sms },
                { label: 'WhatsApp Messenger API', active: communications.comm_whatsapp },
                { label: 'System Follow-ups & Reminders', active: communications.comm_reminders },
              ].map((ch, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 text-xs font-bold px-4 py-3 rounded-xl border transition-all ${ch.active ? 'bg-green-50 border-green-100 text-green-700' : 'bg-stone-300/60 border-gray-100 text-black'
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full ${ch.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                  {ch.label}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}