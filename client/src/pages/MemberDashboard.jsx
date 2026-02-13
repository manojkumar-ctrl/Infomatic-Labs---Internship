import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Calendar, Activity } from 'lucide-react';

const MemberDashboard = () => {
  const [subscription, setSubscription] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    height: user?.profile?.height || '',
    weight: user?.profile?.weight || '',
    age: user?.profile?.age || ''
  });

  const token = localStorage.getItem('token');
  const config = { headers: { 'x-auth-token': token } };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/member/subscription', config);
      setSubscription(res.data);
    } catch (err) {
      console.log('No active subscription');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/member/profile', profileData, config);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
          alt="Gym Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block">
          My Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Subscription Status */}
          <div className="glass-card p-6 md:p-8 border border-white/10 shadow-xl hover:border-primary/30 transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 md:gap-3 mb-6 md:mb-8 text-white">
              <Activity className="text-primary" size={24} /> Membership Status
            </h2>
            
            {subscription ? (
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{subscription.plan.name}</h3>
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase ${
                      subscription.status === 'Active' ? 'bg-success/20 text-success border border-success/20' : 'bg-error/20 text-error border border-error/20'
                    }`}>
                      {subscription.status}
                    </span>
                  </div>
                  <div className="text-right bg-surface/50 p-4 rounded-xl border border-white/5">
                    <div className="text-5xl font-bold text-primary mb-1">{calculateDaysLeft(subscription.endDate)}</div>
                    <div className="text-sm text-text-muted uppercase tracking-wider font-medium">Days Left</div>
                  </div>
                </div>
                
                <div className="space-y-3 md:space-y-4 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-base">
                    <span className="text-text-muted flex items-center gap-2"><Calendar size={16} /> Start Date</span>
                    <span className="text-white font-medium">{new Date(subscription.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-text-muted flex items-center gap-2"><Calendar size={16} /> Expiry Date</span>
                    <span className="text-white font-medium">{new Date(subscription.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-text-muted bg-surface/30 rounded-xl border border-white/5 border-dashed">
                <p className="text-lg mb-2">No active membership found.</p>
                <p className="text-sm">Contact admin to assign a plan.</p>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="glass-card p-6 md:p-8 border border-white/10 shadow-xl hover:border-secondary/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 md:gap-3 text-white">
                <User className="text-primary" size={24} /> My Profile
              </h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs md:text-sm font-medium text-primary hover:text-secondary transition-colors uppercase tracking-wide"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="input-group">
                    <label className="input-label text-sm font-medium text-text-muted mb-1 block">Height (cm)</label>
                    <input
                      type="number"
                      className="input-field w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      value={profileData.height}
                      onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label text-sm font-medium text-text-muted mb-1 block">Weight (kg)</label>
                    <input
                      type="number"
                      className="input-field w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      value={profileData.weight}
                      onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label text-sm font-medium text-text-muted mb-1 block">Age</label>
                  <input
                    type="number"
                    className="input-field w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    value={profileData.age}
                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full py-3 shadow-lg hover:shadow-primary/20">Save Changes</button>
              </form>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 text-center">
                <div className="p-6 bg-surface/50 rounded-xl border border-white/5 hover:bg-surface transition-colors group">
                  <div className="text-3xl font-bold text-white group-hover:text-primary transition-colors">{user?.profile?.height || '-'}</div>
                  <div className="text-xs text-text-muted mt-2 uppercase tracking-wide">Height (cm)</div>
                </div>
                <div className="p-6 bg-surface/50 rounded-xl border border-white/5 hover:bg-surface transition-colors group">
                  <div className="text-3xl font-bold text-white group-hover:text-secondary transition-colors">{user?.profile?.weight || '-'}</div>
                  <div className="text-xs text-text-muted mt-2 uppercase tracking-wide">Weight (kg)</div>
                </div>
                <div className="p-6 bg-surface/50 rounded-xl border border-white/5 hover:bg-surface transition-colors group">
                  <div className="text-3xl font-bold text-white group-hover:text-success transition-colors">{user?.profile?.age || '-'}</div>
                  <div className="text-xs text-text-muted mt-2 uppercase tracking-wide">Age</div>
                </div>
              </div>
            )}
            
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xl text-white">{user?.name}</div>
                  <div className="text-sm text-text-muted">{user?.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
