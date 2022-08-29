const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

const { orgCreate, joinOrg } = require('../controllers/orgController');
const { eventCreate, joinEvent } = require('../controllers/eventController');
const protect = require('../middleware/authMiddleware');

// userRoutes
router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/dash', protect, );

// orgRoutes
// router.post('/org/create', protect, orgCreate);
// router.post('/org/join', protect, joinOrg);

// // eventRoutes
// router.post('/event/create', protect, eventCreate);
// router.post('/event/join', protect, joinEvent);

module.exports = router;
