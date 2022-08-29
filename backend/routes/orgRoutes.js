const express = require('express');
const router = express.Router();

const {
  orgCreate,
  getOrgs,
  joinOrg,
  getOrg,
  getAllOrgs,
} = require('../controllers/orgController');

const protect = require('../middleware/authMiddleware');

// userRoutes
router.get('/get/:id', protect, getOrg);
router.get('/get', protect, getOrgs);
router.post('/create', protect, orgCreate);
router.post('/join', protect, joinOrg);
router.get('/get_all', getAllOrgs);

module.exports = router;
