import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import AuthPick from "../assets/authpic.png"
import Logo from "../assets/Logo.png"
import useAuth from '../APIs/hooks/useAuth'

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);

function ForgetPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const otpRefs = useRef([]);

    const { forgotPassword, resetPassword, loading } = useAuth();

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        pasted.split('').forEach((char, i) => { newOtp[i] = char; });
        setOtp(newOtp);
        otpRefs.current[Math.min(pasted.length, 5)]?.focus();
    };


    const handleSendOtp = async () => {
        if (!email.trim()) {
            return;
        }
        const success = await forgotPassword(email.trim());
        if (success) setStep(2);
    };

    const handleResendOtp = async () => {
        setOtp(['', '', '', '', '', '']);
        await forgotPassword(email.trim());
    };

    const handleVerifyOtp = () => {
        const otpValue = otp.join('');
        if (otpValue.length < 6) return;
        setStep(3);
    };

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) return;
        if (newPassword !== confirmPassword) {

            return;
        }
        const otpValue = otp.join('');
        await resetPassword({
            email,
            otp: otpValue,
            new_password: newPassword,
            confirm_password: confirmPassword,
        });
    };

    const btnStyle = {
        background: 'linear-gradient(92.62deg, #FA2329 0.91%, #B10D1C 99.09%)',
        borderRadius: '50px',
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
                        className="flex items-center justify-center py-3.5 text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                        style={{ ...btnStyle, minWidth: '200px', width: '65%', maxWidth: '280px' }}
                    >
                        Sign Up
                    </Link>
                    <img src={AuthPick} alt="Team Illustration" className="w-full max-w-sm object-contain mt-4" />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col px-6 sm:px-10 md:px-12 py-8 sm:py-10 md:py-12 bg-white">
                    <div className="mt-10 mb-6 sm:mb-8 flex justify-center">
                        <img src={Logo} alt="Kalibre Logo" className="h-10 sm:h-12 object-contain" />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">

                        {step === 1 && (
                            <div className="w-full flex flex-col gap-4 sm:gap-5">
                                <h2 className="text-[#111111] font-bold text-2xl sm:text-3xl mb-1">
                                    Forgot Your Password?
                                </h2>
                                <p className="text-neutral-600 text-sm mb-4">
                                    Don't worry! It happens. Just enter the email address associated with your account and we'll send you an OTP to help you reset your password quickly and securely.
                                </p>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[#111111] text-sm font-medium">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Enter Your Registered Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white"
                                    />
                                </div>

                                <button
                                    onClick={handleSendOtp}
                                    disabled={loading || !email.trim()}
                                    className="w-full py-3.5 text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={btnStyle}
                                >
                                    {loading ? 'Sending...' : 'Send OTP'}
                                </button>

                                <p className="text-center text-[#444444] text-sm mt-2">
                                    Remember Your Password?{' '}
                                    <Link to="/login" className="text-[#C8102E] font-semibold hover:underline">Sign In</Link>
                                </p>
                            </div>
                        )}

                        {/* ── Step 2 – OTP ───────────────────────────────────── */}
                        {step === 2 && (
                            <div className="w-full flex flex-col gap-4 sm:gap-5">
                                <h2 className="text-[#111111] font-bold text-2xl sm:text-3xl mb-1 text-center">
                                    Verify Your Identity
                                </h2>
                                <p className="text-center text-neutral-600 text-sm">
                                    We sent a 6-digit OTP to <span className="font-semibold text-[#111111]">{email}</span>
                                </p>

                                <div className="flex gap-2 sm:gap-3 justify-center mt-4" onPaste={handleOtpPaste}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (otpRefs.current[index] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            className="w-10 h-10 sm:w-14 sm:h-14 text-center text-base sm:text-lg font-semibold border border-gray-300 rounded-lg outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white text-[#111111]"
                                        />
                                    ))}
                                </div>

                                <p className="text-center text-[#444444] text-sm mt-2">
                                    Didn't Receive The Code?{' '}
                                    <button
                                        onClick={handleResendOtp}
                                        disabled={loading}
                                        className="text-[#C8102E] font-semibold hover:underline disabled:opacity-60"
                                    >
                                        {loading ? 'Sending...' : 'Resend OTP'}
                                    </button>
                                </p>

                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={otp.join('').length < 6}
                                    className="w-full py-3.5 text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={btnStyle}
                                >
                                    Verify OTP
                                </button>

                                <p className="text-center text-[#444444] text-sm mt-2">
                                    Remember Your Password?{' '}
                                    <Link to="/login" className="text-[#C8102E] font-semibold hover:underline">Sign In</Link>
                                </p>
                            </div>
                        )}

                        {/* ── Step 3 – Reset Password ────────────────────────── */}
                        {step === 3 && (
                            <div className="w-full flex flex-col gap-4 sm:gap-5">
                                <h2 className="text-[#111111] font-bold text-2xl sm:text-3xl mb-1">
                                    Reset Your Password
                                </h2>

                                {/* New Password */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[#111111] text-sm font-medium">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter Your New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8102E] transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[#111111] text-sm font-medium">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm Your New Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#444444] placeholder-gray-400 outline-none focus:border-[#C8102E] transition-colors duration-200 bg-white pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8102E] transition-colors duration-200"
                                        >
                                            {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                                        </button>
                                    </div>
                                    {/* Client-side mismatch hint */}
                                    {confirmPassword && newPassword !== confirmPassword && (
                                        <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
                                    )}
                                </div>

                                <button
                                    onClick={handleResetPassword}
                                    disabled={
                                        loading ||
                                        !newPassword ||
                                        !confirmPassword ||
                                        newPassword !== confirmPassword
                                    }
                                    className="w-full py-3.5 text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={btnStyle}
                                >
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}

export default ForgetPassword;