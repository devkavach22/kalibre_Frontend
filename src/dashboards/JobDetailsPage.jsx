import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardNavbar from '../dashboards/DashboardNavbar';
import useResume from '../APIs/hooks/useResume';

const LOGO_COLORS = [
  { bg: '#E8F0FE', text: '#1a73e8' },
  { bg: '#FFF0F0', text: '#C8102E' },
  { bg: '#F0F4FF', text: '#4F46E5' },
  { bg: '#ECFDF5', text: '#059669' },
  { bg: '#FFFBEB', text: '#D97706' },
  { bg: '#F5F3FF', text: '#7C3AED' },
  { bg: '#F0FDF4', text: '#16A34A' },
  { bg: '#FFF7ED', text: '#EA580C' },
];

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatSalary(from, to) {
  if (!from && !to) return 'Not Disclosed';
  if (from && to) return `${from} - ${to} LPA`;
  if (from) return `${from}+ LPA`;
  return `Upto ${to} LPA`;
}

function formatExperience(from, to) {
  if (from == null && to == null) return 'Not Specified';
  if (from != null && to != null) return `${from} - ${to} Years`;
  if (from != null) return `${from}+ Years`;
  return `Upto ${to} Years`;
}

function formatPostedDate(dateStr) {
  if (!dateStr) return '';
  const posted = new Date(dateStr);
  const today  = new Date();
  const days   = Math.floor((today - posted) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return '1 Day Ago';
  return `${days} Days Ago`;
}

function normalizeJob(job, index) {
  const color = LOGO_COLORS[index % LOGO_COLORS.length];
  const companyName = String(job.client_selection_name || job.company || '').trim();
  const locationStr = Array.isArray(job.location_names) && job.location_names.length > 0
    ? job.location_names.join(', ')
    : (job.location || '');
  const deptStr = Array.isArray(job.department_names) && job.department_names.length > 0
    ? job.department_names[0]
    : (job.department || '');
  const allSkills = [
    ...(Array.isArray(job.required_skill_names)  ? job.required_skill_names  : []),
    ...(Array.isArray(job.preferred_skill_names) ? job.preferred_skill_names : []),
  ];
  const cleanDesc = stripHtml(job.description || job.about_the_role || '');

  // Parse key_responsibilities into array if string
  let highlights = [];
  if (Array.isArray(job.key_responsibilities)) {
    highlights = job.key_responsibilities;
  } else if (typeof job.key_responsibilities === 'string' && job.key_responsibilities.trim()) {
    highlights = job.key_responsibilities.split('\n').map(s => s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
  }

  // Perks as readable list
  const perksMap = {
    perk_health_insurance:      'Health Insurance',
    perk_annual_bonus:          'Annual Bonus',
    perk_provident_fund:        'Provident Fund',
    perk_paid_leaves:           'Paid Leaves',
    perk_flexible_working_hours:'Flexible Working Hours',
    perk_work_from_home:        'Work From Home',
    perk_cab_shuttle:           'Cab / Shuttle',
    perk_food_allowance:        'Food Allowance',
  };
  const perksEnabled = Object.entries(job.perks || {})
    .filter(([key, val]) => val === true && perksMap[key])
    .map(([key]) => perksMap[key]);
  if (job.perks?.perk_other && typeof job.perks.perk_other === 'string') {
    perksEnabled.push(job.perks.perk_other);
  }

  return {
    id:               job.id || index + 1,
    title:            job.name || job.title || 'Untitled',
    company:          companyName,
    logoLetter:       (companyName?.[0] || 'J').toUpperCase(),
    logoColor:        color.bg,
    logoTextColor:    color.text,
    rating:           job.rating  || 0,
    reviews:          job.reviews || 0,
    experience:       formatExperience(job.experience_from, job.experience_to),
    salary:           formatSalary(job.budget_from, job.budget_to),
    location:         locationStr,
    description:      cleanDesc,
    tags:             allSkills,
    jobType:          job.job_type || 'Full Time',
    postedAgo:        formatPostedDate(job.published_date || job.posted_date),
    workMode:         job.work_mode || 'Work From Office',
    dept:             deptStr,
    openings:         job.number_of_openings || job.no_of_recruitment || 0,
    highlights,
    matchScore:       [],
    keySkills:        allSkills,
    about:            job.company_overview || '',
    aboutTheRole:     job.about_the_role || '',
    requiredQualifications: job.required_qualifications || '',
    certifications:   job.certifications || '',
    companyTags:      [
      ...(Array.isArray(job.industry_names)    ? job.industry_names    : []),
      ...(Array.isArray(job.department_names)  ? job.department_names  : []),
    ].slice(0, 3),
    screeningQuestions: Array.isArray(job.screening_questions) ? job.screening_questions : [],
    perks:            perksEnabled,
    gender:           job.gender || '',
    ageLimit:         job.age_limit || 0,
    levelName:        job.level_name || '',
    reportingTo:      job.reporting_to || '',
    qualification:    job.qualification_name || '',
    specialization:   job.specialization_name || '',
    // ✅ FIX: Ab ye API se position_status ko sahi se read karega
    status:           job.position_status || job.status || job.job_status || '',
    language:         job.language || job.language_name || '',
  };
}

function SimilarJobCard({ job, onClick }) {
  return (
    <div
      onClick={() => onClick(job.id)}
      className="flex items-start gap-3 py-3 border-b border-gray-100 cursor-pointer hover:bg-red-50/40 rounded-lg px-2 -mx-2 transition-colors"
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" style={{ background: job.logoColor, color: job.logoTextColor }}>
        {job.logoLetter}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold text-[#111111] leading-snug line-clamp-2">{job.title}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{job.company}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-[11px] text-gray-500">{job.experience}</span>
          <span className="text-[11px] text-gray-300">•</span>
          <span className="text-[11px] text-gray-500">{job.location}</span>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5">{job.postedAgo}</p>
      </div>
    </div>
  );
}

function PerkBadge({ label }) {
  return (
    <span className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-green-50 border border-green-100 text-green-700">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      {label}
    </span>
  );
}

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(false);
  const [saved, setSaved]       = useState(false);
  const [applied, setApplied]   = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getPublishedJobs, jobs, jobsLoading } = useResume();

  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      getPublishedJobs();
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const normalizedJobs = useMemo(() => (Array.isArray(jobs) ? jobs : []).map(normalizeJob), [jobs]);

  const job = useMemo(() => normalizedJobs.find(j => j.id === parseInt(id)), [normalizedJobs, id]);

  const similar = useMemo(() =>
    normalizedJobs.filter(j => j.id !== parseInt(id) && j.dept === job?.dept).slice(0, 5),
    [normalizedJobs, id, job]
  );

  if (jobsLoading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
        <DashboardNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-400">Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
        <DashboardNavbar />
        <p className="text-gray-500 text-sm mt-20">Job not found.</p>
        <button onClick={() => navigate('/candidates')} className="mt-4 text-[#C8102E] text-sm underline">← Back to Jobs</button>
      </div>
    );
  }

  const cleanTitle = job.title.includes('||') ? job.title.split('||')[1].trim() : job.title;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
      <DashboardNavbar />

      <div className="px-4 sm:px-6 lg:px-10 py-5">
        <button onClick={() => navigate('/candidates')} className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-[#C8102E] mb-4 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Jobs
        </button>

        <div className="flex gap-5 items-start">
          <main className="flex-1 min-w-0 flex flex-col gap-4">

            {/* ── Header Card ── */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 border border-gray-100" style={{ background: job.logoColor, color: job.logoTextColor }}>
                  {job.logoLetter}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-base font-bold text-[#111111] leading-snug">{job.title}</h1>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[13px] text-gray-500 font-medium">{job.company}</span>
                    {job.rating > 0 && <span className="text-[12px] text-yellow-500 font-medium">★ {job.rating}</span>}
                    {job.reviews > 0 && <span className="text-[12px] text-gray-400">| {job.reviews} Reviews</span>}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-[12px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {job.experience}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {job.salary}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  {job.workMode}
                </span>
              </div>

              <hr className="my-3 border-gray-100" />

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-gray-500">
                <span>Posted: <span className="font-semibold text-gray-700">{job.postedAgo}</span></span>
                <span>Openings: <span className="font-semibold text-gray-700">{job.openings}</span></span>
                {job.levelName && <span>Level: <span className="font-semibold text-gray-700">{job.levelName}</span></span>}
                {job.reportingTo && <span>Reports To: <span className="font-semibold text-gray-700">{job.reportingTo}</span></span>}
                {job.gender && job.gender !== 'any' && <span>Gender: <span className="font-semibold text-gray-700 capitalize">{job.gender}</span></span>}
                {job.ageLimit > 0 && <span>Age Limit: <span className="font-semibold text-gray-700">{job.ageLimit} yrs</span></span>}
                
                {/* ✅ ADDED: Render Status and Language badges conditionally */}
                {job.status && (
                  <span>Status: <span className="inline-flex items-center font-semibold text-xs px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 capitalize">{job.status}</span></span>
                )}
                {job.language && (
                  <span>Language: <span className="font-semibold text-gray-700">{job.language}</span></span>
                )}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <input type="checkbox" id="follow-check" checked={followed} onChange={() => setFollowed(!followed)} className="w-3.5 h-3.5 accent-[#C8102E] rounded" />
                <label htmlFor="follow-check" className="text-[12px] text-gray-500 cursor-pointer">
                  Follow <span className="font-medium text-gray-700">{job.company}</span> as you apply to stay updated
                </label>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => navigate('/candidates')} className="px-6 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => { if (applied) { setApplied(false); } else { setIsModalOpen(true); } }}
                  className="px-8 py-2.5 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: applied ? '#059669' : 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
                >
                  {applied ? '✓ Applied' : 'Apply'}
                </button>
                <button onClick={() => setSaved(!saved)} className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill={saved ? '#C8102E' : 'none'} viewBox="0 0 24 24" stroke={saved ? '#C8102E' : '#9ca3af'} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── About the Role ── */}
            {job.aboutTheRole && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h2 className="text-sm font-bold text-[#111111] mb-2">About The Role</h2>
                <p className="text-[12px] text-gray-600 leading-relaxed">{job.aboutTheRole}</p>
              </div>
            )}

            {/* ── Job Description ── */}
            {job.description && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h2 className="text-sm font-bold text-[#111111] mb-3">Job Description</h2>
                <p className="text-[12px] text-gray-600 leading-relaxed">{job.description}</p>
                {job.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Key Responsibilities ── */}
            {job.highlights.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h2 className="text-sm font-bold text-[#111111] mb-3">Key Responsibilities</h2>
                <ul className="flex flex-col gap-2">
                  {job.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600">
                      <span className="text-[#C8102E] mt-0.5 flex-shrink-0">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Key Skills ── */}
            {job.keySkills.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h2 className="text-sm font-bold text-[#111111] mb-3">Key Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.keySkills.map((skill, i) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border transition-colors"
                      style={i === 0
                        ? { background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)', color: '#fff', border: 'none' }
                        : { borderColor: '#e5e7eb', color: '#555' }}
                    >
                      {i === 0 && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      )}
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Qualifications ── */}
            {(job.qualification || job.specialization || job.certifications || job.requiredQualifications) && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h2 className="text-sm font-bold text-[#111111] mb-3">Qualifications & Certifications</h2>
                <div className="flex flex-col gap-2 text-[12px] text-gray-600">
                  {job.qualification    && <p><span className="font-semibold text-gray-700">Qualification:</span> {job.qualification}</p>}
                  {job.specialization   && <p><span className="font-semibold text-gray-700">Specialization:</span> {job.specialization}</p>}
                  {job.certifications   && <p><span className="font-semibold text-gray-700">Certifications:</span> {job.certifications}</p>}
                  {job.requiredQualifications && <p className="leading-relaxed">{job.requiredQualifications}</p>}
                </div>
              </div>
            )}

            {/* ── Perks ── */}
            {job.perks.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h2 className="text-sm font-bold text-[#111111] mb-3">Perks & Benefits</h2>
                <div className="flex flex-wrap gap-2">
                  {job.perks.map((perk) => <PerkBadge key={perk} label={perk} />)}
                </div>
              </div>
            )}

            {/* ── Screening Questions ── */}
            {job.screeningQuestions.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h2 className="text-sm font-bold text-[#111111] mb-3">Screening Questions</h2>
                <ul className="flex flex-col gap-2">
                  {job.screeningQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600">
                      <span className="font-bold text-[#C8102E] flex-shrink-0">Q{i + 1}.</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── About Company ── */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h2 className="text-sm font-bold text-[#111111] mb-3">About The Company</h2>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 border border-gray-100" style={{ background: job.logoColor, color: job.logoTextColor }}>
                  {job.logoLetter}
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#111111]">{job.company}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {job.companyTags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-500">{tag}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setFollowed(!followed)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: followed ? '#059669' : 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
                >
                  {followed ? '✓ Following' : '+ Follow'}
                </button>
              </div>
              {job.about && (
                <>
                  <h3 className="text-[12px] font-bold text-[#111111] mb-1.5">Overview</h3>
                  <p className="text-[12px] text-gray-600 leading-relaxed">{job.about}</p>
                </>
              )}
            </div>

          </main>

          {/* ── Similar Jobs Sidebar ── */}
          <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-20">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h2 className="text-sm font-bold text-[#C8102E] mb-3">Similar Jobs</h2>
              {similar.length > 0 ? (
                similar.map((j) => (
                  <SimilarJobCard key={j.id} job={j} onClick={(jobId) => navigate(`/candidates/job/${jobId}`)} />
                ))
              ) : (
                <p className="text-[12px] text-gray-400">No similar jobs found.</p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* ── Apply Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 relative shadow-2xl flex flex-col gap-4 my-8">

            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[15px] font-bold text-[#B10D1C] leading-snug">Apply for {cleanTitle}</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">Please fill in the details below to apply for this position.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5 text-left">
              {[
                { label: 'Name', type: 'text', placeholder: 'Enter your full name' },
                { label: 'Email Address', type: 'email', placeholder: 'Enter your email address' },
                { label: 'Mobile Number', type: 'text', placeholder: 'Enter your mobile number' },
                { label: 'Current Location', type: 'text', placeholder: 'Enter your current location' },
                { label: 'Current Designation', type: 'text', placeholder: 'Enter your current designation' },
                { label: 'Expected Salary (in LPA)', type: 'text', placeholder: 'Enter your expected salary' },
                { label: 'Notice Period', type: 'text', placeholder: 'Enter your notice period' },
              ].map(({ label, type, placeholder }) => (
                <div key={label}>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">{label} <span className="text-red-500">*</span></label>
                  <input type={type} placeholder={placeholder} className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C]" />
                </div>
              ))}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Experience (in years) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] text-black bg-white appearance-none focus:outline-none focus:border-[#B10D1C]">
                    <option>Select experience</option>
                    <option>0 - 1 Years</option>
                    <option>1 - 3 Years</option>
                    <option>3 - 5 Years</option>
                    <option>5+ Years</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Screening Questions in modal if any */}
            {job.screeningQuestions.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-bold text-gray-700">Screening Questions</p>
                {job.screeningQuestions.map((q, i) => (
                  <div key={i}>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Q{i + 1}. {q}</label>
                    <input type="text" placeholder="Your answer..." className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C]" />
                  </div>
                ))}
              </div>
            )}

            <div className="border-2 border-dashed border-red-200 rounded-xl p-5 bg-[#FFF5F5]/20 text-center cursor-pointer hover:bg-[#FFF5F5]/40 transition-colors">
              <div className="flex flex-col items-center gap-1">
                <svg className="w-7 h-7 text-[#FA2329]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-[13px] font-bold text-[#FA2329]">Upload Resume</span>
                <span className="text-[10px] text-gray-400 font-medium">Upload your resume to auto-fill all profile details.</span>
              </div>
            </div>

            <div className="text-left">
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Cover Letter (Optional)</label>
              <textarea rows={3} placeholder="Write a brief note about yourself and your interest in this role..." className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C] resize-none"></textarea>
            </div>

            <div className="flex items-center gap-2 text-left">
              <input type="checkbox" id="terms" className="w-3.5 h-3.5 accent-[#B10D1C] rounded border-gray-300" />
              <label htmlFor="terms" className="text-[11px] text-gray-500 cursor-pointer select-none">
                I agree to the <span className="text-[#FA2329] font-medium hover:underline">Terms & Conditions</span> and <span className="text-[#FA2329] font-medium hover:underline">Privacy Policy</span>.
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-1 pt-3.5 border-t border-gray-100">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg text-xs font-semibold border border-[#C8102E] text-[#C8102E] hover:bg-red-50/50 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => { setApplied(true); setIsModalOpen(false); }}
                className="px-6 py-2 rounded-lg text-xs font-semibold text-white bg-[#B10D1C] hover:bg-[#960b17] transition-colors shadow-sm"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetailsPage;