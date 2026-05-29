// /* eslint-disable no-useless-escape */
// import React, { useState, useEffect, useRef } from 'react';

// // SVG-based company logo avatar component
// export const CompanyAvatar = ({ label, colorIndex }) => {
//   const colors = [
//     { bg: "#EEF2F6", text: "#4A5568" },
//     { bg: "#EBF4FF", text: "#2B6CB0" },
//     { bg: "#F0FFF4", text: "#276749" },
//     { bg: "#FFF5F5", text: "#C53030" },
//     { bg: "#FEFCE8", text: "#92400E" },
//     { bg: "#F5F3FF", text: "#6D28D9" },
//     { bg: "#FFF7ED", text: "#C2410C" },
//     { bg: "#F0F9FF", text: "#0369A1" },
//   ];
//   const color = colors[colorIndex % colors.length];
//   const initials = label.slice(0, 4).toUpperCase();
//   return (
//     <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"
//       className="w-12 h-12 rounded-xl border border-gray-100 flex-shrink-0">
//       <rect width="45" height="45" rx="10" fill={color.bg} />
//       <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
//         fontSize={initials.length <= 3 ? "11" : "9"} fontWeight="700"
//         fontFamily="monospace" fill={color.text} letterSpacing="0.5">{initials}</text>
//     </svg>
//   );
// };

// // ─── Reusable Form Components ────────────────────────────────────────────────
// const SectionHeader = ({ icon, title }) => (
//   <div className="flex items-center gap-3 mb-5 md:mb-7">
//     <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
//       <span className="text-[#C1272D] text-lg md:text-xl">{icon}</span>
//     </div>
//     <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>
//   </div>
// );

// const Label = ({ text, required }) => (
//   <label className="block text-sm font-semibold text-gray-600 mb-2">
//     {text}{required && <span className="text-[#C1272D] ml-0.5">*</span>}
//   </label>
// );

// const Input = ({ placeholder, value, onChange, icon, type = "text", allowOnly = "all" }) => {
//   const handleInputChange = (e) => {
//     let val = e.target.value;
//     if (allowOnly === "chars") {
//       val = val.replace(/[0-9]/g, "");
//     } else if (allowOnly === "digits") {
//       val = val.replace(/[^0-9+() \-]/g, "");
//     } else if (allowOnly === "pure-digits") {
//       val = val.replace(/[^0-9]/g, "");
//     }
//     onChange(val);
//   };

//   return (
//     <div className="relative">
//       {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{icon}</span>}
//       <input type={type} placeholder={placeholder} value={value} onChange={handleInputChange}
//         className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#C1272D] focus:ring-1 focus:ring-red-100 bg-white transition ${icon ? "pl-10" : ""}`} />
//     </div>
//   );
// };

// const Select = ({ placeholder, value, onChange, options = [] }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredOptions = options.filter(o =>
//     o.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="relative w-full" ref={containerRef}>
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#C1272D] bg-white transition pr-10 cursor-pointer flex justify-between items-center min-h-[46px]"
//       >
//         <span className={value ? "text-gray-700" : "text-gray-400"}>
//           {value || placeholder}
//         </span>
//         <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
//           <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto flex flex-col">
//           {options.length > 7 && (
//             <div className="p-2 border-b border-gray-50 sticky top-0 bg-white z-10">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onClick={(e) => e.stopPropagation()}
//                 className="w-full border border-gray-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#C1272D] bg-gray-50"
//               />
//             </div>
//           )}
//           <div className="py-1">
//             {filteredOptions.length === 0 ? (
//               <div className="px-4 py-2 text-xs text-gray-400 text-center">No options found</div>
//             ) : (
//               filteredOptions.map((o) => (
//                 <div
//                   key={o}
//                   onClick={() => {
//                     onChange(o);
//                     setIsOpen(false);
//                     setSearch("");
//                   }}
//                   className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
//                     value === o
//                       ? "bg-red-50 text-[#C1272D] font-semibold"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`}
//                 >
//                   {o}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Textarea = ({ placeholder, value, onChange, rows = 4 }) => (
//   <textarea placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} rows={rows}
//     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#C1272D] focus:ring-1 focus:ring-red-100 resize-none bg-white transition" />
// );

// const Tag = ({ text, onRemove }) => (
//   <span className="inline-flex items-center gap-1.5 bg-red-50 text-[#C1272D] text-xs font-semibold px-3 py-1.5 rounded-full border border-red-100">
//     {text}
//     {onRemove && <button onClick={onRemove} className="hover:text-red-700 text-base leading-none">×</button>}
//   </span>
// );

// const STEPS = [
//   { label: "Job Details", icon: "🏢" },
//   { label: "Candidate Preferences", icon: "👤" },
//   { label: "Screening Questions", icon: "🔍" },
//   { label: "Job Description", icon: "📄" },
//   { label: "Communication Preferences", icon: "📡" },
//   { label: "Benefits & Perks", icon: "🎁" },
//   { label: "Company Details", icon: "🏗️" },
//   { label: "Review & Publish", icon: "✅" },
// ];

// export default function AddJobModal({ onClose, onCreateJob }) {
//   const [step, setStep] = useState(0);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => { document.body.style.overflow = ''; };
//   }, []);

//   // Close sidebar when step changes on mobile
//   const handleStepChange = (i) => {
//     setStep(i);
//     setSidebarOpen(false);
//   };

//   const [form, setForm] = useState({
//     companyName: "", jobTitle: "", department: "", gender: "", minExp: "", maxExp: "",
//     minSalary: "", maxSalary: "",
//     perks: ["Office cab/shuttle", "Food allowance"],
//     qualification: "", industry: "", candMinExp: "", candMaxExp: "",
//     languages: ["Hindi"], requiredSkills: ["Communication", "Teamwork"],
//     preferredSkills: ["Communication", "Teamwork"], certifications: "",
//     noticePeriod: "", immediateJoining: "",
//     relocation: "", workAuth: "", openPositions: "", jobLocation: "",
//     customQuestion: "", addedQuestions: ["Do you have experience with React.js?", "Are you comfortable with night shifts?", "Can you join within 15 days?"],
//     aboutRole: "", responsibilities: ["Develop and maintain web applications", "Collaborate with cross-functional teams", "Optimize performance and user experience", "Participate in project planning meetings"],
//     newResponsibility: "",
//     emailNotif: false, smsAlerts: true, whatsappUpdates: false, interviewReminders: false,
//     benefits: { healthInsurance: true, annualBonus: true, providentFund: true, paidLeaves: true, flexibleHours: true, workFromHome: true },
//     email: "", phone: "", website: "", companyOverview: "", logo: null,
//   });

