import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dumbbell, ArrowRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      toast.success('Login successful!');
      
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
          alt="Gym Background"
          className="w-full h-full object-cover filter brightness-[0.3] grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0" style={{background: 'linear-gradient(to top right, black, rgba(0,0,0,0.8), rgba(252,163,17,0.1))'}} />
      </div>

      <div className="glass-card p-1 w-full max-w-[95%] sm:max-w-md relative z-10 backdrop-blur-2xl shadow-2xl overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary"></div>
        
        <div className="p-6 sm:p-8 md:p-10 bg-background/40">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center p-3 rounded-full mb-4 sm:mb-6 border ring-1 ring-white/5" style={{background: 'linear-gradient(to bottom right, rgba(252,163,17,0.1), rgba(232,93,4,0.1))', borderColor: 'rgba(252,163,17,0.2)'}}>
              <Dumbbell size={28} className="text-orange-400 sm:w-8 sm:h-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter italic text-white mb-2 drop-shadow-lg">
              Welcome Back
            </h2>
            <p className="text-text-muted font-medium tracking-wide text-xs sm:text-sm uppercase">Enter the cult of fitness</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="space-y-2 group/input">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within/input:text-orange-400 transition-colors">Email Address</label>
              <input
                type="email"
                className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 sm:py-4 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none text-white placeholder-white/20 font-medium text-sm sm:text-base"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2 group/input">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within/input:text-orange-400 transition-colors">Password</label>
              <input
                type="password"
                className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 sm:py-4 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none text-white placeholder-white/20 font-medium text-sm sm:text-base"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn btn-primary py-3 sm:py-4 text-base sm:text-lg font-bold uppercase tracking-widest flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : (
                <>
                  Login <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-text-muted text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-orange-400 hover:text-orange-300 font-bold uppercase tracking-wider transition-colors">
                Join Now
              </Link>
            </p>

            <button 
                onClick={() => navigate('/admin')}
                className="text-[10px] text-text-muted/50 hover:text-orange-400/80 transition-colors uppercase tracking-[0.2em] hover:tracking-[0.3em] mt-4"
            >
                Admin Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
