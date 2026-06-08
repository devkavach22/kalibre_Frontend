// /* eslint-disable no-empty */
// import React, { useState, useEffect, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import DashboardNavbar from '../dashboards/DashboardNavbar';
// import useResume from '../APIs/hooks/useResume';

// const LOGO_COLORS = [
//   { bg: '#E8F0FE', text: '#1a73e8' },
//   { bg: '#FFF0F0', text: '#C8102E' },
//   { bg: '#F0F4FF', text: '#4F46E5' },
//   { bg: '#ECFDF5', text: '#059669' },
//   { bg: '#FFFBEB', text: '#D97706' },
//   { bg: '#F5F3FF', text: '#7C3AED' },
//   { bg: '#F0FDF4', text: '#16A34A' },
//   { bg: '#FFF7ED', text: '#EA580C' },
// ];

// function stripHtml(html) {
//   if (!html) return '';
//   return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
// }

// function formatSalary(from, to) {
//   if (!from && !to) return 'Not Disclosed';
//   if (from && to) return `${from} - ${to} LPA`;
//   if (from) return `${from}+ LPA`;
//   return `Upto ${to} LPA`;
// }

// function formatExperience(from, to) {
//   if (from == null && to == null) return 'Not Specified';
//   if (from != null && to != null) return `${from} - ${to} Years`;
//   if (from != null) return `${from}+ Years`;
//   return `Upto ${to} Years`;
// }

// function formatPostedDate(dateStr) {
//   if (!dateStr) return '';
//   const posted = new Date(dateStr);
//   const today = new Date();
//   const days = Math.floor((today - posted) / (1000 * 60 * 60 * 24));
//   if (days === 0) return 'Today';
//   if (days === 1) return '1 Day Ago';
//   return `${days} Days Ago`;
// }

// function normalizeJob(job, index) {
//   if (!job) return null;
//   const color = LOGO_COLORS[index % LOGO_COLORS.length];

//   const details = job.job_details || job || {};
//   const descriptionObj = job.job_description || job || {};
//   const preferences = job.candidate_preferences || job || {};
//   const company = job.company_details || job || {};
//   const screening = job.screening_questions || job || {};

//   const companyName = String(details.client_selection_name || details.client_selection || details.company || '').trim();

//   const locationStr = Array.isArray(details.location_names) && details.location_names.length > 0
//     ? details.location_names.join(', ')
//     : (details.location || details.job_location || '');

//   const deptStr = Array.isArray(details.department_names) && details.department_names.length > 0
//     ? details.department_names[0]
//     : (details.department || details.dept || '');

//   const allSkills = [
//     ...(Array.isArray(preferences.required_skill_names) ? preferences.required_skill_names : []),
//     ...(Array.isArray(preferences.preferred_skill_names) ? preferences.preferred_skill_names : []),
//     ...(typeof preferences.skills === 'string' ? preferences.skills.split(',').map(s => s.trim()) : [])
//   ].filter(Boolean);

//   const cleanDesc = stripHtml(descriptionObj.description || descriptionObj.about_the_role || details.description || '');

//   let highlights = [];
//   const rawHighlights = descriptionObj.key_responsibilities || details.key_responsibilities;
//   if (Array.isArray(rawHighlights)) {
//     highlights = rawHighlights;
//   } else if (typeof rawHighlights === 'string' && rawHighlights.trim()) {
//     highlights = rawHighlights.split('\n').map(s => s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
//   }

//   const perksMap = {
//     perk_health_insurance: 'Health Insurance',
//     perk_annual_bonus: 'Annual Bonus',
//     perk_provident_fund: 'Provident Fund',
//     perk_paid_leaves: 'Paid Leaves',
//     perk_flexible_working_hours: 'Flexible Working Hours',
//     perk_work_from_home: 'Work From Home',
//     perk_cab_shuttle: 'Cab / Shuttle',
//     perk_food_allowance: 'Food Allowance',
//   };

//   const rawPerks = job.perks || details.perks || {};
//   const perksEnabled = Object.entries(rawPerks)
//     .filter(([key, val]) => val === true && perksMap[key])
//     .map(([key]) => perksMap[key]);

//   if (rawPerks.perk_other && typeof rawPerks.perk_other === 'string') {
//     perksEnabled.push(rawPerks.perk_other);
//   }

//   return {
//     id: job.id || index + 1,
//     title: details.name || details.title || 'Untitled',
//     company: companyName,
//     logoLetter: (companyName?.[0] || 'J').toUpperCase(),
//     logoColor: color.bg,
//     logoTextColor: color.text,
//     rating: job.rating || details.rating || 0,
//     reviews: job.reviews || details.reviews || 0,
//     experience: formatExperience(details.experience_from, details.experience_to),
//     salary: formatSalary(details.budget_from, details.budget_to),
//     location: locationStr,
//     description: cleanDesc,
//     tags: allSkills,
//     jobType: details.job_type || details.jobType || 'Full Time',
//     postedAgo: formatPostedDate(details.published_date || details.posted_date || details.create_date),
//     workMode: details.work_mode || details.workMode || 'Work From Office',
//     dept: deptStr,
//     openings: details.number_of_openings || details.no_of_recruitment || 0,
//     highlights,
//     matchScore: [],
//     keySkills: allSkills,
//     about: company.company_overview || '',
//     aboutTheRole: descriptionObj.about_the_role || '',
//     requiredQualifications: preferences.required_qualifications || '',
//     certifications: preferences.certifications || '',
//     companyTags: [
//       ...(Array.isArray(details.industry_names) ? details.industry_names : []),
//       ...(Array.isArray(details.department_names) ? details.department_names : []),
//     ].slice(0, 3),
//     screeningQuestions: Array.isArray(screening.screening_questions) ? screening.screening_questions : [],
//     perks: perksEnabled,
//     gender: details.gender || '',
//     ageLimit: details.age_limit || 0,
//     levelName: details.level_name || '',
//     reportingTo: details.reporting_to || '',
//     qualification: preferences.qualification_name || preferences.required_qualifications || '',
//     specialization: details.specialization_name || '',
//     status: details.position_status || details.status || details.job_status || '',
//     language: details.language || details.language_name || '',
//   };
// }

// function SimilarJobCard({ job, onClick }) {
//   return (
//     <div
//       onClick={() => onClick(job.id)}
//       className="flex items-start gap-3 py-3 border-b border-gray-100 cursor-pointer hover:bg-red-50/60 rounded-xl px-3 -mx-2 transition-all duration-200 hover:translate-x-1"
//     >
//       <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs" style={{ background: job.logoColor, color: job.logoTextColor }}>
//         {job.logoLetter}
//       </div>
//       <div className="flex-1 min-w-0">
//         <p className="text-[14px] font-bold text-[#111111] leading-snug line-clamp-2 hover:text-[#C8102E] transition-colors">{job.title}</p>
//         <p className="text-[12px] font-medium text-gray-500 mt-0.5">{job.company}</p>
//         <div className="flex items-center gap-2 mt-1 flex-wrap">
//           <span className="text-[12px] text-gray-600">{job.experience}</span>
//           <span className="text-[12px] text-gray-300">•</span>
//           <span className="text-[12px] text-gray-600">{job.location}</span>
//         </div>
//         <p className="text-[11px] font-medium text-gray-400 mt-1">{job.postedAgo}</p>
//       </div>
//     </div>
//   );
// }

// function PerkBadge({ label }) {
//   return (
//     <span className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 hover:bg-green-100 transition-colors duration-150 cursor-default">
//       <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
//       {label}
//     </span>
//   );
// }

