const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const auth = require('../middleware/auth');

// Apply auth middleware
router.use(auth);

// Subscription Routes
router.get('/subscription', memberController.getMySubscription);

// Profile Routes
router.put('/profile', memberController.updateProfile);

// Session Routes
router.post('/book-session', memberController.bookSession);
router.get('/sessions', memberController.getMySessions);

module.exports = router;