//   const [customReqSkill, setCustomReqSkill] = useState("");
//   const [customPrefSkill, setCustomPrefSkill] = useState("");
//   const [newRespInput, setNewRespInput] = useState("");

//   const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
//   const toggleBenefit = (key) => setForm(f => ({ ...f, benefits: { ...f.benefits, [key]: !f.benefits[key] } }));

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         alert("File size exceeds 2MB limit.");
//         return;
//       }
//       const previewUrl = URL.createObjectURL(file);
//       set("logo", previewUrl);
//     }
//   };

//   const handleEditResponsibility = (index, value) => {
//     const updated = [...form.responsibilities];
//     updated[index] = value;
//     set("responsibilities", updated);
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 0: return (
//         <div className="space-y-4 md:space-y-6">
//           <SectionHeader icon="🏢" title="Job Details" />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//             <div><Label text="Your Company Name" required /><Input placeholder="Your company name" value={form.companyName} onChange={v => set("companyName", v)} allowOnly="chars" /></div>
//             <div><Label text="Job title" required /><Input placeholder="Ex. Sales manager" value={form.jobTitle} onChange={v => set("jobTitle", v)} allowOnly="chars" /></div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//             <div>
//               <Label text="Department" required />
//               <Select
//                 placeholder="Select Department"
//                 value={form.department}
//                 onChange={v => set("department", v)}
//                 options={[
//                   "Engineering & Technology",
//                   "Product Management",
//                   "Design & UX",
//                   "Sales & Business Development",
//                   "Marketing & Growth",
//                   "Human Resources",
//                   "Finance & Accounting",
//                   "Operations",
//                   "Customer Support",
//                   "Legal & Compliance",
//                   "Data Science & Analytics",
//                   "Research & Development",
//                   "Supply Chain & Logistics",
//                   "Administration",
//                   "IT & Infrastructure",
//                   "Quality Assurance",
//                   "Content & Communications",
//                   "Healthcare & Medical",
//                   "Education & Training",
//                   "Other",
//                 ]}
//               />
//             </div>
//             <div>
//               <Label text="Gender Preference" />
//               <Select
//                 placeholder="Select Gender"
//                 value={form.gender}
//                 onChange={v => set("gender", v)}
//                 options={["Any", "Male", "Female", "Non-Binary", "Prefer Not to Say"]}
//               />
//             </div>
//           </div>
//           <div>
//             <Label text="Work experience" required />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
//               <Select placeholder="Min. experience" value={form.minExp} onChange={v => set("minExp", v)} options={["0", "1", "2", "3", "4", "5", "6", "7", "8", "10+"]} />
//               <Select placeholder="Max. experience" value={form.maxExp} onChange={v => set("maxExp", v)} options={["1", "2", "3", "4", "5", "6", "7", "8", "10", "15+"]} />
//             </div>
//           </div>
//           <div>
//             <Label text="Salary Range (per annum)" required />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
//               <Input placeholder="Min. Salary" value={form.minSalary} onChange={v => set("minSalary", v)} allowOnly="pure-digits" />
//               <Input placeholder="Max. Salary" value={form.maxSalary} onChange={v => set("maxSalary", v)} allowOnly="pure-digits" />
//             </div>
//           </div>
//         </div>
//       );
//       case 1: return (
//         <div className="space-y-4 md:space-y-6">
//           <SectionHeader icon="👤" title="Candidate Preferences" />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-start">
//             <div>
//               <Label text="Minimum Qualification" required />
//               <Select placeholder="Select Qualification" value={form.qualification} onChange={v => set("qualification", v)} options={["10th", "12th", "Diploma", "Graduate", "Post Graduate"]} />
//             </div>
//             <div>
//               <Label text="Language Preference (Multi-select)" required />
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <div className="flex-1 border border-gray-200 rounded-xl px-4 py-2 min-h-[46px] flex flex-wrap items-center gap-2 bg-white">
//                   {form.languages.map((lang, i) => (
//                     <Tag key={i} text={lang} onRemove={() => set("languages", form.languages.filter((_, j) => j !== i))} />
//                   ))}
//                   {form.languages.length === 0 && <span className="text-gray-400 text-sm">Selected</span>}
//                 </div>
//                 <div className="w-full sm:w-48 flex-shrink-0">
//                   <Select placeholder="Add language" value="" onChange={v => { if (v && !form.languages.includes(v)) set("languages", [...form.languages, v]) }} options={["English", "Hindi", "Bengali", "Tamil", "Telugu", "Kannada", "Marathi"]} />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//             <div>
//               <Label text="Required Skills" />
//               <div className="border border-gray-200 rounded-xl px-4 py-3 min-h-[56px] flex flex-wrap gap-2 bg-white mb-2">
//                 {form.requiredSkills.map((s, i) => <Tag key={i} text={s} onRemove={() => set("requiredSkills", form.requiredSkills.filter((_, j) => j !== i))} />)}
//               </div>
//               <div className="flex gap-2">
//                 <input type="text" placeholder="Add custom skill" value={customReqSkill} onChange={e => setCustomReqSkill(e.target.value)}
//                   className="flex-1 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#C1272D]" />
//                 <button type="button" onClick={() => { if (customReqSkill.trim()) { set("requiredSkills", [...form.requiredSkills, customReqSkill.trim()]); setCustomReqSkill(""); } }}
//                   className="bg-[#C1272D] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#a61f24]">Add</button>
//               </div>
//             </div>
//             <div>
//               <Label text="Preferred Skills" />
//               <div className="border border-gray-200 rounded-xl px-4 py-3 min-h-[56px] flex flex-wrap gap-2 bg-white mb-2">
//                 {form.preferredSkills.map((s, i) => <Tag key={i} text={s} onRemove={() => set("preferredSkills", form.preferredSkills.filter((_, j) => j !== i))} />)}
//               </div>
//               <div className="flex gap-2">
//                 <input type="text" placeholder="Add custom skill" value={customPrefSkill} onChange={e => setCustomPrefSkill(e.target.value)}
//                   className="flex-1 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#C1272D]" />
//                 <button type="button" onClick={() => { if (customPrefSkill.trim()) { set("preferredSkills", [...form.preferredSkills, customPrefSkill.trim()]); setCustomPrefSkill(""); } }}
//                   className="bg-[#C1272D] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#a61f24]">Add</button>
//               </div>
//             </div>
//           </div>
//           <div><Label text="Certifications" required /><Textarea placeholder="Add certifications" value={form.certifications} onChange={v => set("certifications", v)} rows={3} /></div>
//         </div>
//       );
//       case 2: return (
//         <div className="space-y-4 md:space-y-6">
//           <SectionHeader icon="🔍" title="Screening Questions" />
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
//             <div><Label text="Notice Period" required /><Select placeholder="select" value={form.noticePeriod} onChange={v => set("noticePeriod", v)} options={["Immediate", "15 Days", "1 Month", "2 Months", "3 Months"]} /></div>
//             <div><Label text="Immediate Joining?" required /><Select placeholder="select" value={form.immediateJoining} onChange={v => set("immediateJoining", v)} options={["Yes", "No"]} /></div>
//             <div><Label text="Relocation Preference?" /><Select placeholder="select" value={form.relocation} onChange={v => set("relocation", v)} options={["Yes", "No", "Maybe"]} /></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
//             <div><Label text="Work Authorization" /><Select placeholder="select" value={form.workAuth} onChange={v => set("workAuth", v)} options={["Indian Citizen", "Work Permit", "Other"]} /></div>
//             <div><Label text="Number of Open Positions" required /><Input placeholder="Enter number of positions" value={form.openPositions} onChange={v => set("openPositions", v)} allowOnly="pure-digits" /></div>
//             <div><Label text="Job Location" required /><Input placeholder="Enter job location" value={form.jobLocation} onChange={v => set("jobLocation", v)} icon="📍" allowOnly="chars" /></div>
//           </div>
//           <div>
//             <Label text="Add Custom Question" />
//             <div className="flex flex-col sm:flex-row gap-3">
//               <input value={form.customQuestion} onChange={e => set("customQuestion", e.target.value)}
//                 placeholder="Type your question"
//                 className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C1272D] bg-white" />
//               <button onClick={() => { if (form.customQuestion.trim()) { set("addedQuestions", [...form.addedQuestions, form.customQuestion]); set("customQuestion", ""); } }}
//                 className="bg-[#C1272D] hover:bg-[#a61f24] text-white font-bold px-6 py-3 rounded-xl text-sm transition w-full sm:w-auto">Add</button>
//             </div>
//           </div>
//           {form.addedQuestions.length > 0 && (
//             <div>
//               <p className="text-xs font-semibold text-gray-500 mb-2">Added Questions</p>
//               <div className="flex flex-wrap gap-2">
//                 {form.addedQuestions.map((q, i) => (
//                   <span key={i} className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full">
//                     {q}
//                     <button onClick={() => set("addedQuestions", form.addedQuestions.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500">×</button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       );
//       case 3: return (
//         <div className="space-y-4 md:space-y-6">
//           <SectionHeader icon="📄" title="Job Description" />
//           <div><Label text="About the Role" required /><Textarea placeholder="Briefly describe the role" value={form.aboutRole} onChange={v => set("aboutRole", v)} rows={5} /></div>
//           <div>
//             <Label text="Key Responsibilities" required />
//             <div className="border border-gray-200 rounded-xl px-4 py-4 bg-white space-y-3 min-h-[120px]">
//               {form.responsibilities.map((r, i) => (
//                 <div key={i} className="flex items-center gap-2 text-sm text-gray-700 border-b border-gray-50 pb-1">
//                   <span className="text-[#C1272D] font-bold">•</span>
//                   <input type="text" value={r} onChange={e => handleEditResponsibility(i, e.target.value)}
//                     className="flex-1 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-red-100 rounded px-1 text-sm text-gray-700" />
//                   <button onClick={() => set("responsibilities", form.responsibilities.filter((_, j) => j !== i))} className="text-gray-300 hover:text-red-400 text-base px-1">×</button>
//                 </div>
//               ))}
//               <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100">
//                 <input type="text" placeholder="Type new responsibility..." value={newRespInput} onChange={e => setNewRespInput(e.target.value)}
//                   className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C1272D]" />
//                 <button type="button" onClick={() => { if (newRespInput.trim()) { set("responsibilities", [...form.responsibilities, newRespInput.trim()]); setNewRespInput(""); } }}
//                   className="bg-[#C1272D] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#a61f24] whitespace-nowrap">+ Add</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//       case 4: return (
//         <div className="space-y-4 md:space-y-5">
//           <SectionHeader icon="📡" title="Communication Preferences" />
//           <div className="space-y-3">
//             {[
//               { key: "emailNotif", icon: "✉️", label: "Email Notifications", desc: "Receive updates via email" },
//               { key: "smsAlerts", icon: "💬", label: "SMS Alerts", desc: "Receive SMS notifications" },
//               { key: "whatsappUpdates", icon: "📱", label: "WhatsApp Updates", desc: "Receive WhatsApp messages" },
//               { key: "interviewReminders", icon: "🔔", label: "Interview Reminders", desc: "Get interview reminders" },
//             ].map(({ key, icon, label, desc }) => (
//               <div key={key} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-red-100 transition">
//                 <div className="flex items-center gap-3">
//                   <span className="text-xl">{icon}</span>
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700">{label}</p>
//                     <p className="text-xs text-gray-400">{desc}</p>
//                   </div>
//                 </div>
//                 <button onClick={() => set(key, !form[key])}
//                   className={`w-5 h-5 rounded border-2 flex items-center justify-center transition flex-shrink-0 ${form[key] ? "bg-[#C1272D] border-[#C1272D]" : "border-gray-300"}`}>
//                   {form[key] && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//       case 5: return (
//         <div className="space-y-4 md:space-y-6">
//           <SectionHeader icon="🎁" title="Benefits & Perks" />
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
//             {[
//               { key: "healthInsurance", label: "Health Insurance" },
//               { key: "annualBonus", label: "Annual Bonus" },
//               { key: "providentFund", label: "Provident Fund" },
//               { key: "paidLeaves", label: "Paid Leaves" },
//               { key: "flexibleHours", label: "Flexible Working Hours" },
//               { key: "workFromHome", label: "Work From Home" },
//             ].map(({ key, label }) => (
//               <label key={key} className="flex items-center gap-2.5 cursor-pointer p-4 border border-gray-100 rounded-xl hover:border-red-100 transition">
//                 <button onClick={() => toggleBenefit(key)}
//                   className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition ${form.benefits[key] ? "bg-[#C1272D] border-[#C1272D]" : "border-gray-300"}`}>
//                   {form.benefits[key] && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
//                 </button>
//                 <span className="text-sm font-semibold text-gray-600">{label}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       );
//       case 6: return (
//         <div className="space-y-4 md:space-y-6">
//           <SectionHeader icon="🏗️" title="Company Details" />
//           <div>
//             <Label text="Upload Logo" />
//             <input type="file" ref={fileInputRef} onChange={handleLogoChange} accept="image/*" className="hidden" />
//             <div
//               onClick={() => fileInputRef.current && fileInputRef.current.click()}
//               className="border-2 border-dashed border-red-200 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center gap-2 bg-red-50/30 cursor-pointer hover:bg-red-50/50 transition relative overflow-hidden min-h-[140px]"
//             >
//               {form.logo ? (
//                 <div className="flex flex-col items-center gap-2">
//                   <img src={form.logo} alt="Company Logo Preview" className="h-16 w-16 object-contain rounded-xl border bg-white shadow-xs" />
//                   <p className="text-xs text-gray-500 font-medium">Click to change logo</p>
//                 </div>
//               ) : (
//                 <>
//                   <svg className="w-8 h-8 md:w-10 md:h-10 text-[#C1272D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
//                   </svg>
//                   <p className="text-[#C1272D] font-bold text-sm md:text-base">Upload Logo</p>
//                   <p className="text-gray-400 text-xs md:text-sm">JPG, PNG (Max. 2MB)</p>
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//             <div><Label text="Email Address" required /><Input placeholder="your.email@example.com" value={form.email} onChange={v => set("email", v)} icon="✉️" /></div>
//             <div><Label text="Phone Number" required /><Input placeholder="+1 (555) 123-4567" value={form.phone} onChange={v => set("phone", v)} icon="📞" allowOnly="digits" /></div>
//           </div>
//           <div className="w-full md:w-1/2">
//             <Label text="Website URL" /><Input placeholder="https://www.company.com" value={form.website} onChange={v => set("website", v)} />
//           </div>
//           <div>
//             <Label text="Company Overview" />
//             <Textarea placeholder="Write a brief overview about your company — mission, culture, what you do, and why candidates should join..." value={form.companyOverview} onChange={v => set("companyOverview", v)} rows={4} />
//           </div>
//         </div>
//       );
//       case 7: return (
//         <div className="space-y-4 md:space-y-6">
//           <SectionHeader icon="✅" title="Review & Publish" />
//           <div className="bg-green-50 border border-green-100 rounded-2xl p-4 md:p-5">
//             <p className="text-sm font-bold text-green-700 mb-1">Almost there! 🎉</p>
//             <p className="text-xs md:text-sm text-green-600">Review your job posting details before publishing. Once published, candidates will be able to apply.</p>
//           </div>
//           <div className="space-y-1">
//             {[
//               { label: "Job Title", value: form.jobTitle || "—" },
//               { label: "Company", value: form.companyName || "—" },
//               { label: "Department", value: form.department || "—" },
//               { label: "Experience", value: form.minExp && form.maxExp ? `${form.minExp} - ${form.maxExp} Years` : "—" },
//               { label: "Salary Range", value: form.minSalary && form.maxSalary ? `₹${form.minSalary} - ₹${form.maxSalary}` : "Not Disclosed" },
//               { label: "Location", value: form.jobLocation || "—" },
//               { label: "Open Positions", value: form.openPositions || "—" },
//             ].map(({ label, value }) => (
//               <div key={label} className="flex justify-between py-3.5 border-b border-gray-100 text-sm gap-4">
//                 <span className="font-semibold text-gray-500 min-w-[100px]">{label}</span>
//                 <span className="font-bold text-gray-800 text-right breakdown-all">{value}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//       default: return null;
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>

//       {/* ── Mobile left-side drawer overlay ── */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 md:hidden"
//           style={{ background: "rgba(0,0,0,0.3)" }}
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* ── Mobile left drawer ── */}
//       <div
//         className={`fixed top-0 left-0 h-full z-50 md:hidden bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col`}
//         style={{
//           width: "72vw",
//           maxWidth: "300px",
//           transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
//         }}
//       >
//         {/* Drawer header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-red-50">
//           <p className="text-xs font-bold text-[#C1272D] uppercase tracking-widest">Steps</p>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-100 text-[#C1272D] transition text-lg font-bold"
//           >
//             ×
//           </button>
//         </div>

