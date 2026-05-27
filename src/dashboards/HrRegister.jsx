/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useRef, useEffect } from 'react'
import AuthPick from "../assets/authpic.png"
import Logo from "../assets/Logo.png"
import toast from 'react-hot-toast'
import useHr from '../APIs/hooks/useHr' 

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-rose-50">
      <div className="w-7 h-7 bg-rose-50 rounded-lg flex items-center justify-center text-sm">{icon}</div>
      <span className="text-xs font-bold text-[#C1272D] uppercase tracking-widest">{title}</span>
    </div>
  )
}

function ErrMsg({ field, errors }) {
  return errors[field] ? <p className="text-red-400 text-xs mt-1">{errors[field]}</p> : null
}

export default function HrRegister() {
  const [logoPreview, setLogoPreview] = useState(null)
  const [logoFileDetails, setLogoFileDetails] = useState({ base64: null, filename: '' })
  const [logoError, setLogoError] = useState('')
  const [idProof, setIdProof] = useState(null)
  const [idProofDetails, setIdProofDetails] = useState({ base64: '', filename: '' })
  const logoRef = useRef()

  // Custom Hook Initialized (submitted states removed as we direct navigate)
  const { registerHr, loading } = useHr()

  const [form, setForm] = useState({
    companyName: '', companyEmail: '', companyPhone: '', websiteUrl: '', companyLocation: '',
    fullName: '', recruiterEmail: '', recruiterPhone: '', dob: '',
    preferredLocation: '', recruiterLocation: '', gender: 'male',
    gstNumber: '', panNumber: '', businessRegNo: '',
  })

  // useEffect to populate Recruiter Name and Email from LocalStorage
  useEffect(() => {
    const storedName = localStorage.getItem('user_name') || ''
    const storedEmail = localStorage.getItem('email') || ''
    
    setForm(f => ({
      ...f,
      fullName: storedName,
      recruiterEmail: storedEmail
    }))
  }, [])

  const [errors, setErrors] = useState({})

  const handleLogoUpload = (file) => {
    if (!file) return
    if (!['image/jpeg', 'image/png'].includes(file.type)) { setLogoError('Only JPG/PNG allowed'); return }
    if (file.size > 2 * 1024 * 1024) { setLogoError('Max 2MB allowed'); return }
    setLogoError('')
    
    const reader = new FileReader()
    reader.onload = (e) => {
      setLogoPreview(e.target.result)
      const base64Str = e.target.result.split(',')[1]
      setLogoFileDetails({
        base64: base64Str,
        filename: file.name
      })
    }
    reader.readAsDataURL(file)
  }

  const handleIdProofUpload = (file) => {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { alert('Max 5MB allowed'); return }
    setIdProof(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64Str = e.target.result.split(',')[1]
      setIdProofDetails({
        base64: base64Str,
        filename: file.name
      })
    }
    reader.readAsDataURL(file)
  }

  const set = (field) => (e) => {
    let val = e.target.value
    
    if (field === 'companyEmail' || field === 'recruiterEmail') {
      if (val.length === 1 && !/[a-zA-Z]/.test(val)) return;
    }
    
    if (field === 'companyLocation' || field === 'recruiterLocation' || field === 'preferredLocation') {
      val = val.replace(/[0-9]/g, '')
    }

    if (field === 'companyName' || field === 'fullName') val = val.replace(/[0-9]/g, '')
    if (field === 'companyPhone' || field === 'recruiterPhone') val = val.replace(/\D/g, '').slice(0, 10)
    if (field === 'websiteUrl' && /^\d+$/.test(val)) return
    if (field === 'gstNumber') val = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15)
    if (field === 'panNumber') val = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
    setForm(f => ({ ...f, [field]: val }))
    setErrors(er => ({ ...er, [field]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.companyName.trim()) errs.companyName = 'Required'
    if (!form.companyEmail.trim()) errs.companyEmail = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail)) errs.companyEmail = 'Invalid email'
    if (!form.companyPhone.trim()) errs.companyPhone = 'Required'
    else if (form.companyPhone.length !== 10) errs.companyPhone = 'Must be 10 digits'
    if (form.websiteUrl && !/^https?:\/\/.+\..+/.test(form.websiteUrl)) errs.websiteUrl = 'Enter valid URL'
    if (!form.companyLocation.trim()) errs.companyLocation = 'Required'
    if (!form.fullName.trim()) errs.fullName = 'Required'
    if (!form.recruiterEmail.trim()) errs.recruiterEmail = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.recruiterEmail)) errs.recruiterEmail = 'Invalid email'
    if (!form.recruiterPhone.trim()) errs.recruiterPhone = 'Required'
    else if (form.recruiterPhone.length !== 10) errs.recruiterPhone = 'Must be 10 digits'
    if (!form.dob) errs.dob = 'Required'
    if (!form.recruiterLocation.trim()) errs.recruiterLocation = 'Required'
    if (!form.gstNumber.trim()) errs.gstNumber = 'Required'
    if (!form.businessRegNo.trim()) errs.businessRegNo = 'Required'
    
    if (!idProofDetails.base64) {
      toast.error("Please upload Company ID Proof document");
      return false;
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (validate()) {
      await registerHr(form, logoFileDetails, idProofDetails);
    } else {
      toast.error("Please fill all required fields correctly");
      setTimeout(() => {
        const el = document.querySelector('[data-haserror="true"]')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 50)
    }
  }

  const inp = (field, extra = '') => {
    const isFieldDisabled = field === 'fullName' || field === 'recruiterEmail';
    return `w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-all placeholder-gray-300 ${
      isFieldDisabled 
        ? 'bg-white border-gray-200 text-black font-medium select-none' 
        : errors[field] 
          ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100' 
          : 'border-gray-200 bg-white focus:border-[#C1272D] focus:ring-2 focus:ring-red-100'
    } ${extra}`;
  }

  const isCompanyDetailsDone = !!(form.companyName.trim() && form.companyEmail.trim() && form.companyPhone.trim() && form.companyLocation.trim())
  const isRecruiterDetailsDone = !!(form.fullName.trim() && form.recruiterEmail.trim() && form.recruiterPhone.trim() && form.dob)
  
  const isCoreDetailsDone = isCompanyDetailsDone && isRecruiterDetailsDone

  const filled = Object.values(form).filter(v => v && v.toString().trim() !== '').length
  const total = Object.keys(form).length
  const pct = Math.round((filled / total) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-4 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="mb-6 px-2">
          <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-widest uppercase">Recruitment Registration</h1>
          <p className="text-gray-400 text-sm mt-0.5">Complete Your Company Registration</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200/80 p-4 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

          {/* LEFT FORM SECTION */}
          <div className="order-1 md:order-none grid col-span-1 md:col-span-7 space-y-5 min-w-0">

            {/* Logo Upload */}
            <div
              onClick={() => logoRef.current.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleLogoUpload(e.dataTransfer.files[0]) }}
              className="border-2 border-dashed border-red-200 rounded-2xl bg-white p-6 md:p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#C1272D] hover:bg-rose-50 transition-all"
            >
              {logoPreview ? (
                <img src={logoPreview} alt="logo" className="h-16 object-contain rounded-lg" />
              ) : (
                <>
                  <svg className="w-10 h-10 text-red-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="font-bold text-[#C1272D] text-base text-center">Upload Logo</p>
                  <p className="text-gray-400 text-xs mt-1 text-center">JPG, PNG (Max. 2MB)</p>
                </>
              )}
              <input ref={logoRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={e => handleLogoUpload(e.target.files[0])} />
            </div>
            {logoError && <p className="text-red-500 text-xs -mt-3 ml-1">{logoError}</p>}

            {/* COMPANY DETAILS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
              <SectionHeader icon="🏢" title="Company Details" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-haserror={!!errors.companyName}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Company Name <span className="text-red-400">*</span></label>
                  <input className={inp('companyName')} placeholder="Enter your company name" value={form.companyName} onChange={set('companyName')} />
                  <ErrMsg field="companyName" errors={errors} />
                </div>
                <div data-haserror={!!errors.companyEmail}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email Address <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">✉</span>
                    <input className={inp('companyEmail', 'pl-7')} placeholder="your.email@example.com" value={form.companyEmail} onChange={set('companyEmail')} />
                  </div>
                  <ErrMsg field="companyEmail" errors={errors} />
                </div>
                <div data-haserror={!!errors.companyPhone}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">📞</span>
                    <input className={inp('companyPhone', 'pl-8')} placeholder="10-digit number" value={form.companyPhone} onChange={set('companyPhone')} inputMode="numeric" maxLength={10} />
                  </div>
                  <ErrMsg field="companyPhone" errors={errors} />
                </div>
                <div data-haserror={!!errors.websiteUrl}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Website URL</label>
                  <input className={inp('websiteUrl')} placeholder="https://www.company.com" value={form.websiteUrl} onChange={set('websiteUrl')} />
                  <ErrMsg field="websiteUrl" errors={errors} />
                </div>
                <div className="col-span-1 sm:col-span-2" data-haserror={!!errors.companyLocation}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Current Location <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">📍</span>
                    <input className={inp('companyLocation', 'pl-8')} placeholder="City, State" value={form.companyLocation} onChange={set('companyLocation')} />
                  </div>
                  <ErrMsg field="companyLocation" errors={errors} />
                </div>
              </div>
            </div>

            {/* RECRUITER DETAILS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
              <SectionHeader icon="👤" title="Recruiter Details" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-haserror={!!errors.fullName}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                  <input className={inp('fullName')} placeholder="Enter your full name" value={form.fullName} onChange={set('fullName')} disabled />
                  <ErrMsg field="fullName" errors={errors} />
                </div>
                <div data-haserror={!!errors.recruiterEmail}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email Address <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">✉</span>
                    <input className={inp('recruiterEmail', 'pl-7')} placeholder="your.email@example.com" value={form.recruiterEmail} onChange={set('recruiterEmail')} disabled />
                  </div>
                  <ErrMsg field="recruiterEmail" errors={errors} />
                </div>
                <div data-haserror={!!errors.recruiterPhone}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">📞</span>
                    <input className={inp('recruiterPhone', 'pl-8')} placeholder="10-digit number" value={form.recruiterPhone} onChange={set('recruiterPhone')} inputMode="numeric" maxLength={10} />
                  </div>
                  <ErrMsg field="recruiterPhone" errors={errors} />
                </div>
                <div data-haserror={!!errors.dob}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Date of Birth <span className="text-red-400">*</span></label>
                  <input type="date" className={inp('dob')} value={form.dob} onChange={set('dob')} max={new Date().toISOString().split('T')[0]} />
                  <ErrMsg field="dob" errors={errors} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Preferred Location</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">📍</span>
                    <input className={inp('preferredLocation', 'pl-8')} placeholder="City, State or Remote" value={form.preferredLocation} onChange={set('preferredLocation')} />
                  </div>
                </div>
                <div data-haserror={!!errors.recruiterLocation}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Current Location <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">📍</span>
                    <input className={inp('recruiterLocation', 'pl-8')} placeholder="City, State" value={form.recruiterLocation} onChange={set('recruiterLocation')} />
                  </div>
                  <ErrMsg field="recruiterLocation" errors={errors} />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-2">Gender <span className="text-red-400">*</span></label>
                  <div className="flex flex-wrap gap-4 sm:gap-6">
                    {['male', 'female', 'other'].map(g => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" value={g} checked={form.gender === g}
                          onChange={() => setForm(f => ({ ...f, gender: g }))}
                          className="w-4 h-4 accent-[#C1272D]" />
                        <span className="text-sm text-gray-600 capitalize">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* VERIFICATION */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
              <SectionHeader icon="🛡️" title="Verification" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-haserror={!!errors.gstNumber}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">GST Number <span className="text-red-400">*</span></label>
                  <input className={inp('gstNumber')} placeholder="Enter GST Number" value={form.gstNumber} onChange={set('gstNumber')} maxLength={15} />
                  <ErrMsg field="gstNumber" errors={errors} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">PAN Number</label>
                  <input className={inp('panNumber')} placeholder="Enter PAN Number" value={form.panNumber} onChange={set('panNumber')} maxLength={10} />
                </div>
                <div className="col-span-1 sm:col-span-2" data-haserror={!!errors.businessRegNo}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Business Registration No. <span className="text-red-400">*</span></label>
                  <input className={inp('businessRegNo')} placeholder="Enter Business Registration No." value={form.businessRegNo} onChange={set('businessRegNo')} />
                  <ErrMsg field="businessRegNo" errors={errors} />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Company ID Proof <span className="text-red-400">*</span></label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex-1 px-3 py-2.5 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span className="text-sm text-gray-400 truncate">
                        {idProof ? idProof.name : 'Upload Document (PDF, JPG, PNG - Max. 5MB)'}
                      </span>
                    </div>
                    <label className="bg-[#C1272D] hover:bg-[#a61f24] text-white text-sm font-semibold px-4 py-2.5 cursor-pointer transition-colors whitespace-nowrap text-center">
                      {loading ? 'Processing...' : 'select file'}
                      <input type="file" accept=".pdf,image/jpeg,image/png" className="hidden" disabled={loading}
                        onChange={e => handleIdProofUpload(e.target.files[0])} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SUBMIT BAR */}
            <div className={`border rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between transition-all duration-300 ${
              isCoreDetailsDone 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50/80 border-gray-200 opacity-70'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  isCoreDetailsDone ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className={`font-bold text-sm transition-colors duration-300 ${isCoreDetailsDone ? 'text-green-700' : 'text-gray-500'}`}>
                    {loading ? 'Submitting Registration...' : 'Almost Done!'}
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${isCoreDetailsDone ? 'text-green-600' : 'text-gray-400'}`}>
                    {isCoreDetailsDone ? 'Please review your details before submitting.' : 'Complete Details & Recruiters settings to unlock.'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!isCoreDetailsDone || loading}
                className={`w-full sm:w-auto text-center font-bold px-7 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                  isCoreDetailsDone && !loading
                    ? 'bg-[#C1272D] text-white hover:bg-[#a61f24] active:scale-95 shadow-md shadow-red-200 cursor-pointer' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                }`}
              >
                {loading ? 'Please Wait...' : 'Review & Submit'}
              </button>
            </div>

          </div>

          {/* RIGHT SIDEBAR SECTION */}
          <div className="order-2 md:order-none grid col-span-1 md:col-span-5 md:sticky md:top-8 space-y-4 w-full">

            {/* Brand Card */}
            <div 
              style={{ background: 'linear-gradient(180deg, #FFEFEF 0%, #FFFFFF 100%)' }} 
              className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 flex flex-col items-center"
            >
              <div className="w-full flex justify-start mb-6">
                <img src={Logo} alt="Kalibre Logo" className="h-9 object-contain" />
              </div>
              
              <div className="flex items-center justify-center pt-2 w-full">
                <img src={AuthPick} alt="HR illustration" className="w-full max-h-60 md:max-h-80 object-contain" />
              </div>
            </div>

            {/* Profile Completion Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="font-bold text-gray-700 text-sm mb-3">Profile Completion</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-red-400 to-[#C1272D] rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">{pct}% Completed</p>
            </div>

            {/* Steps checklist Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              {[
                { label: 'Company Details', done: isCompanyDetailsDone },
                { label: 'Recruiter Details', done: isRecruiterDetailsDone },
                { label: 'Verification', done: !!(form.gstNumber && form.businessRegNo) },
                { label: 'Review & Submit', done: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${s.done ? 'bg-[#C1272D] shadow-sm shadow-red-200' : 'bg-gray-200'}`} />
                  <span className={`text-xs font-semibold transition-colors ${s.done ? 'text-gray-800' : 'text-gray-400'}`}>{s.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}