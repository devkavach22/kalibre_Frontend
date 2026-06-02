import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';

function DashboardNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = localStorage.getItem('user_name') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_type');
    navigate('/login');
  };

  return (
    <>
      <style>{`
        .user-name-badge {
          background: #C8102E;
          color: white;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 24px;
          border-radius: 9999px;
          cursor: default;
        }
        .nav-profile-btn {
          border: 1.5px solid #C8102E;
          color: #C8102E;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 9999px;
          transition: all 0.2s;
        }
        .nav-profile-btn:hover {
          background: #FFF0F0;
        }
        .nav-logout-btn {
          border: 1.5px solid #6b7280;
          color: #4b5563;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 9999px;
          transition: all 0.2s;
        }
        .nav-logout-btn:hover {
          background: #f3f4f6;
          color: #111827;
          border-color: #111827;
        }
      `}</style>

      <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50"
        style={{ boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 h-18 flex items-center justify-between gap-4 py-3">

          <Link to="/candidates" className="flex-shrink-0">
            <img src={Logo} alt="Kalibre Logo" className="h-9 sm:h-10 object-contain" />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">

            <div className="hidden md:flex items-center gap-3">
              <Link to="/profile" className="nav-profile-btn flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </Link>

              <div className="user-name-badge flex items-center gap-2">
                <span className="uppercase tracking-wide">{userName}</span>
              </div>

              <button onClick={handleLogout} className="nav-logout-btn flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
                Logout
              </button>
            </div>

            <button
              className="md:hidden p-1.5 text-gray-600 hover:text-[#C8102E] transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3 shadow-inner">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Logged in as: <span className="text-[#C8102E]">{userName}</span>
            </div>
            
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="text-left text-sm font-semibold text-gray-700 flex items-center gap-2 py-2 transition-colors hover:text-[#C8102E]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </Link>

            <button
              onClick={handleLogout}
              className="text-left text-sm font-semibold text-[#C8102E] flex items-center gap-2 py-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default DashboardNavbar;