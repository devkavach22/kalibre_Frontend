import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useHr from '../APIs/hooks/useHr';
import DashboardNavbar from '../dashboards/DashboardNavbar';

// ─── Shared scroll-lock counter ────────────────────────────────────────────
// Multiple components (panel + modal) can call lock/unlock independently.
// Body overflow is only restored when ALL locks are released.
let scrollLockCount = 0;
function lockScroll() {
  scrollLockCount++;
  document.body.style.overflow = 'hidden';
}
function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) document.body.style.overflow = '';
}

const AVATAR_PALETTES = [
  { bg: '#E8F0FE', text: '#1a73e8' },
  { bg: '#FFF0F0', text: '#C1272D' },
  { bg: '#F0F4FF', text: '#4F46E5' },
  { bg: '#ECFDF5', text: '#059669' },
  { bg: '#FFFBEB', text: '#D97706' },
  { bg: '#F5F3FF', text: '#7C3AED' },
  { bg: '#F0FDF4', text: '#16A34A' },
  { bg: '#FFF7ED', text: '#EA580C' },
];

const CANDIDATE_PALETTES = [
  { bg: '#E8F0FE', text: '#1a73e8', border: '#c5d8fc' },
  { bg: '#FFF0F0', text: '#C1272D', border: '#fbc5c7' },
  { bg: '#F0F4FF', text: '#4F46E5', border: '#c7cbf9' },
  { bg: '#ECFDF5', text: '#059669', border: '#a7f3d0' },
  { bg: '#FFFBEB', text: '#D97706', border: '#fde68a' },
  { bg: '#F5F3FF', text: '#7C3AED', border: '#ddd6fe' },
  { bg: '#F0FDF4', text: '#16A34A', border: '#bbf7d0' },
  { bg: '#FFF7ED', text: '#EA580C', border: '#fed7aa' },
];

