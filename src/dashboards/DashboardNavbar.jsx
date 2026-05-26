import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const NAV_LINKS = [
  { label: 'Home', path: '/candidates' },
  { label: 'Job', path: '/candidates/jobs' },
  { label: 'Settings', path: '/candidates/settings' },
];

function DashboardNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
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

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                className="text-sm font-semibold transition-colors duration-200"
                style={{ color: isActive ? '#C8102E' : '#111111' }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden sm:flex flex-1 max-w-xs lg:max-w-sm xl:max-w-md items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50">
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search jobs..."
            className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 w-full"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Notification Bell */}
          <button className="relative p-1.5 text-gray-600 hover:text-[#C8102E] transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Notification dot */}
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C8102E]" />
          </button>

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
                to="/candidates/profile"
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

          {/* Mobile Search */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search jobs..."
              className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 w-full"
            />
          </div>

          {/* Mobile Nav Links */}
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold py-1 transition-colors duration-200"
                style={{ color: isActive ? '#C8102E' : '#111111' }}
              >
                {link.label}
              </Link>
            );
          })}

          <hr className="border-gray-100" />

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