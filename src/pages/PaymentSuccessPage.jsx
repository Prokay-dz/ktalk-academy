import React, { useEffect } from 'react';
import { CheckCircle, Calendar, MessageCircle, ArrowRight, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { companyInfo } from '../data/mockData';

export default function PaymentSuccessPage({ setCurrentPage, bookingData }) {
  const cleanPhone = companyInfo.phone.replace(/[^0-9]/g, ''); // 5555920019028
  
  const studentName = bookingData?.name || 'New Student';
  const level = bookingData?.level || 'Intermediate';
  const goal = bookingData?.goal || 'Business & Career Advancement';

  const waMessage = encodeURIComponent(
    `Hello Judith! I just completed my diagnostic consultation booking and membership payment on KTalk Academy.\n\n` +
    `*Name:* ${studentName}\n` +
    `*English Level:* ${level}\n` +
    `*Goal:* ${goal}\n` +
    `*Phone:* ${bookingData?.phone || companyInfo.phone}`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${waMessage}`;

  useEffect(() => {
    // Automatically redirect/open Judith's WhatsApp upon landing on Payment Success
    const timer = setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
    return () => clearTimeout(timer);
  }, [whatsappUrl]);

  return (
    <div className="success-page">
      <Header currentPage="payment-success" setCurrentPage={setCurrentPage} />

      <main className="success-container">
        <div className="container">
          <div className="success-card">
            {/* Animated Checkmark Icon */}
            <div className="icon-wrapper">
              <CheckCircle size={64} color="#10B981" />
            </div>

            <div className="success-badge">
              <ShieldCheck size={14} /> STRIPE PAYMENT & BOOKING APPROVED
            </div>

            <h1 className="success-title">Welcome to KTalk Academy!</h1>
            <p className="success-subtitle">
              Your consultation call & personalized learning roadmap with <strong>Judith M.</strong> has been successfully booked. Redirecting you to Judith's direct WhatsApp...
            </p>

            {/* Direct WhatsApp Redirection CTA Banner */}
            <div className="whatsapp-callout-box">
              <div className="wa-icon-circle">
                <MessageCircle size={28} color="#FFFFFF" />
              </div>
              <div className="wa-text-block">
                <h3>Direct WhatsApp Connection</h3>
                <p>Connecting you directly with Judith M. on <strong>{companyInfo.phone}</strong></p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-direct-btn"
              >
                Chat on WhatsApp <ExternalLink size={16} />
              </a>
            </div>

            {/* Session Info Details Card */}
            <div className="details-box">
              <div className="detail-item">
                <Calendar size={20} color="#F5A623" />
                <div>
                  <div className="detail-label">Scheduled Date & Time</div>
                  <div className="detail-value">Tomorrow at 09:00 AM (BRT Timezone)</div>
                </div>
              </div>

              <div className="detail-item">
                <MessageCircle size={20} color="#F5A623" />
                <div>
                  <div className="detail-label">WhatsApp Confirmation</div>
                  <div className="detail-value">Sent to {bookingData?.phone || companyInfo.phone}</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="actions-group">
              <button 
                className="btn-primary"
                onClick={() => setCurrentPage('student-dashboard')}
                style={{ width: '100%', padding: '16px', fontSize: '16px' }}
              >
                Go to Student Portal <ArrowRight size={18} />
              </button>

              <button className="btn-secondary" style={{ width: '100%', padding: '14px' }}>
                <Download size={16} /> Add Call to Google Calendar (.ics)
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      <style>{`
        .success-page {
          background-color: #F4F7FB;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .success-container {
          padding: 60px 0;
          flex-grow: 1;
          display: flex;
          align-items: center;
        }
        .success-card {
          background: #FFFFFF;
          border-radius: 24px;
          padding: 48px 40px;
          max-width: 620px;
          margin: 0 auto;
          text-align: center;
          box-shadow: 0 20px 40px rgba(4, 21, 39, 0.08);
          border: 1px solid #E2E8F0;
        }
        .icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #ECFDF5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
        }
        .success-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ECFDF5;
          color: #047857;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.5px;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 14px;
        }
        .success-title {
          font-size: 34px;
          font-weight: 800;
          color: #041527;
          margin-bottom: 12px;
        }
        .success-subtitle {
          font-size: 15px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .whatsapp-callout-box {
          background: #25D366;
          border-radius: 16px;
          padding: 20px;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
          margin-bottom: 28px;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
        }
        .wa-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wa-text-block { flex-grow: 1; }
        .wa-text-block h3 { font-size: 16px; font-weight: 800; }
        .wa-text-block p { font-size: 12px; opacity: 0.95; }
        .wa-direct-btn {
          background: #FFFFFF;
          color: #075E54;
          font-weight: 800;
          font-size: 13px;
          padding: 10px 16px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .wa-direct-btn:hover { background: #F8FAFC; }

        .details-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 28px;
          text-align: left;
        }
        .detail-item { display: flex; align-items: center; gap: 16px; }
        .detail-label { font-size: 12px; color: #64748B; font-weight: 600; }
        .detail-value { font-size: 14px; color: #041527; font-weight: 700; }
        .actions-group { display: flex; flex-direction: column; gap: 12px; }
      `}</style>
    </div>
  );
}