// function JobDetailsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [followed, setFollowed] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [applied, setApplied] = useState(() => {
//     try {
//       const appliedJobs = JSON.parse(localStorage.getItem('applied_jobs') || '[]');
//       return appliedJobs.includes(String(id));
//     } catch { return false; }
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [formData, setFormData] = useState(() => ({
//     name: localStorage.getItem('user_name') || '',
//     email: localStorage.getItem('email') || '',
//     mobile: '', location: '', designation: '',
//     expectedSalary: '', noticePeriod: '', experience: '',
//     gender: '', currentSalary: '', currentCompany: '', highestQualification: '',
//   }));
//   const [formErrors, setFormErrors] = useState({});
//   const [genderOpen, setGenderOpen] = useState(false);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [screeningAnswers, setScreeningAnswers] = useState([]);
//   const [coverLetter, setCoverLetter] = useState('');
//   const [experienceOpen, setExperienceOpen] = useState(false);

//   const handleFieldChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = 'Name is required';
//     else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) errors.name = 'Name must contain only letters';
//     if (!formData.email.trim()) errors.email = 'Email is required';
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Enter a valid email';
//     if (!formData.mobile.trim()) errors.mobile = 'Mobile number is required';
//     else if (!/^\d{10}$/.test(formData.mobile.trim())) errors.mobile = 'Enter a valid 10-digit mobile number';
//     if (!formData.location.trim()) errors.location = 'Location is required';
//     else if (!/^[a-zA-Z\s,]+$/.test(formData.location.trim())) errors.location = 'Location must contain only letters';
//     if (formData.designation.trim() && !/^[a-zA-Z\s]+$/.test(formData.designation.trim())) errors.designation = 'Designation must contain only letters';
//     if (formData.expectedSalary.trim() && !/^\d+(\.\d{1,2})?$/.test(formData.expectedSalary.trim())) errors.expectedSalary = 'Enter a valid number (e.g. 8 or 8.5)';
//     if (formData.noticePeriod.trim() && !/^[a-zA-Z0-9\s]+$/.test(formData.noticePeriod.trim())) errors.noticePeriod = 'Enter a valid notice period';
//     if (formData.currentSalary.trim() && !/^\d+(\.\d{1,2})?$/.test(formData.currentSalary.trim())) errors.currentSalary = 'Enter a valid number (e.g. 6 or 6.5)';
//     if (formData.currentCompany.trim() && !/^[a-zA-Z0-9\s&.,()-]+$/.test(formData.currentCompany.trim())) errors.currentCompany = 'Enter a valid company name';
//     if (formData.highestQualification.trim() && !/^[a-zA-Z\s.()]+$/.test(formData.highestQualification.trim())) errors.highestQualification = 'Qualification must contain only letters';
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const { getPublishedJobs, applyJob, applyLoading, jobs, jobsLoading } = useResume();

//   useEffect(() => {
//     if (!jobs || jobs.length === 0) {
//       getPublishedJobs();
//     }
//   }, [jobs, getPublishedJobs]);

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isModalOpen]);

//   const normalizedJobs = useMemo(() => {
//     return (Array.isArray(jobs) ? jobs : []).map((j, idx) => normalizeJob(j, idx)).filter(Boolean);
//   }, [jobs]);

//   const job = useMemo(() => {
//     return normalizedJobs.find(j => String(j.id) === String(id));
//   }, [normalizedJobs, id]);

//   const similar = useMemo(() => {
//     if (!job) return [];
//     return normalizedJobs.filter(j => String(j.id) !== String(id) && j.dept === job.dept).slice(0, 5);
//   }, [normalizedJobs, id, job]);

//   if (jobsLoading) {
//     return (
//       <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
//         <DashboardNavbar />
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex flex-col items-center gap-3">
//             <div className="w-8 h-8 border-2 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
//             <p className="text-sm text-gray-400">Loading job details...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
//         <DashboardNavbar />
//         <p className="text-gray-500 text-base mt-20">Job not found.</p>
//         <button onClick={() => navigate('/candidates')} className="mt-4 text-[#C8102E] text-base font-semibold underline hover:text-[#960b17] transition-colors">← Back to Jobs</button>
//       </div>
//     );
//   }

//   const cleanTitle = job.title.includes('||') ? job.title.split('||')[1].trim() : job.title;

//   return (
//     <div className="min-h-screen" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
//       <DashboardNavbar />

//       <div className="px-4 sm:px-6 lg:px-10 py-5">
//         <button
//           onClick={() => navigate('/candidates')}
//           className="flex items-center gap-2 text-[14px] font-bold text-white bg-[#C8102E] hover:bg-[#a30d25] active:scale-98 px-4 py-2 rounded-xl mb-4 shadow-sm transition-all duration-200 w-fit"
//         >
//           <svg className="w-4 h-4 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
//           Back to Jobs
//         </button>

//         <div className="flex gap-5 items-start">
//           <main className="flex-1 min-w-0 flex flex-col gap-4">

//             {/* ── Header Card ── */}
//             <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
//               <div className="flex items-start gap-4">
//                 <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0 border border-gray-100 shadow-inner transition-transform duration-300 hover:scale-105" style={{ background: job.logoColor, color: job.logoTextColor }}>
//                   {job.logoLetter}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-xl font-extrabold text-[#111111] leading-snug">{job.title}</h1>
//                   <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
//                     <span className="text-[15px] text-gray-600 font-semibold">{job.company}</span>
//                     {job.rating > 0 && <span className="text-[14px] text-yellow-500 font-bold">★ {job.rating}</span>}
//                     {job.reviews > 0 && <span className="text-[14px] text-gray-400 font-medium">| {job.reviews} Reviews</span>}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-[14px] font-medium text-gray-600">
//                 <span className="flex items-center gap-2 bg-gray-50 px-2.5 py-1 rounded-md">
//                   <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//                   {job.experience}
//                 </span>
//                 <span className="flex items-center gap-2 bg-gray-50 px-2.5 py-1 rounded-md">
//                   <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                   {job.salary}
//                 </span>
//                 <span className="flex items-center gap-2 bg-gray-50 px-2.5 py-1 rounded-md">
//                   <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   {job.location}
//                 </span>
//                 <span className="flex items-center gap-2 bg-gray-50 px-2.5 py-1 rounded-md">
//                   <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
//                   {job.workMode}
//                 </span>
//               </div>

//               <hr className="my-3 border-gray-100" />

//               <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-gray-500">
//                 <span>Posted: <span className="font-bold text-gray-700">{job.postedAgo}</span></span>
//                 <span>Openings: <span className="font-bold text-gray-700">{job.openings}</span></span>
//                 {job.levelName && <span>Level: <span className="font-bold text-gray-700">{job.levelName}</span></span>}
//                 {job.reportingTo && <span>Reports To: <span className="font-bold text-gray-700">{job.reportingTo}</span></span>}
//                 {job.gender && job.gender !== 'any' && <span>Gender: <span className="font-bold text-gray-700 capitalize">{job.gender}</span></span>}
//                 {job.ageLimit > 0 && <span>Age Limit: <span className="font-bold text-gray-700">{job.ageLimit} yrs</span></span>}
//                 {job.status && (
//                   <span>Status: <span className="inline-flex items-center font-bold text-[11px] px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 capitalize animate-pulse">{job.status}</span></span>
//                 )}
//                 {job.language && (
//                   <span>Language: <span className="font-bold text-gray-700">{job.language}</span></span>
//                 )}
//               </div>

//               <div className="mt-4 flex items-center gap-2.5 bg-gray-50/50 p-2 rounded-xl w-fit border border-gray-100">
//                 <input type="checkbox" id="follow-check" checked={followed} onChange={() => setFollowed(!followed)} className="w-4 h-4 accent-[#C8102E] cursor-pointer rounded" />
//                 <label htmlFor="follow-check" className="text-[13px] font-medium text-gray-600 cursor-pointer select-none">
//                   Follow <span className="font-bold text-gray-800 hover:text-[#C8102E] transition-colors">{job.company}</span> as you apply to stay updated
//                 </label>
//               </div>

//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
//                 <button onClick={() => navigate('/candidates')} className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 active:scale-98 transition-all duration-200">
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => { if (!applied) { setIsModalOpen(true); } }}
//                   className="w-full sm:w-auto px-10 py-3 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg active:scale-98 transform transition-all duration-200 hover:opacity-95"
//                   style={{ background: applied ? '#059669' : 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
//                 >
//                   {applied ? '✓ Applied' : 'Apply Now'}
//                 </button>
//                 <button onClick={() => setSaved(!saved)} className="w-full sm:w-auto p-3 rounded-xl border border-gray-200 hover:bg-red-50/30 active:scale-95 transition-all duration-200 group flex items-center justify-center">
//                   <svg className="w-4.5 h-4.5 transform transition-transform group-hover:scale-110" fill={saved ? '#C8102E' : 'none'} viewBox="0 0 24 24" stroke={saved ? '#C8102E' : '#9ca3af'} strokeWidth={2.5}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* ── About the Role ── */}
//             {job.aboutTheRole && (
//               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
//                 <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">About The Role</h2>
//                 <p className="text-[14px] text-gray-600 leading-relaxed font-medium">{job.aboutTheRole}</p>
//               </div>
//             )}

