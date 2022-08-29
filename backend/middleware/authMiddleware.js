const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
      console.log('hiiii');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded');
      console.log(decoded);
      req.user = await User.findOne({ _id: decoded.id }).select('-password');
      console.log(req.user);
      // console.log(next());
      next();
    } catch (err) {
      console.log('ghrrrr');
      console.log(err);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    console.log('noooo');
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = protect;
