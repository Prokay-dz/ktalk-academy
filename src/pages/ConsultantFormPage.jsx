import React, { useState } from 'react';
import { Globe, UserCheck, Clock, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StripePaymentModal from '../components/StripePaymentModal';
import { companyInfo } from '../data/mockData';

export default function ConsultantFormPage({ setCurrentPage, setIsPaid }) {
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState(companyInfo.phone);
  const [englishLevel, setEnglishLevel] = useState('Intermediate');
  const [mainGoal, setMainGoal] = useState('Business & Career Advancement');
  const [contactTime, setContactTime] = useState(['Morning (Manhã)']);
  const [notes, setNotes] = useState('');
  const [isStripeOpen, setIsStripeOpen] = useState(false);

  const toggleContactTime = (timeLabel) => {
    if (contactTime.includes(timeLabel)) {
      setContactTime(contactTime.filter((t) => t !== timeLabel));
    } else {
      setContactTime([...contactTime, timeLabel]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Opens Stripe Payment Modal for enrollment transaction
    setIsStripeOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setIsStripeOpen(false);
    setCurrentPage('payment-success');
  };

  return (
    <div className="consultant-page">
      <Header currentPage="consultant-form" setCurrentPage={setCurrentPage} />

      {/* Stripe Payment Modal */}
      <StripePaymentModal
        isOpen={isStripeOpen}
        onClose={() => setIsStripeOpen(false)}
        plan={{ name: 'Diagnostic Call & Roadmap Membership', price: '120' }}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <main className="form-section">
        <div className="container">
          <div className="form-layout-grid">
            {/* Left Info Column */}
            <div className="left-info">
              <div className="badge-tag badge-ice">
                <Globe size={14} /> Especialmente para Brasileiros
              </div>

              <h1 className="form-main-title">
                Your English journey starts with a <span className="heading-highlight">personalized roadmap</span>.
              </h1>

              <p className="form-main-subtitle">
                Judith's method isn't just about grammar; it's about confidence. Book a 15-minute diagnostic call to evaluate your current level and define clear goals for global communication.
              </p>

              <div className="info-feature-list">
                <div className="info-feature">
                  <div className="feature-icon dark-bg">
                    <UserCheck size={18} color="#FFFFFF" />
                  </div>
                  <div>
                    <h5>Individual Analysis</h5>
                    <p>We assess your specific challenges and professional goals.</p>
                  </div>
                </div>

                <div className="info-feature">
                  <div className="feature-icon gold-bg">
                    <Clock size={18} color="#041527" />
                  </div>
                  <div>
                    <h5>Flexible Scheduling</h5>
                    <p>Choose a time that fits your Brazilian timezone and busy lifestyle.</p>
                  </div>
                </div>
              </div>

              <div className="divider-line" />

              {/* Judith Quote Box */}
              <div className="judith-quote-box">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                  alt="Judith M."
                  className="judith-avatar"
                />
                <div>
                  <div className="judith-name">Judith M.</div>
                  <p className="judith-quote">"I'll help you find your voice in English."</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Form Card */}
            <div className="right-form-card">
              <div className="card-top-accent" />

              <form onSubmit={handleFormSubmit}>
                <div className="form-two-col">
                  <div className="form-group">
                    <label className="form-label">Full Name / Nome Completo</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">WhatsApp Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+55 55 92001-9028"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Level Pills */}
                <div className="form-group">
                  <label className="form-label">What is your current English level?</label>
                  <div className="pill-grid">
                    {['Beginner', 'Intermediate', 'Advanced', 'Fluent/Pro'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        className={`pill-btn ${englishLevel === lvl ? 'active' : ''}`}
                        onClick={() => setEnglishLevel(lvl)}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Goal */}
                <div className="form-group">
                  <label className="form-label">Main Goal / Objetivo Principal</label>
                  <select
                    className="form-input"
                    value={mainGoal}
                    onChange={(e) => setMainGoal(e.target.value)}
                  >
                    <option value="Business & Career Advancement">Business & Career Advancement</option>
                    <option value="Academic Writing & IELTS Prep">Academic Writing & IELTS Prep</option>
                    <option value="Executive Relocation Abroad">Executive Relocation Abroad</option>
                    <option value="Conversation Confidence & Pitching">Conversation Confidence & Pitching</option>
                  </select>
                </div>

                {/* Preferred Contact Time */}
                <div className="form-group">
                  <label className="form-label">Preferred Contact Time (BRT Timezone)</label>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['Morning (Manhã)', 'Afternoon (Tarde)', 'Evening (Noite)'].map((timeLabel) => {
                      const isSelected = contactTime.includes(timeLabel);
                      return (
                        <label
                          key={timeLabel}
                          className={`checkbox-card ${isSelected ? 'active' : ''}`}
                          onClick={() => toggleContactTime(timeLabel)}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            style={{ accentColor: '#F5A623' }}
                          />
                          <span>{timeLabel}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Notes Textarea */}
                <div className="form-group">
                  <label className="form-label">Anything else Judith should know?</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Tell us about your biggest challenge..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Submit CTA */}
                <button type="submit" className="btn-primary form-submit-btn">
                  <Lock size={16} /> Proceed to Secure Stripe Payment <ArrowRight size={18} />
                </button>

                <p className="form-disclaimer">
                  By clicking, you agree to our{' '}
                  <a href="#privacy" onClick={(e) => { e.preventDefault(); setCurrentPage('privacy'); }}>
                    Privacy Policy
                  </a>.
                </p>
              </form>
            </div>
          </div>

          {/* Social Proof Logos Strip */}
          <div className="students-work-strip">
            <span className="strip-label">OUR STUDENTS WORK AT</span>
            <div className="logos-row">
              <span className="company-logo">Google</span>
              <span className="company-logo">Meta</span>
              <span className="company-logo">Nubank</span>
              <span className="company-logo">Itaú</span>
            </div>
          </div>
        </div>
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      <style>{`
        .consultant-page { background-color: #F4F7FB; }
        .form-section { padding: 60px 0 80px 0; }
        .form-layout-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: start; }
        .left-info { display: flex; flex-direction: column; gap: 20px; }
        .form-main-title { font-size: 44px; font-weight: 800; color: #041527; line-height: 1.15; letter-spacing: -1px; }
        .form-main-subtitle { font-size: 16px; color: #475569; line-height: 1.6; }
        .info-feature-list { display: flex; flex-direction: column; gap: 20px; margin-top: 10px; }
        .info-feature { display: flex; gap: 16px; align-items: flex-start; }
        .feature-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .feature-icon.dark-bg { background: #041527; }
        .feature-icon.gold-bg { background: #F5A623; }
        .info-feature h5 { font-size: 15px; font-weight: 700; color: #041527; margin-bottom: 4px; }
        .info-feature p { font-size: 14px; color: #64748B; line-height: 1.4; }
        .divider-line { height: 1px; background: #CBD5E1; margin: 10px 0; }
        .judith-quote-box { display: flex; align-items: center; gap: 16px; }
        .judith-avatar { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; }
        .judith-name { font-size: 14px; font-weight: 700; color: #041527; }
        .judith-quote { font-size: 14px; font-style: italic; color: #475569; }
        .right-form-card { background: #FFFFFF; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(4, 21, 39, 0.08); position: relative; overflow: hidden; }
        .card-top-accent { position: absolute; top: 0; left: 0; right: 0; height: 6px; background: var(--gold-gradient); }
        .form-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-submit-btn { width: 100%; padding: 16px; font-size: 16px; margin-top: 10px; }
        .form-disclaimer { text-align: center; font-size: 12px; color: #64748B; margin-top: 16px; }
        .form-disclaimer a { color: #B45309; font-weight: 600; }
        .students-work-strip { margin-top: 80px; text-align: center; }
        .strip-label { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; color: #64748B; margin-bottom: 24px; display: block; }
        .logos-row { display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap; }
        .company-logo { font-size: 24px; font-weight: 800; color: #475569; letter-spacing: -0.5px; opacity: 0.85; }
        @media (max-width: 900px) {
          .form-layout-grid, .form-two-col { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