//         {/* Step list */}
//         <div className="flex-1 overflow-y-auto py-3 px-3">
//           {STEPS.map((s, i) => (
//             <button
//               key={i}
//               onClick={() => handleStepChange(i)}
//               className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-sm transition-all ${
//                 i === step
//                   ? "bg-red-50 text-[#C1272D] font-bold border border-red-100"
//                   : i < step
//                   ? "text-gray-600 font-semibold hover:bg-gray-50"
//                   : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
//               }`}
//             >
//               {/* Step indicator dot */}
//               <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold border-2 transition ${
//                 i < step
//                   ? "bg-[#C1272D] border-[#C1272D] text-white"
//                   : i === step
//                   ? "bg-[#C1272D] border-[#C1272D] text-white"
//                   : "border-gray-300 text-gray-400"
//               }`}>
//                 {i < step ? (
//                   <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                   </svg>
//                 ) : (
//                   i + 1
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="truncate">{s.label}</p>
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Progress bar at bottom of drawer */}
//         <div className="px-5 py-4 border-t border-gray-100">
//           <div className="flex justify-between text-xs text-gray-400 mb-1.5">
//             <span>Progress</span>
//             <span>{step + 1} / {STEPS.length}</span>
//           </div>
//           <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-[#C1272D] rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ── Main modal ── */}
//       <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-7xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[92vh] md:max-h-[90vh]">