//             {/* ── Job Description ── */}
//             {job.description && (
//               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
//                 <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">Job Description</h2>
//                 <p className="text-[14px] text-gray-600 leading-relaxed font-medium">{job.description}</p>
//                 {job.tags.length > 0 && (
//                   <div className="mt-4 flex flex-wrap gap-2">
//                     {job.tags.map((tag) => (
//                       <span key={tag} className="text-[12px] font-semibold px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-default">{tag}</span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ── Key Responsibilities ── */}
//             {job.highlights.length > 0 && (
//               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
//                 <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">Key Responsibilities</h2>
//                 <ul className="flex flex-col gap-3">
//                   {job.highlights.map((h, i) => (
//                     <li key={i} className="flex items-start gap-2.5 text-[14px] text-gray-600 font-medium group">
//                       <span className="text-[#C8102E] mt-0.5 flex-shrink-0 text-lg leading-none transform transition-transform group-hover:scale-130">•</span>
//                       <span className="group-hover:text-gray-900 transition-colors">{h}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* ── Key Skills ── */}
//             {job.keySkills.length > 0 && (
//               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
//                 <h2 className="text-base font-extrabold text-[#111111] mb-4 border-b border-gray-50 pb-2">Key Skills</h2>
//                 <div className="flex flex-wrap gap-2.5">
//                   {job.keySkills.map((skill, i) => (
//                     <span
//                       key={skill}
//                       className="flex items-center gap-2 text-[13px] font-bold px-4 py-2 rounded-full border shadow-2xs transition-all duration-200 hover:scale-103 cursor-default"
//                       style={i === 0
//                         ? { background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)', color: '#fff', border: 'none' }
//                         : { borderColor: '#e5e7eb', color: '#444', background: '#fff' }}
//                     >
//                       {i === 0 && (
//                         <svg className="w-3.5 h-3.5 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//                         </svg>
//                       )}
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ── Qualifications ── */}
//             {(job.qualification || job.specialization || job.certifications || job.requiredQualifications) && (
//               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
//                 <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">Qualifications & Certifications</h2>
//                 <div className="flex flex-col gap-2.5 text-[14px] text-gray-600 font-medium">
//                   {job.qualification && <p><span className="font-bold text-gray-800">Qualification:</span> {job.qualification}</p>}
//                   {job.specialization && <p><span className="font-bold text-gray-800">Specialization:</span> {job.specialization}</p>}
//                   {job.certifications && <p><span className="font-bold text-gray-800">Certifications:</span> {job.certifications}</p>}
//                   {job.requiredQualifications && <p className="leading-relaxed border-t border-gray-50 pt-2 mt-1">{job.requiredQualifications}</p>}
//                 </div>
//               </div>
//             )}

//             {/* ── Perks ── */}
//             {job.perks && job.perks.length > 0 && (
//               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
//                 <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">Perks & Benefits</h2>
//                 <div className="flex flex-wrap gap-2.5">
//                   {job.perks.map((perk) => <PerkBadge key={perk} label={perk} />)}
//                 </div>
//               </div>
//             )}

//             {/* ── Screening Questions ── */}
//             {job.screeningQuestions.length > 0 && (
//               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
//                 <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">Screening Questions</h2>
//                 <ul className="flex flex-col gap-3">
//                   {job.screeningQuestions.map((q, i) => (
//                     <li key={i} className="flex items-start gap-2.5 text-[14px] text-gray-600 font-medium bg-gray-50/50 p-3 rounded-xl border border-gray-100">
//                       <span className="font-extrabold text-[#C8102E] flex-shrink-0">Q{i + 1}.</span>
//                       <span>{q}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* ── About Company ── */}
//             <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
//               <h2 className="text-base font-extrabold text-[#111111] mb-4 border-b border-gray-50 pb-2">About The Company</h2>

//               {/* ✅ FIX: Row 1 — Logo + Company Name */}
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0 border border-gray-100 shadow-inner" style={{ background: job.logoColor, color: job.logoTextColor }}>
//                   {job.logoLetter}
//                 </div>
//                 <p className="text-[15px] font-bold text-[#111111] leading-snug">{job.company}</p>
//               </div>

//               {/* ✅ FIX: Row 2 — Tags */}
//               {job.companyTags.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {job.companyTags.map((tag) => (
//                     <span key={tag} className="text-[12px] font-medium px-3 py-0.5 rounded-full border border-gray-200 bg-gray-50/50 text-gray-500">{tag}</span>
//                   ))}
//                 </div>
//               )}

//               {/* ✅ FIX: Row 3 — Follow button full width on mobile, auto on desktop */}
//               <div className="mb-4">
//                 <button
//                   onClick={() => setFollowed(!followed)}
//                   className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs hover:shadow-md active:scale-98 transition-all duration-200"
//                   style={{ background: followed ? '#059669' : 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
//                 >
//                   {followed ? '✓ Following' : '+ Follow'}
//                 </button>
//               </div>

//               {/* ✅ FIX: Row 4 — Overview */}
//               {job.about && (
//                 <div className="bg-gray-50/30 p-4 rounded-xl border border-gray-50">
//                   <h3 className="text-[13px] font-extrabold text-[#111111] mb-2 uppercase tracking-wider">Overview</h3>
//                   <p className="text-[14px] text-gray-600 leading-relaxed font-medium">{job.about}</p>
//                 </div>
//               )}
//             </div>

//           </main>

//           {/* ── Similar Jobs Sidebar ── */}
//           <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-20">
//             <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
//               <h2 className="text-base font-extrabold text-[#C8102E] mb-3.5 border-b border-gray-50 pb-2">Similar Jobs</h2>
//               {similar.length > 0 ? (
//                 <div className="flex flex-col gap-1">
//                   {similar.map((j) => (
//                     <SimilarJobCard key={j.id} job={j} onClick={(jobId) => navigate(`/candidates/job/${jobId}`)} />
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-[13px] font-medium text-gray-400 py-2">No similar jobs found.</p>
//               )}
//             </div>
//           </aside>
//         </div>
//       </div>

//       {/* ── Apply Modal ── */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-opacity duration-300 overflow-y-auto">
//           <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[88vh] overflow-y-auto p-8 relative shadow-2xl flex flex-col gap-5 my-6 animate-in fade-in zoom-in-95 duration-200 text-left [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

//             <div className="flex justify-between items-start border-b border-gray-100 pb-4">
//               <div>
//                 <h2 className="text-xl font-extrabold text-[#B10D1C] leading-snug">Apply for {cleanTitle}</h2>
//                 <p className="text-[13px] font-medium text-gray-500 mt-1">Please fill in the details below to apply for this position.</p>
//               </div>
//               <button onClick={() => { setIsModalOpen(false); setFormErrors({}); }} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:scale-95 transition-all">
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">

//               <div>
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Name <span className="text-red-500">*</span></label>
//                 <input type="text" placeholder="Enter your full name" value={formData.name} disabled className="w-full border border-gray-200 rounded-xl p-3 text-[13px] font-medium bg-gray-100 text-gray-500 cursor-not-allowed outline-none" />
//                 {formErrors.name && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.name}</p>}
//               </div>

//               <div>
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
//                 <input type="email" placeholder="Enter your email address" value={formData.email} disabled className="w-full border border-gray-200 rounded-xl p-3 text-[13px] font-medium bg-gray-100 text-gray-500 cursor-not-allowed outline-none" />
//                 {formErrors.email && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.email}</p>}
//               </div>

