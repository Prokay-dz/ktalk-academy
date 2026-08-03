import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { companyInfo } from '../data/mockData';

export default function PrivacyPolicyPage({ setCurrentPage }) {
  return (
    <div className="privacy-page">
      <Header currentPage="privacy" setCurrentPage={setCurrentPage} />

      <main className="privacy-body">
        <div className="container">
          <button 
            className="back-btn"
            onClick={() => setCurrentPage('landing')}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <div className="privacy-card">
            <div className="privacy-header">
              <div className="icon-box">
                <ShieldCheck size={32} color="#041527" />
              </div>
              <div>
                <h1>Privacy Policy</h1>
                <p className="last-updated">Effective Date: January 1, {companyInfo.copyrightYear}</p>
              </div>
            </div>

            <div className="privacy-content">
              <section>
                <h2>1. Information We Collect</h2>
                <p>
                  At <strong>{companyInfo.name}</strong> (led by founder {companyInfo.founder}), we collect personal data to provide tailored English language instruction, diagnostic calls, and coaching. Information collected includes:
                </p>
                <ul>
                  <li>Full Name and WhatsApp contact information.</li>
                  <li>Current English proficiency self-assessment level.</li>
                  <li>Career goals and learning objectives.</li>
                  <li>Billing and Stripe payment confirmation data.</li>
                </ul>
              </section>

              <section>
                <h2>2. How We Use Your Information</h2>
                <p>
                  Your information is processed in accordance with the Brazilian General Data Protection Law (LGPD - Lei Geral de Proteção de Dados) for:
                </p>
                <ul>
                  <li>Scheduling and conducting your 15-minute diagnostic consultation call.</li>
                  <li>Customizing Judith's curriculum and feedback for your professional track.</li>
                  <li>Communicating schedule updates and assignment feedback via WhatsApp or email.</li>
                  <li>Processing secure payment transactions through Stripe.</li>
                </ul>
              </section>

              <section>
                <h2>3. Security & Payments</h2>
                <p>
                  All payment data is encrypted and securely processed by <strong>Stripe</strong>. KTalk Academy does not store raw credit card numbers on its servers.
                </p>
              </section>

              <section>
                <h2>4. Data Controller & Contact Information</h2>
                <p>
                  For any privacy inquiries, data modification, or deletion requests, please reach out directly to our headquarters:
                </p>

                <div className="contact-details-box">
                  <div className="contact-line">
                    <MapPin size={18} color="#F5A623" />
                    <div>
                      <strong>Headquarters:</strong> {companyInfo.headquarters}
                    </div>
                  </div>
                  <div className="contact-line">
                    <Mail size={18} color="#F5A623" />
                    <div>
                      <strong>Email:</strong> <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                    </div>
                  </div>
                  <div className="contact-line">
                    <Phone size={18} color="#F5A623" />
                    <div>
                      <strong>Telephone / WhatsApp:</strong> <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      <style>{`
        .privacy-page {
          background-color: #F4F7FB;
          min-height: 100vh;
        }
        .privacy-body {
          padding: 40px 0 80px 0;
        }
        .back-btn {
          background: none;
          border: none;
          font-size: 14px;
          font-weight: 700;
          color: #041527;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 24px;
        }
        .privacy-card {
          background: #FFFFFF;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 10px 30px rgba(4, 21, 39, 0.05);
          border: 1px solid #E2E8F0;
        }
        .privacy-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 1px solid #E2E8F0;
        }
        .icon-box {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: #FFFBEB;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .privacy-header h1 {
          font-size: 32px;
          font-weight: 800;
          color: #041527;
        }
        .last-updated {
          font-size: 13px;
          color: #64748B;
        }
        .privacy-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
          color: #334155;
          line-height: 1.7;
        }
        .privacy-content h2 {
          font-size: 20px;
          font-weight: 800;
          color: #041527;
          margin-bottom: 12px;
        }
        .privacy-content ul {
          margin-left: 24px;
          margin-top: 8px;
        }
        .contact-details-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 24px;
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .contact-line {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
        }
        .contact-line a {
          color: #041527;
          font-weight: 700;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
