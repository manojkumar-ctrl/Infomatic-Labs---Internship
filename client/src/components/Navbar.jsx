import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Dumbbell, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-3xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent group-hover:scale-105 transition-transform" style={{backgroundImage: 'linear-gradient(to right, #fca311, #e85d04)'}}>
            IRON<span className="text-white">Ledger</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link to="/admin" className="text-sm font-bold uppercase tracking-wider hover:text-orange-400 transition-colors">Admin Dashboard</Link>
              ) : (
                <Link to="/user-dashboard" className="text-sm font-bold uppercase tracking-wider hover:text-orange-400 transition-colors">My Profile</Link>
              )}
              
              <div className="flex items-center gap-6 pl-8 border-l border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full p-[2px]" style={{background: 'linear-gradient(to bottom right, #fca311, #e85d04)'}}>
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <User size={14} className="text-orange-400" />
                    </div>
                  </div>
                  <span className="text-sm font-bold tracking-wide uppercase">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-text-muted hover:text-orange-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-bold uppercase tracking-wider hover:text-orange-400 transition-colors">Login</Link>
              <Link 
                to="/signup" 
                className="btn btn-primary text-lg px-6 py-3"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-t border-white/10 absolute w-full left-0">
          <div className="container mx-auto px-4 py-6 space-y-6">
            {user ? (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full p-[2px]" style={{background: 'linear-gradient(to bottom right, #fca311, #e85d04)'}}>
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <User size={18} className="text-orange-400" />
                    </div>
                  </div>
                  <span className="text-lg font-bold uppercase">{user.name}</span>
                </div>
                {user.role === 'admin' ? (
                  <Link 
                    to="/admin" 
                    className="block text-xl font-bold uppercase tracking-wider hover:text-orange-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/user-dashboard" 
                    className="block text-xl font-bold uppercase tracking-wider hover:text-orange-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 text-text-muted hover:text-orange-400 transition-colors pt-4 w-full"
                >
                  <LogOut size={20} />
                  <span className="text-sm font-bold uppercase tracking-wider">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <Link 
                  to="/login" 
                  className="block text-xl font-bold uppercase tracking-wider hover:text-orange-400 transition-colors text-center py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary w-full text-center text-lg px-6 py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  GET STARTED
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