//               <div>
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
//                 <input type="text" placeholder="Enter your mobile number" value={formData.mobile} maxLength={10} onChange={e => { if (/^\d*$/.test(e.target.value)) handleFieldChange('mobile', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.mobile ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
//                 {formErrors.mobile && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.mobile}</p>}
//               </div>

//               <div>
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Current Location <span className="text-red-500">*</span></label>
//                 <input type="text" placeholder="Enter your current location" value={formData.location} onChange={e => { if (/^[a-zA-Z\s,]*$/.test(e.target.value)) handleFieldChange('location', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.location ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
//                 {formErrors.location && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.location}</p>}
//               </div>

//               <div>
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Current Designation</label>
//                 <input type="text" placeholder="Enter your current designation" value={formData.designation} onChange={e => { if (/^[a-zA-Z\s]*$/.test(e.target.value)) handleFieldChange('designation', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.designation ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
//                 {formErrors.designation && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.designation}</p>}
//               </div>

//               <div>
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Expected Salary (in LPA)</label>
//                 <input type="text" placeholder="Enter your expected salary" value={formData.expectedSalary} onChange={e => { if (/^\d*\.?\d{0,2}$/.test(e.target.value)) handleFieldChange('expectedSalary', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.expectedSalary ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
//                 {formErrors.expectedSalary && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.expectedSalary}</p>}
//               </div>

//               <div>
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Notice Period</label>
//                 <input type="text" placeholder="e.g. 30 days, Immediate" value={formData.noticePeriod} onChange={e => { if (/^[a-zA-Z0-9\s]*$/.test(e.target.value)) handleFieldChange('noticePeriod', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.noticePeriod ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
//                 {formErrors.noticePeriod && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.noticePeriod}</p>}
//               </div>

//               <div className="relative">
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Experience (in years)</label>
//                 <button type="button" onClick={() => setExperienceOpen(o => !o)} className="w-full border border-gray-200 rounded-xl px-3 py-3 text-[13px] font-medium text-left flex items-center justify-between bg-gray-50/30 hover:border-[#B10D1C] focus:outline-none focus:border-[#B10D1C] focus:ring-1 focus:ring-[#B10D1C] transition-all">
//                   <span className={formData.experience ? 'text-gray-800' : 'text-gray-400'}>{formData.experience || 'Select experience'}</span>
//                   <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${experienceOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
//                 </button>
//                 {experienceOpen && (
//                   <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
//                     {['0 - 1 Years', '1 - 3 Years', '3 - 5 Years', '5+ Years'].map(opt => (
//                       <button key={opt} type="button" onClick={() => { handleFieldChange('experience', opt); setExperienceOpen(false); }}
//                         className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-red-50 hover:text-[#B10D1C] ${formData.experience === opt ? 'bg-red-50 text-[#B10D1C] font-bold' : 'text-gray-700'}`}>
//                         {opt}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="relative">
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Gender</label>
//                 <button type="button" onClick={() => setGenderOpen(o => !o)} className="w-full border border-gray-200 rounded-xl px-3 py-3 text-[13px] font-medium text-left flex items-center justify-between bg-gray-50/30 hover:border-[#B10D1C] focus:outline-none focus:border-[#B10D1C] focus:ring-1 focus:ring-[#B10D1C] transition-all">
//                   <span className={formData.gender ? 'text-gray-800' : 'text-gray-400'}>{formData.gender || 'Select gender'}</span>
//                   <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${genderOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
//                 </button>
//                 {genderOpen && (
//                   <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
//                     {['Male', 'Female', 'Other', 'Prefer not to say'].map(opt => (
//                       <button key={opt} type="button" onClick={() => { handleFieldChange('gender', opt); setGenderOpen(false); }}
//                         className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-red-50 hover:text-[#B10D1C] ${formData.gender === opt ? 'bg-red-50 text-[#B10D1C] font-bold' : 'text-gray-700'}`}>
//                         {opt}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Current Salary (in LPA)</label>
//                 <input type="text" placeholder="Enter your current salary" value={formData.currentSalary} onChange={e => { if (/^\d*\.?\d{0,2}$/.test(e.target.value)) handleFieldChange('currentSalary', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.currentSalary ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
//                 {formErrors.currentSalary && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.currentSalary}</p>}
//               </div>

//               <div>
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Current Company</label>
//                 <input type="text" placeholder="Enter your current company name" value={formData.currentCompany} onChange={e => { if (/^[a-zA-Z0-9\s&.,()-]*$/.test(e.target.value)) handleFieldChange('currentCompany', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.currentCompany ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
//                 {formErrors.currentCompany && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.currentCompany}</p>}
//               </div>

//               <div>
//                 <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Highest Qualification</label>
//                 <input type="text" placeholder="e.g. B.Tech, MBA, M.Sc" value={formData.highestQualification} onChange={e => { if (/^[a-zA-Z\s.()]*$/.test(e.target.value)) handleFieldChange('highestQualification', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.highestQualification ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
//                 {formErrors.highestQualification && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.highestQualification}</p>}
//               </div>

//             </div>

//             {job.screeningQuestions.length > 0 && (
//               <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
//                 <p className="text-[13px] font-extrabold text-gray-800 uppercase tracking-wide">Screening Questions</p>
//                 <div className="grid grid-cols-1 gap-4">
//                   {job.screeningQuestions.map((q, i) => (
//                     <div key={i} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
//                       <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Q{i + 1}. {q}</label>
//                       <input type="text" placeholder="Your answer..."
//                         onChange={e => {
//                           const updated = [...screeningAnswers];
//                           updated[i] = { question: q, answer: e.target.value };
//                           setScreeningAnswers(updated);
//                         }}
//                         className="w-full border border-gray-200 rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:border-[#B10D1C] focus:ring-1 focus:ring-[#B10D1C] transition-all bg-white" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <label className="border-2 border-dashed border-red-200 rounded-xl p-6 bg-[#FFF5F5]/20 text-center cursor-pointer hover:bg-[#FFF5F5]/40 transition-all duration-200 group active:scale-99 block">
//               <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setResumeFile(e.target.files[0] || null)} />
//               <div className="flex flex-col items-center gap-1.5">
//                 <svg className="w-8 h-8 text-[#FA2329] transform transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//                 <span className="text-[14px] font-extrabold text-[#FA2329]">{resumeFile ? resumeFile.name : 'Upload Resume'}</span>
//                 <span className="text-[11px] text-gray-400 font-semibold">{resumeFile ? 'Click to change file' : 'PDF, DOC, DOCX supported'}</span>
//               </div>
//             </label>

//             <div className="text-left">
//               <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Cover Letter</label>
//               <textarea rows={3} placeholder="Write a brief note about yourself and your interest in this role..." value={coverLetter} onChange={e => setCoverLetter(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:border-[#B10D1C] focus:ring-1 focus:ring-[#B10D1C] transition-all bg-gray-50/30 resize-none"></textarea>
//             </div>

//             <div className="flex items-center gap-2.5 text-left bg-gray-50/50 p-3 rounded-xl border border-gray-100">
//               <input type="checkbox" id="terms" className="w-4 h-4 accent-[#B10D1C] rounded border-gray-300 cursor-pointer" />
//               <label htmlFor="terms" className="text-[13px] font-medium text-gray-500 cursor-pointer select-none">
//                 I agree to the <span className="text-[#FA2329] font-bold hover:underline">Terms & Conditions</span> and <span className="text-[#FA2329] font-bold hover:underline">Privacy Policy</span>.
//               </label>
//             </div>

//             <div className="flex justify-end gap-3 mt-1 pt-4 border-t border-gray-100">
//               <button onClick={() => { setIsModalOpen(false); setFormErrors({}); }} className="px-6 py-2.5 rounded-xl text-xs font-bold border border-[#C8102E] text-[#C8102E] hover:bg-red-50/50 active:scale-98 transition-all">
//                 Cancel
//               </button>
//               <button
//                 disabled={applyLoading}
//                 onClick={async () => {
//                   if (!validateForm()) return;
//                   const expMap = { '0 - 1 Years': 0.5, '1 - 3 Years': 2, '3 - 5 Years': 4, '5+ Years': 6 };

