import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import AuthPick from "../assets/authpic.png"
import Logo from "../assets/Logo.png"
import useResume from "../APIs/hooks/useResume"

const CandidateRegistration = () => {
  const { parseResume, registerCandidate, loading, submitLoading } = useResume()
  const navigate = useNavigate()

  const [gender, setGender] = useState('Male')
  const [skills, setSkills] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const [latestCvFile, setLatestCvFile] = useState(null)
  const [isCvDragging, setIsCvDragging] = useState(false)
  const latestCvRef = useRef(null)

  const [formData, setFormData] = useState({
    fullName: localStorage.getItem("user_name") || '',   // ✅ FIX: localStorage se
    email: localStorage.getItem("email") || '',           // ✅ FIX: localStorage se
    phone: '',
    dob: '',
    preferredLocation: '',
    currentLocation: '',
    totalExperience: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
  })

  const [education, setEducation] = useState([])
  const [experience, setExperience] = useState([])

  const [showEduModal, setShowEduModal] = useState(false)
  const [showExpModal, setShowExpModal] = useState(false)
  const [editingEdu, setEditingEdu] = useState(null)
  const [editingExp, setEditingExp] = useState(null)

  const [eduForm, setEduForm] = useState({
    degree: '', institute: '', years: '', type: 'Full Time', level: '',
    course: '', specialization: '', board: ''
  })
  const [expForm, setExpForm] = useState({ title: '', company: '', period: '', type: 'Full Time', skills: '' })

  const allSections = ['Personal Information', 'Professional Details', 'Work Experience', 'Education', 'Key Skills']

  const completedSections = []
  if (formData.fullName && formData.email && formData.phone && formData.currentLocation) completedSections.push('Personal Information')
  if (formData.totalExperience && formData.currentCTC && formData.expectedCTC && formData.noticePeriod) completedSections.push('Professional Details')
  if (experience.length > 0) completedSections.push('Work Experience')
  if (education.length > 0) completedSections.push('Education')
  if (skills) completedSections.push('Key Skills')

  const completionPercent = Math.round((completedSections.length / allSections.length) * 100)

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileUpload = async (file) => {
    if (!file) return
    setResumeFile(file)

    const data = await parseResume(file)
    if (!data) return

    const p = data.parsed_data

    setFormData({
      fullName: localStorage.getItem("user_name") || p.full_name || '',   // ✅ FIX: localStorage priority
      email: localStorage.getItem("email") || p.contact_info?.email || '', // ✅ FIX: localStorage priority
      phone: p.contact_info?.phone || '',
      dob: p.date_of_birth || '',
      preferredLocation: p.preferred_city || p.preferred_work_locations?.[0] || '',
      currentLocation: p.current_city || p.contact_info?.location || '',
      totalExperience: p.total_experience || '',
      currentCTC: p.current_ctc || '',
      expectedCTC: p.expected_ctc || '',
      noticePeriod: p.notice_period || '',
    })

    if (p.gender) setGender(p.gender)

    if (p.skills?.hard_skills?.length > 0) {
      setSkills(p.skills.hard_skills.join(', '))
    }

    if (p.education?.length > 0) {
      setEducation(p.education.map((edu, i) => ({
        id: Date.now() + i,
        degree: edu.field_of_study || edu.education_level || '',
        institute: edu.institution || '',
        years: edu.passing_year || '',
        type: 'Full Time',
        level: edu.education_level || '',
        course: edu.course || '',
        specialization: edu.specialization || '',
        board: edu.board || '',
      })))
    }

    if (p.experience?.length > 0) {
      setExperience(p.experience.map((exp, i) => ({
        id: Date.now() + i + 100,
        title: exp.job_title || p.current_designation || '',
        company: exp.company || '',
        period: exp.start_date && exp.end_date ? `${exp.start_date} – ${exp.end_date}` : exp.duration || '',
        type: exp.employment_type || 'Full Time',
        skills: exp.technologies?.join(', ') || '',
      })))
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) handleFileUpload(file)
  }

  const openAddEdu = () => {
    setEditingEdu(null)
    setEduForm({ degree: '', institute: '', years: '', type: 'Full Time', level: '', course: '', specialization: '', board: '' })
    setShowEduModal(true)
  }

  const openEditEdu = (edu) => {
    setEditingEdu(edu.id)
    setEduForm({
      degree: edu.degree, institute: edu.institute, years: edu.years,
      type: edu.type, level: edu.level,
      course: edu.course || '', specialization: edu.specialization || '', board: edu.board || ''
    })
    setShowEduModal(true)
  }

  const saveEdu = () => {
    if (editingEdu) {
      setEducation(education.map(e => e.id === editingEdu ? { ...e, ...eduForm } : e))
    } else {
      setEducation([...education, { id: Date.now(), ...eduForm }])
    }
    setShowEduModal(false)
  }

  const openAddExp = () => {
    setEditingExp(null)
    setExpForm({ title: '', company: '', period: '', type: 'Full Time', skills: '' })
    setShowExpModal(true)
  }

  const openEditExp = (exp) => {
    setEditingExp(exp.id)
    setExpForm({ title: exp.title, company: exp.company, period: exp.period, type: exp.type, skills: exp.skills })
    setShowExpModal(true)
  }

  const saveExp = () => {
    if (editingExp) {
      setExperience(experience.map(e => e.id === editingExp ? { ...e, ...expForm } : e))
    } else {
      setExperience([...experience, { id: Date.now(), ...expForm }])
    }
    setShowExpModal(false)
  }

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.currentLocation) {
      toast.error("Please fill all required personal details!")
      return
    }
    if (!formData.totalExperience) {
      toast.error("Please fill total experience!")
      return
    }
    
    await registerCandidate({ formData, gender, skills, education, experience, resumeFile })
  }

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#333] placeholder-gray-400 outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/20 transition-all duration-200 bg-white"
  const inputDisabledClass = "w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#333] placeholder-gray-400 outline-none bg-gray-100 cursor-not-allowed"
  const labelClass = "block text-sm font-medium text-[#333] mb-1"

  return (
    <div className="min-h-screen py-6 px-4" style={{ background: 'linear-gradient(151.25deg, #ffffff 0.64%, #FFE3E4 99.36%)' }}>
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-[#111] font-bold text-xl sm:text-2xl">New Candidate Registration</h1>
          <p className="text-[#777] text-xs sm:text-sm mt-1">Add New Employee Details In The System</p>
        </div>

        {/* Resume Builder Banner */}
        <div className="rounded-2xl px-5 py-4 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #ffe4e4 100%)', border: '1px solid #ffd0d0' }}>
          <div>
            <h3 className="text-[#C8102E] font-bold text-base">Don't Have A Resume?</h3>
            <p className="text-[#555] text-xs sm:text-sm mt-0.5">Use The Resume Builder To Manually Create A Professional Resume<br className="hidden sm:inline" />And Populate Your Profile.</p>
          </div>
          <button className="w-full sm:w-auto text-center text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90 whitespace-nowrap sm:ml-4" style={{ background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)' }}>
            Resume Builder
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* Main Form */}
          <div className="w-full flex-1 min-w-0 flex flex-col gap-5">

            {/* Upload Resume */}
            <div
              className={`rounded-2xl border-2 border-dashed p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 bg-white ${isDragging ? 'border-[#C8102E] bg-[#fff5f5]' : 'border-gray-200 hover:border-[#C8102E]/40'}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => !loading && fileInputRef.current?.click()}
            >
              <input type="file" ref={fileInputRef} accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#fff0f0' }}>
                {loading ? (
                  <svg className="w-6 h-6 text-[#C8102E] animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-[#C8102E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )}
              </div>
              <p className="text-[#C8102E] font-semibold text-base break-all px-2">
                {loading ? 'Parsing Resume...' : resumeFile ? resumeFile.name : 'Upload Resume'}
              </p>
              <p className="text-[#888] text-xs sm:text-sm mt-1 max-w-md mx-auto">
                {loading ? 'Please wait while we auto-fill your details.' : resumeFile ? 'Click to change file' : 'Upload Your Resume To Auto-Fill All Profile Details.'}
              </p>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#fff0f0' }}>
                  <svg className="w-4 h-4 text-[#C8102E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-[#111] text-base">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name <span className="text-[#C8102E]">*</span></label>
                  {/* ✅ FIX: disabled */}
                  <input type="text" name="fullName" value={formData.fullName} disabled className={inputDisabledClass} />
                </div>
                <div>
                  <label className={labelClass}>Email Address <span className="text-[#C8102E]">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </span>
                    {/* ✅ FIX: disabled */}
                    <input type="email" name="email" value={formData.email} disabled className={inputDisabledClass + " pl-9"} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Phone Number <span className="text-[#C8102E]">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </span>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="+1 (555) 123-4567" className={inputClass + " pl-9"} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Date of Birth <span className="text-[#C8102E]">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </span>
                    <input type="date" name="dob" value={formData.dob} onChange={handleFormChange} className={inputClass + " pl-9"} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Preferred Location</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </span>
                    <input type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleFormChange} placeholder="City, State or Remote" className={inputClass + " pl-9"} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Current Location <span className="text-[#C8102E]">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </span>
                    <input type="text" name="currentLocation" value={formData.currentLocation} onChange={handleFormChange} placeholder="City, State" className={inputClass + " pl-9"} />
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div className="mt-4">
                <label className={labelClass}>Gender <span className="text-[#C8102E]">*</span></label>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1">
                  {['Male', 'Female', 'Other'].map(g => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                        style={{ borderColor: gender === g ? '#C8102E' : '#ccc' }}
                        onClick={() => setGender(g)}
                      >
                        {gender === g && <div className="w-2 h-2 rounded-full bg-[#C8102E]" />}
                      </div>
                      <span className="text-sm text-[#333]">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#fff0f0' }}>
                  <svg className="w-4 h-4 text-[#C8102E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-[#111] text-base">Professional Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Total Experience (Years) <span className="text-[#C8102E]">*</span></label>
                  <input type="text" name="totalExperience" value={formData.totalExperience} onChange={handleFormChange} placeholder="e.g. 3 years" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Current CTC (Annual) <span className="text-[#C8102E]">*</span></label>
                  <input type="text" name="currentCTC" value={formData.currentCTC} onChange={handleFormChange} placeholder="e.g. 5,00,000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Expected CTC (Annual) <span className="text-[#C8102E]">*</span></label>
                  <input type="text" name="expectedCTC" value={formData.expectedCTC} onChange={handleFormChange} placeholder="e.g. 8,00,000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Notice Period (Days) <span className="text-[#C8102E]">*</span></label>
                  <input type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleFormChange} placeholder="e.g. 30" className={inputClass} />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#fff0f0' }}>
                    <svg className="w-4 h-4 text-[#C8102E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                  </div>
                  <h2 className="font-semibold text-[#111] text-base">Education</h2>
                </div>
                <button onClick={openAddEdu} className="w-full sm:w-auto text-center text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90" style={{ background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)' }}>
                  + Add Education
                </button>
              </div>
              <div className="flex flex-col gap-0">
                {education.length === 0 ? (
                  <p className="text-[#aaa] text-sm text-center py-4">No education added yet. Upload resume or add manually.</p>
                ) : (
                  education.map((edu, i) => (
                    <div key={edu.id}>
                      <div className="py-3 flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[#C8102E] font-semibold text-sm break-words">{edu.degree || '—'}</span>
                            <button onClick={() => openEditEdu(edu)} className="text-gray-400 hover:text-[#C8102E] transition-colors flex-shrink-0">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                          </div>
                          <p className="text-[#555] text-xs mt-0.5 break-words">{edu.institute}</p>
                          {edu.course && <p className="text-[#666] text-xs mt-0.5 break-words">Course: {edu.course}</p>}
                          {edu.specialization && <p className="text-[#666] text-xs mt-0.5 break-words">Specialization: {edu.specialization}</p>}
                          {edu.board && <p className="text-[#666] text-xs mt-0.5 break-words">Board: {edu.board}</p>}
                          <p className="text-[#888] text-xs mt-0.5">{edu.years} {edu.years && '|'} {edu.type}</p>
                          {edu.level && <span className="inline-block mt-1.5 text-xs px-3 py-0.5 rounded-full bg-gray-100 text-[#555] max-w-full truncate">{edu.level}</span>}
                        </div>
                      </div>
                      {i < education.length - 1 && <div className="border-t border-gray-100" />}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#fff0f0' }}>
                    <svg className="w-4 h-4 text-[#C8102E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="font-semibold text-[#111] text-base">Work Experience</h2>
                </div>
                <button onClick={openAddExp} className="w-full sm:w-auto text-center text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90" style={{ background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)' }}>
                  + Add Experience
                </button>
              </div>
              <div className="flex flex-col gap-0">
                {experience.length === 0 ? (
                  <p className="text-[#aaa] text-sm text-center py-4">No experience added yet. Upload resume or add manually.</p>
                ) : (
                  experience.map((exp, i) => (
                    <div key={exp.id}>
                      <div className="py-3 flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[#C8102E] font-semibold text-sm break-words">{exp.title || '—'}</span>
                            <button onClick={() => openEditExp(exp)} className="text-gray-400 hover:text-[#C8102E] transition-colors flex-shrink-0">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                          </div>
                          <p className="text-[#555] text-xs mt-0.5 break-words">{exp.company}</p>
                          <p className="text-[#888] text-xs mt-0.5">{exp.period} {exp.period && '|'} {exp.type}</p>
                          {exp.skills && <p className="text-[#888] text-xs mt-0.5 break-words">Primary Skills: {exp.skills}</p>}
                        </div>
                      </div>
                      {i < experience.length - 1 && <div className="border-t border-gray-100" />}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Key Skills */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#fff0f0' }}>
                  <svg className="w-4 h-4 text-[#C8102E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-[#111] text-base">Key Skills</h2>
              </div>
              <label className={labelClass}>Skills (comma-separated) <span className="text-[#C8102E]">*</span></label>
              <textarea
                rows={3}
                placeholder="e.g., React, TypeScript, Node.js, Python, AWS, Docker, Kubernetes"
                value={skills}
                onChange={e => setSkills(e.target.value)}
                className={inputClass + " resize-none"}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pb-6">
              <button
                onClick={() => navigate(-1)}
                className="w-full sm:flex-1 py-3 rounded-xl border-2 border-[#C8102E] text-[#C8102E] font-semibold text-sm transition-all hover:bg-[#fff0f0]"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitLoading}
                className="w-full sm:flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)' }}
              >
                {submitLoading ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-4 lg:sticky lg:top-6">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col items-center">
              <img src={Logo} alt="Kalibre" className="h-10 object-contain mb-3" />
              <img src={AuthPick} alt="Illustration" className="w-48 sm:w-64 lg:w-full object-contain" />
            </div>

            {/* Profile Completion */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <h3 className="font-semibold text-[#111] text-sm mb-3">Profile Completion</h3>
              <div className="w-full h-2 rounded-full bg-gray-100 mb-2">
                <div className="h-2 rounded-full bg-green-500 transition-all duration-500" style={{ width: `${completionPercent}%` }} />
              </div>
              <p className="text-xs text-[#777]">{completionPercent}% Completed</p>
            </div>

            {/* Section Status */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="flex flex-col gap-2.5">
                {allSections.map(section => (
                  <div key={section} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${completedSections.includes(section) ? 'bg-[#C8102E]' : 'bg-gray-200'}`} />
                    <span className={`text-xs ${completedSections.includes(section) ? 'text-[#333] font-medium' : 'text-[#aaa]'}`}>{section}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Modal */}
      {showEduModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl flex flex-col max-h-full">
            <h3 className="font-bold text-[#111] text-lg mb-4 flex-shrink-0">{editingEdu ? 'Edit Education' : 'Add Education'}</h3>
            <div className="flex flex-col gap-3 overflow-y-auto pr-1 py-1 style-scrollbar">
              <div>
                <label className={labelClass}>Degree / Course</label>
                <input className={inputClass} value={eduForm.degree} onChange={e => setEduForm({ ...eduForm, degree: e.target.value })} placeholder="e.g. B.Tech, MBA" />
              </div>
              <div>
                <label className={labelClass}>Institute</label>
                <input className={inputClass} value={eduForm.institute} onChange={e => setEduForm({ ...eduForm, institute: e.target.value })} placeholder="Institute name, City" />
              </div>
              <div>
                <label className={labelClass}>Course</label>
                <input className={inputClass} value={eduForm.course} onChange={e => setEduForm({ ...eduForm, course: e.target.value })} placeholder="e.g. Computer Science" />
              </div>
              <div>
                <label className={labelClass}>Specialization</label>
                <input className={inputClass} value={eduForm.specialization} onChange={e => setEduForm({ ...eduForm, specialization: e.target.value })} placeholder="e.g. Software Engineering" />
              </div>
              <div>
                <label className={labelClass}>Board / University</label>
                <input className={inputClass} value={eduForm.board} onChange={e => setEduForm({ ...eduForm, board: e.target.value })} placeholder="e.g. Maharashtra" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Years</label>
                  <input className={inputClass} value={eduForm.years} onChange={e => setEduForm({ ...eduForm, years: e.target.value })} placeholder="2020-2024" />
                </div>
                <div>
                  <label className={labelClass}>Type</label>
                  <select className={inputClass} value={eduForm.type} onChange={e => setEduForm({ ...eduForm, type: e.target.value })}>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Distance</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Level</label>
                <input className={inputClass} value={eduForm.level} onChange={e => setEduForm({ ...eduForm, level: e.target.value })} placeholder="e.g. Primary Doctorate" />
              </div>
            </div>
            <div className="flex gap-3 mt-5 pt-2 border-t border-gray-100 flex-shrink-0">
              <button onClick={() => setShowEduModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-[#555] hover:bg-gray-50 transition-all">Cancel</button>
              <button onClick={saveEdu} className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all" style={{ background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)' }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {showExpModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl flex flex-col max-h-full">
            <h3 className="font-bold text-[#111] text-lg mb-4 flex-shrink-0">{editingExp ? 'Edit Experience' : 'Add Experience'}</h3>
            <div className="flex flex-col gap-3 overflow-y-auto pr-1 py-1 style-scrollbar">
              <div>
                <label className={labelClass}>Job Title</label>
                <input className={inputClass} value={expForm.title} onChange={e => setExpForm({ ...expForm, title: e.target.value })} placeholder="e.g. Senior Software Engineer" />
              </div>
              <div>
                <label className={labelClass}>Company & Location</label>
                <input className={inputClass} value={expForm.company} onChange={e => setExpForm({ ...expForm, company: e.target.value })} placeholder="Company Pvt. Ltd. City, State" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Period</label>
                  <input className={inputClass} value={expForm.period} onChange={e => setExpForm({ ...expForm, period: e.target.value })} placeholder="Jan 2020 – Present" />
                </div>
                <div>
                  <label className={labelClass}>Type</label>
                  <select className={inputClass} value={expForm.type} onChange={e => setExpForm({ ...expForm, type: e.target.value })}>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Primary Skills</label>
                <input className={inputClass} value={expForm.skills} onChange={e => setExpForm({ ...expForm, skills: e.target.value })} placeholder="React.Js, Node.Js, TypeScript" />
              </div>
            </div>
            <div className="flex gap-3 mt-5 pt-2 border-t border-gray-100 flex-shrink-0">
              <button onClick={() => setShowExpModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-[#555] hover:bg-gray-50 transition-all">Cancel</button>
              <button onClick={saveExp} className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all" style={{ background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CandidateRegistration