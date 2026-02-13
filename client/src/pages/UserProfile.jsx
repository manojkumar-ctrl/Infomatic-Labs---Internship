import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import WeeklyPlan from '../components/WeeklyPlan';
import { User, Mail, Calendar, LogOut, Clock, Shield } from 'lucide-react';

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!token || !storedUser) {
            navigate('/login');
            return;
        }

        setUser(storedUser);
    }, [userId, navigate]);

    if (!user) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const expiryDate = new Date(user.membershipExpiry).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const signupDateTime = new Date(user.signupDate).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="min-h-[calc(100vh-5rem)] relative p-4 md:p-8">
             {/* Background */}
             <div className="fixed inset-0 z-0 bg-background pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10 space-y-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start glass-card p-8 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full group-hover:bg-primary/30 transition-colors" />
                    
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full p-[2px] bg-linear-to-br from-primary to-secondary">
                            <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
                                <span className="text-4xl font-black text-white">{user.name.charAt(0)}</span>
                            </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-background rounded-full p-1">
                            <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-background animate-pulse" />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div>
                            <h1 className="text-4xl font-black uppercase italic text-white tracking-tighter mb-2">{user.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                                    <Mail size={12} /> {user.email}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                                    <Shield size={12} /> {user.role}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                                    <Calendar size={12} /> Joined {new Date(user.signupDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                            <div className="text-center md:text-left">
                                <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">Height</span>
                                <span className="text-xl font-bold text-white">{user.profile?.height || '-'} <span className="text-sm font-normal text-text-muted">cm</span></span>
                            </div>
                            <div className="text-center md:text-left">
                                <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">Weight</span>
                                <span className="text-xl font-bold text-white">{user.profile?.weight || '-'} <span className="text-sm font-normal text-text-muted">kg</span></span>
                            </div>
                            <div className="text-center md:text-left">
                                <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">Age</span>
                                <span className="text-xl font-bold text-white">{user.profile?.age || '-'} <span className="text-sm font-normal text-text-muted">y/o</span></span>
                            </div>
                            <div className="text-center md:text-left">
                                <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">Status</span>
                                <span className="text-xl font-bold text-white">Active</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            navigate('/login');
                        }}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-wider group/logout"
                    >
                        <LogOut size={16} className="group-hover/logout:translate-x-1 transition-transform" />
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Membership Status */}
                    <div className="glass-card p-8 border border-white/10 relative overflow-hidden lg:col-span-1 flex flex-col justify-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary" />
                        
                        <div className="text-center space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Membership Expiry</h3>
                                <p className="text-2xl font-black text-white">{expiryDate}</p>
                            </div>
                            
                            <div className="relative py-8">
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <Clock size={100} />
                                </div>
                                <CountdownTimer expiryDate={user.membershipExpiry} />
                            </div>

                            <p className="text-xs text-text-muted font-medium bg-white/5 py-2 px-4 rounded-full inline-block">
                                Valid for 10 months from signup
                            </p>
                        </div>
                    </div>

                    {/* Weekly Plan */}
                    <div className="lg:col-span-2 glass-card p-8 border border-white/10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black uppercase italic text-white tracking-tighter">Your <span className="text-secondary">Protocol</span></h3>
                            <button className="text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors">View Full Schedule</button>
                        </div>
                        <WeeklyPlan />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
