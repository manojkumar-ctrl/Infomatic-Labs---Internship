import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, Crown, Shield } from 'lucide-react';

const MembershipPlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/payment/plans');
                setPlans(res.data);
            } catch (err) {
                console.error('Error fetching plans:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);


// SDK check moved inside handleSubscribe

    const handleSubscribe = async (plan) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to subscribe');
            navigate('/login');
            return;
        }

// Removed obsolete loadRazorpay call; SDK check is handled later

        // Direct user to dummy payment page
        navigate('/dummy-payment', { state: { plan } });
    };

    // Helper to get ID from token
    const getUserIdFromToken = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1])).user.id;
        } catch (e) {
            return null;
        }
    };

    if (loading) return null;

    return (
        <section className="py-20 relative z-10" id="plans">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-4">
                        Membership <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #fca311, #e85d04)'}}>Plans</span>
                    </h2>
                    <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div key={plan._id} className={`glass-card p-8 border relative group hover:-translate-y-2 transition-all duration-500 ${index === 1 ? 'scale-110 z-10 border-orange-500/40' : 'border-orange-500/10'}`}>
                            {index === 1 && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white" style={{background: 'linear-gradient(135deg, #fca311, #e85d04)'}}>
                                    Most Popular
                                </div>
                            )}
                            
                            <div className="mb-8">
                                <h3 className="text-xl font-bold uppercase tracking-widest text-text-muted mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-white">₹{plan.price}</span>
                                    <span className="text-text-muted font-medium">/ {plan.duration} days</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-3 text-text-muted group-hover:text-white transition-colors">
                                        <div className="p-1 rounded-full bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                                            <Check size={14} className="text-orange-400" />
                                        </div>
                                        <span className="text-sm font-medium tracking-wide">{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSubscribe(plan)}
                                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${
                                    index === 1 
                                        ? 'text-white' 
                                        : 'bg-orange-500/10 hover:bg-orange-500 text-white border border-orange-500/30 hover:border-orange-500'
                                }`}
                                style={index === 1 ? {background: 'linear-gradient(135deg, #fca311, #e85d04)'} : {}}
                            >
                                Choose Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MembershipPlans;
