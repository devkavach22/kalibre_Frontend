import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industry", href: "/industry" },
  { label: "Our Process", href: "/process" },
  { label: "Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("user_name");
  const userType = localStorage.getItem("user_type"); // 👈 Sahi key lagayi aapke Local Storage ke hisab se

  // ✅ Sahi checking lagayi: agar 'hr' ya 'recruiter' ho toh /hrDashbaord jaye
  const isHR = userType?.toLowerCase() === "hr" || userType?.toLowerCase() === "recruiter";
  const dashboardLink = isHR ? "/hrDashbaord" : "/candidates";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_type"); // 👈 Sahi key clear ki
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        .navbar-root { font-family: 'Poppins', sans-serif; }
        .hire-btn { background: #C8102E; transition: background 0.2s, transform 0.15s; }
        .hire-btn:hover { background: #a50d25; transform: scale(1.03); }
        .login-btn { border: 1.5px solid #C8102E; color: #C8102E; transition: all 0.2s; }
        .login-btn:hover { background: #C8102E; color: #fff; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; bottom: -3px; left: 0;
          width: 0; height: 2px; background: #C8102E;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .mobile-menu { animation: slideDown 0.25s ease forwards; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .user-dropdown {
          position: absolute; top: calc(100% + 2px); right: 0;
          background: white; border-radius: 16px; min-width: 200px;
          box-shadow: 0px 8px 30px rgba(200,16,46,0.15), 0px 2px 8px rgba(0,0,0,0.08);
          overflow: hidden; z-index: 100;
          border: 1px solid #FFE0E4;
          animation: slideDown 0.2s ease forwards;
        }
      `}</style>

      <header className="navbar-root fixed top-0 left-0 right-0 z-50 px-6 md:px-10 pt-[20px]">
        <nav
          className="mx-auto max-w-[1600px] bg-white rounded-[140px] flex items-center justify-between px-6 md:px-10 py-3"
          style={{ boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.06)" }}
        >

          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img src={Logo} alt="Kalibre" className="h-10 md:h-11 w-auto object-contain" />
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-9">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="nav-link text-[#1a1a1a] font-medium text-[14px] xl:text-[15px] hover:text-[#C8102E] transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {token ? (
              <>
                {/* Dashboard Button */}
                <a
                  href={dashboardLink}
                  className="hire-btn flex items-center gap-2 text-white font-semibold text-[14px] px-6 py-2.5 rounded-full"
                >
                  Dashboard
                </a>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((p) => !p)}
                    className="login-btn flex items-center gap-2 font-semibold text-[14px] px-5 py-2.5 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {userName}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="user-dropdown">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-5 py-3.5 text-[14px] font-semibold text-[#C8102E] hover:bg-[#FFF0F0] transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <a
                href="/register"
                className="login-btn flex items-center gap-2 font-semibold text-[14px] px-5 py-2.5 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Register
              </a>
            )}

            {/* Hire Talent */}
            <a
              href="/register"
              className="hire-btn flex items-center gap-2 text-white font-semibold text-[14px] px-6 py-2.5 rounded-full"
            >
              Hire Talent
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-full"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[2px] bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </nav>

        {menuOpen && (
          <div
            className="mobile-menu lg:hidden mx-auto mt-2 bg-white rounded-3xl px-6 py-5 max-w-[1600px]"
            style={{ boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.05)" }}
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block text-[#1a1a1a] font-medium text-[15px] py-1 hover:text-[#C8102E] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex flex-wrap gap-3 pt-2">
                {token ? (
                  <>
                    <a href={dashboardLink} className="hire-btn inline-flex items-center gap-2 text-white font-semibold text-[14px] px-6 py-2.5 rounded-full">
                      Dashboard
                    </a>
                    <button
                      onClick={handleLogout}
                      className="login-btn inline-flex items-center gap-2 font-semibold text-[14px] px-5 py-2.5 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                      </svg>
                      {userName} — Logout
                    </button>
                  </>
                ) : (
                  <a href="/login" className="login-btn inline-flex items-center gap-2 font-semibold text-[14px] px-5 py-2.5 rounded-full">
                    Login
                  </a>
                )}
                <a href="/register" className="hire-btn inline-flex items-center gap-2 text-white font-semibold text-[14px] px-6 py-2.5 rounded-full">
                  Hire Talent
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;