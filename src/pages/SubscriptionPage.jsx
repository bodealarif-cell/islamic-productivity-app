import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import Button from '../components/Button';
import MultiPaymentModal from '../components/MultiPaymentModal';
import CurrencySwitcher from '../components/CurrencySwitcher';
import { Crown, Check, Star } from 'lucide-react';
import { SUBSCRIPTION_PRICES, CURRENCY_FORMATTER } from '../utils/currencies';

const SubscriptionPage = () => {
  const { t } = useTranslation();
  const { isPremium, upgradeToPremium, cancelSubscription, subscription, currency } = useUser();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const prices = SUBSCRIPTION_PRICES[currency] || SUBSCRIPTION_PRICES.USD;

  const handleUpgrade = () => {
    setShowPaymentModal(true);
  };

  const handleCancel = () => {
    if (confirm(t('alerts.cancelConfirm'))) {
      cancelSubscription();
      alert(t('alerts.cancelSuccess'));
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    alert(t('alerts.paymentSuccess'));
  };

  const premiumFeatures = [
    t('pages.subscription.features.unlimited'),
    t('pages.subscription.features.analytics'),
    t('pages.subscription.features.export'),
    t('pages.subscription.features.support'),
    t('pages.subscription.features.themes'),
    t('pages.subscription.features.reminders'),
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-textPrimary">{t('pages.subscription.title')}</h2>

      {/* Currency Selector */}
      <CurrencySwitcher />

      {isPremium() ? (
        <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl p-6 border border-accent/30">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-accent" />
            <div>
              <h3 className="text-xl font-bold text-accent">{t('pages.subscription.activeSubscription')}</h3>
              <p className="text-textSecondary">{t('pages.subscription.expiryDate')} {subscription.expiry ? new Date(subscription.expiry).toLocaleDateString('ar-EG') : 'غير محدد'}</p>
            </div>
          </div>
          <p className="text-textPrimary mb-4">{t('pages.subscription.thankYou')}</p>
          <Button variant="secondary" onClick={handleCancel}>
            {t('pages.subscription.cancelButton')}
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="bg-card rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-textSecondary" />
              <h3 className="text-lg font-semibold text-textPrimary">{t('pages.subscription.freePlan')}</h3>
            </div>
            <p className="text-2xl font-bold text-textPrimary mb-4">{t('pages.subscription.free')}</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-textSecondary">
                <Check className="w-4 h-4 text-accent" />
                <span>{t('pages.subscription.features.upTo3')}</span>
              </li>
              <li className="flex items-center gap-2 text-textSecondary">
                <Check className="w-4 h-4 text-accent" />
                <span>{t('common.loading')}</span>
              </li>
              <li className="flex items-center gap-2 text-textSecondary">
                <Check className="w-4 h-4 text-accent" />
                <span>{t('pages.subscription.features.basicStats')}</span>
              </li>
              <li className="flex items-center gap-2 text-textSecondary">
                <Check className="w-4 h-4 text-accent" />
                <span>{t('pages.rest.azkar')}</span>
              </li>
            </ul>
            <Button variant="secondary" disabled className="w-full">
              {t('pages.subscription.currentPlan')}
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-6 border border-accent/30 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">{t('pages.subscription.mostPopularBage')}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-textPrimary">{t('pages.subscription.premiumPlan')}</h3>
            </div>
            <p className="text-2xl font-bold text-accent mb-2">{CURRENCY_FORMATTER(prices.monthly, currency)}</p>
            <p className="text-textSecondary text-sm mb-4">{t('pages.subscription.perMonth')} أو {CURRENCY_FORMATTER(prices.yearly, currency)} {t('pages.subscription.perYear')}</p>
            <ul className="space-y-2 mb-6">
              {premiumFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-textPrimary">
                  <Check className="w-4 h-4 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button onClick={handleUpgrade} className="w-full">
              <Crown className="w-4 h-4 ml-2" />
              {t('pages.subscription.upgradNow')}
            </Button>
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">{t('pages.subscription.faq.title')}</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-textPrimary">{t('pages.subscription.faq.q1')}</h4>
            <p className="text-textSecondary text-sm">{t('pages.subscription.faq.a1')}</p>
          </div>
          <div>
            <h4 className="font-medium text-textPrimary">{t('pages.subscription.faq.q2')}</h4>
            <p className="text-textSecondary text-sm">{t('pages.subscription.faq.a2')}</p>
          </div>
          <div>
            <h4 className="font-medium text-textPrimary">{t('pages.subscription.faq.q3')}</h4>
            <p className="text-textSecondary text-sm">{t('pages.subscription.faq.a3')}</p>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <MultiPaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          amount={prices.monthly}
          currency={currency}
        />
      )}
    </div>
  );
};

export default SubscriptionPage;