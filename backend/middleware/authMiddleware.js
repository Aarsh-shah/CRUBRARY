const asynHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret='thisisthesecretkeyjohnwick';
const authMiddleware = asynHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, secret);
      const user = await User.findById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorised, invalid token');
    }
  }
});

module.exports = authMiddleware;