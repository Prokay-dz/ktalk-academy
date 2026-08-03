import React, { useState } from 'react';
import { Lock, LogIn, ArrowRight, ShieldAlert, CreditCard } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function StudentLoginPage({ setCurrentPage, isPaid, setIsPaid }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Allow Judith (Admin) login
    if (email.toLowerCase().includes('judith') || email.toLowerCase().includes('admin')) {
      setCurrentPage('admin-dashboard');
      return;
    }

    // Enforce strict payment validation for student login
    if (!isPaid) {
      setErrorMsg('Access Denied: We could not find an active paid membership for this account. Access to the Student Portal requires an active paid subscription.');
      return;
    }

    setCurrentPage('student-dashboard');
  };

  return (
    <div className="login-page">
      <Header currentPage="login" setCurrentPage={setCurrentPage} />

      <main className="login-container">
        <div className="container">
          <div className="login-card">
            <div className="login-icon">
              <Lock size={28} color="#041527" />
            </div>

            <h1 className="login-title">Sign in to KTalk Academy</h1>
            <p className="login-subtitle">Access your personalized learning roadmap, live sessions, and Judith's feedback.</p>

            {errorMsg && (
              <div className="error-banner">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <ShieldAlert size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>{errorMsg}</strong>
                    <button 
                      onClick={() => setCurrentPage('pricing')} 
                      className="btn-primary error-pay-btn"
                    >
                      <CreditCard size={14} /> View Plans & Pay with Stripe →
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="lucas.ferreira@company.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary login-btn-submit">
                <LogIn size={16} /> Sign In to Student Portal
              </button>
            </form>

            <div className="demo-shortcuts">
              <div className="demo-divider"><span>ADMIN ACCESS</span></div>
              <button className="btn-navy demo-btn" onClick={() => setCurrentPage('admin-dashboard')}>
                <ShieldAlert size={16} color="#F5A623" /> Judith (Admin Dashboard Access)
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      <style>{`
        .login-page {
          background-color: #F4F7FB;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .login-container {
          padding: 80px 0;
          flex-grow: 1;
          display: flex;
          align-items: center;
        }
        .login-card {
          background: #FFFFFF;
          border-radius: 24px;
          padding: 48px;
          max-width: 480px;
          margin: 0 auto;
          box-shadow: 0 20px 40px rgba(4, 21, 39, 0.08);
          border: 1px solid #E2E8F0;
        }
        .login-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: #FFFBEB;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .login-title {
          font-size: 28px;
          font-weight: 800;
          color: #041527;
          margin-bottom: 8px;
        }
        .login-subtitle {
          font-size: 14px;
          color: #64748B;
          line-height: 1.5;
          margin-bottom: 28px;
        }
        .error-banner {
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 14px;
          padding: 16px;
          font-size: 13px;
          color: #991B1B;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        .error-pay-btn {
          margin-top: 12px;
          padding: 10px 16px;
          font-size: 13px;
          width: 100%;
        }
        .login-btn-submit {
          width: 100%;
          padding: 14px;
          font-size: 15px;
          margin-top: 10px;
        }
        .demo-shortcuts {
          margin-top: 32px;
        }
        .demo-divider {
          text-align: center;
          border-bottom: 1px solid #E2E8F0;
          line-height: 0.1em;
          margin: 20px 0 24px 0;
        }
        .demo-divider span {
          background: #FFFFFF;
          padding: 0 10px;
          font-size: 11px;
          font-weight: 700;
          color: #94A3B8;
        }
        .demo-btn {
          width: 100%;
          justify-content: center;
          padding: 12px;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
