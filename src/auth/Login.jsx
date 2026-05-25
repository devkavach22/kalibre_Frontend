import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthPick from "../assets/authpic.png"
import Logo from "../assets/Logo.png"
import useAuth from "../APIs/hooks/useAuth"

function Login() {
  const { login, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('candidate');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const tabs = [
    { id: 'candidate', label: 'Candidate' },
    { id: 'employer', label: 'Employer' },
    { id: 'recruiter', label: 'Recruiter' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Yahan activeTab ko role ke roop me send kiya gaya hai
    login({ email: formData.email, password: formData.password, role: activeTab });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-8 sm:py-10"
      style={{ background: 'linear-gradient(151.25deg, #ffffff 0.64%, #FFE3E4 99.36%)' }}
    >
      <div
        className="w-full max-w-[1100px] flex flex-col lg:flex-row overflow-hidden"
        style={{
          borderRadius: '40px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
        }}
      >
        {/* Left - hidden on mobile, visible on lg+ */}
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
            to="/register"
            className="flex items-center justify-center py-3.5 rounded-full text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg"
            style={{
              background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)',
              minWidth: '200px',
              width: '65%',
              maxWidth: '280px',
            }}
          >
            Sign Up
          </Link>
          <img
            src={AuthPick}
            alt="Team Illustration"
            className="w-full max-w-sm object-contain mt-4"
          />
        </div>

        {/* Right - Form */}
        <div className="w-full lg:w-1/2 flex flex-col px-6 sm:px-10 md:px-12 py-8 sm:py-10 md:py-12 bg-white">
          {/* Logo */}
          <div className="mb-6 sm:mb-8">
            <img src={Logo} alt="Kalibre Logo" className="h-10 sm:h-12 object-contain" />
          </div>

          {/* Heading */}
          <h2 className="text-[#111111] font-bold text-2xl sm:text-3xl mb-1">Welcome Back</h2>
          <p className="text-[#666666] text-sm mb-6 sm:mb-8">Sign In To Your Account To Continue</p>

          {/* Tabs */}
          <div className="flex mb-6 sm:mb-8 bg-[#FFF0F0] p-1 rounded-full w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap text-center"
                style={
                  activeTab === tab.id
                    ? {
                        background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)',
                        color: '#ffffff',
                      }
                    : {
                        background: 'transparent',
                        color: '#888888',
                      }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4 sm:gap-5">

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
              <div className="flex items-center justify-between">
                <label className="text-[#111111] text-sm font-medium">Password</label>
                <Link
                  to="/forget-password"
                  className="text-[#C8102E] text-sm font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
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

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg mt-6 sm:mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)' }}
            >
              {loading ? "Please Wait..." : "Sign In"}
            </button>

            {/* Register Link */}
            <p className="text-center text-[#444444] text-sm mt-6 sm:mt-10">
              Don't Have An Account?{' '}
              <Link to="/register" className="text-[#C8102E] font-semibold hover:underline">
                Create Account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;