//         {/* ── Desktop sidebar (unchanged) ── */}
//         <div className="hidden md:flex w-72 flex-shrink-0 bg-gray-50 border-r border-gray-100 flex-col py-8 px-5">
//           <p className="text-xs font-bold text-[#C1272D] uppercase tracking-widest mb-6">Find The Right Talent Faster</p>
//           <div className="flex flex-col space-y-1 flex-1">
//             {STEPS.map((s, i) => (
//               <button key={i}
//                 onClick={() => setStep(i)}
//                 className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all ${
//                   i === step
//                     ? "bg-white shadow-xs text-[#C1272D] font-bold"
//                     : i < step
//                     ? "text-gray-600 font-semibold hover:text-gray-900"
//                     : "text-gray-400 hover:text-gray-600"
//                 }`}>
//                 <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 border-2 transition ${
//                   i < step ? "bg-[#C1272D] border-[#C1272D]" : i === step ? "bg-[#C1272D] border-[#C1272D]" : "border-gray-300"
//                 }`} />
//                 <span>{s.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ── Right content area ── */}
//         <div className="flex-1 flex flex-col overflow-hidden">

//           {/* Header — mobile has hamburger menu button */}
//           <div className="flex items-center justify-between px-4 md:px-10 py-4 md:py-5 border-b border-gray-100">
//             <div className="flex items-center gap-2.5">
//               {/* Mobile: hamburger to open left drawer */}
//               <button
//                 className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition flex-shrink-0 border border-red-100"
//                 onClick={() => setSidebarOpen(true)}
//                 aria-label="Open steps menu"
//               >
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <rect x="3" y="6" width="18" height="2" rx="1" fill="#C1272D"/>
//                   <rect x="3" y="11" width="12" height="2" rx="1" fill="#C1272D"/>
//                   <rect x="3" y="16" width="15" height="2" rx="1" fill="#C1272D"/>
//                 </svg>
//               </button>

