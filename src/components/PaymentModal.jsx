import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useUser } from '../context/UserContext';
import Button from './Button';
import { CreditCard, Lock } from 'lucide-react';

// Initialize Stripe (replace with your publishable key)
const stripePromise = 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY' !== 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY' 
  ? loadStripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY') 
  : null;

const CheckoutForm = ({ onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { upgradeToPremium } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe غير مكون بشكل صحيح');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real app, this would call your backend to create a PaymentIntent
      // For demo, we'll simulate the payment
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      // Simulate backend call
      console.log('Payment Method:', paymentMethod.id);

      // Simulate successful payment
      setTimeout(() => {
        upgradeToPremium();
        onSuccess();
      }, 2000);

    } catch (err) {
      setError('حدث خطأ في المعالجة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-secondary/30 rounded-lg p-4 border border-white/10">
        <label className="block text-textSecondary text-sm mb-2">بيانات البطاقة</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
          className="bg-transparent"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={!stripe || loading} className="flex-1">
          {loading ? 'جاري المعالجة...' : 'دفع 9.99$'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          إلغاء
        </Button>
      </div>

      <div className="flex items-center gap-2 text-textSecondary text-xs">
        <Lock className="w-3 h-3" />
        <span>الدفع آمن ومشفر بواسطة Stripe</span>
      </div>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  if (!stripePromise) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-xl p-6 border border-white/10 w-full max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-textPrimary">إعداد Stripe مطلوب</h3>
          </div>
          <p className="text-textSecondary mb-4">
            لتفعيل الدفع الحقيقي، يرجى إعداد مفتاح Stripe في الكود.
          </p>
          <div className="flex gap-3">
            <Button onClick={onClose} className="flex-1">
              موافق
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl p-6 border border-white/10 w-full max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">إتمام الدفع</h3>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm onSuccess={onSuccess} onCancel={onClose} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentModal;