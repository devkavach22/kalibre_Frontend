import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardNavbar from '../dashboards/DashboardNavbar';

const ALL_JOBS = [
  { id:1,  title:'Walk-In || Hiring For Technical Support / Service Desk Role', company:'Arsenaltech',   logoLetter:'C', logoColor:'#E8F0FE', logoTextColor:'#1a73e8', rating:4.5, reviews:7,  experience:'0 - 1 Years', salary:'Not Disclosed', location:'Bengaluru',   description:'Flexible And Open To Working In A 24x7 Environment With Rotating Shifts And Rotating Days Off. Must Be Comfortable With Night Shifts And Weekend Working As Per Business Requirement.', tags:['IT Service Desk','Service Desk Management','IT Helpdesk','Helpdesk'], jobType:'Walk-In', postedAgo:'1 Day Ago', workMode:'Work From Office', dept:'Customer Success, Service & Operations', salaryRange:'0-3 Lakhs', companyType:'Corporate', role:'BD / Pre Sales', openings:2, applicants:'100+', highlights:['1-2 years experience in BPO hiring for international voice and Non-Voice processes','End-to-end recruitment including sourcing, screening, interview coordination, and maintaining recruitment reports'], matchScore:['Early Applicant','Keyskills','Location','Work Experience'], keySkills:['Non IT Recruitment','Volume Hiring','End To End Recruitment','Bpo Recruitment','Bulk Hiring','Talent Acquisition','Sourcing Profiles','Interview Coordination'], about:'Arsenaltech is a leading IT services company providing world-class technical support solutions. With a team of 500+ professionals, we serve enterprise clients across 20+ countries with cutting-edge service desk and helpdesk solutions.', companyTags:['IT Services & Consulting','B2B','MNC'] },
  { id:2,  title:'Senior React Developer – FinTech Product', company:'TechNova', logoLetter:'T', logoColor:'#FFF0F0', logoTextColor:'#C8102E', rating:4.2, reviews:14, experience:'3 - 5 Years', salary:'12-18 LPA', location:'Mumbai', description:'Build and maintain high-performance React applications for a leading FinTech platform. You will work closely with product and design teams to deliver exceptional user experiences.', tags:['React','JavaScript','Redux','TypeScript'], jobType:'Full Time', postedAgo:'2 Days Ago', workMode:'Hybrid', dept:'Sales & Business Development', salaryRange:'10-15 Lakhs', companyType:'Startup', role:'Retail & B2C Sales', openings:3, applicants:'50+', highlights:['3+ years of hands-on React.js development experience','Strong knowledge of Redux, TypeScript and modern JS ecosystem'], matchScore:['Keyskills','Location','Work Experience','Salary Match'], keySkills:['React.js','TypeScript','Redux','JavaScript','Node.js','REST APIs','Git','Agile'], about:'TechNova is a fast-growing FinTech startup building next-generation payment infrastructure. Backed by top-tier VCs, we are on a mission to simplify financial transactions for millions of users.', companyTags:['FinTech','Startup','Series B'] },
  { id:3,  title:'HR Business Partner – Talent & Culture', company:'PeopleFirst', logoLetter:'P', logoColor:'#F0F4FF', logoTextColor:'#4F46E5', rating:4.7, reviews:9, experience:'2 - 4 Years', salary:'8-12 LPA', location:'Hyderabad', description:'Partner with leadership to drive talent strategy, culture initiatives and org design. Lead employee engagement programs and build a high-performance culture across business units.', tags:['HRBP','Talent Management','Culture','OD'], jobType:'Full Time', postedAgo:'3 Days Ago', workMode:'Work From Office', dept:'Human Resources', salaryRange:'6-10 Lakhs', companyType:'MNC', role:'Recruitment & Talent Acquisition', openings:1, applicants:'30+', highlights:['Experience as HRBP supporting 200+ employee business units','Proven track record in culture building and employee engagement initiatives'], matchScore:['Early Applicant','Keyskills','Work Experience'], keySkills:['HRBP','Talent Management','Culture Building','OD','Employee Engagement','Performance Management','HRMS','Stakeholder Management'], about:'PeopleFirst is a global HR consulting and managed services firm. We partner with Fortune 500 companies to transform their people practices, culture, and talent acquisition strategies across 15 countries.', companyTags:['HR Consulting','MNC','Global'] },
  { id:4,  title:'Business Development Executive – SaaS Sales', company:'CloudReach', logoLetter:'W', logoColor:'#ECFDF5', logoTextColor:'#059669', rating:4.0, reviews:5, experience:'1 - 3 Years', salary:'5-8 LPA', location:'Pune', description:'Drive new business acquisition through outbound sales, demos and pipeline management. You will prospect, qualify and close SMB and mid-market accounts for our cloud platform.', tags:['B2B Sales','SaaS','CRM','Cold Calling'], jobType:'Full Time', postedAgo:'1 Day Ago', workMode:'Remote', dept:'Sales & Business Development', salaryRange:'3-6 Lakhs', companyType:'Startup', role:'BD / Pre Sales', openings:5, applicants:'80+', highlights:['1+ years B2B SaaS sales experience with proven quota attainment','Comfortable with outbound prospecting, cold calling and email campaigns'], matchScore:['Early Applicant','Keyskills','Salary Match'], keySkills:['B2B Sales','SaaS','CRM','Cold Calling','Lead Generation','Salesforce','Pipeline Management','Demo'], about:'CloudReach is a SaaS company helping businesses automate their operations on the cloud. With 300+ enterprise customers and 99.9% uptime SLA, we are the trusted cloud partner for growing businesses.', companyTags:['SaaS','Remote-First','Startup'] },
  { id:5,  title:'Finance Analyst – FP&A & Reporting', company:'CapitalEdge', logoLetter:'A', logoColor:'#FFFBEB', logoTextColor:'#D97706', rating:4.3, reviews:11, experience:'2 - 5 Years', salary:'10-15 LPA', location:'Ahmedabad', description:'Lead financial planning, budgeting and variance analysis for group entities. Build financial models, dashboards and present insights to senior leadership on a monthly basis.', tags:['FP&A','Excel','Power BI','Financial Modelling'], jobType:'Full Time', postedAgo:'4 Days Ago', workMode:'Work From Office', dept:'Finance & Accounting', salaryRange:'10-15 Lakhs', companyType:'Corporate', role:'Accounting & Taxation', openings:2, applicants:'45+', highlights:['2+ years FP&A experience in a corporate finance team','Advanced Excel and Power BI skills with experience building financial models'], matchScore:['Keyskills','Work Experience','Salary Match'], keySkills:['FP&A','Excel','Power BI','Financial Modelling','Budgeting','Variance Analysis','MIS Reporting','SAP'], about:'CapitalEdge is a diversified financial services group managing assets across real estate, private equity and venture capital. With ₹5000Cr+ AUM, we are one of India\'s fastest-growing alternative investment firms.', companyTags:['Finance','Corporate','Investment'] },
  { id:6,  title:'Walk-In || Customer Support Associate – Night Shift', company:'Arsenaltech', logoLetter:'C', logoColor:'#E8F0FE', logoTextColor:'#1a73e8', rating:4.5, reviews:7, experience:'0 - 1 Years', salary:'Not Disclosed', location:'Bengaluru', description:'Handle inbound customer queries via chat, email and phone in a fast-paced environment. Provide timely, accurate and friendly support to international customers across multiple channels.', tags:['Customer Support','Voice Process','CRM','English'], jobType:'Walk-In', postedAgo:'1 Day Ago', workMode:'Work From Office', dept:'Customer Success, Service & Operations', salaryRange:'0-3 Lakhs', companyType:'Corporate', role:'BD / Pre Sales', openings:10, applicants:'200+', highlights:['Freshers welcome – strong English communication skills required','Willingness to work night shifts in a 24x7 support environment'], matchScore:['Early Applicant','Location','Work Experience'], keySkills:['Customer Support','Voice Process','Chat Support','CRM','English Communication','Inbound Calls','Email Support','Ticketing'], about:'Arsenaltech is a leading IT services company providing world-class technical support solutions. With a team of 500+ professionals, we serve enterprise clients across 20+ countries.', companyTags:['IT Services & Consulting','B2B','MNC'] },
  { id:7,  title:'Full Stack Engineer – Node & React', company:'DevHouse', logoLetter:'D', logoColor:'#F5F3FF', logoTextColor:'#7C3AED', rating:4.6, reviews:22, experience:'2 - 4 Years', salary:'15-22 LPA', location:'Bangalore', description:'Design and build scalable APIs and responsive UIs for enterprise SaaS products. You\'ll own features end-to-end, from database schema to pixel-perfect front-end implementation.', tags:['Node.js','React','PostgreSQL','AWS'], jobType:'Full Time', postedAgo:'2 Days Ago', workMode:'Hybrid', dept:'Sales & Business Development', salaryRange:'10-15 Lakhs', companyType:'Startup', role:'Retail & B2C Sales', openings:2, applicants:'60+', highlights:['Strong proficiency in Node.js, React and relational databases','Experience with AWS services (EC2, RDS, S3) and CI/CD pipelines'], matchScore:['Keyskills','Work Experience','Salary Match'], keySkills:['Node.js','React','PostgreSQL','AWS','REST APIs','Docker','TypeScript','Redis'], about:'DevHouse is an engineering-first product studio building enterprise SaaS solutions. Our team of 80+ engineers has shipped products used by 1M+ users across 30 countries.', companyTags:['Product Studio','Engineering','Startup'] },
  { id:8,  title:'Recruiter – Tech & Product Hiring', company:'TalentBridge', logoLetter:'R', logoColor:'#FFF0F0', logoTextColor:'#C8102E', rating:4.1, reviews:6, experience:'1 - 3 Years', salary:'4-7 LPA', location:'New Delhi', description:'Source, screen and close tech talent for product and engineering teams across India. You will own full-cycle recruiting for software engineers, data scientists and product managers.', tags:['Sourcing','Tech Hiring','LinkedIn','ATS'], jobType:'Full Time', postedAgo:'5 Days Ago', workMode:'Remote', dept:'Human Resources', salaryRange:'3-6 Lakhs', companyType:'SME', role:'Recruitment & Talent Acquisition', openings:2, applicants:'35+', highlights:['1+ year tech recruiting experience with strong sourcing skills','Proficiency with LinkedIn Recruiter and ATS platforms (Greenhouse, Lever, etc.)'], matchScore:['Keyskills','Work Experience'], keySkills:['Tech Hiring','LinkedIn Recruiter','Sourcing','ATS','Boolean Search','Screening','Stakeholder Management','Offer Negotiation'], about:'TalentBridge is a specialized tech recruitment firm placing top engineering and product talent at India\'s fastest-growing startups and technology companies.', companyTags:['Recruitment','SME','Remote-First'] },
  { id:9,  title:'Accounts Manager – GST & Compliance', company:'FinSolve', logoLetter:'F', logoColor:'#ECFDF5', logoTextColor:'#059669', rating:4.4, reviews:8, experience:'3 - 6 Years', salary:'8-12 LPA', location:'Ahmedabad', description:'Manage end-to-end accounts, GST filings, TDS compliance and vendor reconciliation. Ensure timely financial closure and statutory compliance for multiple group entities.', tags:['GST','Tally','TDS','Accounts'], jobType:'Full Time', postedAgo:'3 Days Ago', workMode:'Work From Office', dept:'Finance & Accounting', salaryRange:'6-10 Lakhs', companyType:'Corporate', role:'Accounting & Taxation', openings:1, applicants:'25+', highlights:['3+ years experience in GST filing and compliance management','Hands-on with Tally ERP and working knowledge of Income Tax and TDS provisions'], matchScore:['Keyskills','Work Experience','Salary Match'], keySkills:['GST','Tally ERP','TDS','Accounts Payable','Bank Reconciliation','MIS','Income Tax','Vendor Management'], about:'FinSolve is a financial services and compliance advisory firm serving 200+ corporate clients across Gujarat and Maharashtra. We specialize in GST, taxation and statutory compliance management.', companyTags:['Finance','Corporate','Compliance'] },
  { id:10, title:'Inside Sales Executive – EdTech', company:'LearnUp', logoLetter:'L', logoColor:'#FFFBEB', logoTextColor:'#D97706', rating:3.9, reviews:18, experience:'0 - 2 Years', salary:'3-6 LPA', location:'Mumbai', description:'Convert warm leads to paid enrollments through consultative selling and follow-ups. Achieve monthly revenue targets by engaging with prospective learners across phone, WhatsApp and email.', tags:['Inside Sales','EdTech','Targets','Communication'], jobType:'Full Time', postedAgo:'1 Day Ago', workMode:'Work From Office', dept:'Sales & Business Development', salaryRange:'3-6 Lakhs', companyType:'Startup', role:'Retail & B2C Sales', openings:8, applicants:'150+', highlights:['Strong communication skills with a passion for education and sales','Ability to handle 80+ calls/day and achieve monthly enrollment targets'], matchScore:['Early Applicant','Location'], keySkills:['Inside Sales','Telecalling','Lead Conversion','EdTech','CRM','Target Achievement','Communication','WhatsApp Marketing'], about:'LearnUp is an EdTech startup on a mission to make quality education accessible to every Indian. With 500K+ learners and 200+ courses, we are one of India\'s fastest-growing online learning platforms.', companyTags:['EdTech','Startup','Growth Stage'] },
  { id:11, title:'IT Help Desk Technician – L1 Support', company:'SupportNest', logoLetter:'S', logoColor:'#F0F4FF', logoTextColor:'#4F46E5', rating:4.2, reviews:3, experience:'0 - 1 Years', salary:'2-4 LPA', location:'Gandhinagar', description:'Provide first-line IT support for hardware, software and network issues to end users. Log, track and resolve tickets within SLA timelines using the company ITSM platform.', tags:['IT Support','Windows','Networking','Ticketing'], jobType:'Walk-In', postedAgo:'2 Days Ago', workMode:'Work From Office', dept:'Customer Success, Service & Operations', salaryRange:'0-3 Lakhs', companyType:'SME', role:'BD / Pre Sales', openings:3, applicants:'40+', highlights:['Basic knowledge of Windows OS, networking and hardware troubleshooting','Freshers with IT diploma/degree encouraged to apply'], matchScore:['Early Applicant','Location','Work Experience'], keySkills:['IT Support','Windows','Networking','Hardware','Ticketing','ITSM','Active Directory','Troubleshooting'], about:'SupportNest is a managed IT services provider delivering helpdesk and infrastructure support to SME clients across India. With 150+ engineers, we ensure 24x7 IT operations for our clients.', companyTags:['IT Services','SME','Managed Services'] },
  { id:12, title:'Product Manager – B2B SaaS Platform', company:'Nexora', logoLetter:'N', logoColor:'#F0FDF4', logoTextColor:'#16A34A', rating:4.6, reviews:19, experience:'3 - 6 Years', salary:'18-28 LPA', location:'Bengaluru', description:'Own product roadmap, work with engineering & design teams to ship features that delight enterprise customers. Define OKRs, run discovery sprints and represent the voice of the customer.', tags:['Product Roadmap','Agile','Stakeholder Mgmt','Jira'], jobType:'Full Time', postedAgo:'1 Day Ago', workMode:'Hybrid', dept:'Sales & Business Development', salaryRange:'15-25 Lakhs', companyType:'Startup', role:'BD / Pre Sales', openings:1, applicants:'70+', highlights:['3+ years PM experience on B2B SaaS products with measurable impact','Experience working with cross-functional engineering and design teams in Agile sprints'], matchScore:['Early Applicant','Keyskills','Work Experience','Salary Match'], keySkills:['Product Roadmap','Agile','Jira','Stakeholder Management','User Research','OKRs','A/B Testing','Data Analysis'], about:'Nexora is a B2B SaaS company helping enterprises streamline operations with AI-powered automation tools. With $20M Series B funding and 500+ enterprise clients, we are scaling rapidly across APAC.', companyTags:['B2B SaaS','Startup','Series B'] },
  { id:13, title:'Data Analyst – Growth & Marketing Analytics', company:'GrowthLab', logoLetter:'G', logoColor:'#FFF7ED', logoTextColor:'#EA580C', rating:4.3, reviews:12, experience:'1 - 3 Years', salary:'7-11 LPA', location:'Mumbai', description:'Analyze user funnels, run A/B experiments and build dashboards to drive data-informed growth decisions. Partner with marketing and product teams to surface actionable insights.', tags:['SQL','Python','Tableau','Google Analytics'], jobType:'Full Time', postedAgo:'2 Days Ago', workMode:'Hybrid', dept:'Finance & Accounting', salaryRange:'6-10 Lakhs', companyType:'Startup', role:'Accounting & Taxation', openings:2, applicants:'55+', highlights:['Proficiency in SQL and Python for data extraction and analysis','Experience with Tableau or similar BI tools for dashboard creation'], matchScore:['Keyskills','Work Experience'], keySkills:['SQL','Python','Tableau','Google Analytics','A/B Testing','Excel','Data Visualization','Funnel Analysis'], about:'GrowthLab is a growth marketing and analytics consultancy helping D2C and SaaS brands scale through data-driven strategies. We have driven 10x growth for 50+ brands across e-commerce and SaaS.', companyTags:['Analytics','Startup','Growth Marketing'] },
  { id:14, title:'UX Designer – Mobile & Web Products', company:'PixelCraft', logoLetter:'U', logoColor:'#FDF4FF', logoTextColor:'#A21CAF', rating:4.8, reviews:27, experience:'2 - 5 Years', salary:'12-20 LPA', location:'Pune', description:'Design intuitive user experiences for mobile-first products; collaborate with PMs and engineers in sprints. Own end-to-end design from research and wireframes to high-fidelity prototypes.', tags:['Figma','User Research','Prototyping','Design Systems'], jobType:'Full Time', postedAgo:'3 Days Ago', workMode:'Remote', dept:'Sales & Business Development', salaryRange:'10-15 Lakhs', companyType:'Startup', role:'Retail & B2C Sales', openings:1, applicants:'45+', highlights:['2+ years UX design experience on mobile and web products','Proficiency in Figma with a strong portfolio demonstrating end-to-end design process'], matchScore:['Keyskills','Work Experience','Salary Match'], keySkills:['Figma','User Research','Prototyping','Design Systems','Wireframing','Usability Testing','Mobile Design','Interaction Design'], about:'PixelCraft is a design-led product studio crafting exceptional digital experiences for leading brands. Our 40-person design team has won 15+ international awards for product design excellence.', companyTags:['Design Studio','Remote-First','Startup'] },
  { id:15, title:'DevOps Engineer – Cloud Infrastructure', company:'CloudStack', logoLetter:'D', logoColor:'#EFF6FF', logoTextColor:'#2563EB', rating:4.5, reviews:9, experience:'2 - 4 Years', salary:'14-22 LPA', location:'Hyderabad', description:'Manage CI/CD pipelines, Kubernetes clusters and AWS infrastructure for high-traffic SaaS applications. Drive automation, reliability and cost optimization across cloud environments.', tags:['AWS','Kubernetes','Terraform','CI/CD'], jobType:'Full Time', postedAgo:'1 Day Ago', workMode:'Work From Office', dept:'Human Resources', salaryRange:'10-15 Lakhs', companyType:'MNC', role:'Recruitment & Talent Acquisition', openings:2, applicants:'35+', highlights:['2+ years DevOps/SRE experience with AWS and container orchestration','Hands-on with Terraform, Kubernetes and CI/CD tools (Jenkins, GitHub Actions)'], matchScore:['Early Applicant','Keyskills','Work Experience','Salary Match'], keySkills:['AWS','Kubernetes','Terraform','CI/CD','Docker','Jenkins','Linux','Monitoring'], about:'CloudStack is an MNC providing cloud infrastructure and managed DevOps services to Fortune 500 companies. With 1000+ engineers across 10 countries, we manage 10,000+ cloud workloads globally.', companyTags:['Cloud','MNC','Infrastructure'] },
  { id:16, title:'Content Strategist – Brand & SEO', company:'InkHouse', logoLetter:'I', logoColor:'#FFF1F2', logoTextColor:'#BE123C', rating:4.1, reviews:6, experience:'1 - 3 Years', salary:'5-9 LPA', location:'New Delhi', description:'Create compelling content strategies, manage editorial calendars and drive organic growth through SEO-optimized content. Own content across blog, social media and email channels.', tags:['SEO','Content Writing','Brand Voice','CMS'], jobType:'Full Time', postedAgo:'4 Days Ago', workMode:'Remote', dept:'Sales & Business Development', salaryRange:'3-6 Lakhs', companyType:'SME', role:'Retail & B2C Sales', openings:1, applicants:'60+', highlights:['1+ years content writing or strategy experience with SEO focus','Strong writing skills with ability to adapt tone and voice across multiple brand personas'], matchScore:['Keyskills','Work Experience'], keySkills:['SEO','Content Strategy','Content Writing','Brand Voice','CMS','WordPress','Email Marketing','Social Media'], about:'InkHouse is a content marketing agency helping B2B and D2C brands build authority through strategic storytelling. We have produced 10,000+ pieces of content for 100+ brands globally.', companyTags:['Content Marketing','SME','Remote-First'] },
  { id:17, title:'Walk-In || Operations Executive – Logistics', company:'SwiftMove', logoLetter:'W', logoColor:'#F0FDF4', logoTextColor:'#15803D', rating:3.8, reviews:14, experience:'0 - 2 Years', salary:'3-5 LPA', location:'Ahmedabad', description:'Coordinate daily logistics operations, vendor communication and shipment tracking for pan-India deliveries. Ensure SLA adherence and resolve operational issues in real time.', tags:['Operations','Logistics','Excel','Coordination'], jobType:'Walk-In', postedAgo:'1 Day Ago', workMode:'Work From Office', dept:'Customer Success, Service & Operations', salaryRange:'3-6 Lakhs', companyType:'Corporate', role:'BD / Pre Sales', openings:4, applicants:'90+', highlights:['0-2 years experience in logistics, supply chain or operations coordination','Good Excel skills and ability to multitask in a fast-paced environment'], matchScore:['Early Applicant','Location'], keySkills:['Logistics','Operations','Excel','Vendor Management','Shipment Tracking','Coordination','MIS','ERP'], about:'SwiftMove is a tech-enabled logistics company offering last-mile delivery solutions across 500+ pin codes in India. With a fleet of 5000+ delivery partners, we handle 1 lakh+ shipments daily.', companyTags:['Logistics','Corporate','Tech-Enabled'] },
];

