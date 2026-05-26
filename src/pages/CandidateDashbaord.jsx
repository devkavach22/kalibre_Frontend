import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../dashboards/DashboardNavbar';

const ALL_JOBS = [
  { id:1,  title:'Walk-In || Hiring For Technical Support / Service Desk Role', company:'Arsenaltech',   logoLetter:'C', logoColor:'#E8F0FE', logoTextColor:'#1a73e8', rating:4.5, reviews:7,  experience:'0 - 1 Years', salary:'Not Disclosed', location:'Bengaluru',   description:'Flexible And Open To Working In A 24x7 Environment With Rotating Shifts And Rotating...', tags:['IT Service Desk','Service Desk Management','IT Helpdesk','Helpdesk'],        jobType:'Walk-In',   postedAgo:'1 Day Ago',  workMode:'Work From Office', dept:'Customer Success, Service & Operations', salaryRange:'0-3 Lakhs',   companyType:'Corporate', role:'BD / Pre Sales' },
  { id:2,  title:'Senior React Developer – FinTech Product',                    company:'TechNova',      logoLetter:'T', logoColor:'#FFF0F0', logoTextColor:'#C8102E', rating:4.2, reviews:14, experience:'3 - 5 Years', salary:'12-18 LPA',      location:'Mumbai',      description:'Build and maintain high-performance React applications for a leading FinTech platform...', tags:['React','JavaScript','Redux','TypeScript'],                                   jobType:'Full Time', postedAgo:'2 Days Ago', workMode:'Hybrid',           dept:'Sales & Business Development',           salaryRange:'10-15 Lakhs', companyType:'Startup',   role:'Retail & B2C Sales' },
  { id:3,  title:'HR Business Partner – Talent & Culture',                      company:'PeopleFirst',   logoLetter:'P', logoColor:'#F0F4FF', logoTextColor:'#4F46E5', rating:4.7, reviews:9,  experience:'2 - 4 Years', salary:'8-12 LPA',       location:'Hyderabad',   description:'Partner with leadership to drive talent strategy, culture initiatives and org design...', tags:['HRBP','Talent Management','Culture','OD'],                                  jobType:'Full Time', postedAgo:'3 Days Ago', workMode:'Work From Office', dept:'Human Resources',                        salaryRange:'6-10 Lakhs',  companyType:'MNC',       role:'Recruitment & Talent Acquisition' },
  { id:4,  title:'Business Development Executive – SaaS Sales',                 company:'CloudReach',    logoLetter:'W', logoColor:'#ECFDF5', logoTextColor:'#059669', rating:4.0, reviews:5,  experience:'1 - 3 Years', salary:'5-8 LPA',        location:'Pune',        description:'Drive new business acquisition through outbound sales, demos and pipeline management...', tags:['B2B Sales','SaaS','CRM','Cold Calling'],                                    jobType:'Full Time', postedAgo:'1 Day Ago',  workMode:'Remote',           dept:'Sales & Business Development',           salaryRange:'3-6 Lakhs',   companyType:'Startup',   role:'BD / Pre Sales' },
  { id:5,  title:'Finance Analyst – FP&A & Reporting',                          company:'CapitalEdge',   logoLetter:'A', logoColor:'#FFFBEB', logoTextColor:'#D97706', rating:4.3, reviews:11, experience:'2 - 5 Years', salary:'10-15 LPA',      location:'Ahmedabad',   description:'Lead financial planning, budgeting and variance analysis for group entities...', tags:['FP&A','Excel','Power BI','Financial Modelling'],                             jobType:'Full Time', postedAgo:'4 Days Ago', workMode:'Work From Office', dept:'Finance & Accounting',                   salaryRange:'10-15 Lakhs', companyType:'Corporate', role:'Accounting & Taxation' },
  { id:6,  title:'Walk-In || Customer Support Associate – Night Shift',         company:'Arsenaltech',   logoLetter:'C', logoColor:'#E8F0FE', logoTextColor:'#1a73e8', rating:4.5, reviews:7,  experience:'0 - 1 Years', salary:'Not Disclosed',  location:'Bengaluru',   description:'Handle inbound customer queries via chat, email and phone in a fast-paced environment...', tags:['Customer Support','Voice Process','CRM','English'],                         jobType:'Walk-In',   postedAgo:'1 Day Ago',  workMode:'Work From Office', dept:'Customer Success, Service & Operations', salaryRange:'0-3 Lakhs',   companyType:'Corporate', role:'BD / Pre Sales' },
  { id:7,  title:'Full Stack Engineer – Node & React',                          company:'DevHouse',      logoLetter:'D', logoColor:'#F5F3FF', logoTextColor:'#7C3AED', rating:4.6, reviews:22, experience:'2 - 4 Years', salary:'15-22 LPA',      location:'Bangalore',   description:'Design and build scalable APIs and responsive UIs for enterprise SaaS products...', tags:['Node.js','React','PostgreSQL','AWS'],                                        jobType:'Full Time', postedAgo:'2 Days Ago', workMode:'Hybrid',           dept:'Sales & Business Development',           salaryRange:'10-15 Lakhs', companyType:'Startup',   role:'Retail & B2C Sales' },
  { id:8,  title:'Recruiter – Tech & Product Hiring',                           company:'TalentBridge',  logoLetter:'R', logoColor:'#FFF0F0', logoTextColor:'#C8102E', rating:4.1, reviews:6,  experience:'1 - 3 Years', salary:'4-7 LPA',        location:'New Delhi',   description:'Source, screen and close tech talent for product and engineering teams across India...', tags:['Sourcing','Tech Hiring','LinkedIn','ATS'],                                  jobType:'Full Time', postedAgo:'5 Days Ago', workMode:'Remote',           dept:'Human Resources',                        salaryRange:'3-6 Lakhs',   companyType:'SME',       role:'Recruitment & Talent Acquisition' },
  { id:9,  title:'Accounts Manager – GST & Compliance',                         company:'FinSolve',      logoLetter:'F', logoColor:'#ECFDF5', logoTextColor:'#059669', rating:4.4, reviews:8,  experience:'3 - 6 Years', salary:'8-12 LPA',       location:'Ahmedabad',   description:'Manage end-to-end accounts, GST filings, TDS compliance and vendor reconciliation...', tags:['GST','Tally','TDS','Accounts'],                                             jobType:'Full Time', postedAgo:'3 Days Ago', workMode:'Work From Office', dept:'Finance & Accounting',                   salaryRange:'6-10 Lakhs',  companyType:'Corporate', role:'Accounting & Taxation' },
  { id:10, title:'Inside Sales Executive – EdTech',                             company:'LearnUp',       logoLetter:'L', logoColor:'#FFFBEB', logoTextColor:'#D97706', rating:3.9, reviews:18, experience:'0 - 2 Years', salary:'3-6 LPA',        location:'Mumbai',      description:'Convert warm leads to paid enrollments through consultative selling and follow-ups...', tags:['Inside Sales','EdTech','Targets','Communication'],                          jobType:'Full Time', postedAgo:'1 Day Ago',  workMode:'Work From Office', dept:'Sales & Business Development',           salaryRange:'3-6 Lakhs',   companyType:'Startup',   role:'Retail & B2C Sales' },
  { id:11, title:'IT Help Desk Technician – L1 Support',                        company:'SupportNest',   logoLetter:'S', logoColor:'#F0F4FF', logoTextColor:'#4F46E5', rating:4.2, reviews:3,  experience:'0 - 1 Years', salary:'2-4 LPA',        location:'Gandhinagar', description:'Provide first-line IT support for hardware, software and network issues to end users...', tags:['IT Support','Windows','Networking','Ticketing'],                            jobType:'Walk-In',   postedAgo:'2 Days Ago', workMode:'Work From Office', dept:'Customer Success, Service & Operations', salaryRange:'0-3 Lakhs',   companyType:'SME',       role:'BD / Pre Sales' },
  { id:12, title:'Product Manager – B2B SaaS Platform',                         company:'Nexora',        logoLetter:'N', logoColor:'#F0FDF4', logoTextColor:'#16A34A', rating:4.6, reviews:19, experience:'3 - 6 Years', salary:'18-28 LPA',      location:'Bengaluru',   description:'Own product roadmap, work with engineering & design teams to ship features that delight enterprise customers...', tags:['Product Roadmap','Agile','Stakeholder Mgmt','Jira'],        jobType:'Full Time', postedAgo:'1 Day Ago',  workMode:'Hybrid',           dept:'Sales & Business Development',           salaryRange:'15-25 Lakhs', companyType:'Startup',   role:'BD / Pre Sales' },
  { id:13, title:'Data Analyst – Growth & Marketing Analytics',                  company:'GrowthLab',     logoLetter:'G', logoColor:'#FFF7ED', logoTextColor:'#EA580C', rating:4.3, reviews:12, experience:'1 - 3 Years', salary:'7-11 LPA',       location:'Mumbai',      description:'Analyze user funnels, run A/B experiments and build dashboards to drive data-informed growth decisions...', tags:['SQL','Python','Tableau','Google Analytics'],               jobType:'Full Time', postedAgo:'2 Days Ago', workMode:'Hybrid',           dept:'Finance & Accounting',                   salaryRange:'6-10 Lakhs',  companyType:'Startup',   role:'Accounting & Taxation' },
  { id:14, title:'UX Designer – Mobile & Web Products',                          company:'PixelCraft',    logoLetter:'U', logoColor:'#FDF4FF', logoTextColor:'#A21CAF', rating:4.8, reviews:27, experience:'2 - 5 Years', salary:'12-20 LPA',      location:'Pune',        description:'Design intuitive user experiences for mobile-first products; collaborate with PMs and engineers in sprints...', tags:['Figma','User Research','Prototyping','Design Systems'],    jobType:'Full Time', postedAgo:'3 Days Ago', workMode:'Remote',           dept:'Sales & Business Development',           salaryRange:'10-15 Lakhs', companyType:'Startup',   role:'Retail & B2C Sales' },
  { id:15, title:'DevOps Engineer – Cloud Infrastructure',                       company:'CloudStack',    logoLetter:'D', logoColor:'#EFF6FF', logoTextColor:'#2563EB', rating:4.5, reviews:9,  experience:'2 - 4 Years', salary:'14-22 LPA',      location:'Hyderabad',   description:'Manage CI/CD pipelines, Kubernetes clusters and AWS infrastructure for high-traffic SaaS applications...', tags:['AWS','Kubernetes','Terraform','CI/CD'],                     jobType:'Full Time', postedAgo:'1 Day Ago',  workMode:'Work From Office', dept:'Human Resources',                        salaryRange:'10-15 Lakhs', companyType:'MNC',       role:'Recruitment & Talent Acquisition' },
  { id:16, title:'Content Strategist – Brand & SEO',                            company:'InkHouse',      logoLetter:'I', logoColor:'#FFF1F2', logoTextColor:'#BE123C', rating:4.1, reviews:6,  experience:'1 - 3 Years', salary:'5-9 LPA',        location:'New Delhi',   description:'Create compelling content strategies, manage editorial calendars and drive organic growth through SEO-optimized content...', tags:['SEO','Content Writing','Brand Voice','CMS'],           jobType:'Full Time', postedAgo:'4 Days Ago', workMode:'Remote',           dept:'Sales & Business Development',           salaryRange:'3-6 Lakhs',   companyType:'SME',       role:'Retail & B2C Sales' },
  { id:17, title:'Walk-In || Operations Executive – Logistics',                  company:'SwiftMove',     logoLetter:'W', logoColor:'#F0FDF4', logoTextColor:'#15803D', rating:3.8, reviews:14, experience:'0 - 2 Years', salary:'3-5 LPA',        location:'Ahmedabad',   description:'Coordinate daily logistics operations, vendor communication and shipment tracking for pan-India deliveries...', tags:['Operations','Logistics','Excel','Coordination'],           jobType:'Walk-In',   postedAgo:'1 Day Ago',  workMode:'Work From Office', dept:'Customer Success, Service & Operations', salaryRange:'3-6 Lakhs',   companyType:'Corporate', role:'BD / Pre Sales' },
];

