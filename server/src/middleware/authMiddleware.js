// src/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    console.log('\n========== AUTH DEBUG ==========');
    console.log('Authorization Header:', req.headers.authorization);

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log('Extracted Token:', token);
    console.log('JWT Secret:', process.env.JWT_SECRET);

    if (!token) {
      console.log('❌ No token found');

      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('✅ Decoded Token:', decoded);

    const user = await User.findById(decoded.id);

    console.log('✅ User Found:', user ? user.email : 'User Not Found');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is invalid. User not found',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated',
      });
    }

    req.user = user;

    console.log('✅ Authentication Successful');
    console.log('===============================\n');

    next();

  } catch (error) {
    console.log('\n❌ AUTH ERROR');
    console.log('Name:', error.name);
    console.log('Message:', error.message);
    console.log('Stack:', error.stack);
    console.log('===============================\n');

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied. Admins only',
  });
};