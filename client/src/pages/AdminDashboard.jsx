import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ChevronDown, ChevronUp, Calendar, Lock, ShieldCheck, X } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [expandedUsers, setExpandedUsers] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/admin/members');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Access Denied: Invalid Password');
      setPassword('');
    }
  };

const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to remove this user? This action cannot be undone and will cancel their membership immediately.')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/remove-user/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
        // Optional: Show toast success
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user');
      }
    }
  };

  const toggleUserExpand = (userId) => {
    setExpandedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Show authentication form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-background" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
           <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="glass-card p-1 max-w-md w-full relative z-10 backdrop-blur-2xl shadow-2xl overflow-hidden group border border-white/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary" />
          
          <div className="p-10 bg-background/50">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-linear-to-br from-primary/10 to-secondary/10 mb-6 border border-white/10 shadow-[0_0_30px_-10px_rgba(255,50,120,0.3)]">
                <Lock size={32} className="text-primary" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter italic text-white mb-2">
                Restricted Area
              </h2>
              <p className="text-text-muted font-medium tracking-wide text-xs uppercase">Admin Authentication Required</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2 group/input">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within/input:text-primary transition-colors">Admin Password</label>
                <input
                  type="password"
                  className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-white placeholder-white/20 font-medium tracking-widest"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  placeholder="••••••••"
                />
              </div>
              
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wide text-center">
                  {error}
                </div>
              )}
              
              <button type="submit" className="btn w-full py-4 text-lg font-bold uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-all shadow-lg hover:shadow-white/20">
                Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
           <div className="text-white text-sm uppercase tracking-widest font-bold animate-pulse">Loading Database...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] relative p-4 md:p-8">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-background pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-white/5 pb-8">
           <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                 Admin <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Console</span>
              </h1>
              <p className="text-text-muted text-lg font-light tracking-wide">Manage your gym empire.</p>
           </div>
           
           <div className="glass-card px-6 py-3 border border-white/10 flex items-center gap-4">
             <div className="flex items-center gap-3">
               <div className="p-2 rounded-lg bg-primary/10">
                 <Users size={20} className="text-primary" />
               </div>
               <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-bold">Total Members</p>
                  <p className="text-xl font-black text-white">{users.length}</p>
               </div>
             </div>
           </div>
        </div>

        {/* Users Table */}
        <div className="glass-card border border-white/10 shadow-2xl overflow-hidden rounded-2xl bg-[#121212]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-6 font-bold text-text-muted uppercase text-xs tracking-widest">User Profile</th>
                  <th className="p-6 font-bold text-text-muted uppercase text-xs tracking-widest">Role</th>
                  <th className="p-6 font-bold text-text-muted uppercase text-xs tracking-widest">Joined</th>
                  <th className="p-6 font-bold text-text-muted uppercase text-xs tracking-widest">Metrics (H/W/A)</th>
                  <th className="p-6 font-bold text-text-muted uppercase text-xs tracking-widest">Membership</th>
                  <th className="p-6 font-bold text-text-muted uppercase text-xs tracking-widest">Activity</th>
                  <th className="p-6 font-bold text-text-muted uppercase text-xs tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <>
                    <tr key={user._id} className="hover:bg-white/2 transition-colors group">
                      <td className="p-6">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-white/10 to-white/5 flex items-center justify-center font-bold text-white border border-white/10">
                               {user.name.charAt(0)}
                            </div>
                            <div>
                               <p className="text-white font-bold text-sm tracking-wide">{user.name}</p>
                               <p className="text-xs text-text-muted">{user.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="p-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          user.role === 'admin' 
                            ? 'bg-primary/10 text-primary border-primary/20' 
                            : 'bg-secondary/10 text-secondary border-secondary/20'
                        }`}>
                          {user.role === 'admin' && <ShieldCheck size={12} />}
                          {user.role}
                        </span>
                      </td>
                      <td className="p-6 text-sm text-text-muted font-medium">
                        {user.signupDate ? new Date(user.signupDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                      </td>
                      <td className="p-6 text-sm text-white font-mono">
                        {user.profile ? (
                           <div className="flex gap-2 text-xs">
                              <span className="bg-white/5 px-2 py-1 rounded text-text-muted" title="Height">{user.profile.height || '-'}cm</span>
                              <span className="bg-white/5 px-2 py-1 rounded text-text-muted" title="Weight">{user.profile.weight || '-'}kg</span>
                              <span className="bg-white/5 px-2 py-1 rounded text-text-muted" title="Age">{user.profile.age || '-'}y</span>
                           </div>
                        ) : <span className="text-text-muted italic">No data</span>}
                      </td>
                      <td className="p-6">
                        {user.subscription ? (
                            <div>
                                <p className="text-white font-bold text-sm tracking-wide">{user.subscription.plan?.name || 'Unknown Plan'}</p>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                                    user.subscription.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                }`}>
                                    {user.subscription.status}
                                </span>
                            </div>
                        ) : (
                            <span className="text-text-muted text-xs font-medium italic">No Plan</span>
                        )}
                      </td>
                      <td className="p-6">
                        <button
                          onClick={() => toggleUserExpand(user._id)}
                          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all px-4 py-2 rounded-lg border ${
                             expandedUsers.includes(user._id)
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-white border-white/10 hover:border-white/30'
                          }`}
                        >
                          <span>{user.sessions?.length || 0} Sessions</span>
                          {expandedUsers.includes(user._id) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </td>
                      <td className="p-6 text-right">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                            title="Remove User & Deactivate Status"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                    
                    {/* Expanded Session Details */}
                    {expandedUsers.includes(user._id) && (
                      <tr className="bg-white/2 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                        <td colSpan="6" className="p-0">
                          <div className="p-6 pl-20">
                            {user.sessions && user.sessions.length > 0 ? (
                              <div className="space-y-4">
                                <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2 mb-4">
                                  <Calendar size={14} className="text-primary" />
                                  Booking History
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {user.sessions.map((session) => (
                                    <div 
                                      key={session._id} 
                                      className="glass-card p-4 border border-white/5 hover:border-primary/30 transition-all group/card"
                                    >
                                      <div className="flex justify-between items-start mb-3">
                                         <span className="text-xs font-bold text-white uppercase tracking-wider bg-white/5 px-2 py-1 rounded">{session.sessionType}</span>
                                         <span className={`w-2 h-2 rounded-full ${
                                            session.status === 'Scheduled' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                                            session.status === 'Completed' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                                            'bg-red-500'
                                         }`} />
                                      </div>
                                      
                                      <div className="space-y-1">
                                         <p className="text-white font-medium text-sm flex items-center gap-2">
                                            <Calendar size={14} className="text-text-muted" />
                                            {new Date(session.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                         </p>
                                         <p className="text-white font-medium text-sm pl-6">
                                            @ {session.time}
                                         </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
                                <p className="text-sm text-text-muted font-medium italic">No sessions booked yet</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                   <Users size={24} className="text-text-muted opacity-50" />
                </div>
                <p className="text-text-muted font-light">No users found in the database.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