const FILTERS = {
  workMode: ['Work From Office', 'Remote', 'Hybrid'],
  department: {
    base: [
      { label: 'Customer Success, Service & Operations', count: 494 },
      { label: 'Sales & Business Development', count: 460 },
      { label: 'Human Resources', count: 350 },
      { label: 'Finance & Accounting', count: 251 },
    ],
    extra: [
      { label: 'Marketing & Communications', count: 198 },
      { label: 'IT & Information Security', count: 176 },
      { label: 'Engineering & Tech', count: 143 },
    ],
  },
  salary: {
    base: [
      { label: '0-3 Lakhs', count: 1379 },
      { label: '3-6 Lakhs', count: 2109 },
      { label: '6-10 Lakhs', count: 838 },
      { label: '10-15 Lakhs', count: 125 },
    ],
    extra: [
      { label: '15-25 Lakhs', count: 87 },
      { label: '25-50 Lakhs', count: 34 },
    ],
  },
  companyType: {
    base: [
      { label: 'Corporate', count: 433 },
      { label: 'Startup', count: 2109 },
      { label: 'MNC', count: 838 },
      { label: 'SME', count: 125 },
    ],
    extra: [
      { label: 'Government', count: 62 },
      { label: 'NGO / Non-Profit', count: 29 },
    ],
  },
  roleCategory: {
    base: [
      { label: 'BD / Pre Sales', count: 181 },
      { label: 'Retail & B2C Sales', count: 180 },
      { label: 'Recruitment & Talent Acquisition', count: 151 },
      { label: 'Accounting & Taxation', count: 145 },
    ],
    extra: [
      { label: 'Software Development', count: 312 },
      { label: 'Operations Management', count: 97 },
      { label: 'Digital Marketing', count: 74 },
    ],
  },
  location: {
    base: [
      { label: 'Ahmedabad', count: 2572 },
      { label: 'New Delhi', count: 32 },
      { label: 'Sanand', count: 13 },
      { label: 'Gandhinagar', count: 151 },
    ],
    extra: [
      { label: 'Mumbai', count: 4821 },
      { label: 'Bengaluru', count: 6103 },
      { label: 'Hyderabad', count: 2241 },
    ],
  },
};

