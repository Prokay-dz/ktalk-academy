import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Courses', page: 'landing' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'About', page: 'landing' }
  ];

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-area" onClick={() => setCurrentPage('landing')}>
          <span className="logo-text">KTalk Academy</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={`nav-link ${currentPage === item.page ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          <button 
            className="login-btn"
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
          <button 
            className="btn-primary header-cta"
            onClick={() => setCurrentPage('consultant-form')}
          >
            Book a Consultant
          </button>
          
          {/* Mobile Hamburger */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button onClick={() => { setCurrentPage('landing'); setMobileMenuOpen(false); }}>Courses</button>
          <button onClick={() => { setCurrentPage('pricing'); setMobileMenuOpen(false); }}>Pricing</button>
          <button onClick={() => { setCurrentPage('landing'); setMobileMenuOpen(false); }}>About</button>
          <button onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }}>Login</button>
          <button 
            className="btn-primary w-full"
            onClick={() => { setCurrentPage('consultant-form'); setMobileMenuOpen(false); }}
          >
            Book a Consultant <ArrowRight size={16} />
          </button>
        </div>
      )}

      <style>{`
        .site-header {
          background-color: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          position: sticky;
          top: 0;
          z-index: 900;
        }
        .header-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo-area {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .logo-text {
          font-size: 20px;
          font-weight: 800;
          color: #041527;
          letter-spacing: -0.5px;
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .nav-link {
          background: none;
          border: none;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          transition: color 0.2s;
          padding: 4px 0;
        }
        .nav-link:hover, .nav-link.active {
          color: #041527;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .login-btn {
          background: none;
          border: none;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          padding: 8px 12px;
        }
        .login-btn:hover {
          color: #041527;
        }
        .header-cta {
          padding: 10px 20px;
          font-size: 14px;
        }
        .mobile-toggle {
          display: none;
          background: none;
          color: #041527;
        }
        .mobile-menu {
          background: #FFFFFF;
          border-top: 1px solid #E2E8F0;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .mobile-menu button {
          text-align: left;
          font-size: 16px;
          font-weight: 600;
          color: #041527;
          background: none;
          border: none;
          padding: 8px 0;
        }
        @media (max-width: 768px) {
          .desktop-nav, .login-btn, .header-cta {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