//                   let resumeBase64 = '';
//                   let resumeName = '';
//                   if (resumeFile) {
//                     resumeBase64 = await new Promise((res, rej) => {
//                       const r = new FileReader();
//                       r.readAsDataURL(resumeFile);
//                       r.onload = () => res(r.result.split(',')[1]);
//                       r.onerror = rej;
//                     });
//                     resumeName = resumeFile.name;
//                   }

//                   const payload = {
//                     job_id: Number(id),
//                     candidate_name: formData.name,
//                     email: formData.email,
//                     contact_no: formData.mobile,
//                     gender: (formData.gender || '').toLowerCase(),
//                     current_company: formData.currentCompany,
//                     current_designation: formData.designation,
//                     total_experience: expMap[formData.experience] ?? 0,
//                     relevant_experience: expMap[formData.experience] ?? 0,
//                     current_ctc: parseFloat(formData.currentSalary) || 0,
//                     expected_ctc: parseFloat(formData.expectedSalary) || 0,
//                     notice_period: parseInt(formData.noticePeriod) || 0,
//                     course: formData.highestQualification,
//                     applicant_notes: coverLetter,
//                     resume_name: resumeName,
//                     resume: resumeBase64,
//                     screening_answers: screeningAnswers,
//                   };

//                   const result = await applyJob(payload);
//                   if (result) {
//                     try {
//                       const appliedJobs = JSON.parse(localStorage.getItem('applied_jobs') || '[]');
//                       if (!appliedJobs.includes(String(id))) appliedJobs.push(String(id));
//                       localStorage.setItem('applied_jobs', JSON.stringify(appliedJobs));
//                     } catch { }
//                     setApplied(true);
//                     setIsModalOpen(false);
//                   }
//                 }}
//                 className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#B10D1C] hover:bg-[#960b17] active:scale-98 transition-all shadow-sm"
//               >
//                 Save Details
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default JobDetailsPage;


/* eslint-disable no-empty */
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
  const today = new Date();
  const days = Math.floor((today - posted) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return '1 Day Ago';
  return `${days} Days Ago`;
}

