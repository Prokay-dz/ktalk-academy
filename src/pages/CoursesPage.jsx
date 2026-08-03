import React, { useState } from 'react';
import { BookOpen, Clock, Users, Award, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StripePaymentModal from '../components/StripePaymentModal';

export const coursesList = [
  {
    id: 'biz-neg',
    title: 'Business English: High-Stakes Negotiation Tactics',
    category: 'Executive Series',
    duration: '6 Weeks (12 Modules)',
    level: 'Advanced / Executive',
    price: '120',
    description: 'Master the art of diplomatic counter-offering, boardroom influence, and persuasive pitch delivery in international business settings.',
    modules: [
      'Framing & Anchoring Offers in English',
      'Tactful Disagreement & Softening Direct Speech',
      'Closing Cross-Border Corporate Deals',
      'Live Negotiation Roleplay & Judith’s Feedback'
    ]
  },
  {
    id: 'ielts-prep',
    title: 'Academic Writing & IELTS 8.0 Accelerator',
    category: 'Academic Series',
    duration: '8 Weeks (16 Modules)',
    level: 'Intermediate to Advanced',
    price: '120',
    description: 'Designed for Brazilians pursuing global MBA programs or relocation. Focuses on Band 8+ essay structuring and rapid academic reading.',
    modules: [
      'Task 1 Data Visualizations & Trend Summaries',
      'Task 2 Complex Argumentative Essay Structures',
      'Advanced Cohesion, Lexical Resource & Grammar',
      'Timed Mock Examinations & Detailed Grading'
    ]
  },
  {
    id: 'exec-pitch',
    title: 'Executive Presentation & Boardroom Pitching',
    category: 'Leadership Series',
    duration: '4 Weeks (8 Modules)',
    level: 'Upper Intermediate / Advanced',
    price: '120',
    description: 'Overcome presentation anxiety in front of native-speaking stakeholders. Learn how to field tough Q&A sessions with authority.',
    modules: [
      'Structuring High-Impact Executive Slides',
      'Vocal Intonation, Pace & Confidence Training',
      'Handling Unscripted Hostile Questions',
      'Final Pitch Simulation to Judith M.'
    ]
  },
  {
    id: 'fluency-track',
    title: 'Intuitive Mastery: Brazilian Fluency Track',
    category: 'Foundational Series',
    duration: '12 Weeks (24 Modules)',
    level: 'Beginner to Intermediate',
    price: '49',
    description: 'Eliminate the mental Portuguese-to-English translation process. Re-wire your linguistic habits for spontaneous conversational flow.',
    modules: [
      'Eliminating Brazilian False Cognates & Pronunciation Pitfalls',
      'Spontaneous Storytelling & Conversational Transition Phrases',
      'Real-world Situational Immersion (Silicon Valley & London scenarios)',
      'Weekly Group Live Drills & Pronunciation Lab'
    ]
  }
];

export default function CoursesPage({ setCurrentPage, setIsPaid }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isStripeOpen, setIsStripeOpen] = useState(false);

  const handleEnroll = (course) => {
    setSelectedCourse(course);
    setIsStripeOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setIsStripeOpen(false);
    setCurrentPage('payment-success');
  };

  return (
    <div className="courses-page">
      <Header currentPage="courses" setCurrentPage={setCurrentPage} />

      <StripePaymentModal
        isOpen={isStripeOpen}
        onClose={() => setIsStripeOpen(false)}
        plan={selectedCourse ? { name: selectedCourse.title, price: selectedCourse.price } : null}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <section className="courses-hero">
        <div className="container text-center">
          <div className="badge-tag badge-gold" style={{ marginBottom: '16px' }}>
            <Award size={14} /> OXFORD-BASED CURRICULUM
          </div>
          <h1 className="courses-title">
            Judith's Specialized <span className="heading-highlight">English Courses</span>
          </h1>
          <p className="courses-subtitle">
            Explore targeted tracks designed specifically to overcome the linguistic and cultural roadblocks Brazilian professionals face in global business.
          </p>
        </div>
      </section>

      <section className="courses-grid-section">
        <div className="container">
          <div className="courses-grid">
            {coursesList.map((course) => (
              <div key={course.id} className="course-card">
                <div className="card-top-tag">{course.category}</div>
                <h3 className="course-name">{course.title}</h3>

                <div className="course-meta-row">
                  <span><Clock size={14} /> {course.duration}</span>
                  <span><Users size={14} /> {course.level}</span>
                </div>

                <p className="course-desc">{course.description}</p>

                <div className="modules-box">
                  <div className="modules-title">Curriculum Highlights:</div>
                  <ul>
                    {course.modules.map((mod, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={14} color="#F5A623" />
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-bottom">
                  <div className="price-tag">
                    <span className="curr">R$</span>
                    <span className="amt">{course.price}</span>
                    <span className="per">/month</span>
                  </div>
                  <button className="btn-primary enroll-btn" onClick={() => handleEnroll(course)}>
                    <Lock size={14} /> Enroll & Pay with Stripe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer setCurrentPage={setCurrentPage} />

      <style>{`
        .courses-page { background: #F4F7FB; min-height: 100vh; }
        .courses-hero { padding: 60px 0 40px 0; text-align: center; }
        .courses-title { font-size: 46px; font-weight: 800; color: #041527; letter-spacing: -1px; margin-bottom: 14px; }
        .courses-subtitle { font-size: 16px; color: #475569; max-width: 620px; margin: 0 auto; line-height: 1.6; }

        .courses-grid-section { padding: 20px 0 80px 0; }
        .courses-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .course-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 36px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 10px 30px rgba(4, 21, 39, 0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-top-tag {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #B45309;
          text-transform: uppercase;
          background: #FFFBEB;
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          margin-bottom: 14px;
          width: fit-content;
        }
        .course-name { font-size: 22px; font-weight: 800; color: #041527; margin-bottom: 12px; line-height: 1.3; }
        .course-meta-row { display: flex; gap: 20px; font-size: 13px; color: #64748B; margin-bottom: 16px; font-weight: 600; }
        .course-meta-row span { display: flex; align-items: center; gap: 6px; }
        .course-desc { font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px; }

        .modules-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px; }
        .modules-title { font-size: 12px; font-weight: 700; color: #041527; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .modules-box ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .modules-box li { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #334155; }

        .card-bottom { display: flex; align-items: center; justify-content: space-between; gap: 16px; border-top: 1px solid #F1F5F9; padding-top: 20px; }
        .price-tag { color: #041527; }
        .price-tag .curr { font-size: 18px; font-weight: 800; }
        .price-tag .amt { font-size: 32px; font-weight: 800; }
        .price-tag .per { font-size: 12px; color: #64748B; }
        .enroll-btn { padding: 12px 20px; font-size: 14px; }

        @media (max-width: 900px) {
          .courses-grid { grid-template-columns: 1fr; }
          .card-bottom { flex-direction: column; align-items: flex-start; }
          .enroll-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
}
