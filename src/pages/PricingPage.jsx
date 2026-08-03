import React, { useState } from 'react';
import { Check, X, MessageSquare, CreditCard, Lock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StripePaymentModal from '../components/StripePaymentModal';
import { pricingPlans } from '../data/mockData';

export default function PricingPage({ setCurrentPage, setSelectedPlan, setIsPaid }) {
  const [selectedPlanForStripe, setSelectedPlanForStripe] = useState(null);
  const [isStripeOpen, setIsStripeOpen] = useState(false);

  const handleSelectPlan = (plan) => {
    if (setSelectedPlan) setSelectedPlan(plan);
    setSelectedPlanForStripe(plan);
    setIsStripeOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setIsStripeOpen(false);
    setCurrentPage('payment-success');
  };

  return (
    <div className="pricing-page">
      <Header currentPage="pricing" setCurrentPage={setCurrentPage} />

      {/* Stripe Payment Modal */}
      <StripePaymentModal
        isOpen={isStripeOpen}
        onClose={() => setIsStripeOpen(false)}
        plan={selectedPlanForStripe}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Hero Header */}
      <section className="pricing-hero">
        <div className="container text-center">
          <h1 className="pricing-title">
            Flexible Learning, <span className="heading-highlight">Tailored Pricing</span>
          </h1>
          <p className="pricing-subtitle">
            Invest in your global future with transparency. Choose a standard plan or request a profile-based quote starting at just R$ 25. Secure checkout via Stripe.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="pricing-cards-section">
        <div className="container">
          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`pricing-card ${plan.isPopular ? 'popular-card' : 'standard-card'}`}
              >
                {plan.isPopular && (
                  <div className="popular-ribbon">
                    <span>POPULAR</span>
                  </div>
                )}

                <div className="card-header-block">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-tagline">{plan.tagline}</p>
                </div>

                <div className="price-block">
                  <span className="currency">R$</span>
                  <span className="price-amount">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>

                <ul className="features-list">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className={feat.included ? 'included' : 'excluded'}>
                      <span className="icon-wrapper">
                        {feat.included ? (
                          <Check size={16} color={plan.isPopular ? '#F5A623' : '#10B981'} />
                        ) : (
                          <X size={16} color="#94A3B8" />
                        )}
                      </span>
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={plan.isPopular ? 'btn-primary plan-btn' : 'btn-secondary plan-btn'}
                  onClick={() => handleSelectPlan(plan)}
                >
                  <Lock size={14} /> Pay with Stripe
                </button>
              </div>
            ))}
          </div>

          {/* Custom Negotiated Plan Section */}
          <div className="custom-plan-card">
            <div className="custom-plan-content">
              <h2>Need a custom plan?</h2>
              <p>
                Our <strong>'Request a Profile-Based Quote'</strong> feature allows you to negotiate a price that fits your budget and learning goals. Speak with our experts and find your ideal value point.
              </p>

              <div className="min-commitment-box">
                <div className="min-icon">
                  <CreditCard size={20} color="#041527" />
                </div>
                <div>
                  <div className="min-label">Minimum Commitment</div>
                  <div className="min-value">R$ 25.00</div>
                </div>
              </div>

              <button 
                className="btn-navy"
                onClick={() => handleSelectPlan({ name: 'Custom Profile Quote', price: '25' })}
              >
                <MessageSquare size={18} /> Start Negotiation & Pay
              </button>
            </div>

            <div className="custom-plan-image">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80"
                alt="Executive negotiating custom plan"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer showNewsletter={true} setCurrentPage={setCurrentPage} />

      <style>{`
        .pricing-page { background-color: #F4F7FB; }
        .pricing-hero { padding: 60px 0 40px 0; text-align: center; }
        .pricing-title { font-size: 46px; font-weight: 800; color: #041527; letter-spacing: -1px; margin-bottom: 16px; }
        .pricing-subtitle { font-size: 16px; color: #475569; max-width: 620px; margin: 0 auto; line-height: 1.6; }
        .pricing-cards-section { padding: 20px 0 80px 0; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; align-items: stretch; margin-bottom: 60px; }
        .pricing-card { border-radius: 20px; padding: 40px 32px; display: flex; flex-direction: column; position: relative; transition: transform 0.2s; }
        .standard-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); }
        .popular-card { background: #041527; color: #FFFFFF; box-shadow: 0 20px 40px rgba(4, 21, 39, 0.2); transform: translateY(-8px); }
        .popular-ribbon { position: absolute; top: 0; right: 0; background: var(--gold-gradient); color: #0F172A; font-size: 11px; font-weight: 800; padding: 6px 16px; border-bottom-left-radius: 12px; border-top-right-radius: 20px; }
        .plan-name { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
        .popular-card .plan-name { color: #FFFFFF; }
        .standard-card .plan-name { color: #041527; }
        .plan-tagline { font-size: 14px; line-height: 1.4; min-height: 40px; }
        .popular-card .plan-tagline { color: #94A3B8; }
        .standard-card .plan-tagline { color: #64748B; }
        .price-block { margin: 24px 0; display: flex; align-items: baseline; gap: 4px; }
        .currency { font-size: 28px; font-weight: 800; }
        .popular-card .currency { color: #FFFFFF; }
        .standard-card .currency { color: #041527; }
        .price-amount { font-size: 48px; font-weight: 800; letter-spacing: -1px; }
        .popular-card .price-amount { color: #FFFFFF; }
        .standard-card .price-amount { color: #041527; }
        .period { font-size: 14px; }
        .popular-card .period { color: #94A3B8; }
        .standard-card .period { color: #64748B; }
        .features-list { list-style: none; display: flex; flex-direction: column; gap: 16px; margin-bottom: 36px; flex-grow: 1; }
        .features-list li { display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 500; }
        .popular-card li.included { color: #E2E8F0; }
        .popular-card li.excluded { color: #64748B; text-decoration: line-through; }
        .standard-card li.included { color: #334155; }
        .standard-card li.excluded { color: #94A3B8; text-decoration: line-through; }
        .plan-btn { width: 100%; padding: 14px; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .custom-plan-card { background: #FFFFFF; border-radius: 24px; border: 1px solid #E2E8F0; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04); }
        .custom-plan-content { padding: 48px; display: flex; flex-direction: column; justify-content: center; }
        .custom-plan-content h2 { font-size: 32px; font-weight: 800; color: #041527; margin-bottom: 14px; }
        .custom-plan-content p { font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 28px; }
        .min-commitment-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; margin-bottom: 28px; max-width: 340px; }
        .min-icon { width: 40px; height: 40px; border-radius: 10px; background: #FFFBEB; display: flex; align-items: center; justify-content: center; }
        .min-label { font-size: 12px; font-weight: 600; color: #64748B; }
        .min-value { font-size: 18px; font-weight: 800; color: #041527; }
        .custom-plan-image img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 900px) {
          .pricing-grid, .custom-plan-card { grid-template-columns: 1fr; }
          .popular-card { transform: none; }
        }
      `}</style>
    </div>
  );
}
