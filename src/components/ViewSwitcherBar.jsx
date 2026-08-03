import React from 'react';
import { Globe, DollarSign, ClipboardList, CheckCircle2, LogIn, UserCheck, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function ViewSwitcherBar({ currentPage, setCurrentPage, isPaid, setIsPaid }) {
  const views = [
    { id: 'landing', label: 'Landing Page', icon: Globe },
    { id: 'pricing', label: 'Pricing Page', icon: DollarSign },
    { id: 'consultant-form', label: 'Consultant Form', icon: ClipboardList },
    { id: 'payment-success', label: 'Payment Success', icon: CheckCircle2 },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'login', label: 'Student Login', icon: LogIn },
    { id: 'student-dashboard', label: 'Student Portal', icon: UserCheck, requiresPayment: true },
    { id: 'admin-dashboard', label: "Judith's Admin Dashboard", icon: ShieldAlert }
  ];

  return (
    <div className="demo-switcher-bar">
      <div className="demo-switcher-title">
        <span style={{ fontSize: '14px' }}>🎓</span>
        <span>KTalk Academy (2026 Updated)</span>
        <button
          onClick={() => setIsPaid(!isPaid)}
          style={{
            marginLeft: '12px',
            fontSize: '11px',
            fontWeight: '700',
            padding: '3px 8px',
            borderRadius: '12px',
            background: isPaid ? '#10B981' : '#F59E0B',
            color: '#FFFFFF',
            cursor: 'pointer',
            border: 'none'
          }}
          title="Toggle Payment Status (Paywall Access)"
        >
          {isPaid ? '✓ Paid Member Access' : '🔒 Unpaid (Paywall Active)'}
        </button>
      </div>

      <div className="demo-switcher-tabs">
        {views.map((v) => {
          const Icon = v.icon;
          const isActive = currentPage === v.id;
          return (
            <button
              key={v.id}
              className={`switcher-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentPage(v.id)}
            >
              <Icon size={13} style={{ marginRight: '4px' }} />
              {v.label}
              {v.requiresPayment && !isPaid && ' 🔒'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
