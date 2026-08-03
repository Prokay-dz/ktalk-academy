import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import ConsultantFormPage from './pages/ConsultantFormPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isPaid, setIsPaid] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="app-main-wrapper">
      {/* Screen Render Switch */}
      {currentPage === 'landing' && (
        <LandingPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'pricing' && (
        <PricingPage
          setCurrentPage={setCurrentPage}
          setSelectedPlan={setSelectedPlan}
          setIsPaid={setIsPaid}
        />
      )}

      {currentPage === 'consultant-form' && (
        <ConsultantFormPage
          setCurrentPage={setCurrentPage}
          setIsPaid={setIsPaid}
        />
      )}

      {currentPage === 'payment-success' && (
        <PaymentSuccessPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'privacy' && (
        <PrivacyPolicyPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'login' && (
        <StudentLoginPage
          setCurrentPage={setCurrentPage}
          isPaid={isPaid}
          setIsPaid={setIsPaid}
        />
      )}

      {currentPage === 'student-dashboard' && (
        <StudentDashboardPage
          setCurrentPage={setCurrentPage}
          isPaid={isPaid}
          setIsPaid={setIsPaid}
        />
      )}

      {currentPage === 'admin-dashboard' && (
        <AdminDashboardPage setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}