function normalizeJob(job, index) {
  if (!job) return null;
  const color = LOGO_COLORS[index % LOGO_COLORS.length];

  const details = job.job_details || job || {};
  const descriptionObj = job.job_description || job || {};
  const preferences = job.candidate_preferences || job || {};
  const company = job.company_details || job || {};
  const screening = job.screening_questions || job || {};

  const companyName = String(details.client_selection_name || details.client_selection || details.company || '').trim();

  const locationStr = Array.isArray(details.location_names) && details.location_names.length > 0
    ? details.location_names.join(', ')
    : (details.location || details.job_location || '');

  const deptStr = Array.isArray(details.department_names) && details.department_names.length > 0
    ? details.department_names[0]
    : (details.department || details.dept || '');

  const allSkills = [
    ...(Array.isArray(preferences.required_skill_names) ? preferences.required_skill_names : []),
    ...(Array.isArray(preferences.preferred_skill_names) ? preferences.preferred_skill_names : []),
    ...(typeof preferences.skills === 'string' ? preferences.skills.split(',').map(s => s.trim()) : [])
  ].filter(Boolean);

  const cleanDesc = stripHtml(descriptionObj.description || descriptionObj.about_the_role || details.description || '');

  let highlights = [];
  const rawHighlights = descriptionObj.key_responsibilities || details.key_responsibilities;
  if (Array.isArray(rawHighlights)) {
    highlights = rawHighlights;
  } else if (typeof rawHighlights === 'string' && rawHighlights.trim()) {
    highlights = rawHighlights.split('\n').map(s => s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
  }

  const perksMap = {
    perk_health_insurance: 'Health Insurance',
    perk_annual_bonus: 'Annual Bonus',
    perk_provident_fund: 'Provident Fund',
    perk_paid_leaves: 'Paid Leaves',
    perk_flexible_working_hours: 'Flexible Working Hours',
    perk_work_from_home: 'Work From Home',
    perk_cab_shuttle: 'Cab / Shuttle',
    perk_food_allowance: 'Food Allowance',
  };

  const rawPerks = job.perks || details.perks || {};
  const perksEnabled = Object.entries(rawPerks)
    .filter(([key, val]) => val === true && perksMap[key])
    .map(([key]) => perksMap[key]);

  if (rawPerks.perk_other && typeof rawPerks.perk_other === 'string') {
    perksEnabled.push(rawPerks.perk_other);
  }

  return {
    id: job.id || index + 1,
    title: details.name || details.title || 'Untitled',
    company: companyName,
    logoLetter: (companyName?.[0] || 'J').toUpperCase(),
    logoColor: color.bg,
    logoTextColor: color.text,
    rating: job.rating || details.rating || 0,
    reviews: job.reviews || details.reviews || 0,
    experience: formatExperience(details.experience_from, details.experience_to),
    salary: formatSalary(details.budget_from, details.budget_to),
    location: locationStr,
    description: cleanDesc,
    tags: allSkills,
    jobType: details.job_type || details.jobType || 'Full Time',
    postedAgo: formatPostedDate(details.published_date || details.posted_date || details.create_date),
    workMode: details.work_mode || details.workMode || 'Work From Office',
    dept: deptStr,
    openings: details.number_of_openings || details.no_of_recruitment || 0,
    highlights,
    matchScore: [],
    keySkills: allSkills,
    about: company.company_overview || '',
    aboutTheRole: descriptionObj.about_the_role || '',
    requiredQualifications: preferences.required_qualifications || '',
    certifications: preferences.certifications || '',
    companyTags: [
      ...(Array.isArray(details.industry_names) ? details.industry_names : []),
      ...(Array.isArray(details.department_names) ? details.department_names : []),
    ].slice(0, 3),
    screeningQuestions: Array.isArray(screening.screening_questions) ? screening.screening_questions : [],
    perks: perksEnabled,
    gender: details.gender || '',
    ageLimit: details.age_limit || 0,
    levelName: details.level_name || '',
    reportingTo: details.reporting_to || '',
    qualification: preferences.qualification_name || preferences.required_qualifications || '',
    specialization: details.specialization_name || '',
    status: details.position_status || details.status || details.job_status || '',
    language: details.language || details.language_name || '',
  };
}

// ── Stage Badge Color Map ──
function getStageBadgeStyle(stageName) {
  const name = (stageName || '').toLowerCase();
  if (name === 'new') return { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8' };
  if (name.includes('review') || name.includes('screening')) return { bg: '#FFF7ED', border: '#FED7AA', text: '#C2410C' };
  if (name.includes('interview')) return { bg: '#F5F3FF', border: '#DDD6FE', text: '#6D28D9' };
  if (name.includes('offer')) return { bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46' };
  if (name.includes('reject') || name.includes('declined')) return { bg: '#FFF1F2', border: '#FECDD3', text: '#BE123C' };
  if (name.includes('hired') || name.includes('select')) return { bg: '#F0FDF4', border: '#BBF7D0', text: '#15803D' };
  return { bg: '#F1F5F9', border: '#CBD5E1', text: '#475569' };
}

function StageBadge({ stageName }) {
  if (!stageName) return null;
  const style = getStageBadgeStyle(stageName);
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1 rounded-full border"
      style={{ background: style.bg, borderColor: style.border, color: style.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: style.text }} />
      Stage: {stageName}
    </span>
  );
}

function SimilarJobCard({ job, onClick }) {
  return (
    <div
      onClick={() => onClick(job.id)}
      className="flex items-start gap-3 py-3 border-b border-gray-100 cursor-pointer hover:bg-red-50/60 rounded-xl px-3 -mx-2 transition-all duration-200 hover:translate-x-1"
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs" style={{ background: job.logoColor, color: job.logoTextColor }}>
        {job.logoLetter}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-[#111111] leading-snug line-clamp-2 hover:text-[#C8102E] transition-colors">{job.title}</p>
        <p className="text-[12px] font-medium text-gray-500 mt-0.5">{job.company}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-[12px] text-gray-600">{job.experience}</span>
          <span className="text-[12px] text-gray-300">•</span>
          <span className="text-[12px] text-gray-600">{job.location}</span>
        </div>
        <p className="text-[11px] font-medium text-gray-400 mt-1">{job.postedAgo}</p>
      </div>
    </div>
  );
}

function PerkBadge({ label }) {
  return (
    <span className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 hover:bg-green-100 transition-colors duration-150 cursor-default">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      {label}
    </span>
  );
}

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(() => {
    try {
      const appliedJobs = JSON.parse(localStorage.getItem('applied_jobs') || '[]');
      return appliedJobs.includes(String(id));
    } catch { return false; }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── Stage State ──
  const [stageData, setStageData] = useState(null);
  const [stageLoading, setStageLoading] = useState(false);

  const [formData, setFormData] = useState(() => ({
    name: localStorage.getItem('user_name') || '',
    email: localStorage.getItem('email') || '',
    mobile: '', location: '', designation: '',
    expectedSalary: '', noticePeriod: '', experience: '',
    gender: '', currentSalary: '', currentCompany: '', highestQualification: '',
  }));
  const [formErrors, setFormErrors] = useState({});
  const [genderOpen, setGenderOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [screeningAnswers, setScreeningAnswers] = useState([]);
  const [coverLetter, setCoverLetter] = useState('');
  const [experienceOpen, setExperienceOpen] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) errors.name = 'Name must contain only letters';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Enter a valid email';
    if (!formData.mobile.trim()) errors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobile.trim())) errors.mobile = 'Enter a valid 10-digit mobile number';
    if (!formData.location.trim()) errors.location = 'Location is required';
    else if (!/^[a-zA-Z\s,]+$/.test(formData.location.trim())) errors.location = 'Location must contain only letters';
    if (formData.designation.trim() && !/^[a-zA-Z\s]+$/.test(formData.designation.trim())) errors.designation = 'Designation must contain only letters';
    if (formData.expectedSalary.trim() && !/^\d+(\.\d{1,2})?$/.test(formData.expectedSalary.trim())) errors.expectedSalary = 'Enter a valid number (e.g. 8 or 8.5)';
    if (formData.noticePeriod.trim() && !/^[a-zA-Z0-9\s]+$/.test(formData.noticePeriod.trim())) errors.noticePeriod = 'Enter a valid notice period';
    if (formData.currentSalary.trim() && !/^\d+(\.\d{1,2})?$/.test(formData.currentSalary.trim())) errors.currentSalary = 'Enter a valid number (e.g. 6 or 6.5)';
    if (formData.currentCompany.trim() && !/^[a-zA-Z0-9\s&.,()-]+$/.test(formData.currentCompany.trim())) errors.currentCompany = 'Enter a valid company name';
    if (formData.highestQualification.trim() && !/^[a-zA-Z\s.()]+$/.test(formData.highestQualification.trim())) errors.highestQualification = 'Qualification must contain only letters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const { getPublishedJobs, applyJob, applyLoading, jobs, jobsLoading } = useResume();

  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      getPublishedJobs();
    }
  }, [jobs, getPublishedJobs]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const normalizedJobs = useMemo(() => {
    return (Array.isArray(jobs) ? jobs : []).map((j, idx) => normalizeJob(j, idx)).filter(Boolean);
  }, [jobs]);

  const job = useMemo(() => {
    return normalizedJobs.find(j => String(j.id) === String(id));
  }, [normalizedJobs, id]);

  const similar = useMemo(() => {
    if (!job) return [];
    return normalizedJobs.filter(j => String(j.id) !== String(id) && j.dept === job.dept).slice(0, 5);
  }, [normalizedJobs, id, job]);

  // ── Fetch Job Stage ──
  useEffect(() => {
    const fetchStage = async () => {
      if (!job) return;
      // Get candidate_id from localStorage — adjust the key as per your app
      const candidateId = localStorage.getItem('candidate_id') || localStorage.getItem('user_id');
      if (!candidateId) return;

      setStageLoading(true);
      try {
        const response = await fetch('http://192.168.11.62:7788/api/candidate/job_stage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            candidate_id: Number(candidateId),
            job_id: Number(id),
          }),
        });
        const data = await response.json();
        if (data?.status === 'success' && data?.data) {
          setStageData(data.data);
        }
      } catch (err) {
        // silently fail — stage is optional info
      } finally {
        setStageLoading(false);
      }
    };

    fetchStage();
  }, [job, id]);

  if (jobsLoading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
        <DashboardNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
        <DashboardNavbar />
        <p className="text-gray-500 text-base mt-20">Job not found.</p>
        <button onClick={() => navigate('/candidates')} className="mt-4 text-[#C8102E] text-base font-semibold underline hover:text-[#960b17] transition-colors">← Back to Jobs</button>
      </div>
    );
  }

  const cleanTitle = job.title.includes('||') ? job.title.split('||')[1].trim() : job.title;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
      <DashboardNavbar />

      <div className="px-4 sm:px-6 lg:px-10 py-5">
        <button
          onClick={() => navigate('/candidates')}
          className="flex items-center gap-2 text-[14px] font-bold text-white bg-[#C8102E] hover:bg-[#a30d25] active:scale-98 px-4 py-2 rounded-xl mb-4 shadow-sm transition-all duration-200 w-fit"
        >
          <svg className="w-4 h-4 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to Jobs
        </button>

        <div className="flex gap-5 items-start">
          <main className="flex-1 min-w-0 flex flex-col gap-4">

            {/* ── Header Card ── */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0 border border-gray-100 shadow-inner transition-transform duration-300 hover:scale-105" style={{ background: job.logoColor, color: job.logoTextColor }}>
                  {job.logoLetter}
                </div>
                <div className="flex-1 min-w-0">

                  {/* ── Title + Stage Badge ── */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-xl font-extrabold text-[#111111] leading-snug">{job.title}</h1>
                    {stageLoading ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-400 border border-gray-200 animate-pulse">
                        Loading stage...
                      </span>
                    ) : (
                      <StageBadge stageName={stageData?.stage_name} />
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
                    <span className="text-[15px] text-gray-600 font-semibold">{job.company}</span>
                    {job.rating > 0 && <span className="text-[14px] text-yellow-500 font-bold">★ {job.rating}</span>}
                    {job.reviews > 0 && <span className="text-[14px] text-gray-400 font-medium">| {job.reviews} Reviews</span>}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-[14px] font-medium text-gray-600">
                <span className="flex items-center gap-2 bg-gray-50 px-2.5 py-1 rounded-md">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {job.experience}
                </span>
                <span className="flex items-center gap-2 bg-gray-50 px-2.5 py-1 rounded-md">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {job.salary}
                </span>
                <span className="flex items-center gap-2 bg-gray-50 px-2.5 py-1 rounded-md">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {job.location}
                </span>
                <span className="flex items-center gap-2 bg-gray-50 px-2.5 py-1 rounded-md">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  {job.workMode}
                </span>
              </div>

              <hr className="my-3 border-gray-100" />

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-gray-500">
                <span>Posted: <span className="font-bold text-gray-700">{job.postedAgo}</span></span>
                <span>Openings: <span className="font-bold text-gray-700">{job.openings}</span></span>
                {job.levelName && <span>Level: <span className="font-bold text-gray-700">{job.levelName}</span></span>}
                {job.reportingTo && <span>Reports To: <span className="font-bold text-gray-700">{job.reportingTo}</span></span>}
                {job.gender && job.gender !== 'any' && <span>Gender: <span className="font-bold text-gray-700 capitalize">{job.gender}</span></span>}
                {job.ageLimit > 0 && <span>Age Limit: <span className="font-bold text-gray-700">{job.ageLimit} yrs</span></span>}
                {job.status && (
                  <span>Status: <span className="inline-flex items-center font-bold text-[11px] px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 capitalize animate-pulse">{job.status}</span></span>
                )}
                {job.language && (
                  <span>Language: <span className="font-bold text-gray-700">{job.language}</span></span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2.5 bg-gray-50/50 p-2 rounded-xl w-fit border border-gray-100">
                <input type="checkbox" id="follow-check" checked={followed} onChange={() => setFollowed(!followed)} className="w-4 h-4 accent-[#C8102E] cursor-pointer rounded" />
                <label htmlFor="follow-check" className="text-[13px] font-medium text-gray-600 cursor-pointer select-none">
                  Follow <span className="font-bold text-gray-800 hover:text-[#C8102E] transition-colors">{job.company}</span> as you apply to stay updated
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
                <button onClick={() => navigate('/candidates')} className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 active:scale-98 transition-all duration-200">
                  Cancel
                </button>
                <button
                  onClick={() => { if (!applied) { setIsModalOpen(true); } }}
                  className="w-full sm:w-auto px-10 py-3 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg active:scale-98 transform transition-all duration-200 hover:opacity-95"
                  style={{ background: applied ? '#059669' : 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
                >
                  {applied ? '✓ Applied' : 'Apply Now'}
                </button>
                <button onClick={() => setSaved(!saved)} className="w-full sm:w-auto p-3 rounded-xl border border-gray-200 hover:bg-red-50/30 active:scale-95 transition-all duration-200 group flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 transform transition-transform group-hover:scale-110" fill={saved ? '#C8102E' : 'none'} viewBox="0 0 24 24" stroke={saved ? '#C8102E' : '#9ca3af'} strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── About the Role ── */}
            {job.aboutTheRole && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
                <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">About The Role</h2>
                <p className="text-[14px] text-gray-600 leading-relaxed font-medium">{job.aboutTheRole}</p>
              </div>
            )}

            {/* ── Job Description ── */}
            {job.description && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
                <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">Job Description</h2>
                <p className="text-[14px] text-gray-600 leading-relaxed font-medium">{job.description}</p>
                {job.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-[12px] font-semibold px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-default">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Key Responsibilities ── */}
            {job.highlights.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
                <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">Key Responsibilities</h2>
                <ul className="flex flex-col gap-3">
                  {job.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-gray-600 font-medium group">
                      <span className="text-[#C8102E] mt-0.5 flex-shrink-0 text-lg leading-none transform transition-transform group-hover:scale-130">•</span>
                      <span className="group-hover:text-gray-900 transition-colors">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Key Skills ── */}
            {job.keySkills.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
                <h2 className="text-base font-extrabold text-[#111111] mb-4 border-b border-gray-50 pb-2">Key Skills</h2>
                <div className="flex flex-wrap gap-2.5">
                  {job.keySkills.map((skill, i) => (
                    <span
                      key={skill}
                      className="flex items-center gap-2 text-[13px] font-bold px-4 py-2 rounded-full border shadow-2xs transition-all duration-200 hover:scale-103 cursor-default"
                      style={i === 0
                        ? { background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)', color: '#fff', border: 'none' }
                        : { borderColor: '#e5e7eb', color: '#444', background: '#fff' }}
                    >
                      {i === 0 && (
                        <svg className="w-3.5 h-3.5 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
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
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
                <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">Qualifications & Certifications</h2>
                <div className="flex flex-col gap-2.5 text-[14px] text-gray-600 font-medium">
                  {job.qualification && <p><span className="font-bold text-gray-800">Qualification:</span> {job.qualification}</p>}
                  {job.specialization && <p><span className="font-bold text-gray-800">Specialization:</span> {job.specialization}</p>}
                  {job.certifications && <p><span className="font-bold text-gray-800">Certifications:</span> {job.certifications}</p>}
                  {job.requiredQualifications && <p className="leading-relaxed border-t border-gray-50 pt-2 mt-1">{job.requiredQualifications}</p>}
                </div>
              </div>
            )}

            {/* ── Perks ── */}
            {job.perks && job.perks.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
                <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">Perks & Benefits</h2>
                <div className="flex flex-wrap gap-2.5">
                  {job.perks.map((perk) => <PerkBadge key={perk} label={perk} />)}
                </div>
              </div>
            )}

            {/* ── Screening Questions ── */}
            {job.screeningQuestions.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
                <h2 className="text-base font-extrabold text-[#111111] mb-3.5 border-b border-gray-50 pb-2">Screening Questions</h2>
                <ul className="flex flex-col gap-3">
                  {job.screeningQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-gray-600 font-medium bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                      <span className="font-extrabold text-[#C8102E] flex-shrink-0">Q{i + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── About Company ── */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
              <h2 className="text-base font-extrabold text-[#111111] mb-4 border-b border-gray-50 pb-2">About The Company</h2>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0 border border-gray-100 shadow-inner" style={{ background: job.logoColor, color: job.logoTextColor }}>
                  {job.logoLetter}
                </div>
                <p className="text-[15px] font-bold text-[#111111] leading-snug">{job.company}</p>
              </div>

              {job.companyTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.companyTags.map((tag) => (
                    <span key={tag} className="text-[12px] font-medium px-3 py-0.5 rounded-full border border-gray-200 bg-gray-50/50 text-gray-500">{tag}</span>
                  ))}
                </div>
              )}

              <div className="mb-4">
                <button
                  onClick={() => setFollowed(!followed)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs hover:shadow-md active:scale-98 transition-all duration-200"
                  style={{ background: followed ? '#059669' : 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
                >
                  {followed ? '✓ Following' : '+ Follow'}
                </button>
              </div>

              {job.about && (
                <div className="bg-gray-50/30 p-4 rounded-xl border border-gray-50">
                  <h3 className="text-[13px] font-extrabold text-[#111111] mb-2 uppercase tracking-wider">Overview</h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed font-medium">{job.about}</p>
                </div>
              )}
            </div>

          </main>

          {/* ── Similar Jobs Sidebar ── */}
          <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-20">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
              <h2 className="text-base font-extrabold text-[#C8102E] mb-3.5 border-b border-gray-50 pb-2">Similar Jobs</h2>
              {similar.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {similar.map((j) => (
                    <SimilarJobCard key={j.id} job={j} onClick={(jobId) => navigate(`/candidates/job/${jobId}`)} />
                  ))}
                </div>
              ) : (
                <p className="text-[13px] font-medium text-gray-400 py-2">No similar jobs found.</p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* ── Apply Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-opacity duration-300 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[88vh] overflow-y-auto p-8 relative shadow-2xl flex flex-col gap-5 my-6 animate-in fade-in zoom-in-95 duration-200 text-left [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#B10D1C] leading-snug">Apply for {cleanTitle}</h2>
                <p className="text-[13px] font-medium text-gray-500 mt-1">Please fill in the details below to apply for this position.</p>
              </div>
              <button onClick={() => { setIsModalOpen(false); setFormErrors({}); }} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:scale-95 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your full name" value={formData.name} disabled className="w-full border border-gray-200 rounded-xl p-3 text-[13px] font-medium bg-gray-100 text-gray-500 cursor-not-allowed outline-none" />
                {formErrors.name && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                <input type="email" placeholder="Enter your email address" value={formData.email} disabled className="w-full border border-gray-200 rounded-xl p-3 text-[13px] font-medium bg-gray-100 text-gray-500 cursor-not-allowed outline-none" />
                {formErrors.email && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your mobile number" value={formData.mobile} maxLength={10} onChange={e => { if (/^\d*$/.test(e.target.value)) handleFieldChange('mobile', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.mobile ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
                {formErrors.mobile && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.mobile}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Current Location <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your current location" value={formData.location} onChange={e => { if (/^[a-zA-Z\s,]*$/.test(e.target.value)) handleFieldChange('location', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.location ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
                {formErrors.location && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.location}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Current Designation</label>
                <input type="text" placeholder="Enter your current designation" value={formData.designation} onChange={e => { if (/^[a-zA-Z\s]*$/.test(e.target.value)) handleFieldChange('designation', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.designation ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
                {formErrors.designation && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.designation}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Expected Salary (in LPA)</label>
                <input type="text" placeholder="Enter your expected salary" value={formData.expectedSalary} onChange={e => { if (/^\d*\.?\d{0,2}$/.test(e.target.value)) handleFieldChange('expectedSalary', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.expectedSalary ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
                {formErrors.expectedSalary && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.expectedSalary}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Notice Period</label>
                <input type="text" placeholder="e.g. 30 days, Immediate" value={formData.noticePeriod} onChange={e => { if (/^[a-zA-Z0-9\s]*$/.test(e.target.value)) handleFieldChange('noticePeriod', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.noticePeriod ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
                {formErrors.noticePeriod && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.noticePeriod}</p>}
              </div>

              <div className="relative">
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Experience (in years)</label>
                <button type="button" onClick={() => setExperienceOpen(o => !o)} className="w-full border border-gray-200 rounded-xl px-3 py-3 text-[13px] font-medium text-left flex items-center justify-between bg-gray-50/30 hover:border-[#B10D1C] focus:outline-none focus:border-[#B10D1C] focus:ring-1 focus:ring-[#B10D1C] transition-all">
                  <span className={formData.experience ? 'text-gray-800' : 'text-gray-400'}>{formData.experience || 'Select experience'}</span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${experienceOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {experienceOpen && (
                  <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                    {['0 - 1 Years', '1 - 3 Years', '3 - 5 Years', '5+ Years'].map(opt => (
                      <button key={opt} type="button" onClick={() => { handleFieldChange('experience', opt); setExperienceOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-red-50 hover:text-[#B10D1C] ${formData.experience === opt ? 'bg-red-50 text-[#B10D1C] font-bold' : 'text-gray-700'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Gender</label>
                <button type="button" onClick={() => setGenderOpen(o => !o)} className="w-full border border-gray-200 rounded-xl px-3 py-3 text-[13px] font-medium text-left flex items-center justify-between bg-gray-50/30 hover:border-[#B10D1C] focus:outline-none focus:border-[#B10D1C] focus:ring-1 focus:ring-[#B10D1C] transition-all">
                  <span className={formData.gender ? 'text-gray-800' : 'text-gray-400'}>{formData.gender || 'Select gender'}</span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${genderOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {genderOpen && (
                  <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                    {['Male', 'Female', 'Other', 'Prefer not to say'].map(opt => (
                      <button key={opt} type="button" onClick={() => { handleFieldChange('gender', opt); setGenderOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-red-50 hover:text-[#B10D1C] ${formData.gender === opt ? 'bg-red-50 text-[#B10D1C] font-bold' : 'text-gray-700'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Current Salary (in LPA)</label>
                <input type="text" placeholder="Enter your current salary" value={formData.currentSalary} onChange={e => { if (/^\d*\.?\d{0,2}$/.test(e.target.value)) handleFieldChange('currentSalary', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.currentSalary ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
                {formErrors.currentSalary && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.currentSalary}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Current Company</label>
                <input type="text" placeholder="Enter your current company name" value={formData.currentCompany} onChange={e => { if (/^[a-zA-Z0-9\s&.,()-]*$/.test(e.target.value)) handleFieldChange('currentCompany', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.currentCompany ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
                {formErrors.currentCompany && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.currentCompany}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Highest Qualification</label>
                <input type="text" placeholder="e.g. B.Tech, MBA, M.Sc" value={formData.highestQualification} onChange={e => { if (/^[a-zA-Z\s.()]*$/.test(e.target.value)) handleFieldChange('highestQualification', e.target.value); }} className={`w-full border rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all bg-gray-50/30 ${formErrors.highestQualification ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#B10D1C] focus:ring-[#B10D1C]'}`} />
                {formErrors.highestQualification && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.highestQualification}</p>}
              </div>

            </div>

            {job.screeningQuestions.length > 0 && (
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
                <p className="text-[13px] font-extrabold text-gray-800 uppercase tracking-wide">Screening Questions</p>
                <div className="grid grid-cols-1 gap-4">
                  {job.screeningQuestions.map((q, i) => (
                    <div key={i} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                      <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Q{i + 1}. {q}</label>
                      <input type="text" placeholder="Your answer..."
                        onChange={e => {
                          const updated = [...screeningAnswers];
                          updated[i] = { question: q, answer: e.target.value };
                          setScreeningAnswers(updated);
                        }}
                        className="w-full border border-gray-200 rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:border-[#B10D1C] focus:ring-1 focus:ring-[#B10D1C] transition-all bg-white" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <label className="border-2 border-dashed border-red-200 rounded-xl p-6 bg-[#FFF5F5]/20 text-center cursor-pointer hover:bg-[#FFF5F5]/40 transition-all duration-200 group active:scale-99 block">
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setResumeFile(e.target.files[0] || null)} />
              <div className="flex flex-col items-center gap-1.5">
                <svg className="w-8 h-8 text-[#FA2329] transform transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-[14px] font-extrabold text-[#FA2329]">{resumeFile ? resumeFile.name : 'Upload Resume'}</span>
                <span className="text-[11px] text-gray-400 font-semibold">{resumeFile ? 'Click to change file' : 'PDF, DOC, DOCX supported'}</span>
              </div>
            </label>

            <div className="text-left">
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Cover Letter</label>
              <textarea rows={3} placeholder="Write a brief note about yourself and your interest in this role..." value={coverLetter} onChange={e => setCoverLetter(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:border-[#B10D1C] focus:ring-1 focus:ring-[#B10D1C] transition-all bg-gray-50/30 resize-none"></textarea>
            </div>

            <div className="flex items-center gap-2.5 text-left bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <input type="checkbox" id="terms" className="w-4 h-4 accent-[#B10D1C] rounded border-gray-300 cursor-pointer" />
              <label htmlFor="terms" className="text-[13px] font-medium text-gray-500 cursor-pointer select-none">
                I agree to the <span className="text-[#FA2329] font-bold hover:underline">Terms & Conditions</span> and <span className="text-[#FA2329] font-bold hover:underline">Privacy Policy</span>.
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-1 pt-4 border-t border-gray-100">
              <button onClick={() => { setIsModalOpen(false); setFormErrors({}); }} className="px-6 py-2.5 rounded-xl text-xs font-bold border border-[#C8102E] text-[#C8102E] hover:bg-red-50/50 active:scale-98 transition-all">
                Cancel
              </button>
              <button
                disabled={applyLoading}
                onClick={async () => {
                  if (!validateForm()) return;
                  const expMap = { '0 - 1 Years': 0.5, '1 - 3 Years': 2, '3 - 5 Years': 4, '5+ Years': 6 };

                  let resumeBase64 = '';
                  let resumeName = '';
                  if (resumeFile) {
                    resumeBase64 = await new Promise((res, rej) => {
                      const r = new FileReader();
                      r.readAsDataURL(resumeFile);
                      r.onload = () => res(r.result.split(',')[1]);
                      r.onerror = rej;
                    });
                    resumeName = resumeFile.name;
                  }

                  const payload = {
                    job_id: Number(id),
                    candidate_name: formData.name,
                    email: formData.email,
                    contact_no: formData.mobile,
                    gender: (formData.gender || '').toLowerCase(),
                    current_company: formData.currentCompany,
                    current_designation: formData.designation,
                    total_experience: expMap[formData.experience] ?? 0,
                    relevant_experience: expMap[formData.experience] ?? 0,
                    current_ctc: parseFloat(formData.currentSalary) || 0,
                    expected_ctc: parseFloat(formData.expectedSalary) || 0,
                    notice_period: parseInt(formData.noticePeriod) || 0,
                    course: formData.highestQualification,
                    applicant_notes: coverLetter,
                    resume_name: resumeName,
                    resume: resumeBase64,
                    screening_answers: screeningAnswers,
                  };

                  const result = await applyJob(payload);
                  if (result) {
                    try {
                      const appliedJobs = JSON.parse(localStorage.getItem('applied_jobs') || '[]');
                      if (!appliedJobs.includes(String(id))) appliedJobs.push(String(id));
                      localStorage.setItem('applied_jobs', JSON.stringify(appliedJobs));
                    } catch { }
                    setApplied(true);
                    setIsModalOpen(false);
                  }
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#B10D1C] hover:bg-[#960b17] active:scale-98 transition-all shadow-sm"
              >
                {applyLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : 'Save Details'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetailsPage;


