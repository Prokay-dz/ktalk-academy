import React from 'react';
import { ArrowRight, Globe, CheckCircle2, Lightbulb, Zap, Users, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LandingPage({ setCurrentPage }) {
  return (
    <div className="landing-page">
      <Header currentPage="landing" setCurrentPage={setCurrentPage} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Hero Left Content */}
          <div className="hero-content">
            <div className="badge-tag badge-navy">
              <Globe size={14} /> Global Communication Excellence
            </div>
            
            <h1 className="hero-title">
              Master English with <br />
              <span className="heading-highlight">Judith's Method</span>
            </h1>

            <p className="hero-description">
              Designed specifically for high-achieving Brazilians, our premium immersion program bridges the gap between learning and living the language. Experience the authority of native-level fluency.
            </p>

            <div className="hero-cta-group">
              <button 
                className="btn-primary"
                onClick={() => setCurrentPage('consultant-form')}
              >
                Book Your Consultation <ArrowRight size={18} />
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setCurrentPage('pricing')}
              >
                Explore Programs
              </button>
            </div>

            {/* Social Proof */}
            <div className="social-proof">
              <div className="avatar-stack">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="Student" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Student" />
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80" alt="Student" />
              </div>
              <span className="proof-text">Joined by 500+ professionals in São Paulo</span>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="hero-visual">
            <div className="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                alt="Judith teaching online"
                className="main-hero-img"
              />
              {/* Overlay Badge */}
              <div className="certified-badge">
                <div className="badge-icon-box">
                  <CheckCircle2 size={20} color="#041527" />
                </div>
                <div>
                  <div className="badge-title">Certified Method</div>
                  <div className="badge-subtitle">Oxford-based Curriculum</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Brazilians Choose KTalk Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Brazilians Choose KTalk</h2>
            <p>
              We don't just teach grammar; we build cultural bridges. Our Judith Method is tailored for the specific linguistic patterns of Portuguese speakers.
            </p>
          </div>

          {/* Feature Grid Top (2 columns) */}
          <div className="features-top-grid">
            {/* Card 1: Dark Judith Method */}
            <div className="feature-card dark-card">
              <div className="card-inner">
                <h3>The Judith Method</h3>
                <p>
                  Our proprietary system focuses on "Intuitive Mastery"—eliminating the mental translation process that slows down Brazilian learners in corporate environments.
                </p>
                <a href="#science" onClick={(e) => { e.preventDefault(); setCurrentPage('consultant-form'); }} className="discover-link">
                  Discover the Science <ArrowRight size={16} />
                </a>
              </div>
              <div className="book-illustration">
                <BookOpen size={180} opacity={0.15} color="#FFFFFF" />
              </div>
            </div>

            {/* Card 2: Light Blue Global Context */}
            <div className="feature-card ice-card">
              <div className="icon-circle navy-icon">
                <Globe size={20} color="#FFFFFF" />
              </div>
              <h3>Global Context</h3>
              <p>Real-world scenarios from Silicon Valley to London finance.</p>
              
              <div className="stat-box">
                <div className="stat-number">98%</div>
                <div className="stat-label">SATISFACTION RATE</div>
              </div>
            </div>
          </div>

          {/* Feature Grid Bottom (3 columns) */}
          <div className="features-bottom-grid">
            <div className="feature-card white-card">
              <div className="icon-badge amber-badge">
                <Lightbulb size={18} color="#D97706" />
              </div>
              <h4>Cultural Nuance</h4>
              <p>Learn the "unspoken rules" of international business etiquette.</p>
            </div>

            <div className="feature-card white-card">
              <div className="icon-badge amber-badge">
                <Zap size={18} color="#D97706" />
              </div>
              <h4>Rapid Fluency</h4>
              <p>Accelerated tracks for executives moving abroad in 3-6 months.</p>
            </div>

            <div className="feature-card white-card">
              <div className="icon-badge amber-badge">
                <Users size={18} color="#D97706" />
              </div>
              <h4>Elite Community</h4>
              <p>Networking events with like-minded Brazilian professionals worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <h2>Ready to Transform Your Communication?</h2>
            <p>
              The difference between a "good" English speaker and an "influential" one is often the method they use. Take the first step toward authority today.
            </p>
            <button 
              className="btn-primary"
              onClick={() => setCurrentPage('consultant-form')}
              style={{ fontSize: '16px', padding: '16px 36px' }}
            >
              Book Your Free Consultation Now
            </button>
            <span className="cta-caption">No commitment required. Limited slots available this month.</span>
          </div>
        </div>
      </section>

      <Footer setCurrentPage={setCurrentPage} />

      <style>{`
        .landing-page {
          background-color: #F4F7FB;
        }

        /* Hero Section */
        .hero-section {
          padding: 60px 0 80px 0;
          background: linear-gradient(180deg, #F4F7FB 0%, #E8F0FE 100%);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .hero-title {
          font-size: 52px;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1.5px;
          color: #041527;
          margin: 20px 0;
        }
        .hero-description {
          font-size: 17px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 520px;
        }
        .hero-cta-group {
          display: flex;
          gap: 16px;
          margin-bottom: 36px;
        }
        .social-proof {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .avatar-stack {
          display: flex;
        }
        .avatar-stack img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid #FFFFFF;
          margin-left: -10px;
          object-fit: cover;
        }
        .avatar-stack img:first-child {
          margin-left: 0;
        }
        .proof-text {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        /* Hero Visual Right */
        .hero-visual {
          position: relative;
        }
        .image-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(4, 21, 39, 0.12);
        }
        .main-hero-img {
          width: 100%;
          height: 520px;
          object-fit: cover;
          display: block;
        }
        .certified-badge {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: #FFFFFF;
          border-radius: 14px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .badge-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #F5A623;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge-title {
          font-size: 14px;
          font-weight: 700;
          color: #041527;
        }
        .badge-subtitle {
          font-size: 12px;
          color: #64748B;
        }

        /* Section Title */
        .features-section {
          padding: 80px 0;
        }
        .section-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 50px auto;
        }
        .section-header h2 {
          font-size: 36px;
          font-weight: 800;
          color: #041527;
          letter-spacing: -1px;
          margin-bottom: 14px;
        }
        .section-header p {
          font-size: 16px;
          color: #475569;
          line-height: 1.6;
        }

        /* Top Grid */
        .features-top-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        .feature-card {
          border-radius: 20px;
          padding: 36px;
          position: relative;
          overflow: hidden;
        }
        .dark-card {
          background: #041527;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 260px;
        }
        .dark-card h3 {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 14px;
        }
        .dark-card p {
          font-size: 15px;
          color: #94A3B8;
          line-height: 1.6;
          max-width: 440px;
          margin-bottom: 28px;
        }
        .discover-link {
          color: #F5A623;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .book-illustration {
          position: absolute;
          right: -20px;
          bottom: -30px;
          pointer-events: none;
        }

        .ice-card {
          background: #E4ECFB;
          color: #041527;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .icon-circle.navy-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #041527;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .ice-card h3 {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .ice-card p {
          font-size: 14px;
          color: #475569;
          margin-bottom: 24px;
        }
        .stat-box {
          border-top: 1px solid #CBD5E1;
          padding-top: 16px;
        }
        .stat-number {
          font-size: 36px;
          font-weight: 800;
          color: #041527;
        }
        .stat-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #64748B;
        }

        /* Bottom Grid */
        .features-bottom-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .white-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
        }
        .icon-badge.amber-badge {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #FFFBEB;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .white-card h4 {
          font-size: 18px;
          font-weight: 700;
          color: #041527;
          margin-bottom: 8px;
        }
        .white-card p {
          font-size: 14px;
          color: #64748B;
          line-height: 1.5;
        }

        /* CTA Banner */
        .cta-banner-section {
          padding: 40px 0 80px 0;
        }
        .cta-banner-card {
          background: #041527;
          border-radius: 24px;
          padding: 64px 32px;
          text-align: center;
          color: #FFFFFF;
          max-width: 1000px;
          margin: 0 auto;
        }
        .cta-banner-card h2 {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }
        .cta-banner-card p {
          font-size: 16px;
          color: #94A3B8;
          max-width: 620px;
          margin: 0 auto 36px auto;
          line-height: 1.6;
        }
        .cta-caption {
          display: block;
          font-size: 13px;
          color: #64748B;
          margin-top: 16px;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 38px;
          }
          .features-top-grid, .features-bottom-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
