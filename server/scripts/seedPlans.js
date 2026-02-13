const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plan = require('../models/Plan');

dotenv.config({ path: '.env' });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ironledger')
    .then(async () => {
        console.log('MongoDB Connected');
        await seedPlans();
        mongoose.disconnect();
    })
    .catch(err => console.error(err));

const seedPlans = async () => {
    const plans = [
        {
            name: 'Monthly',
            price: 2999,
            duration: 30,
            benefits: ['Access to gym', 'Locker access', 'General trainer text support']
        },
        {
            name: 'Quarterly',
            price: 7999,
            duration: 90,
            benefits: ['All Monthly benefits', '1 PT Session', 'Diet Consultation']
        },
        {
            name: 'Yearly',
            price: 24999,
            duration: 365,
            benefits: ['All Quarterly benefits', 'Month freezed option', 'Unlimited PT', 'Nutrition Plan']
        }
    ];

    try {
        await Plan.deleteMany({}); // Clear existing plans to avoid duplicates
        await Plan.insertMany(plans);
        console.log('Plans Seeded Successfully');
    } catch (err) {
        console.error('Error seeding plans:', err);
    }
};
