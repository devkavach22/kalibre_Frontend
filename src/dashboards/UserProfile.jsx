import { useState } from "react";
import DashboardNavbar from '../dashboards/DashboardNavbar';

const RED = "#DC2626";
const PINK_BG = "#FFF1F1";
const PINK_BORDER = "#FFE4E4";

// ─── Icons ───────────────────────────────────────────────────────────────────

const LocationIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" style={{ color: RED }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const EmailIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" style={{ color: RED }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" style={{ color: RED }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" style={{ color: RED }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const CameraIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const StatIcon = ({ children }) => (
  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: PINK_BG }}>
    {children}
  </div>
);
const BriefcaseStatIcon = () => (
  <StatIcon>
    <svg className="w-5 h-5" style={{ color: RED }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  </StatIcon>
);
const GraduationStatIcon = () => (
  <StatIcon>
    <svg className="w-5 h-5" style={{ color: RED }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  </StatIcon>
);
const PersonStatIcon = () => (
  <StatIcon>
    <svg className="w-5 h-5" style={{ color: RED }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </StatIcon>
);

// ─── Reusable Components ──────────────────────────────────────────────────────

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${className}`}
      style={{ borderColor: PINK_BORDER }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, actionLabel, onAction, iconAction }) {
  return (
    <div
      className="px-7 py-4 flex justify-between items-center border-b"
      style={{ background: PINK_BG, borderColor: PINK_BORDER }}
    >
      <h3 className="text-base font-bold text-gray-800">{title}</h3>
      {actionLabel && (
        <button onClick={onAction} className="text-sm font-semibold hover:underline transition" style={{ color: RED }}>
          {actionLabel}
        </button>
      )}
      {iconAction && (
        <button className="text-gray-400 hover:text-red-500 transition">
          <EditIcon />
        </button>
      )}
    </div>
  );
}

function AvatarSVG() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" fill="#f0d5b0" />
      <circle cx="50" cy="38" r="18" fill="#c8956c" />
      <ellipse cx="50" cy="90" rx="30" ry="24" fill="#c8956c" />
      <path d="M32 38 Q50 13 68 38 Q66 19 50 17 Q34 19 32 38z" fill="#6b3a1f" />
      <path d="M32 38 Q27 62 30 78 Q36 56 33 43z" fill="#6b3a1f" />
      <path d="M68 38 Q73 62 70 78 Q64 56 67 43z" fill="#6b3a1f" />
      <circle cx="43" cy="38" r="2" fill="#7a4a30" />
      <circle cx="57" cy="38" r="2" fill="#7a4a30" />
      <path d="M44 47 Q50 52 56 47" stroke="#a0522d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="28" y="72" width="44" height="28" rx="4" fill="#e8e0d8" />
    </svg>
  );
}

// ─── Profile Data ─────────────────────────────────────────────────────────────

const profile = {
  name: "Jimmy Cartel",
  title: "Information Technology Specialist At Microsoft",
  verified: true,
  location: "Bangalore, Karnataka, India",
  email: "Jimmycartel@Gmail.Com",
  phone: "+91 98565 58752",
  dob: "15 May 1995",
  experience: "5.6 Year",
  education: "B.Tech Computer Science",
  currentRole: "Software Engineer At Tech Solutions Pvt. Ltd.",
  about: `Passionate And Results-Driven Software Engineer With 5.6 Years Of Professional Experience In Designing, Developing, And Maintaining Scalable Web Applications And Enterprise-Grade Digital Solutions. Skilled In Building High-Performance Applications With A Strong Focus On Clean Architecture, User Experience, Performance Optimization, And Problem-Solving. Experienced In Working Across The Full Software Development Lifecycle, From Requirement Analysis And System Design To Deployment And Maintenance.

I Enjoy Working With Modern Technologies And Continuously Exploring Innovative Tools, Frameworks, And Development Practices To Create Efficient And Reliable Solutions. Adept At Developing Responsive And User-Friendly Applications While Ensuring Code Quality, Security, And Scalability. Strong Understanding Of Front-End And Back-End Development, API Integrations, Database Management, And Cloud-Based Deployment Workflows.`,
  educationList: [
    {
      degree: "MPHIL Agriculture",
      college: "Christ College Institute of Management, Bangalore",
      year: "2021-2025",
      type: "Full Time",
    },
    {
      degree: "MPHIL Agriculture",
      college: "Christ College Institute of Management, Bangalore",
      year: "2021-2025",
      type: "Full Time",
    },
  ],
  employment: [
    {
      role: "Senior Software Engineer",
      company: "techNova Solutions Pvt. Ltd. Bangalore, Karnataka",
      duration: "June 2025 – Present | Full Time",
      skills: "Primary Skills: React.Js, Node.Js, TypeScript, MongoDB, AWS",
    },
    {
      role: "Senior Software Engineer",
      company: "techNova Solutions Pvt. Ltd. Bangalore, Karnataka",
      duration: "June 2025 – Present | Full Time",
      skills: "Primary Skills: React.Js, Node.Js, TypeScript, MongoDB, AWS",
    },
  ],
  skills: [
    "Non IT Recruitment", "Volume Hiring", "End To End Recruitment",
    "Bpo Recruitment", "Bulk Hiring", "Talent Acquisition",
    "Sourcing Profiles", "Interview Coordination", "Workforce Management",
    "Payroll Management",
  ],
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function UserProfile() {
  return (
    <div className="min-h-screen font-sans" style={{ background: "#F5F6FA" }}>

      {/* ── Your Built-in Navbar ── */}
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex flex-col gap-5">

        {/* ── PROFILE HEADER CARD ── */}
        <div
          className="bg-white rounded-2xl border shadow-sm flex flex-row items-stretch w-full"
          style={{ borderColor: PINK_BORDER }}
        >
          {/* Left: Avatar + Name + Title — top aligned together */}
          <div className="flex items-center gap-4 px-6 py-5 flex-shrink-0">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-[90px] h-[90px] rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                <AvatarSVG />
              </div>
              <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                <CameraIcon />
              </button>
            </div>

            {/* Name + Title */}
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-xl font-bold leading-tight" style={{ color: RED }}>
                  {profile.name}
                </h1>
                {profile.verified && (
                  <span
                    className="text-xs font-semibold px-3 py-0.5 rounded-full border"
                    style={{ color: "#16a34a", borderColor: "#86efac", background: "#f0fdf4" }}
                  >
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{profile.title}</p>
            </div>
          </div>

          {/* Center: Contact Info — vertically + horizontally centered */}
          <div className="flex-1 flex items-center justify-center py-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <LocationIcon /><span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <EmailIcon /><span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <PhoneIcon /><span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarIcon /><span>{profile.dob}</span>
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="w-px my-5 flex-shrink-0" style={{ background: "#E5E7EB" }} />

          {/* Right: Stats — fixed width, compact */}
          <div className="flex flex-col justify-center gap-4 px-8 py-5 flex-shrink-0 w-[260px]">
            <div className="flex items-center gap-3">
              <BriefcaseStatIcon />
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Experience</p>
                <p className="text-sm font-bold text-gray-800">{profile.experience}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GraduationStatIcon />
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Education</p>
                <p className="text-sm font-bold text-gray-800">{profile.education}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PersonStatIcon />
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Current Role</p>
                <p className="text-sm font-bold text-gray-800 leading-snug">{profile.currentRole}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── TWO COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-5">

            {/* Education */}
            <Card>
              <SectionHeader title="Education" actionLabel="Add Education" />
              <div className="px-7 py-6 flex flex-col gap-6">
                {profile.educationList.map((edu, i) => (
                  <div key={i}>
                    <h4 className="text-base font-bold" style={{ color: RED }}>{edu.degree}</h4>
                    <p className="text-sm text-gray-600 mt-1">{edu.college}</p>
                    <p className="text-sm text-gray-400 mt-1">{edu.year} | {edu.type}</p>
                    {i < profile.educationList.length - 1 && (
                      <hr className="mt-5" style={{ borderColor: PINK_BORDER }} />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Employment */}
            <Card>
              <SectionHeader title="Employment" actionLabel="Add Employment" />
              <div className="px-7 py-6 flex flex-col gap-6">
                {profile.employment.map((job, i) => (
                  <div key={i}>
                    <h4 className="text-base font-bold" style={{ color: RED }}>{job.role}</h4>
                    <p className="text-sm text-gray-700 font-medium mt-1">{job.company}</p>
                    <p className="text-sm text-gray-400 mt-1">{job.duration}</p>
                    <p className="text-sm text-gray-500 mt-1">{job.skills}</p>
                    {i < profile.employment.length - 1 && (
                      <hr className="mt-5" style={{ borderColor: PINK_BORDER }} />
                    )}
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-5">

            {/* About */}
            <Card>
              <SectionHeader title="About" iconAction />
              <div className="px-7 py-6">
                {profile.about.split("\n\n").map((para, i) => (
                  <p key={i} className={`text-sm text-gray-600 leading-relaxed ${i > 0 ? "mt-4" : ""}`}>
                    {para}
                  </p>
                ))}
              </div>
            </Card>

            {/* Key Skills — moved to right column */}
            <Card>
              <SectionHeader title="Key Skills" iconAction />
              <div className="px-7 py-6 flex flex-wrap gap-3">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}