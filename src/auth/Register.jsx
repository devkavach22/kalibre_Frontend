import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthPick from "../assets/authpic.png"
import Logo from "../assets/Logo.png"
import useAuth from "../APIs/hooks/useAuth"

const ROLES = ['candidate', 'employer', 'recruiter'];

function Register() {
  const { register, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [gstVerified, setGstVerified] = useState(false);
  const [gstLoading, setGstLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate',
    gstNumber: '',
    companyName: '',
    panNumber: '',
    city: '',
    state: '',
    address: '',
    workEmail: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setGstVerified(false);
  };

  const handleGstVerify = () => {
    if (!formData.gstNumber) return;
    setGstLoading(true);
    setTimeout(() => {
      setGstLoading(false);
      setGstVerified(true);
      setFormData((prev) => ({
        ...prev,
        companyName: 'Acme Corp Pvt Ltd',
        state: 'Maharashtra',
      }));
    }, 1500);
  };

  const handleSubmit = () => {
    if (!agreed) return;
    if (formData.role === 'employer') {
      register({
        role: formData.role,
        gstNumber: formData.gstNumber,
        companyName: formData.companyName,
        panNumber: formData.panNumber,
        city: formData.city,
        state: formData.state,
        address: formData.address,
        email: formData.workEmail,
        password: formData.password,
      });
    } else {
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
    }
  };

  const isEmployer = formData.role === 'employer';

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-8 sm:py-10"
      style={{ background: 'linear-gradient(151.25deg, #ffffff 0.64%, #FFE3E4 99.36%)' }}
    >
      <div
        className="w-full max-w-[1300px] flex flex-col lg:flex-row overflow-hidden"
        style={{
          borderRadius: '40px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
        }}
      >
        {/* Left - Form — always 50% */}
        <div className="w-full lg:w-1/2 flex flex-col px-6 sm:px-10 md:px-12 py-8 sm:py-10 md:py-12 bg-white">
          {!isEmployer && (
            <div className="mb-6 sm:mb-8">
              <img src={Logo} alt="Kalibre Logo" className="h-10 sm:h-12 object-contain" />
            </div>
          )}

          {isEmployer ? (
            <>
              <h2 className="text-[#111111] font-bold text-2xl sm:text-3xl mb-1">Employer Registration</h2>
              <p className="text-[#666666] text-sm mb-6 sm:mb-8">Complete Your Company Registration</p>
            </>
          ) : (
            <>
              <h2 className="text-[#111111] font-bold text-2xl sm:text-3xl mb-1">Create Your Account</h2>
              <p className="text-[#666666] text-sm mb-6 sm:mb-8">Sign Up To Get Started</p>
            </>
          )}

          {/* Role Selector — only shown for candidate / recruiter */}
          {!isEmployer && (
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              {ROLES.map((role) => {
                const isActive = formData.role === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    className="flex-1 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-200"
                    style={
                      isActive
                        ? {
                            background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)',
                            color: '#ffffff',
                            border: 'none',
                            boxShadow: '0 2px 8px rgba(200,16,46,0.25)',
                          }
                        : {
                            background: '#FFE3E4',
                            color: '#C8102E',
                            border: '1.5px solid #F5A0A5',
                          }
                    }
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-4 sm:gap-5">

            {/* ───── EMPLOYER FIELDS ───── */}
            {isEmployer ? (
              <>
                {/* Verification badge */}
                <div className="flex items-center gap-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-[#333333] font-semibold text-sm">Verification</span>
                </div>

                {/* GST Number - Stack on mobile */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#111111] text-sm font-medium">GST Number <span className="text-red-500">*</span></label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      placeholder="Enter GST Number"
                      className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleGstVerify}
                      disabled={gstLoading || !formData.gstNumber}
                      className="w-full sm:w-auto px-5 py-3 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)' }}
                    >
                      {gstLoading ? '...' : gstVerified ? '✓ Verified' : 'Verify'}
                    </button>
                  </div>
                </div>

                {/* Company Name + PAN */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[#111111] text-sm font-medium">Company Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Auto-Filled From GST"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[#111111] text-sm font-medium">PAN Number</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      placeholder="Enter PAN Number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white"
                    />
                  </div>
                </div>

                {/* City + State */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[#111111] text-sm font-medium">City <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter City"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[#111111] text-sm font-medium">State <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#111111] text-sm font-medium">Address <span className="text-red-500">*</span></label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Your Address"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white resize-none"
                  />
                </div>

                {/* Work Email + Password — single row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[#111111] text-sm font-medium">Work Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[#111111] text-sm font-medium">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Your Password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8102E] transition-colors duration-200"
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {/* Cancel + Submit - Stack on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
                  <Link
                    to="/"
                    className="w-full sm:flex-1 py-3.5 rounded-lg text-[#C8102E] font-semibold text-base text-center border border-[#C8102E] transition-all duration-300 hover:bg-[#FFE3E4]"
                  >
                    Cancel
                  </Link>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full sm:flex-1 py-3.5 rounded-lg text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)' }}
                  >
                    {loading ? 'Please Wait...' : 'Employee Register'}
                  </button>
                </div>

                <p className="text-center text-[#444444] text-sm mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#C8102E] font-semibold hover:underline">Sign In</Link>
                </p>
              </>
            ) : (
              /* ───── DEFAULT (CANDIDATE / RECRUITER) FIELDS ───── */
              <>
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#111111] text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#111111] text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Registered Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#111111] text-sm font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Your Password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8102E] transition-colors duration-200"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start sm:items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="w-4 h-4 mt-0.5 sm:mt-0 accent-[#C8102E] cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="terms" className="text-[#444444] text-sm cursor-pointer leading-relaxed">
                    I Agree To The Terms & Conditions And Privacy Policy
                  </label>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={loading || !agreed}
                  className="w-full py-3.5 rounded-lg text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg mt-6 sm:mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)' }}
                >
                  {loading ? 'Please Wait...' : 'Sign Up'}
                </button>

                <p className="text-center text-[#444444] text-sm mt-6 sm:mt-10">
                  Remember Your Password?{' '}
                  <Link to="/login" className="text-[#C8102E] font-semibold hover:underline">Sign In</Link>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right - Illustration — always 50% */}
        <div
          className="hidden lg:flex w-1/2 flex-col items-center justify-center px-12 py-12 text-center gap-6"
          style={{ background: 'linear-gradient(151.25deg, #ffffff 0.64%, #FFE3E4 99.36%)' }}
        >
          <h2 className="text-[#111111] font-bold text-4xl leading-snug">
            Architecting Elite <br />
            <span className="text-[#C8102E]">Teams.</span>
          </h2>
          <p className="text-[#555555] text-base leading-relaxed max-w-sm">
            Join Thousands Of Companies And Professionals Scaling The Future With Kalibre's Ultra-Precise Placement Engine.
          </p>
          <Link
            to="/login"
            className="flex items-center justify-center py-3.5 rounded-full text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg"
            style={{
              background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)',
              minWidth: '200px',
              width: '65%',
              maxWidth: '280px',
            }}
          >
            Sign In
          </Link>
          <img src={AuthPick} alt="Team Illustration" className="w-full max-w-sm object-contain mt-4" />
        </div>

      </div>
    </div>
  );
}

export default Register;