//               {/* Step counter badge on mobile */}
//               <span className="md:hidden bg-red-100 text-[#C1272D] w-6 h-6 rounded-full inline-flex items-center justify-center text-[11px] font-bold flex-shrink-0">
//                 {step + 1}
//               </span>

//               <h2 className="text-sm md:text-base font-bold text-gray-800 truncate">
//                 {STEPS[step].label}
//               </h2>
//             </div>

//             <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition text-xl flex-shrink-0">&times;</button>
//           </div>

//           {/* Form content */}
//           <div className="flex-1 overflow-y-auto px-5 md:px-10 py-5 md:py-7">
//             {renderStep()}
//           </div>

//           {/* Footer buttons */}
//           <div className="px-4 md:px-10 py-4 md:py-5 border-t border-gray-100 flex items-center justify-between gap-2 md:gap-3 bg-gray-50/50 md:bg-transparent">
//             <button onClick={onClose}
//               className="flex-1 border border-gray-200 text-gray-600 font-bold py-3 md:py-3.5 rounded-xl text-xs md:text-sm hover:bg-gray-50 transition">
//               Cancel
//             </button>
//             {step > 0 && (
//               <button onClick={() => setStep(s => s - 1)}
//                 className="flex-1 border border-gray-200 text-gray-600 font-bold py-3 md:py-3.5 rounded-xl text-xs md:text-sm hover:bg-gray-50 transition">
//                 Back
//               </button>
//             )}
//             {step < STEPS.length - 1 ? (
//               <button onClick={() => setStep(s => s + 1)}
//                 className="flex-1 bg-[#C1272D] hover:bg-[#a61f24] text-white font-bold py-3 md:py-3.5 rounded-xl text-xs md:text-sm transition shadow-md">
//                 Next
//               </button>
//             ) : (
//               <button onClick={onCreateJob}
//                 className="flex-1 bg-[#C1272D] hover:bg-[#a61f24] text-white font-bold py-3 md:py-3.5 rounded-xl text-xs md:text-sm transition shadow-md">
//                 Create Job
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useRef } from 'react';
import useHr from '../APIs/hooks/useHr'; // Importing your customized hook

// SVG-based company logo avatar component
export const CompanyAvatar = ({ label, colorIndex }) => {
  const colors = [
    { bg: "#EEF2F6", text: "#4A5568" },
    { bg: "#EBF4FF", text: "#2B6CB0" },
    { bg: "#F0FFF4", text: "#276749" },
    { bg: "#FFF5F5", text: "#C53030" },
    { bg: "#FEFCE8", text: "#92400E" },
    { bg: "#F5F3FF", text: "#6D28D9" },
    { bg: "#FFF7ED", text: "#C2410C" },
    { bg: "#F0F9FF", text: "#0369A1" },
  ];
  const color = colors[colorIndex % colors.length];
  const initials = label.slice(0, 4).toUpperCase();
  return (
    <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12 rounded-xl border border-gray-100 flex-shrink-0">
      <rect width="45" height="45" rx="10" fill={color.bg} />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontSize={initials.length <= 3 ? "11" : "9"} fontWeight="700"
        fontFamily="monospace" fill={color.text} letterSpacing="0.5">{initials}</text>
    </svg>
  );
};

// ─── Reusable Form Components ────────────────────────────────────────────────
const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-5 md:mb-7">
    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
      <span className="text-[#C1272D] text-lg md:text-xl">{icon}</span>
    </div>
    <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>
  </div>
);

const Label = ({ text, required }) => (
  <label className="block text-sm font-semibold text-gray-600 mb-2">
    {text}{required && <span className="text-[#C1272D] ml-0.5">*</span>}
  </label>
);

const Input = ({ placeholder, value, onChange, icon, type = "text", allowOnly = "all" }) => {
  const handleInputChange = (e) => {
    let val = e.target.value;
    if (allowOnly === "chars") {
      val = val.replace(/[0-9]/g, "");
    } else if (allowOnly === "digits") {
      val = val.replace(/[^0-9+() \-]/g, "");
    } else if (allowOnly === "pure-digits") {
      val = val.replace(/[^0-9]/g, "");
    }
    onChange(val);
  };

  return (
    <div className="relative">
      {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{icon}</span>}
      <input type={type} placeholder={placeholder} value={value} onChange={handleInputChange}
        className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#C1272D] focus:ring-1 focus:ring-red-100 bg-white transition ${icon ? "pl-10" : ""}`} />
    </div>
  );
};

