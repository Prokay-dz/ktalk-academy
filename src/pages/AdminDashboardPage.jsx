import React, { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Users, CreditCard, MessageSquare,
  Search, Bell, Plus, Calendar, Star, Check
} from 'lucide-react';
import AddCourseModal from '../components/AddCourseModal';
import RatingStars from '../components/RatingStars';
import { initialDashboardData } from '../data/mockData';

export default function AdminDashboardPage({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('lessons'); // Matches Screenshot 2 & 3 ('Lessons' highlighted)
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [hourlyRate, setHourlyRate] = useState(dashboardData.pricing.hourlyRate);
  const [rateApplied, setRateApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCourse = (newCourse) => {
    setDashboardData({
      ...dashboardData,
      stats: {
        ...dashboardData.stats,
        activeCourses: dashboardData.stats.activeCourses + 1
      },
      upcomingLessons: [newCourse, ...dashboardData.upcomingLessons]
    });
  };

  const handleApplyRates = () => {
    setDashboardData({
      ...dashboardData,
      pricing: {
        ...dashboardData.pricing,
        hourlyRate
      }
    });
    setRateApplied(true);
    setTimeout(() => setRateApplied(false), 3000);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'pricing', label: 'Pricing Manager', icon: CreditCard },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

  return (
    <div className="admin-dashboard-container">
      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCourse={handleAddCourse}
      />

      {/* Left Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-top">
          <div className="admin-logo" onClick={() => setCurrentPage('landing')}>
            KTalk Academy
          </div>

          {/* Judith's Profile Header */}
          <div className="profile-card">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
              alt="Judith"
              className="profile-avatar"
            />
            <div>
              <div className="profile-name">Judith's Dashboard</div>
              <div className="profile-role">KTALK ADMINISTRATOR</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Button */}
        <div className="sidebar-bottom">
          <button className="btn-primary add-course-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Add New Course
          </button>
        </div>
      </aside>

      {/* Main Oversight Area */}
      <main className="admin-main">
        {/* Top Header */}
        <header className="main-header">
          <div>
            <h1 className="main-title">Academic Oversight</h1>
            <p className="main-subtitle">Welcome back, Judith. Here's what's happening today.</p>
          </div>

          <div className="header-right">
            {/* Search Bar */}
            <div className="search-box">
              <Search size={16} color="#64748B" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Notification Bell */}
            <button className="bell-btn" aria-label="Notifications">
              <Bell size={18} color="#041527" />
              <span className="bell-badge" />
            </button>
          </div>
        </header>

        {/* Dynamic Content Views based on Sidebar Selection */}
        {activeTab === 'students' ? (
          <section className="students-tab-view">
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Enrolled Students Directory</h3>
            <div className="table-wrapper">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Location</th>
                    <th>Plan</th>
                    <th>Roadmap Progress</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.studentsList
                    .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((student) => (
                      <tr key={student.id}>
                        <td style={{ fontWeight: '700' }}>{student.name}</td>
                        <td>{student.location}</td>
                        <td><span className="badge-tag badge-gold">{student.plan}</span></td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="progress-bar-bg" style={{ flexGrow: 1 }}>
                              <div className="progress-bar-fill" style={{ width: `${student.progress}%` }} />
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: '700' }}>{student.progress}%</span>
                          </div>
                        </td>
                        <td style={{ fontSize: '13px', color: '#64748B' }}>{student.lastActive}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <>
            {/* KPI Cards Row (3 Cards) */}
            <section className="kpi-grid">
              {/* Stat 1 */}
              <div className="kpi-card">
                <div className="kpi-label">TOTAL STUDENTS</div>
                <div className="kpi-value-row">
                  <span className="kpi-number">{dashboardData.stats.totalStudents.toLocaleString()}</span>
                  <span className="growth-badge">📈 {dashboardData.stats.totalStudentsGrowth}%</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="kpi-card">
                <div className="kpi-label">ACTIVE COURSES</div>
                <div className="kpi-value-row">
                  <span className="kpi-number">{dashboardData.stats.activeCourses}</span>
                  <span className="growth-badge">📈 {dashboardData.stats.activeCoursesGrowth}%</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="kpi-card">
                <div className="kpi-label">COMPLETION RATE</div>
                <div className="kpi-value-row">
                  <span className="kpi-number">{dashboardData.stats.completionRate}%</span>
                </div>
                {/* Yellow Bar Indicator */}
                <div className="completion-bar-track">
                  <div
                    className="completion-bar-fill"
                    style={{ width: `${dashboardData.stats.completionRate}%` }}
                  />
                </div>
              </div>
            </section>

            {/* Middle Row: Upcoming Lessons & Pricing Manager */}
            <section className="middle-grid">
              {/* Upcoming Lessons Card */}
              <div className="lessons-card">
                <div className="lessons-header">
                  <h3>Upcoming Lessons</h3>
                  <button className="calendar-link" onClick={() => setIsModalOpen(true)}>
                    View Calendar
                  </button>
                </div>

                <div className="lessons-list">
                  {dashboardData.upcomingLessons.map((lesson) => (
                    <div key={lesson.id} className="lesson-item">
                      <div className="date-badge">
                        <span className="date-month">{lesson.dateMonth}</span>
                        <span className="date-day">{lesson.dateDay}</span>
                      </div>

                      <div className="lesson-info">
                        <h4>{lesson.title}</h4>
                        <div className="lesson-meta">
                          <span>🕒 {lesson.time}</span>
                          <span>👥 {lesson.studentsCount} Students</span>
                        </div>
                      </div>

                      <button className="manage-btn">Manage</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Manager Widget (Dark Navy Card) */}
              <div className="pricing-widget-card">
                <div className="widget-header">
                  <h3>Pricing Manager</h3>
                  <CreditCard size={18} color="#F5A623" />
                </div>

                {/* Seasonal Promo Box */}
                <div className="promo-box">
                  <div className="promo-top">
                    <span className="promo-tag">SEASONAL PROMO</span>
                    <span className="active-pill">ACTIVE</span>
                  </div>
                  <div className="promo-discount">{dashboardData.pricing.seasonalPromo}</div>
                  <div className="promo-series">{dashboardData.pricing.promoTarget}</div>
                </div>

                {/* Adjust Global Rate Slider */}
                <div className="slider-block">
                  <div className="slider-label-row">
                    <span>ADJUST GLOBAL RATE</span>
                    <span className="rate-value">${hourlyRate}/hr</span>
                  </div>

                  <input
                    type="range"
                    min="50"
                    max="250"
                    step="5"
                    className="rate-slider"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
                  />
                </div>

                <button className="btn-primary apply-rate-btn" onClick={handleApplyRates}>
                  {rateApplied ? <><Check size={16} /> Rates Updated!</> : 'Apply New Rates'}
                </button>
              </div>
            </section>

            {/* Bottom Row: Recent Feedback */}
            <section className="feedback-section">
              <div className="feedback-box">
                <div className="feedback-header">
                  <div>
                    <h3>Recent Feedback</h3>
                    <p>Direct insights from Judith's global student base</p>
                  </div>
                  <button className="all-feedback-btn">All Feedback</button>
                </div>

                <div className="feedback-grid">
                  {dashboardData.recentFeedback.map((item) => (
                    <div key={item.id} className="testimonial-card">
                      <RatingStars rating={item.rating} />

                      <p className="testimonial-quote">"{item.quote}"</p>

                      <div className="author-row">
                        <div className="author-avatar" style={{ backgroundColor: item.avatarBg }}>
                          {item.avatarInitials}
                        </div>
                        <div>
                          <div className="author-name">{item.name}</div>
                          <div className="author-location">{item.location}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Dashboard Footer */}
        <footer className="admin-footer">
          <div>© 2026 KTalk Academy. Empowering global communication.</div>
          <div className="admin-footer-links">
            <a href="#method" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); }}>Judith's Method</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); setCurrentPage('privacy'); }}>Privacy Policy</a>
            <a href="#support" onClick={(e) => { e.preventDefault(); setCurrentPage('consultant-form'); }}>Contact Support</a>
          </div>
        </footer>
      </main>

      <style>{`
        .admin-dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: #F4F7FB;
          font-family: var(--font-primary);
        }

        /* Sidebar Styling */
        .admin-sidebar {
          width: 260px;
          background-color: #020E1C;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 16px;
          flex-shrink: 0;
        }

        .admin-logo {
          font-size: 20px;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 24px;
          padding-left: 8px;
          cursor: pointer;
        }

        .profile-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          margin-bottom: 24px;
        }
        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        .profile-name {
          font-size: 13px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .profile-role {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #94A3B8;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          background: none;
          border: none;
          color: #94A3B8;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
          text-align: left;
          transition: all 0.2s;
        }
        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
        }
        .sidebar-link.active {
          background: #784E00; /* Matching active highlight in screenshot 2 */
          color: #FFFFFF;
          font-weight: 700;
        }

        .add-course-btn {
          width: 100%;
          padding: 14px;
          font-size: 14px;
        }

        /* Main Area */
        .admin-main {
          flex-grow: 1;
          padding: 32px 40px;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .main-title {
          font-size: 32px;
          font-weight: 800;
          color: #041527;
          letter-spacing: -0.5px;
        }
        .main-subtitle {
          font-size: 14px;
          color: #64748B;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #E8F0FE;
          border-radius: 20px;
          padding: 8px 16px;
          width: 260px;
        }
        .search-box input {
          background: transparent;
          border: none;
          font-size: 13px;
          color: #041527;
          width: 100%;
        }
        .bell-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #E8F0FE;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .bell-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 7px;
          height: 7px;
          background: #EF4444;
          border-radius: 50%;
        }

        /* KPI Cards */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        .kpi-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }
        .kpi-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #64748B;
          margin-bottom: 8px;
        }
        .kpi-value-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .kpi-number {
          font-size: 36px;
          font-weight: 800;
          color: #041527;
          letter-spacing: -1px;
        }
        .growth-badge {
          font-size: 13px;
          font-weight: 700;
          color: #10B981;
        }
        .completion-bar-track {
          width: 100%;
          height: 8px;
          background: #E2E8F0;
          border-radius: 4px;
          margin-top: 12px;
          overflow: hidden;
        }
        .completion-bar-fill {
          height: 100%;
          background: #F5A623;
          border-radius: 4px;
        }

        /* Middle Grid */
        .middle-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        .lessons-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 28px;
          border: 1px solid #E2E8F0;
        }
        .lessons-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .lessons-header h3 {
          font-size: 20px;
          font-weight: 800;
          color: #041527;
        }
        .calendar-link {
          background: none;
          border: none;
          font-size: 13px;
          font-weight: 700;
          color: #B45309;
        }

        .lessons-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .lesson-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 14px 0;
          border-bottom: 1px solid #F1F5F9;
        }
        .lesson-item:last-child {
          border-bottom: none;
        }
        .date-badge {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 8px 12px;
          text-align: center;
          min-width: 54px;
        }
        .date-month {
          display: block;
          font-size: 10px;
          font-weight: 800;
          color: #64748B;
        }
        .date-day {
          display: block;
          font-size: 18px;
          font-weight: 800;
          color: #041527;
        }
        .lesson-info {
          flex-grow: 1;
        }
        .lesson-info h4 {
          font-size: 15px;
          font-weight: 700;
          color: #041527;
          margin-bottom: 4px;
        }
        .lesson-meta {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: #64748B;
        }
        .manage-btn {
          background: #E8F0FE;
          color: #1E40AF;
          font-weight: 700;
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
        }

        /* Pricing Manager Widget */
        .pricing-widget-card {
          background: #041527;
          color: #FFFFFF;
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .widget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .widget-header h3 {
          font-size: 20px;
          font-weight: 800;
        }
        .promo-box {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .promo-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .promo-tag {
          font-size: 10px;
          font-weight: 700;
          color: #94A3B8;
          letter-spacing: 0.5px;
        }
        .active-pill {
          background: #F5A623;
          color: #0F172A;
          font-size: 9px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .promo-discount {
          font-size: 26px;
          font-weight: 800;
        }
        .promo-series {
          font-size: 12px;
          color: #CBD5E1;
        }

        .slider-block {
          margin-bottom: 20px;
        }
        .slider-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 700;
          color: #94A3B8;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .rate-value {
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 800;
        }
        .rate-slider {
          width: 100%;
          accent-color: #F5A623;
          height: 6px;
          cursor: pointer;
        }
        .apply-rate-btn {
          width: 100%;
          padding: 12px;
          font-size: 14px;
        }

        /* Recent Feedback */
        .feedback-box {
          background: #E8F0FE;
          border-radius: 16px;
          padding: 28px;
          border: 1px solid #D0E0FB;
        }
        .feedback-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .feedback-header h3 {
          font-size: 22px;
          font-weight: 800;
          color: #041527;
        }
        .feedback-header p {
          font-size: 13px;
          color: #64748B;
        }
        .all-feedback-btn {
          background: #FFFFFF;
          border: 1px solid #041527;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          color: #041527;
        }

        .feedback-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .testimonial-card {
          background: #FFFFFF;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
        }
        .testimonial-quote {
          font-size: 13px;
          color: #334155;
          line-height: 1.5;
          font-style: italic;
          margin: 14px 0 20px 0;
        }
        .author-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .author-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          color: #041527;
        }
        .author-name {
          font-size: 13px;
          font-weight: 700;
          color: #041527;
        }
        .author-location {
          font-size: 11px;
          color: #64748B;
        }

        /* Students Table */
        .students-tab-view {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 28px;
          border: 1px solid #E2E8F0;
        }
        .students-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .students-table th {
          padding: 12px 16px;
          font-size: 12px;
          color: #64748B;
          border-bottom: 2px solid #E2E8F0;
        }
        .students-table td {
          padding: 16px;
          font-size: 14px;
          border-bottom: 1px solid #F1F5F9;
        }

        .progress-bar-bg {
          height: 6px;
          background: #E2E8F0;
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: #F5A623;
        }

        /* Footer */
        .admin-footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #E2E8F0;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #64748B;
        }
        .admin-footer-links {
          display: flex;
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .kpi-grid, .middle-grid, .feedback-grid {
            grid-template-columns: 1fr;
          }
          .admin-sidebar {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
}
