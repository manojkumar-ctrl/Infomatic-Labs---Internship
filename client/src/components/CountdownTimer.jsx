import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(expiryDate) - new Date();
            
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [expiryDate]);

    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="bg-linear-to-br from-primary/20 to-secondary/20 rounded-lg p-4 text-center border border-primary/30">
                <div className="text-3xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-xs text-text-muted uppercase tracking-wider mt-1">Days</div>
            </div>
            <div className="bg-linear-to-br from-primary/20 to-secondary/20 rounded-lg p-4 text-center border border-primary/30">
                <div className="text-3xl font-bold text-white">{timeLeft.hours}</div>
                <div className="text-xs text-text-muted uppercase tracking-wider mt-1">Hours</div>
            </div>
            <div className="bg-linear-to-br from-primary/20 to-secondary/20 rounded-lg p-4 text-center border border-primary/30">
                <div className="text-3xl font-bold text-white">{timeLeft.minutes}</div>
                <div className="text-xs text-text-muted uppercase tracking-wider mt-1">Minutes</div>
            </div>
            <div className="bg-linear-to-br from-primary/20 to-secondary/20 rounded-lg p-4 text-center border border-primary/30">
                <div className="text-3xl font-bold text-white">{timeLeft.seconds}</div>
                <div className="text-xs text-text-muted uppercase tracking-wider mt-1">Seconds</div>
            </div>
        </div>
    );
};

CountdownTimer.propTypes = {
    expiryDate: PropTypes.string.isRequired
};

export default CountdownTimer;
