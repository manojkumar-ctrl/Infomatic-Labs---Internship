import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserPlus, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
    height: '',
    weight: '',
    age: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success('Account created successfully!');
      
      // Auto-login
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Redirect to user dashboard
      navigate('/user-dashboard');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop"
          alt="Gym Background"
          className="w-full h-full object-cover filter brightness-[0.3] grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0" style={{background: 'linear-gradient(to top left, black, rgba(0,0,0,0.8), rgba(252,163,17,0.1))'}} />
      </div>

      <div className="glass-card p-1 w-full max-w-lg relative z-10 backdrop-blur-2xl shadow-2xl overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1" style={{background: 'linear-gradient(to right, #fca311, #e85d04)'}}></div>
        
        <div className="p-8 md:p-10 bg-background/40">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-full mb-4 border ring-1 ring-white/5" style={{background: 'linear-gradient(to bottom right, rgba(252,163,17,0.1), rgba(232,93,4,0.1))', borderColor: 'rgba(252,163,17,0.2)'}}>
              <UserPlus size={32} className="text-orange-400" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white mb-2 drop-shadow-lg">
              Join The Cult
            </h2>
            <p className="text-text-muted font-medium tracking-wide text-sm uppercase">Start your transformation today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5"> 
            <div className="space-y-2 group/input">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within/input:text-orange-400 transition-colors">Full Name</label>
              <input
                type="text"
                className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none text-white placeholder-white/20 font-medium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 group/input">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within/input:text-cyan-400 transition-colors">Email</label>
                <input
                  type="email"
                  className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all outline-none text-white placeholder-white/20 font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2 group/input">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within/input:text-cyan-400 transition-colors">Password</label>
                <input
                  type="password"
                  className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all outline-none text-white placeholder-white/20 font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2 group/input">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within/input:text-cyan-400 transition-colors">Height</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-surface/50 border border-white/10 rounded-lg pl-3 pr-8 py-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all outline-none text-white placeholder-white/20 font-medium"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="175"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-xs font-bold">cm</span>
                </div>
              </div>
              <div className="space-y-2 group/input">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within/input:text-cyan-400 transition-colors">Weight</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-surface/50 border border-white/10 rounded-lg pl-3 pr-8 py-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all outline-none text-white placeholder-white/20 font-medium"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="70"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-xs font-bold">kg</span>
                </div>
              </div>
              <div className="space-y-2 group/input">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within/input:text-cyan-400 transition-colors">Age</label>
                <input
                  type="number"
                  className="w-full bg-surface/50 border border-white/10 rounded-lg px-3 py-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all outline-none text-white placeholder-white/20 font-medium"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="25"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn w-full py-4 text-lg font-bold uppercase tracking-wider hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group/btn text-white mt-4"
              style={{background: 'linear-gradient(to right, #fca311, #e85d04)'}}
            >
              {isLoading ? 'Creating Account...' : (
                <>
                  Start Journey <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted font-medium">
              Already have an account? <Link to="/login" className="text-orange-400 hover:text-white transition-colors uppercase font-bold tracking-wide ml-2 hover:underline decoration-2 underline-offset-4">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
