import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../dashboards/DashboardNavbar';
import useResume from '../APIs/hooks/useResume';

import { FILTER_LABELS, getStandardDepartment, FilterContent } from './JobFilters';
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
  if (from && to) return `${from} - ${to} Lakhs`;
  if (from) return `${from}+ Lakhs`;
  return `Upto ${to} Lakhs`;
}

function getSalaryRangeLabel(from, to) {
  if (!from && !to) return '';
  const f = parseFloat(from || 0);
  const t = parseFloat(to || 0);
  
  if (f >= 0 && t <= 3) return '0-3 Lakhs';
  if (f >= 3 && t <= 6) return '3-6 Lakhs';
  if (f >= 6 && t <= 10) return '6-10 Lakhs';
  if (f >= 10 && t <= 15) return '10-15 Lakhs';
  if (f >= 15 && t <= 25) return '15-25 Lakhs';
  if (f >= 25 && t <= 50) return '25-50 Lakhs';
  return '';
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
  
  const details = job.job_details || {};
  const descriptionObj = job.job_description || {};
  const preferences = job.candidate_preferences || {};
  const company = job.company_details || {};
  const screening = job.screening_questions || {};

  const companyName = String(details.client_selection || details.company || '').trim();

  const locationStr = Array.isArray(details.location_names) && details.location_names.length > 0
    ? details.location_names.join(', ')
    : (details.location || details.job_location || 'Not Disclosed');

  const rawDeptStr = Array.isArray(details.department_names) && details.department_names.length > 0
    ? details.department_names[0]
    : (details.department || details.dept || '');
    
  const deptStr = getStandardDepartment(rawDeptStr);

  const allDepartments = Array.isArray(details.department_names) 
    ? details.department_names.map(getStandardDepartment) 
    : [deptStr].filter(Boolean);

  const allSkills = [
    ...(Array.isArray(preferences.required_skill_names) ? preferences.required_skill_names : []),
    ...(Array.isArray(preferences.preferred_skill_names) ? preferences.preferred_skill_names : []),
    ...(preferences.skills ? preferences.skills.split(',').map(s => s.trim()) : [])
  ].filter(Boolean);

  const cleanDesc = stripHtml(descriptionObj.about_the_role || details.description || '');

  return {
    id:             job.id || index + 1,
    title:          details.name || details.title || 'Untitled',
    company:        companyName,
    logoLetter:     (companyName?.[0] || 'J').toUpperCase(),
    logoColor:      color.bg,
    logoTextColor:  color.text,
    rating:         job.rating  || details.rating || 0,
    reviews:        job.reviews || details.reviews || 0,
    experience:     formatExperience(details.experience_from, details.experience_to),
    salary:         formatSalary(details.budget_from, details.budget_to),
    location:       locationStr,
    description:    cleanDesc,
    tags:           allDepartments,
    jobType:        details.job_type  || details.jobType  || 'Full Time',
    postedAgo:      formatPostedDate(details.create_date || details.published_date || details.posted_date),
    workMode:       details.work_mode || details.workMode || 'Work From Office',
    dept:           deptStr,
    salaryRange:    getSalaryRangeLabel(details.budget_from, details.budget_to),
    companyType:    details.company_type  || details.companyType || 'Corporate',
    role:           details.role_category || details.role || '',
    qualification:  preferences.required_qualifications  || '',
    specialization: details.specialization_name || '',
    openings:         details.number_of_openings || details.no_of_recruitment || 0,
    highlights:       descriptionObj.key_responsibilities
                        ? descriptionObj.key_responsibilities.split('\n').filter(Boolean)
                        : [],
    matchScore:       [],
    keySkills:        allSkills,
    about:            company.company_overview || '',
    companyTags:      [
                        ...(Array.isArray(details.industry_names) ? details.industry_names : []),
                        ...(Array.isArray(details.department_names) ? details.department_names : []),
                      ].slice(0, 3),
    screeningQuestions: Array.isArray(screening.screening_questions) ? screening.screening_questions : [],
    aboutTheRole:     descriptionObj.about_the_role || '',
    requiredQualifications: preferences.required_qualifications || '',
    certifications:   preferences.certifications || '',
    perks:            job.perks || details.perks || {},
    gender:           details.gender || '',
    ageLimit:         details.age_limit || 0,
    levelName:        details.level_name || '',
    reportingTo:      details.reporting_to || '',
  };
}

