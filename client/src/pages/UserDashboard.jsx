import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, X, Clock, CheckCircle2, TrendingUp, Activity } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    sessionType: 'Personal Training'
  });

  const config = { headers: { 'x-auth-token': token } };

  const sessionTypes = [
    'Personal Training', 'Group Class', 'Yoga Session', 
    'Cardio Session', 'Strength Training', 'HIIT Workout'
  ];

  const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const subscriptionPlans = [
    {
      name: 'Basic',
      duration: '1 Month',
      days: 30,
      price: '₹999',
      features: ['Access to gym equipment', 'Locker facility', 'Basic support'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Standard',
      duration: '3 Months',
      days: 90,
      price: '₹2,499',
      features: ['All Basic features', 'Group classes', '1 Personal training session/month', 'Diet consultation'],
      color: 'from-secondary to-orange-600',
      popular: true
    },
    {
      name: 'Premium',
      duration: '6 Months',
      days: 180,
      price: '₹4,499',
      features: ['All Standard features', 'Unlimited group classes', '4 Personal training/month', 'Personalized diet plan'],
      color: 'from-primary to-pink-600'
    },
    {
      name: 'Elite',
      duration: '12 Months',
      days: 365,
      price: '₹7,999',
      features: ['All Premium features', 'Unlimited personal training', 'Spa & sauna access', 'Dedicated trainer'],
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  const handleBookSession = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/member/book-session', bookingData, config);
      toast.success('Session booked successfully! 🎉');
      setShowBookingModal(false);
      setBookingData({ date: '', time: '', sessionType: 'Personal Training' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to book session');
    }
  };

  const handleSubscribePlan = async (planName) => {
    // Find the plan details from subscriptionPlans array
    const selectedPlan = subscriptionPlans.find(p => p.name === planName);
    
    if (!selectedPlan) {
      toast.error('Plan not found');
      return;
    }

    // Convert plan to match expected format
    const planData = {
      _id: planName.toLowerCase(),
      name: selectedPlan.name,
      price: selectedPlan.price.replace('₹', '').replace(',', ''), // Remove currency symbol and commas
      duration: selectedPlan.days, // Use explicit days count
      benefits: selectedPlan.features
    };

    // Close modal and navigate to payment
    setShowPlanModal(false);
    navigate('/dummy-payment', { state: { plan: planData } });
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] relative p-4 md:p-8">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-background">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
              Welcome, <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{user.name}</span>
            </h1>
            <p className="text-text-muted text-lg font-light tracking-wide">Let's crush some goals today.</p>
          </div>
          <div className="flex gap-4">
             <div className="px-6 py-3 rounded-full bg-surface/50 border border-white/10 flex items-center gap-3">
                <Activity size={20} className="text-success animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-wider text-white">Status: Active</span>
             </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Subscribe Card */}
          <div className="group relative overflow-hidden rounded-3xl cursor-pointer" onClick={() => setShowPlanModal(true)}>
             <div className="absolute inset-0 bg-linear-to-br from-surface to-background border border-white/5 transition-all duration-300 group-hover:border-primary/50" />
             <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             
             <div className="relative p-10 flex flex-col h-full min-h-[300px] items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                   <CreditCard size={32} />
                </div>
                
                <div>
                  <h3 className="text-3xl font-black uppercase italic text-white mb-2">Membership Plans</h3>
                  <p className="text-text-muted font-light text-lg">Unlock premium access. Join the elite.</p>
                </div>
                
                <div className="w-full h-1 bg-white/5 mt-6 overflow-hidden rounded-full">
                   <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
             </div>
          </div>

          {/* Book Session Card */}
          <div className="group relative overflow-hidden rounded-3xl cursor-pointer" onClick={() => setShowBookingModal(true)}>
             <div className="absolute inset-0 bg-linear-to-br from-surface to-background border border-white/5 transition-all duration-300 group-hover:border-secondary/50" />
             <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             
             <div className="relative p-10 flex flex-col h-full min-h-[300px] items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
                   <TrendingUp size={32} />
                </div>
                
                <div>
                  <h3 className="text-3xl font-black uppercase italic text-white mb-2">Book Session</h3>
                  <p className="text-text-muted font-light text-lg">Schedule your grind. Personal training & classes.</p>
                </div>
                
                <div className="w-full h-1 bg-white/5 mt-6 overflow-hidden rounded-full">
                   <div className="h-full bg-secondary w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
             </div>
          </div>
        </div>


      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card p-8 max-w-md w-full border border-white/10 shadow-2xl relative animate-in fade-in zoom-in duration-300 bg-[#151515]">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-black uppercase italic text-white mb-8 border-l-4 border-secondary pl-4">Book Session</h2>
            
            <form onSubmit={handleBookSession} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Session Type</label>
                <select
                  className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-white appearance-none"
                  value={bookingData.sessionType}
                  onChange={(e) => setBookingData({ ...bookingData, sessionType: e.target.value })}
                >
                  {sessionTypes.map((type) => (
                    <option key={type} value={type} className="bg-surface text-white">{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Date</label>
                <input
                  type="date"
                  className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-white"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Time Slot</label>
                <select
                  className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-white appearance-none"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  required
                >
                  <option value="" className="bg-surface">Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-surface text-white">{slot}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn w-full py-4 text-lg font-bold uppercase tracking-wider bg-secondary hover:bg-secondary/90 text-white transition-all shadow-[0_0_20px_rgba(255,126,54,0.3)]">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Subscription Plans Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-7xl my-auto animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="flex justify-between items-center mb-10 px-4">
               <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white">Choose Your <span className="text-primary">Path</span></h2>
               <button
                  onClick={() => setShowPlanModal(false)}
                  className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all"
               >
                  <X size={24} />
               </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-12">
              {subscriptionPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative p-1 rounded-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${plan.popular ? 'bg-linear-to-b ' + plan.color : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <div className="bg-[#121212] h-full rounded-[20px] p-6 flex flex-col relative overflow-hidden">
                    {plan.popular && (
                       <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/10">
                          Best Value
                       </div>
                    )}
                    
                    <h3 className="text-2xl font-black uppercase italic text-white mb-1">{plan.name}</h3>
                    <div className="text-sm text-text-muted mb-6 font-medium tracking-wide">{plan.duration}</div>
                    
                    <div className="text-4xl font-black text-white mb-8 tracking-tighter">
                       {plan.price}
                       <span className="text-sm font-normal text-text-muted ml-1 tracking-normal">/period</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8 grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-start gap-3">
                          <CheckCircle2 size={16} className={`shrink-0 ${plan.popular ? 'text-secondary' : 'text-primary'}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handleSubscribePlan(plan.name)}
                      className={`btn w-full py-4 text-sm font-bold uppercase tracking-widest transition-all mt-auto ${
                         plan.popular 
                           ? 'bg-linear-to-r ' + plan.color + ' text-white shadow-lg' 
                           : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                      }`}
                    >
                      Choose Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
