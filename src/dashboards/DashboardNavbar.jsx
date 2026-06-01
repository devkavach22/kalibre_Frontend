import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';

function DashboardNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50"
      style={{ boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/candidates" className="flex-shrink-0">
          <img src={Logo} alt="Kalibre Logo" className="h-9 sm:h-10 object-contain" />
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">

          {/* Profile Icon */}
          <div className="relative group">
            <button className="p-1.5 text-gray-600 hover:text-[#C8102E] transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:text-[#C8102E] hover:bg-red-50 rounded-t-xl transition-colors"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-[#C8102E] hover:bg-red-50 rounded-b-xl transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link
            to="/candidates/profile"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-700 hover:text-[#C8102E] transition-colors"
          >
            My Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-left text-sm font-medium text-gray-700 hover:text-[#C8102E] transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default DashboardNavbar;