// ─── Candidate Detail Modal ────────────────────────────────────────────────
function CandidateModal({ candidate, onClose }) {
  const overlayRef = useRef(null);
  const [actionStatus, setActionStatus] = useState(null); // 'approved' | 'rejected' | null
  const palette = CANDIDATE_PALETTES[candidate.candidate_id % CANDIDATE_PALETTES.length];
  const initials = candidate.candidate_name
    ? candidate.candidate_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  const formatCTC = (val) => val ? `₹${(val / 100000).toFixed(1).replace(/\.0$/, '')} LPA` : 'N/A';

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="bg-white rounded-2xl w-full max-h-[92vh] flex flex-col shadow-2xl"
        style={{ animation: 'modalIn 0.22s ease', maxWidth: '820px' }}
      >
        {/* Modal Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-100 px-7 py-5 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-black text-gray-900">Candidate Profile</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-all font-bold text-xl"
          >
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <div
          className="flex-1 min-h-0 overflow-y-auto px-7 py-6 space-y-5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`.modal-body::-webkit-scrollbar { display: none; }`}</style>

          {/* ── Candidate Identity ── */}
          <div className="flex items-center gap-4">
            <div
              className="w-18 h-18 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0"
              style={{
                width: '72px', height: '72px',
                background: palette.bg, color: palette.text,
                border: `2px solid ${palette.border}`
              }}
            >
              {initials}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-gray-900">{candidate.candidate_name}</h3>
              <p className="text-[16px] text-gray-500 font-semibold mt-0.5">
                {candidate.current_designation} @ {candidate.current_company}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span
                  className="text-[13px] font-black px-3 py-1 rounded-lg"
                  style={{ background: '#FFF0F0', color: '#C1272D' }}
                >
                  {(candidate.stage_name === 'New' ? 'Applied' : candidate.stage_name) || 'Applied'}
                </span>
                <span className="text-[13px] font-black px-3 py-1 rounded-lg bg-gray-100 text-gray-600 capitalize">
                  {candidate.gender}
                </span>
              </div>
            </div>
          </div>

          {/* ── Contact Info ── */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '📧', label: 'Email', value: candidate.email },
              { icon: '📞', label: 'Phone', value: candidate.contact_no },
              { icon: '📍', label: 'Location', value: candidate.current_location },
              { icon: '🎓', label: 'Qualification', value: candidate.highest_qualification },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-[12px] font-black text-gray-400 uppercase tracking-wider mb-1">
                  {item.icon} {item.label}
                </p>
                <p className="text-[15px] font-bold text-gray-800">{item.value || 'N/A'}</p>
              </div>
            ))}
          </div>

          {/* ── Key Metrics ── */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Experience', value: `${candidate.total_experience} Yrs` },
              { label: 'Current CTC', value: formatCTC(candidate.current_ctc) },
              { label: 'Expected CTC', value: formatCTC(candidate.expected_ctc) },
              { label: 'Notice Period', value: candidate.notice_period ? `${candidate.notice_period} Days` : 'N/A' },
            ].map((m, i) => (
              <div key={i} className="rounded-xl p-4 border border-gray-100 text-center"
                style={{ background: 'linear-gradient(135deg,#FFF5F5 0%,#fff 100%)' }}>
                <p className="text-[11px] font-black text-[#C1272D] uppercase tracking-wider">{m.label}</p>
                <p className="text-lg font-black text-gray-900 mt-1">{m.value}</p>
              </div>
            ))}
          </div>

          {/* ── Applicant Notes ── */}
          {candidate.applicant_notes && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-[12px] font-black text-amber-600 uppercase tracking-wider mb-1.5">📝 Applicant Notes</p>
              <p className="text-[15px] text-amber-800 font-medium leading-relaxed">{candidate.applicant_notes}</p>
            </div>
          )}

          {/* ── Screening Q&A ── */}
          {Array.isArray(candidate.screening_answers) && candidate.screening_answers.length > 0 && (
            <div>
              <h4 className="text-[13px] font-black uppercase tracking-wider text-gray-400 mb-3">
                🧠 Screening Answers ({candidate.screening_answers.length})
              </h4>
              <div className="space-y-3">
                {candidate.screening_answers.map((qa, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 flex items-start gap-2.5">
                      <span
                        className="text-[12px] font-black px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5"
                        style={{ background: '#FFF0F0', color: '#C1272D' }}
                      >
                        Q{i + 1}
                      </span>
                      <p className="text-[15px] font-bold text-gray-700">{qa.question}</p>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-[15px] text-gray-600 font-medium leading-relaxed">{qa.answer || '—'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Application Meta ── */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100 text-[13px] text-gray-400 font-semibold">
            <span>🆔 App ID: #{candidate.application_id}</span>
            <span>📅 Applied: {candidate.create_date}</span>
            <span>💼 Job: {candidate.job_name}</span>
          </div>
        </div>

        {/* ── Action Footer ── */}
        <div className="flex-shrink-0 border-t border-gray-100 px-7 py-4 flex items-center justify-between gap-3 bg-gray-50/60 rounded-b-2xl">
          <div className="text-[14px] font-semibold">
            {actionStatus === 'approved' && (
              <span className="flex items-center gap-2 text-green-700 font-black">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                Candidate Approved
              </span>
            )}
            {actionStatus === 'rejected' && (
              <span className="flex items-center gap-2 text-red-600 font-black">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                Candidate Rejected
              </span>
            )}
            {!actionStatus && (
              <span className="text-gray-400">Take action on this candidate</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setActionStatus('rejected')}
              disabled={actionStatus === 'rejected'}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[15px] font-black border-2 transition-all active:scale-95
                ${actionStatus === 'rejected'
                  ? 'bg-red-600 text-white border-red-600 opacity-60 cursor-not-allowed'
                  : 'bg-white text-red-600 border-red-200 hover:bg-red-50 hover:border-red-500 hover:shadow-sm'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reject
            </button>
            <button
              onClick={() => setActionStatus('approved')}
              disabled={actionStatus === 'approved'}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[15px] font-black border-2 transition-all active:scale-95
                ${actionStatus === 'approved'
                  ? 'bg-green-600 text-white border-green-600 opacity-60 cursor-not-allowed'
                  : 'bg-white text-green-700 border-green-200 hover:bg-green-50 hover:border-green-500 hover:shadow-sm'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Approve
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Candidates Drawer / Panel ─────────────────────────────────────────────
function CandidatesPanel({ jobId, jobName, onClose, fetchCandidateAppliedJobs }) {
  const [candidates, setCandidates] = useState([]);
  const [panelLoading, setPanelLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

  useEffect(() => {
    (async () => {
      setPanelLoading(true);
      const results = await fetchCandidateAppliedJobs(jobId);
      setCandidates(results);
      setPanelLoading(false);
    })();
  }, [jobId]);

  const filtered = candidates.filter(c =>
    c.candidate_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.current_designation?.toLowerCase().includes(search.toLowerCase()) ||
    c.current_company?.toLowerCase().includes(search.toLowerCase())
  );

  const formatCTC = (val) => val ? `₹${(val / 100000).toFixed(1).replace(/\.0$/, '')} LPA` : 'N/A';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />

      {/* Side Panel */}
      <div
        className="fixed top-0 right-0 h-full z-40 w-full max-w-xl bg-white shadow-2xl flex flex-col"
        style={{ animation: 'slideIn 0.25s ease' }}
      >
        {/* Panel Header */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-xl font-black text-gray-900">Applications</h2>
              <p className="text-[14px] text-gray-400 font-semibold">{jobName}</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-all font-bold text-xl"
            >
              ×
            </button>
          </div>

          {/* Search */}
          <div className="mt-3 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, role, company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-[14px] font-medium rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#C1272D] transition-all"
            />
          </div>
        </div>

        {/* Candidates Count Badge */}
        {!panelLoading && (
          <div className="flex-shrink-0 px-6 py-2.5 bg-gray-50 border-b border-gray-100">
            <span className="text-[13px] font-black text-gray-400 uppercase tracking-wider">
              {filtered.length} {filtered.length === 1 ? 'Candidate' : 'Candidates'} Found
            </span>
          </div>
        )}

        {/* Candidates List — min-h-0 ensures scrollbar only appears when truly needed */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3">
          {panelLoading ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <div className="w-7 h-7 border-2 border-[#C1272D] border-t-transparent rounded-full animate-spin" />
              <p className="text-[14px] text-gray-400">Loading candidates...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <span className="text-4xl">👤</span>
              <p className="text-[14px] font-bold text-gray-400">
                {search ? 'No candidates match your search.' : 'No applications yet for this job.'}
              </p>
            </div>
          ) : (
            filtered.map((candidate) => {
              const palette = CANDIDATE_PALETTES[candidate.candidate_id % CANDIDATE_PALETTES.length];
              const initials = candidate.candidate_name
                ? candidate.candidate_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                : '??';
              return (
                <button
                  key={candidate.application_id}
                  onClick={() => setSelectedCandidate(candidate)}
                  className="w-full text-left bg-white border border-gray-100 rounded-2xl p-4 hover:border-[#C1272D]/30 hover:shadow-md transition-all duration-200 group active:scale-[0.99]"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-base flex-shrink-0"
                      style={{ background: palette.bg, color: palette.text, border: `1.5px solid ${palette.border}` }}
                    >
                      {initials}
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[16px] font-black text-gray-900 truncate group-hover:text-[#C1272D] transition-colors">
                          {candidate.candidate_name}
                        </p>
                        <span
                          className="text-[11px] font-black px-2.5 py-1 rounded-lg flex-shrink-0"
                          style={{ background: '#FFF0F0', color: '#C1272D' }}
                        >
                          {(candidate.stage_name === 'New' ? 'Applied' : candidate.stage_name) || 'Applied'}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-semibold mt-0.5 truncate">
                        {candidate.current_designation} @ {candidate.current_company}
                      </p>

                      {/* Stats Row */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-[12px] font-bold text-gray-400">
                        <span>📍 {candidate.current_location}</span>
                        <span>⏳ {candidate.total_experience} Yrs Exp</span>
                        <span>💰 {formatCTC(candidate.expected_ctc)}</span>
                        {candidate.notice_period !== undefined && (
                          <span>📋 {candidate.notice_period}d Notice</span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#C1272D] flex-shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function HrJobdetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('role');
  const [showCandidates, setShowCandidates] = useState(false);

  const { fetchRecruiterJobs, fetchCandidateAppliedJobs, loading } = useHr();

  const stateJob = location.state?.job;

  useEffect(() => {
    if (!stateJob && typeof fetchRecruiterJobs === 'function') {
      fetchRecruiterJobs(setJobs);
    }
  }, []);

  const rawJob = stateJob || jobs.find(j => String(j.id) === String(id));

  if (!stateJob && loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
        <DashboardNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#C1272D] border-t-transparent rounded-full animate-spin" />
            <p className="text-[15px] text-gray-400">Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!rawJob) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
        <DashboardNavbar />
        <p className="text-gray-500 text-base mt-20">Job not found.</p>
        <button onClick={() => navigate('/hrDashbaord')} className="mt-4 text-[#C1272D] text-base font-semibold underline hover:text-[#a61f24] transition-colors">
          ← Back to HR Dashboard
        </button>
      </div>
    );
  }

  const details        = rawJob.job_details || {};
  const preferences    = rawJob.candidate_preferences || {};
  const screening      = rawJob.screening_questions || {};
  const description    = rawJob.job_description || {};
  const communications = rawJob.communication_preferences || {};
  const company        = rawJob.company_details || {};

  const palette = AVATAR_PALETTES[Number(rawJob.id || 0) % AVATAR_PALETTES.length];
  const companyLetter = (details.client_selection?.[0] || details.name?.[0] || 'C').toUpperCase();

  const formatLakhs = (val) => (val ? `${(val / 100000).toFixed(1).replace(/\.0$/, '')} LPA` : 'N/A');

  const skillsList = preferences.skills
    ? preferences.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const responsibilitiesList = description.key_responsibilities
    ? description.key_responsibilities.split('\n').map(s => s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)
    : [];

  const appliedCount = details.applied_candidates_count ?? 0;

  return (
    <div className="min-h-screen pb-12" style={{ background: 'linear-gradient(323.05deg,#FFE8E8 13.91%,#FFF5F5 79.76%)' }}>
      <DashboardNavbar />

      {/* Candidates Side Panel */}
      {showCandidates && (
        <CandidatesPanel
          jobId={rawJob.id}
          jobName={details.name || 'Job'}
          onClose={() => setShowCandidates(false)}
          fetchCandidateAppliedJobs={fetchCandidateAppliedJobs}
        />
      )}

      <div className="w-full max-w-[96%] mx-auto px-2 sm:px-4 lg:px-6 py-6">

        {/* Back Button Row */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => navigate('/hrDashbaord')}
            className="flex items-center gap-2 text-[14px] font-bold text-white bg-[#C1272D] hover:bg-[#a61f24] active:scale-95 px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200 w-fit"
          >
            <svg className="w-4 h-4 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to HR Pipeline
          </button>

          {/* VIEW APPLICATIONS BUTTON */}
          {details.is_published && (
            <button
              onClick={() => setShowCandidates(true)}
              className="flex items-center gap-2.5 text-[14px] font-black px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200 active:scale-95 border-2"
              style={{
                background: appliedCount > 0
                  ? 'linear-gradient(92.62deg,#C1272D 0.91%,#a61f24 99.09%)'
                  : '#fff',
                color: appliedCount > 0 ? '#fff' : '#C1272D',
                borderColor: '#C1272D',
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 0 0-4-4h-1M9 20H4v-2a4 4 0 0 1 4-4h1m4-4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
              View Applications
              {appliedCount > 0 && (
                <span className="bg-white/25 text-white text-[12px] font-black px-2 py-0.5 rounded-lg">
                  {appliedCount}
                </span>
              )}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-5 w-full">

          {/* ── 1. HEADER CARD ── */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {company?.company_logo ? (
                  <img
                    src={`data:image/svg+xml;base64,${company.company_logo}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `data:image/png;base64,${company.company_logo}`;
                    }}
                    alt={details.client_selection || 'Company Logo'}
                    className="w-16 h-16 rounded-xl object-contain border border-gray-100 flex-shrink-0 bg-white shadow-inner"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl flex-shrink-0 border border-gray-100 shadow-inner"
                    style={{ background: palette.bg, color: palette.text }}
                  >
                    {companyLetter}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-black text-gray-900 tracking-tight">{details.name || 'Untitled Position'}</h1>
                  <p className="text-[16px] text-gray-500 font-bold mt-0.5">{details.client_selection || 'Direct Placement'}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <span className="flex items-center gap-2 bg-gray-50 text-gray-700 text-[14px] font-bold px-4 py-2 rounded-xl border border-gray-100">
                  📍 {details.location || 'Not Specified'}
                </span>
                <span className="flex items-center gap-2 bg-gray-50 text-gray-700 text-[14px] font-bold px-4 py-2 rounded-xl border border-gray-100">
                  💼 {details.experience_from} - {details.experience_to} Years
                </span>
                <span className="flex items-center gap-2 bg-gray-50 text-gray-700 text-[14px] font-bold px-4 py-2 rounded-xl border border-gray-100">
                  💰 {formatLakhs(details.budget_from)} - {formatLakhs(details.budget_to)}
                </span>
              </div>
            </div>

            <hr className="my-5 border-gray-100" />

            {/* Meta Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[14px]">
              <div className="bg-stone-300/60 p-3.5 rounded-xl border border-gray-100/70">
                <span className="block text-[#C1272D] font-bold text-[11px] uppercase tracking-wider">Total Openings</span>
                <span className="text-base font-black text-gray-800 block mt-0.5">{details.no_of_recruitment || 1} Vacancies</span>
              </div>
              <div className="bg-stone-300/60 p-3.5 rounded-xl border border-gray-100/70">
                <span className="block text-[#C1272D] font-bold text-[11px] uppercase tracking-wider">Target Department</span>
                <span className="text-base font-black text-gray-800 block mt-0.5 truncate">{details.department_names?.[0] || 'General'}</span>
              </div>
              <div className="bg-stone-300/60 p-3.5 rounded-xl border border-gray-100/70">
                <span className="block text-[#C1272D] font-bold text-[11px] uppercase tracking-wider">Gender Preference</span>
                <span className="text-base font-black text-gray-800 block mt-0.5 capitalize">{details.gender || 'Open to All'}</span>
              </div>
              <div className="bg-stone-300/60 p-3.5 rounded-xl border border-gray-100/70 flex flex-col justify-center">
                <span className="block text-[#C1272D] font-bold text-[11px] uppercase tracking-wider mb-1">Pipeline Visibility</span>
                <div className="flex flex-col sm:flex-row gap-1.5">
                  <span className={`inline-flex items-center gap-1 font-bold text-[12px] px-2.5 py-1 rounded-md border capitalize w-fit ${details.is_published ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-red-50 text-[#C1272D] border-red-100'}`}>
                    {details.is_published ? 'Published' : 'Unpublished'}
                  </span>
                  {details.position_status && (
                    <span className={`inline-flex items-center font-bold text-[12px] px-2.5 py-1 rounded-md border capitalize w-fit ${details.position_status === 'active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                      {details.position_status}
                    </span>
                  )}
                </div>
                {details.is_published && (
                  <button
                    onClick={() => setShowCandidates(true)}
                    className="mt-2 text-[13px] font-black text-[#C1272D] text-left transition-colors w-fit"
                  >
                    👤 {appliedCount} Applied 
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── 2. TABS ── */}
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-xs overflow-hidden">
            <div className="flex border-b border-gray-100 bg-gray-50/70 p-2 gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('role')}
                className={`px-6 py-3 text-[14px] font-extrabold rounded-xl transition-all duration-150 whitespace-nowrap flex-shrink-0 ${activeTab === 'role' ? 'bg-white text-[#C1272D] shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
              >
                About The Role
              </button>
              {responsibilitiesList.length > 0 && (
                <button
                  onClick={() => setActiveTab('responsibilities')}
                  className={`px-6 py-3 text-[14px] font-extrabold rounded-xl transition-all duration-150 whitespace-nowrap flex-shrink-0 ${activeTab === 'responsibilities' ? 'bg-white text-[#C1272D] shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  Key Responsibilities ({responsibilitiesList.length})
                </button>
              )}
              {company.company_overview && (
                <button
                  onClick={() => setActiveTab('company')}
                  className={`px-6 py-3 text-[14px] font-extrabold rounded-xl transition-all duration-150 whitespace-nowrap flex-shrink-0 ${activeTab === 'company' ? 'bg-white text-[#C1272D] shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  Company Overview
                </button>
              )}
            </div>

            <div className="p-6 min-h-[160px]">
              {activeTab === 'role' && description.about_the_role && (
                <p className="text-[15px] text-gray-600 leading-relaxed font-medium max-w-[95%]">{description.about_the_role}</p>
              )}
              {activeTab === 'responsibilities' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {responsibilitiesList.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50/40 p-4 rounded-xl border border-gray-100 group hover:bg-white hover:shadow-xs transition-all duration-200">
                      <span className="w-6 h-6 rounded-lg bg-red-50 text-[#C1272D] flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-[15px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors pt-0.5">{item}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'company' && (
                <div className="space-y-5">
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium max-w-[95%]">{company.company_overview}</p>
                  <div className="flex flex-wrap gap-5 text-[14px] font-bold text-gray-500 border-t border-gray-100 pt-4">
                    {company.company_email && <span>📧 Email: <span className="text-gray-800">{company.company_email}</span></span>}
                    {company.company_phone && <span>📞 Contact: <span className="text-gray-800">{company.company_phone}</span></span>}
                    {company.company_website && (
                      <a href={company.company_website} target="_blank" rel="noreferrer" className="text-[#C1272D] hover:underline flex items-center gap-1">
                        🌐 Corporate Site
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── 3. SKILLS ── */}
          {skillsList.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs">
              <h2 className="text-[14px] font-black uppercase tracking-wider text-gray-400 mb-4">Core Skillsets & Expertise</h2>
              <div className="flex flex-wrap gap-2.5">
                {skillsList.map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 text-[14px] font-extrabold px-5 py-2.5 rounded-xl transition-all duration-150 border cursor-default"
                    style={i === 0
                      ? { background: 'linear-gradient(92.62deg,#C1272D 0.91%,#a61f24 99.09%)', color: '#fff', border: 'none' }
                      : { borderColor: '#e5e7eb', color: '#4b5563', background: '#f9fafb' }}
                  >
                    {i === 0 && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── 4. REQUIREMENTS & SCREENING ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
            <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-[15px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2 mb-4">Qualifications & Parameters</h2>
                <div className="space-y-4 text-[15px] text-gray-600 font-medium">
                  {preferences.required_qualifications && (
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                      <span className="text-gray-400 font-extrabold text-[12px] uppercase tracking-wider">Minimum Education</span>
                      <span className="font-black text-gray-900 text-base">{preferences.required_qualifications}</span>
                    </div>
                  )}
                  {Array.isArray(preferences.language_name) && preferences.language_name.length > 0 && (
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                      <span className="text-gray-400 font-extrabold text-[12px] uppercase tracking-wider">Language Fluency</span>
                      <span className="font-black text-gray-900 text-base">{preferences.language_name.join(', ')}</span>
                    </div>
                  )}
                  {preferences.certifications && (
                    <div className="pt-2">
                      <span className="text-gray-400 block font-extrabold text-[12px] uppercase tracking-wider mb-2">Key Certifications</span>
                      <p className="text-gray-800 text-[15px] bg-gray-50/60 p-4 rounded-xl border border-gray-100/80 leading-relaxed font-medium">{preferences.certifications}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs">
              <h2 className="text-[15px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2 mb-4">Pre-Screening Criteria</h2>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-gray-50/60 p-3.5 rounded-xl border border-gray-100/80 text-center">
                  <p className="text-gray-400 font-extrabold text-[11px] uppercase tracking-wider">Notice Period Max</p>
                  <p className="font-black text-gray-900 mt-1 text-base">{screening.screening_notice_period || 'N/A'}</p>
                </div>
                <div className="bg-gray-50/60 p-3.5 rounded-xl border border-gray-100/80 text-center">
                  <p className="text-gray-400 font-extrabold text-[11px] uppercase tracking-wider">Immediate Joining</p>
                  <p className={`font-black mt-1 text-base ${screening.screening_immediate_joining ? 'text-green-600' : 'text-gray-500'}`}>
                    {screening.screening_immediate_joining ? 'Mandatory' : 'Flexible'}
                  </p>
                </div>
              </div>
              {Array.isArray(screening.screening_questions) && screening.screening_questions.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[13px] font-black text-gray-400 uppercase tracking-wider">Evaluation Questionnaire</p>
                  <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                    {screening.screening_questions.map((q, i) => (
                      <div key={i} className="text-[15px] text-gray-700 bg-gray-50/60 p-3.5 rounded-xl border border-gray-100/80 font-medium flex items-start gap-2.5">
                        <span className="font-black text-[#C1272D] text-base">Q{i + 1}:</span>
                        <span className="leading-relaxed">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── 5. NOTIFICATION CHANNELS ── */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs">
            <h2 className="text-[14px] font-black uppercase tracking-wider text-gray-400 mb-3">Active Recruitment Notification Channels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { label: 'Email Automation', active: communications.comm_email },
                { label: 'SMS Carrier Integration', active: communications.comm_sms },
                { label: 'WhatsApp Messenger API', active: communications.comm_whatsapp },
                { label: 'System Follow-ups & Reminders', active: communications.comm_reminders },
              ].map((ch, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 text-[13px] font-bold px-4 py-3 rounded-xl border transition-all ${ch.active ? 'bg-green-50 border-green-100 text-green-700' : 'bg-stone-300/60 border-gray-100 text-black'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${ch.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                  {ch.label}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}