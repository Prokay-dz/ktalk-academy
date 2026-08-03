import React from 'react';
import { Lock, Video, CheckCircle2, Circle, ArrowRight, BookOpen, Award, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { studentPortalData } from '../data/mockData';

export default function StudentDashboardPage({ setCurrentPage, isPaid, setIsPaid }) {
  if (!isPaid) {
    return (
      <div className="paywall-page">
        <Header currentPage="student-dashboard" setCurrentPage={setCurrentPage} />
        <main className="paywall-container">
          <div className="container">
            <div className="paywall-card">
              <div className="paywall-icon">
                <Lock size={48} color="#D97706" />
              </div>
              <h1 className="paywall-title">Student Portal Locked</h1>
              <p className="paywall-desc">
                The KTalk Academy student application is an exclusive environment for enrolled members. Choose a plan or book a consultation call to unlock your personalized roadmap and live sessions.
              </p>

              <div className="paywall-actions">
                <button 
                  className="btn-primary" 
                  onClick={() => setCurrentPage('pricing')}
                  style={{ padding: '14px 28px' }}
                >
                  Select a Plan <ArrowRight size={16} />
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => setIsPaid(true)}
                  style={{ padding: '14px 28px' }}
                >
                  🔓 Unlock Demo Access
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer setCurrentPage={setCurrentPage} />

        <style>{`
          .paywall-page { background: #F4F7FB; min-height: 100vh; display: flex; flex-direction: column; }
          .paywall-container { padding: 100px 0; flex-grow: 1; display: flex; align-items: center; }
          .paywall-card {
            background: #FFFFFF;
            border-radius: 24px;
            padding: 56px 40px;
            max-width: 580px;
            margin: 0 auto;
            text-align: center;
            box-shadow: 0 20px 40px rgba(4, 21, 39, 0.08);
            border: 1px solid #E2E8F0;
          }
          .paywall-icon {
            width: 80px; height: 80px; border-radius: 50%; background: #FFFBEB;
            display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;
          }
          .paywall-title { font-size: 32px; font-weight: 800; color: #041527; margin-bottom: 12px; }
          .paywall-desc { font-size: 15px; color: #64748B; line-height: 1.6; margin-bottom: 32px; }
          .paywall-actions { display: flex; gap: 14px; justify-center: center; flex-wrap: wrap; justify-content: center; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="student-dashboard-page">
      <Header currentPage="student-dashboard" setCurrentPage={setCurrentPage} />

      <main className="dashboard-body">
        <div className="container">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div>
              <span className="welcome-badge">MEMBER PORTAL</span>
              <h1>Welcome back, {studentPortalData.studentName}!</h1>
              <p>Track your level, join live drills, and review notes from Judith.</p>
            </div>
            <div className="track-pill">
              <Award size={18} color="#F5A623" />
              <div>
                <div className="pill-small">CURRENT TRACK</div>
                <div className="pill-bold">{studentPortalData.currentTrack} ({studentPortalData.level})</div>
              </div>
            </div>
          </div>

          <div className="portal-grid">
            {/* Left Main: Roadmap */}
            <div className="portal-main-col">
              <div className="portal-card">
                <h3><BookOpen size={20} color="#041527" /> Your Personalized Roadmap</h3>
                <p className="card-sub">Judith's step-by-step track to native authority.</p>

                <div className="timeline-list">
                  {studentPortalData.roadmapSteps.map((step, idx) => (
                    <div key={idx} className={`timeline-item ${step.active ? 'active-step' : ''}`}>
                      <div className="timeline-icon">
                        {step.completed ? (
                          <CheckCircle2 size={24} color="#10B981" />
                        ) : step.active ? (
                          <Clock size={24} color="#F5A623" />
                        ) : (
                          <Circle size={24} color="#CBD5E1" />
                        )}
                      </div>
                      <div className="timeline-content">
                        <h4>{step.title}</h4>
                        <span className="timeline-date">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Next Class */}
            <div className="portal-side-col">
              <div className="portal-card next-class-card">
                <span className="live-badge">UPCOMING LIVE DRILL</span>
                <h4>{studentPortalData.nextClass.title}</h4>
                <p className="class-time"><Clock size={16} /> {studentPortalData.nextClass.time}</p>
                <a
                  href={studentPortalData.nextClass.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary join-btn"
                >
                  <Video size={18} /> Join Google Meet Call
                </a>
              </div>

              <div className="portal-card coach-notes-card">
                <div className="coach-header">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80"
                    alt="Judith M."
                  />
                  <div>
                    <h5>Judith's Personal Note</h5>
                    <span>Assigned Coach</span>
                  </div>
                </div>
                <p className="coach-quote">
                  "Lucas, impressive progress on pitch structure! Focus on softening prepositions in international negotiations before our Thursday drill."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      <style>{`
        .student-dashboard-page { background: #F4F7FB; min-height: 100vh; }
        .dashboard-body { padding: 40px 0 80px 0; }
        .welcome-banner {
          background: #041527;
          border-radius: 20px;
          padding: 40px;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }
        .welcome-badge {
          background: rgba(245, 166, 35, 0.2);
          color: #F5A623;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 12px;
          letter-spacing: 0.5px;
        }
        .welcome-banner h1 { font-size: 32px; font-weight: 800; margin: 8px 0 4px 0; }
        .welcome-banner p { font-size: 15px; color: #94A3B8; }
        .track-pill {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .pill-small { font-size: 10px; font-weight: 700; color: #94A3B8; letter-spacing: 0.5px; }
        .pill-bold { font-size: 14px; font-weight: 700; color: #FFFFFF; }

        .portal-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 28px; }
        .portal-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 32px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          margin-bottom: 24px;
        }
        .portal-card h3 { font-size: 20px; font-weight: 800; color: #041527; display: flex; align-items: center; gap: 10px; }
        .card-sub { font-size: 14px; color: #64748B; margin-bottom: 24px; }

        .timeline-list { display: flex; flex-direction: column; gap: 20px; position: relative; }
        .timeline-item { display: flex; gap: 16px; align-items: flex-start; }
        .timeline-content h4 { font-size: 16px; font-weight: 700; color: #041527; }
        .timeline-date { font-size: 13px; color: #64748B; }

        .next-class-card { background: #041527; color: #FFFFFF; }
        .live-badge { background: #10B981; color: #FFFFFF; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 12px; }
        .next-class-card h4 { font-size: 18px; font-weight: 800; margin: 12px 0 8px 0; }
        .class-time { font-size: 13px; color: #94A3B8; display: flex; align-items: center; gap: 6px; margin-bottom: 20px; }
        .join-btn { width: 100%; padding: 14px; font-size: 14px; }

        .coach-notes-card { background: #FFFBEB; border-color: #FDE68A; }
        .coach-header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .coach-header img { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; }
        .coach-header h5 { font-size: 14px; font-weight: 700; color: #041527; }
        .coach-header span { font-size: 12px; color: #B45309; }
        .coach-quote { font-size: 13px; font-style: italic; color: #78350F; line-height: 1.5; }

        @media (max-width: 900px) {
          .portal-grid { grid-template-columns: 1fr; }
          .welcome-banner { flex-direction: column; align-items: flex-start; gap: 20px; }
        }
      `}</style>
    </div>
  );
}
