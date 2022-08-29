const express = require('express');
const router = express.Router();

const {
  eventCreate,
  joinEvent,
  getEvents,
  getEvent,
  getAllEvents,
} = require('../controllers/eventController');

const protect = require('../middleware/authMiddleware');

// userRoutes
router.get('/get', protect, getEvents);
router.post('/create', protect, eventCreate);
router.post('/join', protect, joinEvent);
router.get('/get/:id', protect, getEvent);
router.post('/get_all', protect, getAllEvents);

module.exports = router;

// const {
//   orgCreate,
//   getOrgs,
//   joinOrg,
//   getOrg,
//   getAllOrgs,
// } = require('../controllers/orgController');

// const protect = require('../middleware/authMiddleware');

// // userRoutes
// router.get('/get/:id', protect, getOrg);
// router.get('/get', protect, getOrgs);
// router.post('/create', protect, orgCreate);
// router.post('/join', protect, joinOrg);
// router.get('/get_all', getAllOrgs);
