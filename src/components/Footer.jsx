import React, { useState } from 'react';
import { Send, Twitter, Linkedin, MapPin, Mail, Phone } from 'lucide-react';
import { companyInfo } from '../data/mockData';

export default function Footer({ showNewsletter = false, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-box">■</span> {companyInfo.name}
            </div>
            <p className="brand-tagline">
              Empowering global communication for the next generation of Brazilian leaders.
            </p>
          </div>

          {/* Methodology Links */}
          <div className="footer-col">
            <h4>Methodology</h4>
            <ul>
              <li><a href="#judith-method" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); }}>Judith's Method</a></li>
              <li><a href="#research" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); }}>The Research</a></li>
              <li><a href="#success" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); }}>Success Stories</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); }}>Courses</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); setCurrentPage('consultant-form'); }}>Contact Support</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); setCurrentPage('privacy'); }}>Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>

          {/* Connect Details */}
          <div className="footer-col">
            {showNewsletter ? (
              <>
                <h4>NEWSLETTER</h4>
                {subscribed ? (
                  <p className="sub-success">✓ Thank you for subscribing!</p>
                ) : (
                  <form onSubmit={handleSubscribe} className="newsletter-form">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" aria-label="Subscribe">
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </>
            ) : (
              <>
                <h4>Connect</h4>
                <ul className="connect-list">
                  <li><Mail size={14} /> <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a></li>
                  <li><Phone size={14} /> <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a></li>
                  <li><MapPin size={14} /> {companyInfo.headquarters}</li>
                </ul>
                <div className="social-icons">
                  <a href="#twitter" className="icon-link"><Twitter size={18} /></a>
                  <a href="#linkedin" className="icon-link"><Linkedin size={18} /></a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="footer-bottom">
          <p>© {companyInfo.copyrightYear} KTalk Academy. Empowering global communication.</p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #DCE8FA;
          padding: 60px 0 24px 0;
          color: #041527;
          border-top: 1px solid #CBD5E1;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 48px;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-logo {
          font-size: 22px;
          font-weight: 800;
          color: #041527;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .logo-box {
          font-size: 16px;
          color: #041527;
        }
        .brand-tagline {
          font-size: 14px;
          color: #475569;
          max-width: 280px;
          line-height: 1.6;
        }
        .footer-col h4 {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #041527;
          margin-bottom: 18px;
        }
        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-col a, .connect-list li {
          font-size: 14px;
          color: #475569;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-col a:hover {
          color: #041527;
        }
        .newsletter-form {
          display: flex;
          background: #FFFFFF;
          border-radius: 8px;
          border: 1px solid #CBD5E1;
          overflow: hidden;
        }
        .newsletter-form input {
          border: none;
          padding: 10px 14px;
          font-size: 14px;
          width: 100%;
        }
        .newsletter-form button {
          background: #041527;
          color: #FFFFFF;
          border: none;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .newsletter-form button:hover {
          background: #0A213D;
        }
        .sub-success {
          font-size: 14px;
          color: #059669;
          font-weight: 600;
        }
        .social-icons {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .icon-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #041527;
          transition: all 0.2s;
        }
        .icon-link:hover {
          background: #041527;
          color: #FFFFFF;
        }
        .footer-bottom {
          border-top: 1px solid rgba(4, 21, 39, 0.1);
          padding-top: 24px;
          text-align: center;
          font-size: 13px;
          color: #64748B;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
