import { Heart, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-background border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #fca311, #e85d04)'}}>
                IRON<span className="text-white">Ledger</span>
              </div>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Transform your body and mind with our elite training programs. Join the movement today.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white hover:border-orange-500 hover:text-orange-400 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white hover:border-orange-500 hover:text-orange-400 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white hover:border-orange-500 hover:text-orange-400 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white hover:border-orange-500 hover:text-orange-400 transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="#" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-orange-400 transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-orange-400 transition-colors">Press</Link></li>
              <li><Link to="#" className="hover:text-orange-400 transition-colors">Corporate</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="#" className="hover:text-orange-400 transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-orange-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-orange-400 transition-colors">Legal</Link></li>
              <li><Link to="#" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
    
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><a href="#" className="hover:text-orange-400 transition-colors">contact@ironcult.com</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">+91 98765 43210</a></li>
              <li><span className="block opacity-60">Bangalore, India</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">&copy; {new Date().getFullYear()} IronCult. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span>Made with</span>
            <Heart size={16} className="text-orange-400 fill-orange-400 animate-pulse" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
