import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { X, DollarSign, Phone, CreditCard, Heart } from 'lucide-react';
import { CURRENCY_FORMATTER } from '../utils/currencies';

const MultiPaymentModal = ({ onClose, onSuccess, amount = 9.99, currency = 'USD' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { upgradeToPremium, currency: userCurrency } = useUser();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeCurrency = currency || userCurrency;
  const displayAmount = CURRENCY_FORMATTER(amount, activeCurrency);

  const paymentMethods = [
    {
      id: 'vodafone',
      name: 'Vodafone Cash',
      icon: '📱',
      description: 'Transfer via Vodafone Cash (Egypt)',
      number: '01035843537',
      instruction: 'Send amount to this number',
    },
    {
      id: 'free',
      name: 'من طرف عبدالوهاب',
      icon: '💚',
      description: 'طريقة مجانية خاصة',
      contact: 'تواصل مع عبدالوهاب',
      instruction: 'ترتيب شخصي متاح',
    },
  ];

  const handlePaymentProcess = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Grant premium access
      upgradeToPremium();

      // Show success message
      onSuccess?.();
      setTimeout(onClose, 2000);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-textPrimary">
              {t('pages.subscription.payment.title')}
            </h3>
            <p className="text-accent text-sm mt-1">{displayAmount}/month</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-textSecondary" />
          </button>
        </div>

        {/* Payment Methods */}
        <div className="p-6 space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? 'border-accent bg-accent/10'
                  : 'border-white/10 hover:border-accent/50 bg-secondary/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{method.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-textPrimary flex items-center gap-2">
                    {method.name}
                    {selectedMethod === method.id && (
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    )}
                  </h4>
                  <p className="text-textSecondary text-xs mt-1">{method.description}</p>

                  {/* Method Details */}
                  <div className="mt-3 text-xs text-textSecondary space-y-1 bg-black/30 rounded p-2">
                    {method.number && <p>📞 {method.number}</p>}
                    {method.account && <p>🏦 {method.account}</p>}
                    {method.email && <p>📧 {method.email}</p>}
                    {method.contact && <p>💬 {method.contact}</p>}
                    <p className="text-accent/70">ℹ️ {method.instruction}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex gap-2">
            <Heart className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-400/80 text-xs">
              جميع الطرق آمنة وموثوقة. نحن ندعم الحلول الإسلامية الحلال
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handlePaymentProcess}
              disabled={!selectedMethod || loading}
              className="flex-1 bg-accent hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all"
            >
              {loading ? 'جاري المعالجة...' : 'متابعة الدفع'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-secondary/50 hover:bg-secondary/70 text-textPrimary font-medium py-3 rounded-xl transition-all"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiPaymentModal;