function JobCard({ job }) {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/candidates/job/${job.id}`)}
      className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col gap-3 h-full cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0"
          style={{ background: job.logoColor, color: job.logoTextColor }}
        >
          {job.logoLetter}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[13px] font-semibold text-[#111111] leading-snug">{job.title}</h3>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className="text-[12px] text-gray-500">{job.company}</span>
            {job.rating > 0 && <span className="text-[12px] text-yellow-500 font-medium">★ {job.rating}</span>}
            {job.reviews > 0 && <span className="text-[12px] text-gray-400">| {job.reviews} Reviews</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {job.experience}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {job.salary}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
      </div>

      <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span key={tag} className="text-[12px] text-gray-500 before:content-['•'] before:mr-1 before:text-gray-300">{tag}</span>
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-[12px] px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-600">{job.jobType}</span>
          <span className="text-[12px] text-gray-400">{job.postedAgo}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={(e) => e.stopPropagation()} className="text-gray-300 hover:text-gray-500 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}>
            <svg className="w-3.5 h-3.5" fill={saved ? '#C8102E' : 'none'} viewBox="0 0 24 24" stroke={saved ? '#C8102E' : '#9ca3af'} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function CandidateDashboard() {
  const [keyword, setKeyword]             = useState('');
  const [experience, setExperience]       = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [showRelevance, setShowRelevance] = useState(true);
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen]   = useState(false);

  const { getPublishedJobs, jobs, jobsLoading } = useResume();
  const [jobsError, setJobsError] = useState(null);

  const dropdownRef = useRef(null);

  const [selectedWorkMode, setSelectedWorkMode] = useState([]);
  const [selectedDept,     setSelectedDept]     = useState([]);
  const [selectedSalary,   setSelectedSalary]   = useState([]);
  const [selectedCompany,  setSelectedCompany]  = useState([]);
  const [selectedRole,     setSelectedRole]     = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [expRange,         setExpRange]         = useState(30);

  useEffect(() => {
    const fetchJobs = async () => {
      setJobsError(null);
      try {
        await getPublishedJobs();
      } catch (err) {
        setJobsError(err.message || 'Failed to load jobs');
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (setter, list, value) =>
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const resetAllFilters = () => {
    setKeyword('');
    setExperience('');
    setLocationInput('');
    setExpRange(30);
    setSelectedWorkMode([]);
    setSelectedDept([]);
    setSelectedSalary([]);
    setSelectedCompany([]);
    setSelectedRole([]);
    setSelectedLocation([]);
  };

  const appliedCount = [selectedWorkMode, selectedDept, selectedSalary, selectedCompany, selectedRole, selectedLocation].flat().length;

  const normalizedJobs = useMemo(() => (Array.isArray(jobs) ? jobs : []).map(normalizeJob), [jobs]);

  const liveCounts = useMemo(() => {
    const counts = {
      workMode: {},
      department: {},
      salary: {},
      companyType: {},
      roleCategory: {},
      location: {}
    };

    normalizedJobs.forEach((job) => {
      if (job.workMode) counts.workMode[job.workMode] = (counts.workMode[job.workMode] || 0) + 1;
      if (job.dept) counts.department[job.dept] = (counts.department[job.dept] || 0) + 1;
      if (job.salaryRange) counts.salary[job.salaryRange] = (counts.salary[job.salaryRange] || 0) + 1;
      if (job.companyType) counts.companyType[job.companyType] = (counts.companyType[job.companyType] || 0) + 1;
      if (job.role) counts.roleCategory[job.role] = (counts.roleCategory[job.role] || 0) + 1;
      
      const allLabels = [...FILTER_LABELS.location.base, ...FILTER_LABELS.location.extra];
      allLabels.forEach(loc => {
        if (job.location.toLowerCase().includes(loc.toLowerCase())) {
          counts.location[loc] = (counts.location[loc] || 0) + 1;
        }
      });
    });

    return counts;
  }, [normalizedJobs]);

  const filteredJobs = useMemo(() => {
    const kw  = keyword.trim().toLowerCase();
    const loc = locationInput.trim().toLowerCase();
    return normalizedJobs.filter((job) => {
      if (kw && !job.title.toLowerCase().includes(kw) &&
                !job.company.toLowerCase().includes(kw) &&
                !job.tags.some(t => t.toLowerCase().includes(kw))) return false;
      if (loc && !job.location.toLowerCase().includes(loc)) return false;
      if (experience) {
        const expNums = job.experience.match(/\d+/g);
        const [dMin, dMax] = experience.split('-').map(s => parseInt(s));
        if (expNums) {
          const jMin = parseInt(expNums[0]);
          const jMax = parseInt(expNums[1] || expNums[0]);
          if (!isNaN(dMax) && jMin > dMax) return false;
          if (!isNaN(dMin) && jMax < dMin) return false;
        }
      }
      if (selectedWorkMode.length && !selectedWorkMode.includes(job.workMode))    return false;
      if (selectedDept.length     && !selectedDept.includes(job.dept))            return false;
      if (selectedSalary.length   && !selectedSalary.includes(job.salaryRange))   return false;
      if (selectedCompany.length  && !selectedCompany.includes(job.companyType))  return false;
      if (selectedRole.length     && !selectedRole.includes(job.role))            return false;
      if (selectedLocation.length && !selectedLocation.some(l2 => job.location.includes(l2))) return false;
      const sliderNums = job.experience.match(/\d+/g);
      if (sliderNums) {
        const minExp = parseInt(sliderNums[0]);
        if (minExp > parseInt(expRange)) return false;
      }
      return true;
    });
  }, [normalizedJobs, keyword, locationInput, experience, selectedWorkMode, selectedDept, selectedSalary, selectedCompany, selectedRole, selectedLocation, expRange]);

  const filterProps = {
    selectedWorkMode, setSelectedWorkMode,
    selectedDept,     setSelectedDept,
    selectedSalary,   setSelectedSalary,
    selectedCompany,  setSelectedCompany,
    selectedRole,     setSelectedRole,
    selectedLocation, setSelectedLocation,
    expRange,         setExpRange,
    toggle,
    resetAllFilters,
    liveCounts,
  };

  const firstThree     = filteredJobs.slice(0, 3);
  const rest           = filteredJobs.slice(3);

  const expOptions = [
    { value: '', label: 'Select Experience' },
    { value: '0-1', label: '0-1 Years' },
    { value: '1-3', label: '1-3 Years' },
    { value: '3-5', label: '3-5 Years' },
    { value: '5+',  label: '5+ Years' },
  ];

  const currentExpLabel = expOptions.find(o => o.value === experience)?.label || 'Select Experience';

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
      <DashboardNavbar />

      <div className="px-4 sm:px-6 lg:px-10 pt-5 pb-0">
        <div className="rounded-2xl px-4 sm:px-6 lg:px-8 py-5" style={{ background: 'linear-gradient(135deg,#FFF0F0 0%,#FFE4E4 100%)' }}>
          <div className="flex items-start justify-between gap-4 w-full">
            <div>
              <span className="inline-block text-xs font-medium text-[#C8102E] bg-white border border-pink-200 px-3 py-1 rounded-full mb-2">Discovery Market</span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111111]">Job <span className="text-[#C8102E]">Intelligence</span></h1>
              <p className="text-xs text-gray-500 mt-1 max-w-md">AI-Curated Opportunities Tailored To Your Professional Profile And Career Velocity.</p>
            </div>

            <div className="lg:hidden flex-shrink-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-[11px] font-semibold shadow-sm transition-all active:scale-95"
                style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filters {appliedCount > 0 && `(${appliedCount})`}
              </button>
            </div>

            <button
              className="hidden sm:inline-flex flex-shrink-0 items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-semibold hover:opacity-90 w-auto"
              style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
            >
              {jobsLoading ? 'Loading...' : `${normalizedJobs.length} Jobs`}
            </button>
          </div>

          <div className="sm:hidden mt-3 w-full">
            <button className="w-full py-2 rounded-xl text-white text-xs font-semibold" style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}>
              {jobsLoading ? 'Loading...' : `${normalizedJobs.length} Jobs`}
            </button>
          </div>

          <div className="mt-4 flex flex-col lg:flex-row lg:items-center bg-white rounded-2xl lg:rounded-full border border-gray-200 shadow-sm max-w-2xl mx-auto p-1 lg:p-0 relative z-40">
            <input
              type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter Keyword / Designation / Companies"
              className="w-full lg:flex-1 px-4 py-3 text-xs text-gray-700 placeholder-gray-400 outline-none min-w-0 border-b lg:border-b-0 border-gray-100 lg:rounded-l-full"
            />
            <div className="hidden lg:block w-px h-5 bg-gray-200 flex-shrink-0" />

            <div className="relative w-full lg:w-auto flex-shrink-0 border-b lg:border-b-0 border-gray-100" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full lg:w-48 px-4 lg:px-5 py-3 flex items-center justify-between text-xs text-gray-500 bg-transparent outline-none cursor-pointer text-left font-medium"
              >
                <span>{currentExpLabel}</span>
                <svg className={`w-3.5 h-3.5 text-gray-400 pointer-events-none transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 lg:mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden py-1 max-h-60 overflow-y-auto">
                  {expOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => { setExperience(opt.value); setDropdownOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-xs transition-colors duration-150 ${experience === opt.value ? 'bg-red-50 text-[#C8102E] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden lg:block w-px h-5 bg-gray-200 flex-shrink-0" />
            <input
              type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter Location"
              className="w-full lg:flex-1 px-4 py-3 text-xs text-gray-700 placeholder-gray-400 outline-none min-w-0"
            />
            <button
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-white text-xs font-semibold rounded-xl lg:rounded-full m-1 flex-shrink-0 w-full lg:w-auto"
              style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-10 py-5 flex gap-5 items-start">
        <main className="flex-1 min-w-0 flex flex-col gap-4">

          {jobsLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-gray-400">Loading jobs...</p>
              </div>
            </div>
          )}

          {jobsError && !jobsLoading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-[#C8102E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-700">Failed to Load Jobs</p>
              <p className="text-xs text-gray-400 mt-1">{jobsError}</p>
              <button onClick={() => window.location.reload()} className="mt-3 text-xs font-semibold text-white px-4 py-1.5 rounded-full" style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}>
                Try Again
              </button>
            </div>
          )}

          {!jobsLoading && !jobsError && (
            <>
              {firstThree.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
                  {firstThree.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
              )}

              {showRelevance && filteredJobs.length > 0 && (
                <div className="rounded-xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ background: 'linear-gradient(135deg,#FFF0F0 0%,#FFE4E4 100%)', border: '1px solid #fecdd3' }}>
                  <p className="text-xs font-semibold text-[#111111]">Are These <span className="text-[#C8102E]">Jobs</span> Relevant For You?</p>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button onClick={() => setShowRelevance(false)} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600">No</button>
                    <button onClick={() => setShowRelevance(false)} className="px-4 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}>Yes</button>
                  </div>
                </div>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
                  {rest.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
              )}

              {filteredJobs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-[#C8102E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">No Jobs Found</p>
                  <p className="text-xs text-gray-400 mt-1">Try adjusting or clearing your filters</p>
                </div>
              )}
            </>
          )}
        </main>

        <aside className="hidden lg:block w-96 flex-shrink-0 bg-white rounded-2xl p-5 border border-gray-100 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xs font-bold text-[#111111]">All Filters</h2>
            <button onClick={resetAllFilters} className="flex items-center gap-1 text-[11px] text-white font-semibold px-2.5 py-1 rounded-full" style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Reset All
            </button>
          </div>
          <FilterContent {...filterProps} />
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold">
                  All Filters {appliedCount > 0 && <span className="text-[#C8102E]"> ({appliedCount})</span>}
                </h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <FilterContent {...filterProps} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default CandidateDashboard;