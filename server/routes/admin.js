const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public route - no auth required
router.get('/members', adminController.getAllMembers);
router.delete('/remove-user/:userId', adminController.removeUser);

// Apply auth and admin middleware to all other routes
router.use(auth, admin);

// Plan Routes
router.post('/plans', adminController.createPlan);
router.get('/plans', adminController.getPlans);
router.delete('/plans/:id', adminController.deletePlan);

// Member Routes
router.post('/assign-plan', adminController.assignPlan);

// User Management Routes
router.get('/users-with-plans', adminController.getUsersWithPlans);
router.put('/freeze-user/:userId', adminController.freezeUser);
router.put('/extend-membership/:userId', adminController.extendMembership);

// Session Management Routes
router.get('/all-sessions', adminController.getAllSessions);
router.put('/session/:sessionId/status', adminController.updateSessionStatus);
router.delete('/session/:sessionId', adminController.deleteSession);

module.exports = router;
