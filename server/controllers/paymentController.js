const Razorpay = require('razorpay');
const crypto = require('crypto');
const Plan = require('../models/Plan');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Get All Plans
exports.getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const { planId } = req.body;
        const plan = await Plan.findById(planId);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        const options = {
            amount: plan.price * 100, // amount in paisa
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);
        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            plan: plan
        });
    } catch (err) {
        console.error('Error creating Razorpay order:', err);
        res.status(500).send('Server Error');
    }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;
        const userId = req.user.id;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Payment Success - Create Subscription
            const plan = await Plan.findById(planId);
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

            // Update User with membership expiry
            await User.findByIdAndUpdate(userId, {
                membershipExpiry: endDate,
                frozen: false
            });

            res.json({ message: 'Payment verified and subscription activated', subscription });
        } else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (err) {
        console.error('Error verifying payment:', err);
        res.status(500).send('Server Error');
    }
};
