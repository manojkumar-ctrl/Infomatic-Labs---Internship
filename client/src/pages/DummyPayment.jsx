import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

const DummyPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
      setErrors({ ...errors, cardNumber: '' });
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.length <= 5) {
      setExpiry(formatted);
      setErrors({ ...errors, expiry: '' });
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 3) {
      setCvv(value);
      setErrors({ ...errors, cvv: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!cardName.trim()) {
      newErrors.cardName = 'Card holder name is required';
    }
    
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!expiry || expiry.length !== 5) {
      newErrors.expiry = 'Please enter expiry date (MM/YY)';
    } else {
      const [month, year] = expiry.split('/');
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiry = 'Invalid month';
      }
    }
    
    if (!cvv || cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Show success modal
      setShowSuccess(true);
      
      // Redirect to workout page after 3 seconds
      setTimeout(() => {
        navigate('/workout', { state: { plan } });
      }, 3000);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No plan selected</h2>
          <button 
            onClick={() => navigate('/user-dashboard')}
            className="btn btn-primary px-6 py-3"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{background: 'linear-gradient(135deg, #fca311, #e85d04)'}}>
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic text-white mb-2">
              Secure Payment
            </h1>
            <p className="text-gray-400">Complete your subscription</p>
          </div>

          {/* Plan Summary */}
          <div className="glass-card p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400 mb-1">Selected Plan</p>
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Amount</p>
                <p className="text-3xl font-black" style={{color: '#fca311'}}>₹{plan.price}</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="text-orange-400" size={24} />
              <h2 className="text-xl font-bold text-white">Card Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Holder Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  placeholder="JOHN DOE"
                  value={cardName}
                  onChange={(e) => {
                    setCardName(e.target.value.toUpperCase());
                    setErrors({ ...errors, cardName: '' });
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none text-white placeholder-white/20 font-medium"
                />
                {errors.cardName && (
                  <p className="text-red-400 text-xs mt-1">{errors.cardName}</p>
                )}
              </div>

              {/* Card Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none text-white placeholder-white/20 font-medium tracking-widest"
                />
                {errors.cardNumber && (
                  <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>
                )}
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none text-white placeholder-white/20 font-medium tracking-wider"
                  />
                  {errors.expiry && (
                    <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="123"
                    value={cvv}
                    onChange={handleCvvChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none text-white placeholder-white/20 font-medium tracking-widest"
                  />
                  {errors.cvv && (
                    <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn btn-primary py-4 text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 group mt-8"
              >
                <Lock size={20} />
                Pay ₹{plan.price}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                🔒 Your payment information is secure and encrypted
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass-card p-8 max-w-md w-full mx-4 text-center animate-scale-in">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{background: 'linear-gradient(135deg, #fca311, #e85d04)'}}>
                <CheckCircle className="text-white" size={48} />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter italic text-white mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-400">
                Your subscription to <span className="text-orange-400 font-bold">{plan.name}</span> has been activated
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Amount Paid</span>
                <span className="text-white font-bold">₹{plan.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Transaction ID</span>
                <span className="text-white font-mono text-sm">
                  {Math.random().toString(36).substring(2, 15).toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Redirecting to dashboard in 3 seconds...
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DummyPayment;
