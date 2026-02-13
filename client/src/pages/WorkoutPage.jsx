import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Dumbbell, Heart, Zap, TrendingUp, Award, ChevronRight } from 'lucide-react';

const WorkoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};
  
  const [timeRemaining, setTimeRemaining] = useState({
    months: 0,
    days: 0,
    hours: 0
  });

  // Exercise database categorized by plan level
  const exercisePrograms = {
    basic: [
      { name: 'Push-ups', reps: '3 sets of 10-15', icon: Dumbbell, category: 'Strength', description: 'Build chest and arm strength' },
      { name: 'Squats', reps: '3 sets of 15-20', icon: TrendingUp, category: 'Strength', description: 'Strengthen legs and core' },
      { name: 'Plank', reps: '3 sets of 30-60 sec', icon: Heart, category: 'Core', description: 'Core stability and endurance' },
      { name: 'Jumping Jacks', reps: '3 sets of 30', icon: Zap, category: 'Cardio', description: 'Warm up and cardio boost' },
      { name: 'Lunges', reps: '3 sets of 10 each leg', icon: TrendingUp, category: 'Strength', description: 'Leg and glute strength' },
    ],
    standard: [
      { name: 'Barbell Squats', reps: '4 sets of 8-12', icon: Dumbbell, category: 'Strength', description: 'Heavy compound movement' },
      { name: 'Bench Press', reps: '4 sets of 8-10', icon: Dumbbell, category: 'Strength', description: 'Upper body power' },
      { name: 'Deadlifts', reps: '3 sets of 6-8', icon: TrendingUp, category: 'Strength', description: 'Full body strength builder' },
      { name: 'Pull-ups', reps: '3 sets of 8-12', icon: Award, category: 'Strength', description: 'Back and bicep development' },
      { name: 'Running', reps: '20-30 minutes', icon: Zap, category: 'Cardio', description: 'Cardiovascular endurance' },
      { name: 'Ab Wheel Rollouts', reps: '3 sets of 10-15', icon: Heart, category: 'Core', description: 'Advanced core strength' },
    ],
    premium: [
      { name: 'Olympic Lifts', reps: '5 sets of 3-5', icon: Award, category: 'Power', description: 'Explosive power development' },
      { name: 'Weighted Pull-ups', reps: '4 sets of 6-10', icon: Dumbbell, category: 'Strength', description: 'Advanced back training' },
      { name: 'Box Jumps', reps: '4 sets of 10', icon: Zap, category: 'Plyometric', description: 'Explosive leg power' },
      { name: 'HIIT Sprints', reps: '10 rounds of 30s', icon: Zap, category: 'Cardio', description: 'Maximum fat burn' },
      { name: 'Muscle-ups', reps: '3 sets of 5-8', icon: Award, category: 'Advanced', description: 'Elite upper body strength' },
      { name: 'Turkish Get-ups', reps: '3 sets of 5 each side', icon: TrendingUp, category: 'Functional', description: 'Full body coordination' },
      { name: 'L-Sit Holds', reps: '4 sets of 20-30s', icon: Heart, category: 'Core', description: 'Advanced core control' },
    ],
    elite: [
      { name: 'Competition Lifts', reps: 'Personalized', icon: Award, category: 'Elite', description: 'Custom programming' },
      { name: 'Advanced Plyometrics', reps: 'Personalized', icon: Zap, category: 'Elite', description: 'Sport-specific training' },
      { name: 'Olympic Training', reps: 'Personalized', icon: Dumbbell, category: 'Elite', description: 'Championship preparation' },
      { name: 'Recovery Sessions', reps: 'Daily', icon: Heart, category: 'Recovery', description: 'Spa and mobility work' },
      { name: 'Nutrition Optimization', reps: 'Custom plan', icon: TrendingUp, category: 'Nutrition', description: 'Personalized diet tracking' },
    ]
  };

  const [expirationDate, setExpirationDate] = useState(null);

  useEffect(() => {
    if (!plan) {
      navigate('/user-dashboard');
      return;
    }

    // Save subscription to localStorage
    const durationInDays = parseInt(plan.duration) || 30;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationInDays);
    setExpirationDate(endDate);
    
    const subscription = {
      plan: plan.name,
      startDate: new Date().toISOString(),
      endDate: endDate.toISOString(),
      price: plan.price,
      duration: durationInDays
    };
    
    localStorage.setItem('activeSubscription', JSON.stringify(subscription));

    // Update timer every second
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = endDate.getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeRemaining({ months: 0, days: 0, hours: 0 });
      } else {
        const totalHours = Math.floor(distance / (1000 * 60 * 60));
        const totalDays = Math.floor(totalHours / 24);
        
        setTimeRemaining({
          months: Math.floor(totalDays / 30),
          days: totalDays % 30,
          hours: totalHours % 24
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [plan, navigate]);

  if (!plan) return null;

  // Get exercises based on plan level
  const planKey = plan.name.toLowerCase();
  const exercises = exercisePrograms[planKey] || exercisePrograms.basic;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{background: 'linear-gradient(135deg, #fca311, #e85d04)'}}>
            <Award className="text-white" size={48} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic text-white mb-4">
            Welcome to <span style={{color: '#fca311'}}>IRON CULT</span>
          </h1>
          <p className="text-xl text-gray-400 mb-2">Your {plan.name} membership is now active!</p>
          <p className="text-sm text-gray-500">Let's start your transformation journey</p>
        </div>

        {/* Timer Section */}
        <div className="glass-card p-8 mb-12 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-orange-400" size={32} />
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Membership Timer</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {[
              { label: 'Months', value: timeRemaining.months },
              { label: 'Days', value: timeRemaining.days },
              { label: 'Hours', value: timeRemaining.hours }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-4 md:p-6 mb-2">
                  <div className="text-3xl md:text-5xl font-black text-white font-mono" style={{color: '#fca311'}}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <p className="text-center text-sm text-gray-300">
              🔥 Make every second count! Your {plan.name} plan expires on{' '}
              <span className="font-bold text-orange-400">
                {expirationDate ? expirationDate.toLocaleDateString() : '...'}
              </span>
            </p>
          </div>
        </div>

        {/* Exercise Recommendations */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-4">
              Your <span style={{color: '#fca311'}}>Workout Plan</span>
            </h2>
            <p className="text-gray-400">Recommended exercises for {plan.name} members</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="glass-card p-6 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <exercise.icon className="text-orange-400" size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-orange-400">
                    {exercise.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{exercise.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{exercise.description}</p>
                
                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Sets/Duration</span>
                    <span className="text-sm font-bold text-orange-400">{exercise.reps}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto mt-12 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/user-dashboard')}
            className="flex-1 btn btn-primary py-4 text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 group"
          >
            Go to Dashboard
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-4 rounded-lg text-lg font-bold uppercase tracking-wider transition-all"
          >
            Start Fresh
          </button>
        </div>

        {/* Motivational Quote */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <blockquote className="text-2xl md:text-3xl font-black italic text-white/40 mb-4">
            "The only bad workout is the one that didn't happen."
          </blockquote>
          <p className="text-sm text-gray-500 uppercase tracking-widest">- IRON CULT</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;
