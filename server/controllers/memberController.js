const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Session = require('../models/Session');

// Get My Subscription
exports.getMySubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({ user: req.user.id }).populate('plan');
        if (!subscription) {
            return res.status(404).json({ message: 'No active subscription found' });
        }
        res.json(subscription);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { height, weight, age } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profile = { height, weight, age };
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Book a Session
exports.bookSession = async (req, res) => {
    try {
        const { sessionType, date, time } = req.body;
        
        // Validate inputs
        if (!sessionType || !date || !time) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create new session
        const session = new Session({
            user: req.user.id,
            sessionType,
            date,
            time,
            status: 'Scheduled'
        });

        await session.save();
        res.json({ message: 'Session booked successfully', session });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get My Sessions
exports.getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user.id }).sort({ date: 1 });
        res.json(sessions);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