// ─── JobCard ──────────────────────────────────────────────────────────────────
function JobCard({ job }) {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/candidates/job/${job.id}`)}
      className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col gap-3 h-full cursor-pointer"
    >
      {/* Header */}
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
            <span className="text-[12px] text-yellow-500 font-medium">★ {job.rating}</span>
            <span className="text-[12px] text-gray-400">| {job.reviews} Reviews</span>
          </div>
        </div>
      </div>

      {/* Meta */}
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

      {/* Description */}
      <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">{job.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span key={tag} className="text-[12px] text-gray-500 before:content-['•'] before:mr-1 before:text-gray-300">{tag}</span>
        ))}
      </div>

      {/* Spacer pushes footer to bottom */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-[12px] px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-600">{job.jobType}</span>
          <span className="text-[12px] text-gray-400">{job.postedAgo}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-gray-300 hover:text-gray-500 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          >
            <svg className="w-3.5 h-3.5" fill={saved ? '#C8102E' : 'none'} viewBox="0 0 24 24" stroke={saved ? '#C8102E' : '#9ca3af'} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FilterSection ────────────────────────────────────────────────────────────
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-xs font-semibold text-[#111111]"
      >
        {title}
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="mt-2.5">{children}</div>}
    </div>
  );
}

// ─── CheckboxList with View More ──────────────────────────────────────────────
function CheckboxList({ baseItems, extraItems = [], selected, onToggle }) {
  const [showMore, setShowMore] = useState(false);
  const visible = showMore ? [...baseItems, ...extraItems] : baseItems;
  return (
    <div className="flex flex-col gap-2">
      {visible.map((item) => {
        const label = typeof item === 'string' ? item : item.label;
        const count = typeof item === 'object' ? item.count : null;
        return (
          <label key={label} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(label)}
              onChange={() => onToggle(label)}
              className="w-3.5 h-3.5 accent-[#C8102E] rounded flex-shrink-0"
            />
            <span className="text-[12px] text-gray-600 group-hover:text-[#C8102E] transition-colors flex-1 leading-tight">
              {label}
              {count !== null && <span className="text-gray-400"> ({count})</span>}
            </span>
          </label>
        );
      })}
      {extraItems.length > 0 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-[11px] text-[#C8102E] font-medium mt-0.5 text-left hover:underline flex items-center gap-0.5"
        >
          {showMore ? (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              View Less
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              View More
            </>
          )}
        </button>
      )}
    </div>
  );
}

// ─── FilterContent ────────────────────────────────────────────────────────────
function FilterContent({
  selectedWorkMode, setSelectedWorkMode,
  selectedDept, setSelectedDept,
  selectedSalary, setSelectedSalary,
  selectedCompany, setSelectedCompany,
  selectedRole, setSelectedRole,
  selectedLocation, setSelectedLocation,
  expRange, setExpRange,
  toggle,
}) {
  return (
    <>
      <FilterSection title="Work Mode">
        <div className="flex flex-wrap gap-2">
          {FILTERS.workMode.map((mode) => (
            <button
              key={mode}
              onClick={() => toggle(setSelectedWorkMode, selectedWorkMode, mode)}
              className="text-[11px] px-3 py-1.5 rounded-full border transition-all"
              style={
                selectedWorkMode.includes(mode)
                  ? { background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)', color: '#fff', border: 'none' }
                  : { borderColor: '#e5e7eb', color: '#666' }
              }
            >
              {mode}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Experience">
        <div className="px-1">
          <input
            type="range" min={0} max={30} value={expRange}
            onChange={(e) => setExpRange(e.target.value)}
            className="w-full accent-[#C8102E]"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>0 Yrs</span>
            <span className="text-[#C8102E] font-medium">{expRange} Yrs</span>
            <span>30 Yrs</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Department">
        <CheckboxList
          baseItems={FILTERS.department.base}
          extraItems={FILTERS.department.extra}
          selected={selectedDept}
          onToggle={(v) => toggle(setSelectedDept, selectedDept, v)}
        />
      </FilterSection>

      <FilterSection title="Salary">
        <CheckboxList
          baseItems={FILTERS.salary.base}
          extraItems={FILTERS.salary.extra}
          selected={selectedSalary}
          onToggle={(v) => toggle(setSelectedSalary, selectedSalary, v)}
        />
      </FilterSection>

      <FilterSection title="Company Type">
        <CheckboxList
          baseItems={FILTERS.companyType.base}
          extraItems={FILTERS.companyType.extra}
          selected={selectedCompany}
          onToggle={(v) => toggle(setSelectedCompany, selectedCompany, v)}
        />
      </FilterSection>

      <FilterSection title="Role Category">
        <CheckboxList
          baseItems={FILTERS.roleCategory.base}
          extraItems={FILTERS.roleCategory.extra}
          selected={selectedRole}
          onToggle={(v) => toggle(setSelectedRole, selectedRole, v)}
        />
      </FilterSection>

      <FilterSection title="Location" defaultOpen={false}>
        <CheckboxList
          baseItems={FILTERS.location.base}
          extraItems={FILTERS.location.extra}
          selected={selectedLocation}
          onToggle={(v) => toggle(setSelectedLocation, selectedLocation, v)}
        />
      </FilterSection>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function CandidateDashboard() {
  const [activeTab, setActiveTab]         = useState('profile');
  const [keyword, setKeyword]             = useState('');
  const [experience, setExperience]       = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [showRelevance, setShowRelevance] = useState(true);
  const [sidebarOpen, setSidebarOpen]     = useState(false);

  const [selectedWorkMode, setSelectedWorkMode] = useState([]);
  const [selectedDept,     setSelectedDept]     = useState([]);
  const [selectedSalary,   setSelectedSalary]   = useState([]);
  const [selectedCompany,  setSelectedCompany]  = useState([]);
  const [selectedRole,     setSelectedRole]     = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [expRange,         setExpRange]         = useState(30);

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

  const filteredJobs = useMemo(() => {
    const kw  = keyword.trim().toLowerCase();
    const loc = locationInput.trim().toLowerCase();
    return ALL_JOBS.filter((job) => {
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
      if (selectedWorkMode.length && !selectedWorkMode.includes(job.workMode)) return false;
      if (selectedDept.length     && !selectedDept.includes(job.dept))         return false;
      if (selectedSalary.length   && !selectedSalary.includes(job.salaryRange)) return false;
      if (selectedCompany.length  && !selectedCompany.includes(job.companyType)) return false;
      if (selectedRole.length     && !selectedRole.includes(job.role))          return false;
      if (selectedLocation.length && !selectedLocation.some(loc2 => job.location.includes(loc2))) return false;
      const sliderNums = job.experience.match(/\d+/g);
      if (sliderNums) {
        const minExp = parseInt(sliderNums[0]);
        if (minExp > parseInt(expRange)) return false;
      }
      return true;
    });
  }, [keyword, locationInput, experience, selectedWorkMode, selectedDept, selectedSalary, selectedCompany, selectedRole, selectedLocation, expRange]);

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
  };

  const profileJobs    = filteredJobs.filter(j => j.id <= 11);
  const preferenceJobs = filteredJobs.filter(j => j.id > 11);
  const activeJobs     = activeTab === 'profile' ? profileJobs : preferenceJobs;
  const firstThree     = activeJobs.slice(0, 3);
  const rest           = activeJobs.slice(3);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
      <DashboardNavbar />

      {/* ── Hero ── */}
      <div className="px-4 sm:px-6 lg:px-10 pt-5 pb-0">
        <div className="rounded-2xl px-6 sm:px-8 py-5" style={{ background: 'linear-gradient(135deg,#FFF0F0 0%,#FFE4E4 100%)' }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block text-xs font-medium text-[#C8102E] bg-white border border-pink-200 px-3 py-1 rounded-full mb-2">
                Discovery Market
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                Job <span className="text-[#C8102E]">Intelligence</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1 max-w-md">
                AI-Curated Opportunities Tailored To Your Professional Profile And Career Velocity.
              </p>
            </div>
            <button
              className="flex-shrink-0 hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-semibold hover:opacity-90"
              style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
            >
              12 New Matches
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 flex items-center bg-white rounded-full border border-gray-200 shadow-sm overflow-hidden max-w-2xl mx-auto">
            <input
              type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter Keyword / Designation / Companies"
              className="flex-1 px-4 py-3 text-xs text-gray-700 placeholder-gray-400 outline-none min-w-0"
            />
            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
            <div className="relative flex-shrink-0">
              <select
                value={experience} onChange={(e) => setExperience(e.target.value)}
                className="appearance-none px-3 py-3 pr-7 text-xs text-gray-500 outline-none bg-transparent cursor-pointer"
              >
                <option value="">Select Experience</option>
                <option>0-1 Years</option>
                <option>1-3 Years</option>
                <option>3-5 Years</option>
                <option>5+ Years</option>
              </select>
              <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
            <input
              type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter Location"
              className="flex-1 px-3 py-3 text-xs text-gray-700 placeholder-gray-400 outline-none min-w-0"
            />
            <button
              className="flex items-center gap-1.5 px-4 py-2.5 text-white text-xs font-semibold rounded-full m-1 flex-shrink-0"
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

      {/* ── Body ── */}
      <div className="px-4 sm:px-6 lg:px-10 py-5 flex gap-5 items-start">

        {/* ── Cards (LEFT) ── */}
        <main className="flex-1 min-w-0 flex flex-col gap-4">

          {/* Tabs */}
          <div className="flex items-center gap-2 bg-white rounded-full p-1 self-start shadow-sm border border-gray-100">
            {['profile', 'preferences'].map((tab) => {
              const count = tab === 'profile' ? profileJobs.length : preferenceJobs.length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all duration-200"
                  style={
                    activeTab === tab
                      ? { background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)', color: '#fff' }
                      : { background: '#FFE3E4', color: '#C8102E' }
                  }
                >
                  {tab === 'profile' ? `Profile (${count})` : `Preferences (${count})`}
                </button>
              );
            })}
          </div>

          {/* First three cards */}
          {firstThree.length > 0 && (
            <div className="grid grid-cols-3 gap-3 items-stretch">
              {firstThree.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          )}

          {/* Relevance Banner */}
          {showRelevance && activeJobs.length > 0 && (
            <div
              className="rounded-xl px-4 py-3 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg,#FFF0F0 0%,#FFE4E4 100%)', border: '1px solid #fecdd3' }}
            >
              <p className="text-xs font-semibold text-[#111111]">
                Are These <span className="text-[#C8102E]">Jobs</span> Relevant For You?
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRelevance(false)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600"
                >
                  No
                </button>
                <button
                  onClick={() => setShowRelevance(false)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
                >
                  Yes
                </button>
              </div>
            </div>
          )}

          {/* Remaining cards */}
          {rest.length > 0 && (
            <div className="grid grid-cols-3 gap-3 items-stretch">
              {rest.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          )}

          {/* Empty state */}
          {activeJobs.length === 0 && (
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
        </main>

        {/* ── Filter Sidebar (RIGHT) ── */}
        <aside className="hidden lg:block w-96 flex-shrink-0 bg-white rounded-2xl p-5 border border-gray-100 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xs font-bold text-[#111111]">All Filters</h2>
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1 text-[11px] text-white font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Reset All
            </button>
          </div>
          <FilterContent {...filterProps} />
        </aside>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden fixed bottom-6 right-4 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-xs font-semibold shadow-lg"
            style={{ background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters {appliedCount > 0 && `(${appliedCount})`}
          </button>
        </div>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold">
                  All Filters {appliedCount > 0 && <span className="text-[#C8102E]">({appliedCount})</span>}
                </h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
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