import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../dashboards/DashboardNavbar';
import AddJobModal, { CompanyAvatar } from './AddJobModal';
import useHr from '../APIs/hooks/useHr';

// ─── Helper: get days in month ───
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ─── Static interview data ───
const STATIC_INTERVIEWS = [
  { id: 1, candidateName: 'Aarav Sharma', email: 'aarav@example.com', date: '2026-06-12', time: '10:00', status: 'upcoming', role: 'Senior Data Engineer' },
  { id: 2, candidateName: 'Priya Mehta', email: 'priya@example.com', date: '2026-06-14', time: '02:30', status: 'upcoming', role: 'Sales Executive' },
  { id: 3, candidateName: 'Rohan Gupta', email: 'rohan@example.com', date: '2026-06-03', time: '11:00', status: 'completed', role: 'Senior Data Engineer' },
  { id: 4, candidateName: 'Sneha Patel', email: 'sneha@example.com', date: '2026-06-01', time: '04:00', status: 'completed', role: 'Sales Executive' },
];

// ─── Schedule Form Modal ───
function ScheduleModal({ onClose, onSchedule, selectedDate }) {
  const [form, setForm] = useState({
    candidateName: '',
    email: '',
    date: selectedDate || '',
    time: '',
    role: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.candidateName.trim()) e.candidateName = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter valid email';
    if (!form.date) e.date = 'Date is required';
    if (!form.time) e.time = 'Time is required';
    if (!form.role.trim()) e.role = 'Role is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSchedule({ ...form, id: Date.now(), status: 'upcoming' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-[#C1272D]">Schedule Interview</h2>
            <p className="text-[12px] text-gray-400 font-medium mt-0.5">Fill in details to schedule a new interview</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-1">Candidate Name <span className="text-red-500">*</span></label>
            <input
              type="text" placeholder="Enter candidate name"
              value={form.candidateName}
              onChange={e => setForm(p => ({ ...p, candidateName: e.target.value }))}
              className={`w-full border rounded-xl px-3 py-2.5 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${errors.candidateName ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#C1272D] focus:ring-[#C1272D]'}`}
            />
            {errors.candidateName && <p className="text-[11px] text-red-500 mt-0.5">{errors.candidateName}</p>}
          </div>

          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email" placeholder="Enter email address"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className={`w-full border rounded-xl px-3 py-2.5 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#C1272D] focus:ring-[#C1272D]'}`}
            />
            {errors.email && <p className="text-[11px] text-red-500 mt-0.5">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-1">Job Role <span className="text-red-500">*</span></label>
            <input
              type="text" placeholder="e.g. Senior Data Engineer"
              value={form.role}
              onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
              className={`w-full border rounded-xl px-3 py-2.5 text-[13px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${errors.role ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#C1272D] focus:ring-[#C1272D]'}`}
            />
            {errors.role && <p className="text-[11px] text-red-500 mt-0.5">{errors.role}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                className={`w-full border rounded-xl px-3 py-2.5 text-[13px] font-medium focus:outline-none focus:ring-1 transition-all ${errors.date ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#C1272D] focus:ring-[#C1272D]'}`}
              />
              {errors.date && <p className="text-[11px] text-red-500 mt-0.5">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1">Time <span className="text-red-500">*</span></label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                className={`w-full border rounded-xl px-3 py-2.5 text-[13px] font-medium focus:outline-none focus:ring-1 transition-all ${errors.time ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#C1272D] focus:ring-[#C1272D]'}`}
              />
              {errors.time && <p className="text-[11px] text-red-500 mt-0.5">{errors.time}</p>}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-1 pt-3 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white bg-[#C1272D] hover:bg-[#a61f24] transition-all shadow-sm">
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Interview Card ───
function InterviewCard({ interview }) {
  const isUpcoming = interview.status === 'upcoming';
  const [h, m] = interview.time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  const timeStr = `${displayHour}:${m} ${ampm}`;

  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${isUpcoming ? 'bg-blue-50/50 border-blue-100' : 'bg-gray-50/50 border-gray-100'}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${isUpcoming ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'}`}>
        {interview.candidateName[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-gray-800 truncate">{interview.candidateName}</p>
        <p className="text-[11px] text-gray-400 font-medium truncate">{interview.role}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-[12px] font-bold text-gray-700">{timeStr}</p>
        <p className="text-[11px] text-gray-400">{interview.date}</p>
      </div>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${isUpcoming ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
        {isUpcoming ? 'Upcoming' : 'Done'}
      </span>
    </div>
  );
}

// ─── Calendar Section ───
function InterviewCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [interviews, setInterviews] = useState(STATIC_INTERVIEWS);
  const [activeTab, setActiveTab] = useState('upcoming');

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const getDateStr = (day) => {
    const m = String(currentMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  const getInterviewsOnDate = (day) => {
    return interviews.filter(i => i.date === getDateStr(day));
  };

  const handleSchedule = (newInterview) => {
    setInterviews(prev => [...prev, newInterview]);
  };

  const upcoming = interviews.filter(i => i.status === 'upcoming').sort((a, b) => a.date.localeCompare(b.date));
  const completed = interviews.filter(i => i.status === 'completed').sort((a, b) => b.date.localeCompare(a.date));
  const listToShow = activeTab === 'upcoming' ? upcoming : completed;

  // ✅ Past month check — disable scheduling
  const isPastMonth = currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth < today.getMonth());

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* ── Left: Calendar ── */}
      <div className="w-full lg:w-[55%] bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-5">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h3 className="text-base font-extrabold text-gray-800">{MONTH_NAMES[currentMonth]} {currentYear}</h3>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 mb-2">
          {DAY_NAMES.map(d => (
            <div key={d} className="text-center text-[11px] font-bold text-gray-400 py-1">{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = getDateStr(day);
            const dayInterviews = getInterviewsOnDate(day);
            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            const isSelected = selectedDate === dateStr;
            const hasUpcoming = dayInterviews.some(x => x.status === 'upcoming');
            const hasCompleted = dayInterviews.some(x => x.status === 'completed');

            return (
              <div
                key={day}
                onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                className={`relative flex flex-col items-center justify-start pt-1.5 pb-1 mx-0.5 rounded-xl cursor-pointer transition-all min-h-[48px] border
                  ${isSelected ? 'bg-[#C1272D] border-[#C1272D] text-white' :
                    isToday ? 'bg-red-50 border-red-200 text-[#C1272D]' :
                      'border-transparent hover:bg-gray-50 text-gray-700'}`}
              >
                <span className={`text-[13px] font-bold ${isSelected ? 'text-white' : isToday ? 'text-[#C1272D]' : 'text-gray-700'}`}>
                  {day}
                </span>
                {/* Dot indicators */}
                <div className="flex gap-0.5 mt-1">
                  {hasUpcoming && <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-400'}`} />}
                  {hasCompleted && <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-red-200' : 'bg-green-400'}`} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-[11px] font-medium text-gray-500">Upcoming</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-[11px] font-medium text-gray-500">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-50 border border-red-300" />
            <span className="text-[11px] font-medium text-gray-500">Today</span>
          </div>
        </div>

        {/* Selected Date Interviews */}
        {selectedDate && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-extrabold text-gray-700">
                Interviews on <span className="text-[#C1272D]">{selectedDate}</span>
              </p>
              <button
                onClick={() => !isPastMonth && setShowModal(true)}
                disabled={isPastMonth}
                className={`flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all ${isPastMonth
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'text-white bg-[#C1272D] hover:bg-[#a61f24] cursor-pointer'
                  }`}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                Add
              </button>
            </div>
            {getInterviewsOnDate(parseInt(selectedDate.split('-')[2])).length > 0 ? (
              <div className="flex flex-col gap-2">
                {getInterviewsOnDate(parseInt(selectedDate.split('-')[2])).map(iv => (
                  <InterviewCard key={iv.id} interview={iv} />
                ))}
              </div>
            ) : (
              <p className="text-[12px] text-gray-400 font-medium py-2">No interviews scheduled for this day.</p>
            )}
          </div>
        )}

        {/* Schedule button when no date selected */}
        {!selectedDate && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => !isPastMonth && setShowModal(true)}
              disabled={isPastMonth}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-bold transition-all shadow-sm ${isPastMonth
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                  : 'text-white bg-[#C1272D] hover:bg-[#a61f24] cursor-pointer'
                }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              {isPastMonth ? 'Cannot Schedule in Past' : 'Schedule New Interview'}
            </button>
          </div>
        )}
      </div>

      {/* ── Right: Interview List ── */}
      <div className="w-full lg:flex-1 bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col">

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
            <p className="text-2xl font-extrabold text-blue-600">{upcoming.length}</p>
            <p className="text-[11px] font-bold text-blue-400 mt-0.5">Upcoming</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
            <p className="text-2xl font-extrabold text-green-600">{completed.length}</p>
            <p className="text-[11px] font-bold text-green-400 mt-0.5">Completed</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition-all ${activeTab === 'upcoming' ? 'bg-white text-[#C1272D] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Upcoming ({upcoming.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition-all ${activeTab === 'completed' ? 'bg-white text-[#C1272D] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Completed ({completed.length})
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col gap-2 overflow-y-auto max-h-80 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {listToShow.length > 0 ? (
            listToShow.map(iv => <InterviewCard key={iv.id} interview={iv} />)
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-[12px] text-gray-400 font-medium">No {activeTab} interviews</p>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <ScheduleModal
          onClose={() => setShowModal(false)}
          onSchedule={handleSchedule}
          selectedDate={selectedDate || ''}
        />
      )}
    </div>
  );
}

// ─── Main HrDashboard ───
export default function HrDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'interviews'
  const navigate = useNavigate();

  const { fetchRecruiterJobs, publishJob, loading } = useHr();

  useEffect(() => {
    if (typeof fetchRecruiterJobs === 'function') {
      fetchRecruiterJobs(setJobs);
    }
  }, []);

  const handleCreateJob = () => {
    setShowModal(false);
    if (typeof fetchRecruiterJobs === 'function') {
      fetchRecruiterJobs(setJobs);
    }
  };

  const formatBudget = (budget) => {
    if (!budget) return "Not Disclosed";
    return `${budget / 100000} Lakhs`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      const date = new Date(dateString.replace(' ', 'T'));
      if (isNaN(date.getTime())) return "Recent";
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return "Recent";
    }
  };

  const handleCardClick = (job) => {
    navigate(`/hrDashboard/job/${job.id}`, { state: { job } });
  };

  return (
    <div className="min-h-screen pb-12" style={{ background: 'linear-gradient(180deg, #FFEFEF 0%, #FFFFFF 100%)' }}>
      <DashboardNavbar />
      {showModal && <AddJobModal onClose={() => setShowModal(false)} onCreateJob={handleCreateJob} />}

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8">

        {/* ── HERO HEADER ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-2 gap-4">
          <div className="flex-1 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-[#C1272D] tracking-tight">Post & Manage Jobs</h1>
            <p className="text-gray-500 text-xs sm:text-base mt-1.5">Create new job openings, track applicants, and manage your hiring pipeline.</p>
          </div>
          {activeTab === 'jobs' && (
            <button onClick={() => setShowModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C1272D] hover:bg-[#a61f24] active:scale-98 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all cursor-pointer">
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add New Job
            </button>
          )}
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-2xl p-1.5 w-fit mb-6 shadow-xs mx-auto">

          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 ${activeTab === 'jobs'
                ? 'bg-[#C1272D] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Jobs
            {jobs.length > 0 && (
              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${activeTab === 'jobs' ? 'bg-white/20 text-white' : 'bg-red-100 text-[#C1272D]'}`}>
                {jobs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('interviews')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 ${activeTab === 'interviews'
                ? 'bg-[#C1272D] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Interview Schedule
          </button>
        </div>

        {/* ── JOBS TAB ── */}
        {activeTab === 'jobs' && (
          loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C1272D]"></div>
            </div>
          ) : (
            <div className="w-full bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {jobs && jobs.map((job, index) => {
                  const details = job?.job_details || {};
                  const company = job?.company_details || {};
                  const preferences = job?.candidate_preferences || {};
                  const description = job?.job_description || {};

                  const isItemPublished = details?.is_published ?? false;
                  const displayTitle = details?.name || "Untitled Role";
                  const displayCompany = details?.client_selection || "Company Name";
                  const displayLocation = details?.location || "Not Specified";
                  const displayDesc = description?.about_the_role || "No description provided.";
                  const createdDate = details?.create_date || "";

                  const displaySkills = preferences?.skills
                    ? preferences.skills.split(',').map(s => s.trim())
                    : [];

                  const expFrom = details?.experience_from ? Math.floor(details.experience_from) : 0;
                  const expTo = details?.experience_to ? Math.floor(details.experience_to) : 0;
                  const experienceRange = `${expFrom} - ${expTo} Years`;

                  const salaryRange = details?.budget_from
                    ? `${formatBudget(details.budget_from)} - ${formatBudget(details.budget_to)}`
                    : "Not Disclosed";

                  return (
                    <div key={job.id || index}
                      onClick={() => handleCardClick(job)}
                      className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-red-100 flex flex-col justify-between group cursor-pointer">
                      <div>
                        <div className="flex items-start gap-4">
                          {company?.company_logo ? (
                            <img
                              src={`data:image/svg+xml;base64,${company.company_logo}`}
                              onError={(e) => { e.target.onerror = null; e.target.src = `data:image/png;base64,${company.company_logo}`; }}
                              alt={displayCompany}
                              className="w-12 h-12 rounded-xl object-contain border border-gray-100 flex-shrink-0 bg-white"
                            />
                          ) : (
                            <CompanyAvatar label={displayCompany.slice(0, 4).toUpperCase()} colorIndex={index} />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-base font-bold text-gray-800 tracking-tight line-clamp-2 leading-snug group-hover:text-[#C1272D] transition-colors">
                                {displayTitle}
                              </h3>
                              {details?.end_date && (
                                <span className="text-[10px] font-bold text-[#C1272D] whitespace-nowrap flex-shrink-0 mt-0.5">
                                  Till {formatDate(details.end_date)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-sm font-semibold text-gray-500 truncate">{displayCompany}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-1 py-3.5 my-4 border-y border-gray-100 text-[13px] font-semibold text-gray-600">
                          <div className="flex items-center gap-1.5 min-w-0 w-full sm:w-auto">
                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <span className="truncate">{experienceRange}</span>
                          </div>
                          <div className="flex items-center gap-1.5 min-w-0 w-full sm:w-auto sm:justify-center">
                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 4h3.5a2.5 2.5 0 110 5H9m2-9V4m0 16v-2" /></svg>
                            <span className="truncate">{salaryRange}</span>
                          </div>
                          <div className="flex items-center gap-1.5 min-w-0 w-full sm:w-auto sm:justify-end">
                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span className="truncate">{displayLocation}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed font-normal line-clamp-3">{displayDesc}</p>

                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mt-4">
                          {displaySkills.map((skill, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-gray-500 text-xs font-semibold">
                              <span className="text-gray-300 text-[6px]">●</span>
                              <span className="truncate max-w-[120px]">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-y-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="border border-red-200 text-[#C1272D] bg-red-50/40 px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wider uppercase">
                            {details?.department_names?.[0] || "General"}
                          </span>
                          <span className="text-gray-400 font-semibold text-[11px]">{formatDate(createdDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto sm:ml-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isItemPublished) publishJob(job.id, setJobs);
                            }}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center gap-1 border ${isItemPublished
                                ? "bg-green-50 text-green-600 border-green-200 shadow-none cursor-default active:scale-100"
                                : "bg-[#C1272D] text-white border-transparent hover:bg-[#a61f24] cursor-pointer"
                              }`}
                          >
                            {isItemPublished && (
                              <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {isItemPublished ? "Published" : "Publish Job"}
                          </button>
                          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg p-0.5 text-gray-400">
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-red-500 transition-colors p-1.5 cursor-pointer rounded-md hover:bg-white" title="Bookmark Job">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}

        {/* ── INTERVIEW SCHEDULE TAB ── */}
        {activeTab === 'interviews' && <InterviewCalendar />}

      </div>
    </div>
  );
}