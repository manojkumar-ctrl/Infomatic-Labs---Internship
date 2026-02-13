const Plan = require('../models/Plan');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Session = require('../models/Session');

// Create Plan
exports.createPlan = async (req, res) => {
    try {
        const { name, price, duration, benefits } = req.body;
        const plan = new Plan({ name, price, duration, benefits });
        await plan.save();
        res.status(201).json(plan);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Get All Plans
exports.getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Delete Plan
exports.deletePlan = async (req, res) => {
    try {
        await Plan.findByIdAndDelete(req.params.id);
        res.json({ message: 'Plan deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Get All Members with Session Bookings
exports.getAllMembers = async (req, res) => {
    try {
        const members = await User.find({ role: 'member' })
            .select('-password')
            .lean();

        // Fetch sessions for each member
        const membersWithSessions = await Promise.all(
            members.map(async (member) => {
                const sessions = await Session.find({ user: member._id })
                    .sort({ date: -1, createdAt: -1 })
                    .lean();
                
                const subscription = await Subscription.findOne({ user: member._id })
                    .populate('plan')
                    .sort({ createdAt: -1 });

                return {
                    ...member,
                    sessions: sessions || [],
                    subscription: subscription || null
                };
            })
        );

        res.json(membersWithSessions);
    } catch (err) {
        console.error('Error fetching members with sessions:', err);
        res.status(500).send('Server Error');
    }
};

// Assign Plan to User
exports.assignPlan = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        
        const plan = await Plan.findById(planId);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + plan.duration);

        const subscription = new Subscription({
            user: userId,
            plan: planId,
            startDate,
            endDate,
            status: 'Active'
        });

        await subscription.save();
        res.json(subscription);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Get All Users with Plans
exports.getUsersWithPlans = async (req, res) => {
    try {
        const users = await User.find({ role: 'member' })
            .select('-password')
            .lean();

        const usersWithPlans = await Promise.all(
            users.map(async (user) => {
                const subscription = await Subscription.findOne({ user: user._id })
                    .populate('plan')
                    .sort({ createdAt: -1 });
                
                return {
                    ...user,
                    subscription: subscription || null
                };
            })
        );

        res.json(usersWithPlans);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Freeze/Unfreeze User
exports.freezeUser = async (req, res) => {
    try {
        const { freeze } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { frozen: freeze },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Also update subscription status
        if (freeze) {
            await Subscription.updateMany(
                { user: req.params.userId },
                { status: 'Frozen' }
            );
        } else {
            await Subscription.updateMany(
                { user: req.params.userId, status: 'Frozen' },
                { status: 'Active' }
            );
        }

        res.json({ message: freeze ? 'User frozen' : 'User unfrozen', user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Remove User
exports.removeUser = async (req, res) => {
    try {
        // Delete user's subscriptions
        await Subscription.deleteMany({ user: req.params.userId });
        
        // Delete user's sessions
        await Session.deleteMany({ user: req.params.userId });
        
        // Delete user
        await User.findByIdAndDelete(req.params.userId);

        res.json({ message: 'User removed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Extend Membership
exports.extendMembership = async (req, res) => {
    try {
        const { days } = req.body;
        
        const subscription = await Subscription.findOne({ user: req.params.userId })
            .sort({ createdAt: -1 });

        if (!subscription) {
            return res.status(404).json({ message: 'No subscription found' });
        }

        const newEndDate = new Date(subscription.endDate);
        newEndDate.setDate(newEndDate.getDate() + parseInt(days));

        subscription.endDate = newEndDate;
        await subscription.save();

        res.json({ message: 'Membership extended', subscription });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Get All Sessions
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find()
            .populate('user', 'name email')
            .sort({ date: -1, createdAt: -1 });
        res.json(sessions);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Update Session Status
exports.updateSessionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const session = await Session.findByIdAndUpdate(
            req.params.sessionId,
            { status },
            { new: true }
        ).populate('user', 'name email');

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.json({ message: 'Session status updated', session });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete Session
exports.deleteSession = async (req, res) => {
    try {
        await Session.findByIdAndDelete(req.params.sessionId);
        res.json({ message: 'Session deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
