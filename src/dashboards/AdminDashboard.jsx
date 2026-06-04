import React, { useState } from 'react';
import { useAdminDashboard } from '../APIs/hooks/useAdmin';
import DashboardNavbar from '../dashboards/DashboardNavbar';

function AdminDashboard() {
    const [companyName, setCompanyName] = useState('');
    const [recruiterName, setRecruiterName] = useState('');

    const { companies, recruiters, loading, error } = useAdminDashboard();

    return (
        <div
            className="min-h-screen p-6 md:p-10 font-sans antialiased"
            style={{ background: 'linear-gradient(271.64deg, #FFE8E8 0%, #FFF5F5 99.92%)' }}
        >
            {/* Dashboard Main Container Wrapper */}
            <div className="max-w-full mx-auto bg-white rounded-3xl border border-rose-100/40 shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden">
                
                {/* --- Integrated Dashboard Navbar --- */}
                <DashboardNavbar />

                {/* --- Top Header Branding Banner --- */}
                <div className="p-8 md:p-12 border-b border-rose-100/40 bg-white/60 backdrop-blur-sm">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Build & Manage Your Hiring Network
                    </h1>
                    <p className="mt-2 text-sm md:text-base text-slate-500 font-medium tracking-wide">
                        Create and manage company accounts, assign HR representatives, oversee recruiter access, and streamline hiring workflows while maintaining complete control over your recruitment ecosystem. Efficiently manage company information, HR assignments, recruiter profiles, and access permissions.
                    </p>
                </div>

                {/* --- Workspace Layout Split --- */}
                <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white">

                    {/* Left Column: Premium Company Cards (7 Columns) */}
                    <div className="lg:col-span-7 space-y-4">
                        <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 px-1">Registered Companies</h2>

                        {loading && <p className="text-sm text-slate-500 p-4">Loading companies data...</p>}
                        {error && <p className="text-sm text-red-500 p-4">Error loading data: {error}</p>}

                        {!loading && !error && companies.length === 0 && (
                            <p className="text-sm text-slate-400 p-4">No companies found.</p>
                        )}

                        {!loading && !error && companies.map((company) => (
                            <div
                                key={company.id}
                                className="group bg-white rounded-xl p-5 border border-slate-200/80 hover:border-red-200 shadow-sm hover:shadow-[0_8px_20px_rgba(220,38,38,0.04)] transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 flex items-center justify-center font-bold text-slate-700 tracking-wider group-hover:from-red-50 group-hover:to-rose-100 group-hover:text-red-600 transition-all duration-300 shrink-0">
                                            {company.company_name ? company.company_name.substring(0, 2).toUpperCase() : 'CO'}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-base font-bold text-slate-800 tracking-tight leading-none group-hover:text-red-600 transition-colors">
                                                {company.company_name}
                                            </h3>
                                            {/* Changed text-xs to text-sm and text-slate-500 to text-slate-600 for high-visibility legibility */}
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-slate-600 font-semibold pt-0.5">
                                                <span className="flex items-center gap-1.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
                                                    {company.email}
                                                </span>
                                                <span className="hidden sm:inline text-slate-300">|</span>
                                                <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    {company.location || "No location listed"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-slate-300 group-hover:text-red-400 transform group-hover:translate-x-1 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Clean HR Directory & Form (5 Columns) */}
                    <div className="lg:col-span-5 space-y-6">

                        <div className="space-y-4">
                            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 px-1">
                                Active Recruiters
                            </h2>

                            <div className="space-y-3">
                                {loading && <p className="text-sm text-slate-500 py-2">Loading recruiters...</p>}

                                {!loading && !error && recruiters.length === 0 && (
                                    <p className="text-sm text-slate-400 py-2">No recruiters found.</p>
                                )}

                                {!loading && !error && recruiters.map((hr) => (
                                    <div
                                        key={hr.id}
                                        className="group bg-white rounded-xl p-4 border border-slate-200/80 hover:border-red-200 shadow-sm hover:shadow-[0_8px_20px_rgba(220,38,38,0.04)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4"
                                    >
                                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 flex items-center justify-center font-bold text-xs text-slate-600 group-hover:from-red-50 group-hover:to-rose-100 group-hover:text-red-600 transition-all duration-300 shrink-0">
                                            {hr.name ? hr.name.split(' ').filter(Boolean).map(n => n[0]).join('') : 'HR'}
                                        </div>

                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-red-600 transition-colors">
                                                {hr.name}
                                            </h4>
                                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {hr.email}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="rounded-xl p-6 border border-rose-100 shadow-sm space-y-4"
                            style={{ background: 'linear-gradient(180deg, #FFF5F5 0%, #FFE8E8 100%)' }}
                        >
                            <h3 className="text-sm font-bold text-slate-800 mb-1 px-0.5">Assign New Recruiter</h3>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full bg-white px-4 py-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 shadow-sm transition-all"
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Recruiter Name"
                                    value={recruiterName}
                                    onChange={(e) => setRecruiterName(e.target.value)}
                                    className="w-full bg-white px-4 py-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 shadow-sm transition-all"
                                />
                            </div>

                            <button className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 tracking-wide text-sm mt-2">
                                Assign Recruiter to Company
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;