function SimilarJobCard({ job, onClick }) {
  return (
    <div
      onClick={() => onClick(job.id)}
      className="flex items-start gap-3 py-3 border-b border-gray-100 cursor-pointer hover:bg-red-50/40 rounded-lg px-2 -mx-2 transition-colors"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0"
        style={{ background: job.logoColor, color: job.logoTextColor }}
      >
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

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Freezes background scrolling when the popup modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const job = ALL_JOBS.find(j => j.id === parseInt(id));

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
        <DashboardNavbar />
        <p className="text-gray-500 text-sm mt-20">Job not found.</p>
        <button onClick={() => navigate('/candidates')} className="mt-4 text-[#C8102E] text-sm underline">← Back to Jobs</button>
      </div>
    );
  }

  const similar = ALL_JOBS.filter(j => j.id !== job.id && (j.dept === job.dept || j.company === job.company)).slice(0, 5);

  const primarySkill = job.keySkills[0];

  // Extracts dynamic title without visual noise from standard string arrays
  const cleanTitle = job.title.includes('||') ? job.title.split('||')[1].trim() : job.title;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
      <DashboardNavbar />

      <div className="px-4 sm:px-6 lg:px-10 py-5">
        <button
          onClick={() => navigate('/candidates')}
          className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-[#C8102E] mb-4 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </button>

        <div className="flex gap-5 items-start">

          <main className="flex-1 min-w-0 flex flex-col gap-4">

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 border border-gray-100"
                  style={{ background: job.logoColor, color: job.logoTextColor }}
                >
                  {job.logoLetter}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-base font-bold text-[#111111] leading-snug">{job.title}</h1>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[13px] text-gray-500 font-medium">{job.company}</span>
                    <span className="text-[12px] text-yellow-500 font-medium">★ {job.rating}</span>
                    <span className="text-[12px] text-gray-400">| {job.reviews} Reviews</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-[12px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {job.experience}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.salary}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {job.workMode}
                </span>
              </div>

              <hr className="my-3 border-gray-100" />

              <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-gray-500">
                <span>Posted: <span className="font-semibold text-gray-700">{job.postedAgo}</span></span>
                <span>Openings: <span className="font-semibold text-gray-700">{job.openings}</span></span>
                <span>Applicants: <span className="font-semibold text-gray-700">{job.applicants}</span></span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="follow-check"
                  checked={followed}
                  onChange={() => setFollowed(!followed)}
                  className="w-3.5 h-3.5 accent-[#C8102E] rounded"
                />
                <label htmlFor="follow-check" className="text-[12px] text-gray-500 cursor-pointer">
                  Follow <span className="font-medium text-gray-700">{job.company}</span> as you apply to stay updated
                </label>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => navigate('/candidates')}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (applied) {
                      setApplied(false);
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                  className="px-8 py-2.5 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: applied ? '#059669' : 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)' }}
                >
                  {applied ? '✓ Applied' : 'Apply'}
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill={saved ? '#C8102E' : 'none'} viewBox="0 0 24 24" stroke={saved ? '#C8102E' : '#9ca3af'} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h2 className="text-sm font-bold text-[#111111] mb-3">Job Highlights</h2>
              <ul className="flex flex-col gap-2">
                {job.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600">
                    <span className="text-[#C8102E] mt-0.5 flex-shrink-0">•</span>
                    {h}
                  </li>
                ))}
              </ul>

              <h2 className="text-sm font-bold text-[#111111] mt-4 mb-2">Job Match Score</h2>
              <div className="flex flex-wrap gap-2">
                {job.matchScore.map((m) => (
                  <span key={m} className="text-[11px] text-gray-500 before:content-['•'] before:mr-1 before:text-gray-300">{m}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h2 className="text-sm font-bold text-[#111111] mb-3">Job Description</h2>
              <p className="text-[12px] text-gray-600 leading-relaxed">{job.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600">{tag}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h2 className="text-sm font-bold text-[#111111] mb-3">Key Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.keySkills.map((skill, i) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border transition-colors"
                    style={i === 0
                      ? { background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)', color: '#fff', border: 'none' }
                      : { borderColor: '#e5e7eb', color: '#555' }
                    }
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

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h2 className="text-sm font-bold text-[#111111] mb-3">About The Company</h2>
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 border border-gray-100"
                  style={{ background: job.logoColor, color: job.logoTextColor }}
                >
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
              <h3 className="text-[12px] font-bold text-[#111111] mb-1.5">Overview</h3>
              <p className="text-[12px] text-gray-600 leading-relaxed">{job.about}</p>
            </div>

          </main>

          <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-20">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h2 className="text-sm font-bold text-[#C8102E] mb-3">Latest Matches</h2>
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

      {/* Dynamic PopUp Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 relative shadow-2xl flex flex-col gap-4 my-8">
            
            {/* Header Block */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[15px] font-bold text-[#B10D1C] leading-snug">Apply for {cleanTitle}</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">Please Fill In The Details Below To Apply For This Position.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Inputs Container Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5 text-left">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your full name" className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C]" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                <input type="email" placeholder="Enter your email address" className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C]" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your mobile number" className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C]" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Current Location <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your current location" className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C]" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Experience (in years) <span className="text-red-500">*</span></label>
                <div className="relative">
                  {/* Changed text-gray-400 to text-black to make selected value visible */}
                  <select className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] text-black bg-white appearance-none focus:outline-none focus:border-[#B10D1C]">
                    <option className="text-gray-400">Select experience</option>
                    <option>0 - 1 Years</option>
                    <option>1 - 3 Years</option>
                    <option>3 - 5 Years</option>
                    <option>5+ Years</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Current Designation <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your current designation" className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C]" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Expected Salary (in LPA) <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your expected salary" className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C]" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Notice Period <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your notice period" className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C]" />
              </div>
            </div>

            {/* Custom Upload Resume Container */}
            <div className="border-2 border-dashed border-red-200 rounded-xl p-5 bg-[#FFF5F5]/20 text-center cursor-pointer hover:bg-[#FFF5F5]/40 transition-colors">
              <div className="flex flex-col items-center gap-1">
                <svg className="w-7 h-7 text-[#FA2329]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-[13px] font-bold text-[#FA2329]">Upload Resume</span>
                <span className="text-[10px] text-gray-400 font-medium">Upload Your Resume To Auto-Fill All Profile Details.</span>
              </div>
            </div>

            {/* Optional Cover Letter Text Area */}
            <div className="text-left">
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Cover Letter (Optional)</label>
              <textarea rows={3} placeholder="Write a brief note about yourself and your interest in this role ..." className="w-full border border-gray-200 rounded-lg p-2.5 text-[11px] placeholder-gray-400 focus:outline-none focus:border-[#B10D1C] resize-none"></textarea>
            </div>

            {/* Legal / Policy Confirmation */}
            <div className="flex items-center gap-2 text-left">
              <input type="checkbox" id="terms" className="w-3.5 h-3.5 accent-[#B10D1C] rounded border-gray-300" />
              <label htmlFor="terms" className="text-[11px] text-gray-500 cursor-pointer select-none">
                I agree to the <span className="text-[#FA2329] font-medium hover:underline">Terms & Conditions</span> and <span className="text-[#FA2329] font-medium hover:underline">Privacy Policy</span>.
              </label>
            </div>

            {/* Footer Form Submissions */}
            <div className="flex justify-end gap-3 mt-1 pt-3.5 border-t border-gray-100">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg text-xs font-semibold border border-[#C8102E] text-[#C8102E] hover:bg-red-50/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setApplied(true);
                  setIsModalOpen(false);
                }}
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