const Select = ({ placeholder, value, onChange, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(o =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#C1272D] bg-white transition pr-10 cursor-pointer flex justify-between items-center min-h-[46px]"
      >
        <span className={value ? "text-gray-700" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
          <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto flex flex-col">
          {options.length > 7 && (
            <div className="p-2 border-b border-gray-50 sticky top-0 bg-white z-10">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full border border-gray-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#C1272D] bg-gray-50"
              />
            </div>
          )}
          <div className="py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-xs text-gray-400 text-center">No options found</div>
            ) : (
              filteredOptions.map((o) => (
                <div
                  key={o}
                  onClick={() => {
                    onChange(o);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    value === o
                      ? "bg-red-50 text-[#C1272D] font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {o}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Textarea = ({ placeholder, value, onChange, rows = 4 }) => (
  <textarea placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} rows={rows}
    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#C1272D] focus:ring-1 focus:ring-red-100 resize-none bg-white transition" />
);

const Tag = ({ text, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 bg-red-50 text-[#C1272D] text-xs font-semibold px-3 py-1.5 rounded-full border border-red-100">
    {text}
    {onRemove && <button onClick={onRemove} className="hover:text-red-700 text-base leading-none">×</button>}
  </span>
);

const STEPS = [
  { label: "Job Details", icon: "🏢" },
  { label: "Candidate Preferences", icon: "👤" },
  { label: "Screening Questions", icon: "🔍" },
  { label: "Job Description", icon: "📄" },
  { label: "Communication Preferences", icon: "📡" },
  { label: "Benefits & Perks", icon: "🎁" },
  { label: "Company Details", icon: "🏗️" },
  { label: "Review & Publish", icon: "✅" },
];

export default function AddJobModal({ onClose, onCreateJob }) {
  const [step, setStep] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);
  
  // Connect hook structure
  const { createJob, loading } = useHr();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleStepChange = (i) => {
    setStep(i);
    setSidebarOpen(false);
  };

  const [form, setForm] = useState({
    companyName: "", jobTitle: "", department: "", gender: "", minExp: "", maxExp: "",
    minSalary: "", maxSalary: "",
    perks: ["Office cab/shuttle", "Food allowance"],
    qualification: "", industry: "", candMinExp: "", candMaxExp: "",
    languages: ["Hindi"], requiredSkills: ["Communication", "Teamwork"],
    preferredSkills: ["Communication", "Teamwork"], certifications: "",
    noticePeriod: "", immediateJoining: "",
    relocation: "", workAuth: "", openPositions: "", jobLocation: "",
    customQuestion: "", addedQuestions: ["Do you have experience with React.js?", "Are you comfortable with night shifts?", "Can you join within 15 days?"],
    aboutRole: "", responsibilities: ["Develop and maintain web applications", "Collaborate with cross-functional teams", "Optimize performance and user experience", "Participate in project planning meetings"],
    newResponsibility: "",
    emailNotif: false, smsAlerts: true, whatsappUpdates: false, interviewReminders: false,
    benefits: { healthInsurance: true, annualBonus: true, providentFund: true, paidLeaves: true, flexibleHours: true, workFromHome: true },
    email: "", phone: "", website: "", companyOverview: "", logo: null,
  });

  const [customReqSkill, setCustomReqSkill] = useState("");
  const [customPrefSkill, setCustomPrefSkill] = useState("");
  const [newRespInput, setNewRespInput] = useState("");

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleBenefit = (key) => setForm(f => ({ ...f, benefits: { ...f.benefits, [key]: !f.benefits[key] } }));

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        set("logo", reader.result); // Base64 url captured natively
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditResponsibility = (index, value) => {
    const updated = [...form.responsibilities];
    updated[index] = value;
    set("responsibilities", updated);
  };

  // Integration Action handler bound directly to submit button
  const handleFormSubmission = async () => {
    const success = await createJob(form);
    if (success) {
      if (typeof onCreateJob === "function") onCreateJob();
      onClose();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-4 md:space-y-6">
          <SectionHeader icon="🏢" title="Job Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div><Label text="Your Company Name" required /><Input placeholder="Your company name" value={form.companyName} onChange={v => set("companyName", v)} allowOnly="chars" /></div>
            <div><Label text="Job title" required /><Input placeholder="Ex. Sales manager" value={form.jobTitle} onChange={v => set("jobTitle", v)} allowOnly="chars" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <Label text="Department" required />
              <Select
                placeholder="Select Department"
                value={form.department}
                onChange={v => set("department", v)}
                options={[
                  "Engineering & Technology",
                  "Product Management",
                  "Design & UX",
                  "Sales & Business Development",
                  "Marketing & Growth",
                  "Human Resources",
                  "Finance & Accounting",
                  "Operations",
                  "Customer Support",
                  "Legal & Compliance",
                  "Data Science & Analytics",
                  "Research & Development",
                  "Supply Chain & Logistics",
                  "Administration",
                  "IT & Infrastructure",
                  "Quality Assurance",
                  "Content & Communications",
                  "Healthcare & Medical",
                  "Education & Training",
                  "Other",
                ]}
              />
            </div>
            <div>
              <Label text="Gender Preference" />
              <Select
                placeholder="Select Gender"
                value={form.gender}
                onChange={v => set("gender", v)}
                options={["Any", "Male", "Female", "Non-Binary", "Prefer Not to Say"]}
              />
            </div>
          </div>
          <div>
            <Label text="Work experience" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <Select placeholder="Min. experience" value={form.minExp} onChange={v => set("minExp", v)} options={["0", "1", "2", "3", "4", "5", "6", "7", "8", "10+"]} />
              <Select placeholder="Max. experience" value={form.maxExp} onChange={v => set("maxExp", v)} options={["1", "2", "3", "4", "5", "6", "7", "8", "10", "15+"]} />
            </div>
          </div>
          <div>
            <Label text="Salary Range (per annum)" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <Input placeholder="Min. Salary" value={form.minSalary} onChange={v => set("minSalary", v)} allowOnly="pure-digits" />
              <Input placeholder="Max. Salary" value={form.maxSalary} onChange={v => set("maxSalary", v)} allowOnly="pure-digits" />
            </div>
          </div>
        </div>
      );
      case 1: return (
        <div className="space-y-4 md:space-y-6">
          <SectionHeader icon="👤" title="Candidate Preferences" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-start">
            <div>
              <Label text="Minimum Qualification" required />
              <Select placeholder="Select Qualification" value={form.qualification} onChange={v => set("qualification", v)} options={["10th", "12th", "Diploma", "Graduate", "Post Graduate"]} />
            </div>
            <div>
              <Label text="Language Preference (Multi-select)" required />
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 border border-gray-200 rounded-xl px-4 py-2 min-h-[46px] flex flex-wrap items-center gap-2 bg-white">
                  {form.languages.map((lang, i) => (
                    <Tag key={i} text={lang} onRemove={() => set("languages", form.languages.filter((_, j) => j !== i))} />
                  ))}
                  {form.languages.length === 0 && <span className="text-gray-400 text-sm">Selected</span>}
                </div>
                <div className="w-full sm:w-48 flex-shrink-0">
                  <Select placeholder="Add language" value="" onChange={v => { if (v && !form.languages.includes(v)) set("languages", [...form.languages, v]) }} options={["English", "Hindi", "Bengali", "Tamil", "Telugu", "Kannada", "Marathi"]} />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <Label text="Required Skills" />
              <div className="border border-gray-200 rounded-xl px-4 py-3 min-h-[56px] flex flex-wrap gap-2 bg-white mb-2">
                {form.requiredSkills.map((s, i) => <Tag key={i} text={s} onRemove={() => set("requiredSkills", form.requiredSkills.filter((_, j) => j !== i))} />)}
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Add custom skill" value={customReqSkill} onChange={e => setCustomReqSkill(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#C1272D]" />
                <button type="button" onClick={() => { if (customReqSkill.trim()) { set("requiredSkills", [...form.requiredSkills, customReqSkill.trim()]); setCustomReqSkill(""); } }}
                  className="bg-[#C1272D] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#a61f24]">Add</button>
              </div>
            </div>
            <div>
              <Label text="Preferred Skills" />
              <div className="border border-gray-200 rounded-xl px-4 py-3 min-h-[56px] flex flex-wrap gap-2 bg-white mb-2">
                {form.preferredSkills.map((s, i) => <Tag key={i} text={s} onRemove={() => set("preferredSkills", form.preferredSkills.filter((_, j) => j !== i))} />)}
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Add custom skill" value={customPrefSkill} onChange={e => setCustomPrefSkill(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#C1272D]" />
                <button type="button" onClick={() => { if (customPrefSkill.trim()) { set("preferredSkills", [...form.preferredSkills, customPrefSkill.trim()]); setCustomPrefSkill(""); } }}
                  className="bg-[#C1272D] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#a61f24]">Add</button>
              </div>
            </div>
          </div>
          <div><Label text="Certifications" required /><Textarea placeholder="Add certifications" value={form.certifications} onChange={v => set("certifications", v)} rows={3} /></div>
        </div>
      );
      case 2: return (
        <div className="space-y-4 md:space-y-6">
          <SectionHeader icon="🔍" title="Screening Questions" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            <div><Label text="Notice Period" required /><Select placeholder="select" value={form.noticePeriod} onChange={v => set("noticePeriod", v)} options={["Immediate", "15 Days", "1 Month", "2 Months", "3 Months"]} /></div>
            <div><Label text="Immediate Joining?" required /><Select placeholder="select" value={form.immediateJoining} onChange={v => set("immediateJoining", v)} options={["Yes", "No"]} /></div>
            <div><Label text="Relocation Preference?" /><Select placeholder="select" value={form.relocation} onChange={v => set("relocation", v)} options={["Yes", "No", "Maybe"]} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            <div><Label text="Work Authorization" /><Select placeholder="select" value={form.workAuth} onChange={v => set("workAuth", v)} options={["Indian Citizen", "Work Permit", "Other"]} /></div>
            <div><Label text="Number of Open Positions" required /><Input placeholder="Enter number of positions" value={form.openPositions} onChange={v => set("openPositions", v)} allowOnly="pure-digits" /></div>
            <div><Label text="Job Location" required /><Input placeholder="Enter job location" value={form.jobLocation} icon="📍" allowOnly="chars" /></div>
          </div>
          <div>
            <Label text="Add Custom Question" />
            <div className="flex flex-col sm:flex-row gap-3">
              <input value={form.customQuestion} onChange={e => set("customQuestion", e.target.value)}
                placeholder="Type your question"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C1272D] bg-white" />
              <button onClick={() => { if (form.customQuestion.trim()) { set("addedQuestions", [...form.addedQuestions, form.customQuestion]); set("customQuestion", ""); } }}
                className="bg-[#C1272D] hover:bg-[#a61f24] text-white font-bold px-6 py-3 rounded-xl text-sm transition w-full sm:w-auto">Add</button>
            </div>
          </div>
          {form.addedQuestions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Added Questions</p>
              <div className="flex flex-wrap gap-2">
                {form.addedQuestions.map((q, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full">
                    {q}
                    <button onClick={() => set("addedQuestions", form.addedQuestions.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
      case 3: return (
        <div className="space-y-4 md:space-y-6">
          <SectionHeader icon="📄" title="Job Description" />
          <div><Label text="About the Role" required /><Textarea placeholder="Briefly describe the role" value={form.aboutRole} onChange={v => set("aboutRole", v)} rows={5} /></div>
          <div>
            <Label text="Key Responsibilities" required />
            <div className="border border-gray-200 rounded-xl px-4 py-4 bg-white space-y-3 min-h-[120px]">
              {form.responsibilities.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700 border-b border-gray-50 pb-1">
                  <span className="text-[#C1272D] font-bold">•</span>
                  <input type="text" value={r} onChange={e => handleEditResponsibility(i, e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-red-100 rounded px-1 text-sm text-gray-700" />
                  <button onClick={() => set("responsibilities", form.responsibilities.filter((_, j) => j !== i))} className="text-gray-300 hover:text-red-400 text-base px-1">×</button>
                </div>
              ))}
              <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100">
                <input type="text" placeholder="Type new responsibility..." value={newRespInput} onChange={e => setNewRespInput(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C1272D]" />
                <button type="button" onClick={() => { if (newRespInput.trim()) { set("responsibilities", [...form.responsibilities, newRespInput.trim()]); setNewRespInput(""); } }}
                  className="bg-[#C1272D] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#a61f24] whitespace-nowrap">+ Add</button>
              </div>
            </div>
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-4 md:space-y-5">
          <SectionHeader icon="📡" title="Communication Preferences" />
          <div className="space-y-3">
            {[
              { key: "emailNotif", icon: "✉️", label: "Email Notifications", desc: "Receive updates via email" },
              { key: "smsAlerts", icon: "💬", label: "SMS Alerts", desc: "Receive SMS notifications" },
              { key: "whatsappUpdates", icon: "📱", label: "WhatsApp Updates", desc: "Receive WhatsApp messages" },
              { key: "interviewReminders", icon: "🔔", label: "Interview Reminders", desc: "Get interview reminders" },
            ].map(({ key, icon, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-red-100 transition">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{label}</p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                </div>
                <button onClick={() => set(key, !form[key])}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition flex-shrink-0 ${form[key] ? "bg-[#C1272D] border-[#C1272D]" : "border-gray-300"}`}>
                  {form[key] && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </button>
              </div>
            ))}
          </div>
        </div>
      );
      case 5: return (
        <div className="space-y-4 md:space-y-6">
          <SectionHeader icon="🎁" title="Benefits & Perks" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { key: "healthInsurance", label: "Health Insurance" },
              { key: "annualBonus", label: "Annual Bonus" },
              { key: "providentFund", label: "Provident Fund" },
              { key: "paidLeaves", label: "Paid Leaves" },
              { key: "flexibleHours", label: "Flexible Working Hours" },
              { key: "workFromHome", label: "Work From Home" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer p-4 border border-gray-100 rounded-xl hover:border-red-100 transition">
                <button onClick={() => toggleBenefit(key)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition ${form.benefits[key] ? "bg-[#C1272D] border-[#C1272D]" : "border-gray-300"}`}>
                  {form.benefits[key] && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </button>
                <span className="text-sm font-semibold text-gray-600">{label}</span>
              </label>
            ))}
          </div>
        </div>
      );
      case 6: return (
        <div className="space-y-4 md:space-y-6">
          <SectionHeader icon="🏗️" title="Company Details" />
          <div>
            <Label text="Upload Logo" />
            <input type="file" ref={fileInputRef} onChange={handleLogoChange} accept="image/*" className="hidden" />
            <div
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="border-2 border-dashed border-red-200 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center gap-2 bg-red-50/30 cursor-pointer hover:bg-red-50/50 transition relative overflow-hidden min-h-[140px]"
            >
              {form.logo ? (
                <div className="flex flex-col items-center gap-2">
                  <img src={form.logo} alt="Company Logo Preview" className="h-16 w-16 object-contain rounded-xl border bg-white shadow-xs" />
                  <p className="text-xs text-gray-500 font-medium">Click to change logo</p>
                </div>
              ) : (
                <>
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#C1272D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-[#C1272D] font-bold text-sm md:text-base">Upload Logo</p>
                  <p className="text-gray-400 text-xs md:text-sm">JPG, PNG (Max. 2MB)</p>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div><Label text="Email Address" required /><Input placeholder="your.email@example.com" value={form.email} onChange={v => set("email", v)} icon="✉️" /></div>
            <div><Label text="Phone Number" required /><Input placeholder="+1 (555) 123-4567" value={form.phone} onChange={v => set("phone", v)} icon="📞" allowOnly="digits" /></div>
          </div>
          <div className="w-full md:w-1/2">
            <Label text="Website URL" /><Input placeholder="https://www.company.com" value={form.website} onChange={v => set("website", v)} />
          </div>
          <div>
            <Label text="Company Overview" />
            <Textarea placeholder="Write a brief overview about your company — mission, culture, what you do, and why candidates should join..." value={form.companyOverview} onChange={v => set("companyOverview", v)} rows={4} />
          </div>
        </div>
      );
      case 7: return (
        <div className="space-y-4 md:space-y-6">
          <SectionHeader icon="✅" title="Review & Publish" />
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 md:p-5">
            <p className="text-sm font-bold text-green-700 mb-1">Almost there! 🎉</p>
            <p className="text-xs md:text-sm text-green-600">Review your job posting details before publishing. Once published, candidates will be able to apply.</p>
          </div>
          <div className="space-y-1">
            {[
              { label: "Job Title", value: form.jobTitle || "—" },
              { label: "Company", value: form.companyName || "—" },
              { label: "Department", value: form.department || "—" },
              { label: "Experience", value: form.minExp && form.maxExp ? `${form.minExp} - ${form.maxExp} Years` : "—" },
              { label: "Salary Range", value: form.minSalary && form.maxSalary ? `₹${form.minSalary} - ₹${form.maxSalary}` : "Not Disclosed" },
              { label: "Location", value: form.jobLocation || "—" },
              { label: "Open Positions", value: form.openPositions || "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-3.5 border-b border-gray-100 text-sm gap-4">
                <span className="font-semibold text-gray-500 min-w-[100px]">{label}</span>
                <span className="font-bold text-gray-800 text-right breakdown-all">{value}</span>
              </div>
            ))}
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>

      {/* ── Mobile left-side drawer overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(0,0,0,0.3)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile left drawer ── */}
      <div
        className={`fixed top-0 left-0 h-full z-50 md:hidden bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col`}
        style={{
          width: "72vw",
          maxWidth: "300px",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-red-50">
          <p className="text-xs font-bold text-[#C1272D] uppercase tracking-widest">Steps</p>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-100 text-[#C1272D] transition text-lg font-bold"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 px-3">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => handleStepChange(i)}
              className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-sm transition-all ${
                i === step
                  ? "bg-red-50 text-[#C1272D] font-bold border border-red-100"
                  : i < step
                  ? "text-gray-600 font-semibold hover:bg-gray-50"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold border-2 transition ${
                i < step
                  ? "bg-[#C1272D] border-[#C1272D] text-white"
                  : i === step
                  ? "bg-[#C1272D] border-[#C1272D] text-white"
                  : "border-gray-300 text-gray-400"
              }`}>
                {i < step ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate">{s.label}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>Progress</span>
            <span>{step + 1} / {STEPS.length}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C1272D] rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Main modal ── */}
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-7xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[92vh] md:max-h-[90vh]">

        <div className="hidden md:flex w-72 flex-shrink-0 bg-gray-50 border-r border-gray-100 flex-col py-8 px-5">
          <p className="text-xs font-bold text-[#C1272D] uppercase tracking-widest mb-6">Find The Right Talent Faster</p>
          <div className="flex flex-col space-y-1 flex-1">
            {STEPS.map((s, i) => (
              <button key={i}
                onClick={() => setStep(i)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all ${
                  i === step
                    ? "bg-white shadow-xs text-[#C1272D] font-bold"
                    : i < step
                    ? "text-gray-600 font-semibold hover:text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 border-2 transition ${
                  i < step ? "bg-[#C1272D] border-[#C1272D]" : i === step ? "bg-[#C1272D] border-[#C1272D]" : "border-gray-300"
                }`} />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">

          <div className="flex items-center justify-between px-4 md:px-10 py-4 md:py-5 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <button
                className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition flex-shrink-0 border border-red-100"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open steps menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="2" rx="1" fill="#C1272D"/>
                  <rect x="3" y="11" width="12" height="2" rx="1" fill="#C1272D"/>
                  <rect x="3" y="16" width="15" height="2" rx="1" fill="#C1272D"/>
                </svg>
              </button>

              <span className="md:hidden bg-red-100 text-[#C1272D] w-6 h-6 rounded-full inline-flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                {step + 1}
              </span>

              <h2 className="text-sm md:text-base font-bold text-gray-800 truncate">
                {STEPS[step].label}
              </h2>
            </div>

            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition text-xl flex-shrink-0">&times;</button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 md:px-10 py-5 md:py-7">
            {renderStep()}
          </div>

          <div className="px-4 md:px-10 py-4 md:py-5 border-t border-gray-100 flex items-center justify-between gap-2 md:gap-3 bg-gray-50/50 md:bg-transparent">
            <button onClick={onClose} disabled={loading}
              className="flex-1 border border-gray-200 text-gray-600 font-bold py-3 md:py-3.5 rounded-xl text-xs md:text-sm hover:bg-gray-50 transition disabled:opacity-50">
              Cancel
            </button>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} disabled={loading}
                className="flex-1 border border-gray-200 text-gray-600 font-bold py-3 md:py-3.5 rounded-xl text-xs md:text-sm hover:bg-gray-50 transition disabled:opacity-50">
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)}
                className="flex-1 bg-[#C1272D] hover:bg-[#a61f24] text-white font-bold py-3 md:py-3.5 rounded-xl text-xs md:text-sm transition shadow-md">
                Next
              </button>
            ) : (
              <button onClick={handleFormSubmission} disabled={loading}
                className="flex-1 bg-[#C1272D] hover:bg-[#a61f24] text-white font-bold py-3 md:py-3.5 rounded-xl text-xs md:text-sm transition shadow-md disabled:opacity-75 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : "Create Job"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}