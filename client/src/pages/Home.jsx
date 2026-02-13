import { Link } from 'react-router-dom';
import { Dumbbell, TrendingUp, ShieldCheck, Play, ArrowRight, Activity, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-orange-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-orange-600/15 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(252, 163, 17, 0.1) 1px, transparent 0)', backgroundSize: '32px 32px'}} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">The Future of Fitness</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.9] italic">
              <span className="block text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, white, #d4a574)'}}>We Are</span>
              <span className="block" style={{color: '#fca311'}}>IRON</span>
              <span className="block" style={{WebkitTextStroke: '1px white', color: 'transparent', WebkitTextStrokeWidth: 'clamp(1px, 0.15vw, 2px)'}}>CULT</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed px-4 sm:px-0">
              Join the revolution. More than just a gym — it's a lifestyle. 
              Transform your body, elevate your mind, and become part of the legend.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start px-4 sm:px-0">
              <Link
                to="/signup"
                className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-widest hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                Join Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 rounded-full blur-[100px] opacity-30" style={{background: 'linear-gradient(135deg, #fca311, #e85d04)'}} />
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop" 
              alt="Athlete" 
              className="relative z-10 w-full h-[400px] xl:h-[600px] object-cover rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-700 grayscale hover:grayscale-0 contrast-110 border-2 border-orange-500/20"
            />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative z-20 -rotate-1 py-3 sm:py-4 overflow-hidden" style={{background: 'linear-gradient(135deg, #fca311, #e85d04)'}}>
        <div className="flex gap-8 sm:gap-12 animate-scroll whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-lg sm:text-xl md:text-2xl font-black uppercase italic tracking-widest text-white flex items-center gap-3 sm:gap-4">
              Step Into The Arena <Dumbbell size={20} className="fill-white sm:w-6 sm:h-6" />
            </span>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section className="relative z-10 py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-2">
                Why <span className="text-gradient">Choose Us</span>
              </h2>
              <div className="h-1 w-16 sm:w-20 bg-primary rounded-full" />
            </div>
            <p className="text-text-muted max-w-sm text-left md:text-right text-sm sm:text-base">
              Experience world-class facilities designed to push your limits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="glass-card p-6 sm:p-8 group hover:border-primary/50 transition-all duration-500">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 sm:mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                <Dumbbell size={28} className="text-primary sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase italic mb-3 sm:mb-4 group-hover:text-orange-400 transition-colors">Elite Equipment</h3>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                Train with premium, competition-grade equipment. From deadlift platforms to smart cardio machines.
              </p>
            </div>

            <div className="glass-card p-6 sm:p-8 group hover:border-secondary/50 transition-all duration-500">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-secondary/20 to-primary/20 flex items-center justify-center mb-6 sm:mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                <Activity size={28} className="text-secondary sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase italic mb-3 sm:mb-4 group-hover:text-orange-300 transition-colors">Performance Tracking</h3>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                Advanced biometrics and workout logs. Visualize your progress and crush your personal bests.
              </p>
            </div>

            <div className="glass-card p-6 sm:p-8 group hover:border-primary/50 transition-all duration-500 sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 sm:mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                <Zap size={28} className="text-primary sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase italic mb-3 sm:mb-4 group-hover:text-orange-400 transition-colors">High Energy</h3>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                Atmosphere engineered for performance. Dynamic lighting, pumping sound systems, and pure motivation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="relative z-10 py-16 sm:py-20 pb-32 sm:pb-40">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-center mb-12 sm:mb-16 text-white">
            Our Classes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: 'HIIT Training', icon: Zap, desc: 'High-intensity interval training for maximum burn' },
              { name: 'Strength', icon: Dumbbell, desc: 'Build raw power with compound movements' },
              { name: 'Cardio Blast', icon: Activity, desc: 'Endurance training to boost stamina' },
              { name: 'Recovery', icon: ShieldCheck, desc: 'Mobility and stretching for longevity' }
            ].map((cls, i) => (
              <div key={i} className="glass-card p-6 sm:p-8 group hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-2">
                <cls.icon size={32} className="text-orange-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform sm:w-10 sm:h-10" />
                <h3 className="text-lg sm:text-xl font-bold uppercase mb-2 sm:mb-3 text-white">{cls.name}</h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">{cls.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="glass-card p-8 sm:p-12 md:p-16 text-center border-orange-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter italic mb-4 sm:mb-6 text-white">
                Ready to <span style={{color: '#fca311'}}>Transform</span>?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
                Join thousands of members who've already started their journey. Your transformation begins today.
              </p>
              <Link
                to="/signup"
                className="btn btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 uppercase tracking-widest inline-flex items-center gap-2 group"
              >
                Start Your Journey <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
