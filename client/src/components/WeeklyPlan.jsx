const WeeklyPlan = () => {
    const weeklySchedule = [
        { day: 'Monday', workout: 'Chest & Triceps', icon: '💪', color: 'from-red-500/20 to-orange-500/20 border-red-500/30' },
        { day: 'Tuesday', workout: 'Back & Biceps', icon: '🏋️', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
        { day: 'Wednesday', workout: 'Legs & Calves', icon: '🦵', color: 'from-green-500/20 to-emerald-500/20 border-green-500/30' },
        { day: 'Thursday', workout: 'Shoulders & Abs', icon: '💪', color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30' },
        { day: 'Friday', workout: 'Arms & Core', icon: '💪', color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30' },
        { day: 'Saturday', workout: 'Full Body', icon: '🔥', color: 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30' },
        { day: 'Sunday', workout: 'Rest Day', icon: '😴', color: 'from-gray-500/20 to-slate-500/20 border-gray-500/30' }
    ];

    return (
        <div className="w-full">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                Weekly Workout Plan
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mb-6">
                {weeklySchedule.map((item, index) => (
                    <div 
                        key={index}
                        className={`bg-linear-to-br ${item.color} rounded-lg p-4 md:p-5 border transition-all hover:scale-105 hover:shadow-lg cursor-pointer`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-base md:text-lg font-bold text-white">{item.day}</span>
                            <span className="text-2xl md:text-3xl">{item.icon}</span>
                        </div>
                        <div className="text-xs md:text-sm text-gray-300 font-medium">{item.workout}</div>
                    </div>
                ))}
            </div>

            <div className="p-5 bg-surface/30 rounded-lg border border-white/10">
                <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <span>💡</span>
                    <span>Training Tips</span>
                </h4>
                <ul className="text-xs text-text-muted space-y-2 ml-1">
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Warm up for 5-10 minutes before each workout</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Stay hydrated throughout your training session</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Focus on proper form over heavy weights</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Get 7-9 hours of sleep for optimal recovery</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default WeeklyPlan;
