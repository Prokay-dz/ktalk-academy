import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2, ShieldCheck, Phone, Mail } from 'lucide-react';
import { companyInfo } from '../data/mockData';

export default function StripePaymentModal({ isOpen, onClose, plan, onPaymentSuccess }) {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const planName = plan?.name || 'Diagnostic Consultation & Membership';
  const priceAmount = plan?.price || '120';

  const formatCardNumber = (val) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return val;
    }
  };

  const handleCardChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      setTimeout(() => {
        onPaymentSuccess();
      }, 1000);
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="stripe-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="stripe-modal-header">
          <div className="stripe-brand">
            <div className="stripe-logo-pill">
              <CreditCard size={18} color="#635BFF" />
            </div>
            <div>
              <span className="stripe-title">Stripe Checkout</span>
              <span className="stripe-secured"><Lock size={12} /> 256-bit Encrypted</span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        {/* Order Summary Box */}
        <div className="order-summary-box">
          <div className="summary-left">
            <div className="merchant-name">{companyInfo.name}</div>
            <div className="plan-title">{planName}</div>
            <div className="merchant-location">{companyInfo.headquarters}</div>
          </div>
          <div className="summary-right">
            <span className="currency-symbol">R$</span>
            <span className="price-big">{priceAmount}</span>
          </div>
        </div>

        {isDone ? (
          <div className="payment-done-box">
            <CheckCircle2 size={56} color="#10B981" />
            <h3>Payment Approved!</h3>
            <p>Redirecting to your student portal confirmation...</p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="stripe-form">
            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Full Name as on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Card Information</label>
              <div className="stripe-input-container">
                <input
                  type="text"
                  className="stripe-input card-num-input"
                  placeholder="1234 5678 9101 1121"
                  maxLength={19}
                  value={cardNumber}
                  onChange={handleCardChange}
                  required
                />
                <div className="stripe-card-brands">
                  <span>VISA</span>
                  <span>MC</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Expires</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="MM / YY"
                  maxLength={5}
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">CVC / CVV</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="123"
                  maxLength={4}
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="97110-000"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="stripe-pay-btn"
            >
              {isProcessing ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <ShieldCheck size={18} /> Pay R$ {priceAmount}.00 with Stripe
                </>
              )}
            </button>

            <div className="stripe-footer-note">
              <span>Support: {companyInfo.email}</span> • <span>WhatsApp: {companyInfo.phone}</span>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .stripe-modal-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 32px;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
          animation: popIn 0.25s ease-out;
        }
        .stripe-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #E2E8F0;
        }
        .stripe-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .stripe-logo-pill {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #F4F3FF;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stripe-title {
          font-size: 16px;
          font-weight: 800;
          color: #041527;
          display: block;
        }
        .stripe-secured {
          font-size: 11px;
          color: #635BFF;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .close-btn {
          background: none;
          border: none;
          color: #64748B;
        }
        .order-summary-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .merchant-name {
          font-size: 12px;
          font-weight: 700;
          color: #64748B;
        }
        .plan-title {
          font-size: 16px;
          font-weight: 800;
          color: #041527;
        }
        .merchant-location {
          font-size: 11px;
          color: #94A3B8;
        }
        .summary-right {
          text-align: right;
          color: #041527;
        }
        .currency-symbol {
          font-size: 16px;
          font-weight: 800;
          margin-right: 2px;
        }
        .price-big {
          font-size: 32px;
          font-weight: 800;
        }

        .stripe-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        .card-num-input {
          width: 100%;
          padding: 14px 18px;
          font-size: 15px;
          border-radius: 10px;
          border: 1px solid #CBD5E1;
        }
        .stripe-card-brands {
          position: absolute;
          right: 12px;
          display: flex;
          gap: 6px;
          font-size: 10px;
          font-weight: 800;
          color: #635BFF;
        }

        .stripe-pay-btn {
          width: 100%;
          background: #635BFF;
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 700;
          padding: 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 14px rgba(99, 91, 255, 0.4);
          margin-top: 12px;
        }
        .stripe-pay-btn:hover {
          background: #0A2540;
        }
        .stripe-footer-note {
          text-align: center;
          font-size: 11px;
          color: #64748B;
          margin-top: 16px;
        }
        .payment-done-box {
          text-align: center;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
      `}</style>
    </div>
  );
}
