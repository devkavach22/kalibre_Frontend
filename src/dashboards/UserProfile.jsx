import { useProfile } from "../APIs/hooks/useProfile";
import DashboardNavbar from "../dashboards/DashboardNavbar";

const RED = "#DC2626";
const PINK_BG = "#FFF1F1";
const PINK_BORDER = "#FFE4E4";

// ─── SVG Icons ─────────────────────────────────────────────────────────────
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
const ExternalLinkIcon = () => (
  <svg className="w-4 h-4 ml-1.5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${className}`} style={{ borderColor: PINK_BORDER }}>
      {children}
    </div>
  );
}

function SectionHeader({ title, actionLabel, onAction, iconAction }) {
  return (
    <div className="px-7 py-4 flex justify-between items-center border-b" style={{ background: PINK_BG, borderColor: PINK_BORDER }}>
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

function DefaultAvatar({ base64 }) {
  if (base64) {
    return <img src={`data:image/png;base64,${base64}`} alt="Logo" className="w-full h-full object-cover" />;
  }
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" fill="#f0d5b0" />
      <circle cx="50" cy="38" r="18" fill="#c8956c" />
      <ellipse cx="50" cy="90" rx="30" ry="24" fill="#c8956c" />
    </svg>
  );
}

export default function UserProfile() {
  const { profile, loading, error } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-semibold" style={{ color: RED }}>Loading profile configuration...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-xl border text-center max-w-sm" style={{ borderColor: PINK_BORDER }}>
          <p className="text-red-600 font-bold mb-2">Error Loading Data</p>
          <p className="text-gray-600 text-sm">{error || "User data token could not be verified."}</p>
        </div>
      </div>
    );
  }

  const role = profile.role;
  let displayName = profile.name || "N/A";
  let displayTitle = "User Account";

  if (role === "recruiter" && profile.recruiter_details) {
    const details = profile.recruiter_details;
    displayName = details.full_name || displayName;
    displayTitle = details.company_name ? `Recruiter at ${details.company_name}` : "Recruiter Management";
  } else if (role === "candidate" && profile.candidate_details) {
    const details = profile.candidate_details;
    displayName = details.name || displayName;
    displayTitle = details.current_designation ? `${details.current_designation} ${details.current_company ? `at ${details.current_company}` : ''}` : details.headline || "Job Candidate";
  } else if (role === "employer" && profile.employer_details) {
    const details = profile.employer_details;
    displayName = details.company_name || displayName;
    displayTitle = "Corporate Employer";
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: "#F5F6FA" }}>
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex flex-col gap-5">
        
        {/* ── DESIGNED PREMIUM PROFILE HEADER CARD ── */}
        <div className="bg-white rounded-2xl border shadow-sm flex flex-col md:flex-row items-center justify-between w-full p-6" style={{ borderColor: PINK_BORDER }}>
          
          {/* Left Side: Avatar & Quick Info */}
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="relative flex-shrink-0">
              <div className="w-[84px] h-[84px] rounded-full overflow-hidden border-2 border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center">
                <DefaultAvatar base64={profile.recruiter_details?.logo_base64} />
              </div>
              <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                <CameraIcon />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-xl font-bold tracking-tight text-gray-900">{displayName}</h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                  Role: {role.toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500">{displayTitle}</p>
            </div>
          </div>

          {/* Right Side: Website CTA Link Action Card */}
          <div className="w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 flex items-center justify-start md:justify-end">
            {role === "candidate" && (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <BriefcaseStatIcon />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Experience</p>
                    <p className="text-sm font-bold text-gray-800">{profile.candidate_details?.experience_years || 0} Years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationStatIcon />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Highest Education</p>
                    <p className="text-sm font-bold text-gray-800">{profile.candidate_details?.highest_education || "N/A"}</p>
                  </div>
                </div>
              </div>
            )}

            {role === "recruiter" && (
              <div className="flex items-center gap-3 bg-gray-50 hover:bg-red-50/40 p-3 rounded-xl border border-gray-100 transition-all duration-200">
                <BriefcaseStatIcon />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Corporate Portal Website</p>
                  <a 
                    href={profile.recruiter_details?.website_url || "#"} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-sm font-bold text-gray-800 hover:text-red-600 flex items-center transition-colors"
                  >
                    {profile.recruiter_details?.website_url ? "Visit System Site" : "No Website Added"}
                    {profile.recruiter_details?.website_url && <ExternalLinkIcon />}
                  </a>
                </div>
              </div>
            )}

            {role === "employer" && (
              <div className="flex items-center gap-3">
                <BriefcaseStatIcon />
                <div>
                  <p className="text-xs text-gray-400 font-medium">PAN Number</p>
                  <p className="text-sm font-bold text-gray-800">{profile.employer_details?.pan_number || "N/A"}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── TWO COLUMN DETAILS LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          
          {role === "recruiter" ? (
            <>
              {/* CARD 1: COMPANY SPECIFICATIONS */}
              <Card>
                <SectionHeader title="Company Details" iconAction />
                <div className="px-7 py-5 flex flex-col gap-4 text-sm text-gray-700">
                  <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                    <span className="font-medium text-gray-500">Company Name</span>
                    <span className="font-bold text-gray-900">{profile.recruiter_details?.company_name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                    <span className="font-medium text-gray-500">Corporate Email Address</span>
                    <span className="text-gray-900 font-medium break-all">{profile.recruiter_details?.company_email || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                    <span className="font-medium text-gray-500">Corporate Phone Line</span>
                    <span className="font-medium text-gray-900">{profile.recruiter_details?.company_phone || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Base Corporate Location</span>
                    <span className="text-gray-900">{profile.recruiter_details?.current_location || "N/A"}</span>
                  </div>
                </div>
              </Card>

              {/* CARD 2: HUMAN RESOURCES (HR) PROFILE */}
              <Card>
                <SectionHeader title="Human Resources (HR) Profile" iconAction />
                <div className="px-7 py-5 flex flex-col gap-4 text-sm text-gray-700">
                  <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                    <span className="font-medium text-gray-500">Full Name</span>
                    <span className="font-bold text-gray-900" style={{ color: RED }}>{profile.recruiter_details?.full_name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                    <span className="font-medium text-gray-500">Direct Contact Email</span>
                    <span className="text-gray-900 font-medium break-all">{profile.recruiter_details?.email_address || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                    <span className="font-medium text-gray-500">Direct Mobile Assignment</span>
                    <span className="font-medium text-gray-900">{profile.recruiter_details?.phone_number || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                    <span className="font-medium text-gray-500">Gender Definition</span>
                    <span className="text-gray-900 capitalize font-medium">{profile.recruiter_details?.gender || "Not Specified"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                    <span className="font-medium text-gray-500">Date of Birth</span>
                    <span className="text-gray-900">{profile.recruiter_details?.dob || "Not Provided"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Preferred Target Hub</span>
                    <span className="text-gray-900 font-medium">{profile.recruiter_details?.preferred_location || "Not Provided"}</span>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <>
              {/* Alternate Role layouts remain securely untouched */}
              <div className="flex flex-col gap-5">
                {role === "candidate" && (
                  <>
                    <Card>
                      <SectionHeader title="Education" actionLabel="Add Education" />
                      <div className="px-7 py-6 flex flex-col gap-6">
                        {profile.candidate_details?.educations?.length > 0 ? (
                          profile.candidate_details.educations.map((edu, i) => (
                            <div key={i} className="border-l-2 border-red-100 pl-4">
                              <h4 className="text-base font-bold" style={{ color: RED }}>{edu.degree || "Degree"}</h4>
                              <p className="text-sm text-gray-600 font-medium mt-0.5">{edu.institute || "Institution Name"}</p>
                              <p className="text-sm text-gray-400 mt-0.5">Passing Year: {edu.passing_year || "Passing Year"}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400 italic">No education entries populated.</p>
                        )}
                      </div>
                    </Card>

                    <Card>
                      <SectionHeader title="Employment" actionLabel="Add Employment" />
                      <div className="px-7 py-6 flex flex-col gap-6">
                        {profile.candidate_details?.employments?.length > 0 ? (
                          profile.candidate_details.employments.map((job, i) => (
                            <div key={i} className="border-l-2 border-gray-100 pl-4">
                              <div className="flex justify-between items-start">
                                <h4 className="text-base font-bold text-gray-800">{job.job_title || "Job Title"}</h4>
                                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                                  {job.joining_date && job.end_date ? `${job.joining_date} - ${job.end_date}` : "Duration"}
                                </span>
                              </div>
                              <p className="text-sm font-medium mt-0.5" style={{ color: RED }}>{job.company_name || "Company Name"}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400 italic">No job experience entries tracked.</p>
                        )}
                      </div>
                    </Card>
                  </>
                )}

                {/* ── UPDATED ONLY: EMPLOYER CARD PROFILE ── */}
                {role === "employer" && (
                  <Card>
                    <SectionHeader title="Corporate Entity Details" iconAction />
                    <div className="px-7 py-5 flex flex-col gap-4 text-sm text-gray-700">
                      <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                        <span className="font-medium text-gray-500">Company Name</span>
                        <span className="font-bold text-gray-900">{profile.employer_details?.company_name || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                        <span className="font-medium text-gray-500">GST Number</span>
                        <span className="font-bold tracking-wider" style={{ color: RED }}>{profile.employer_details?.gst_number || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                        <span className="font-medium text-gray-500">PAN Number</span>
                        <span className="font-bold text-gray-900 tracking-wider">{profile.employer_details?.pan_number || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                        <span className="font-medium text-gray-500">Work Email</span>
                        <span className="font-medium text-gray-900 break-all">{profile.employer_details?.work_email || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                        <span className="font-medium text-gray-500">City / State Base</span>
                        <span className="font-medium text-gray-900">{`${profile.employer_details?.city || "N/A"}, ${profile.employer_details?.state || "N/A"}`}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: PINK_BORDER }}>
                        <span className="font-medium text-gray-500">Candidate Setup Done</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${profile.candidate_registration_done ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                          {profile.candidate_registration_done ? "True" : "False"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-500">Recruiter Setup Done</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${profile.recruiter_registration_done ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                          {profile.recruiter_registration_done ? "True" : "False"}
                        </span>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              <div className="flex flex-col gap-5">
                {role === "candidate" && (
                  <Card>
                    <SectionHeader title="Key Skills" iconAction />
                    <div className="px-7 py-6 flex flex-wrap gap-3">
                      {profile.candidate_details?.skills?.length > 0 ? (
                        profile.candidate_details.skills.map((skill, index) => (
                          <span key={index} className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400 italic">No structural skills listed.</p>
                      )}
                    </div>
                  </Card>
                )}
                
                {/* Fallback space block for symmetrical balancing if needed */}
                {role === "employer" && (
                  <Card>
                    <SectionHeader title="System Operations Matrix" />
                    <div className="px-7 py-5 text-sm text-gray-400 italic">
                      Registered full corporate address context: {profile.employer_details?.address || "N/A"}
                    </div>
                  </Card>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}