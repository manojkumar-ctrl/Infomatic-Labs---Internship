const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
    signupDate: { type: Date, default: Date.now },
    membershipExpiry: { type: Date },
    frozen: { type: Boolean, default: false },
    profile: {
        height: { type: Number }, // in cm
        weight: { type: Number }, // in kg
        age: { type: Number }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
