// src/controllers/authController.js

import * as authService from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser({ name, email, password });

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      ...result,
    });

  } catch (error) {
    console.error('REGISTER ERROR:', error); // ← ADD THIS
    
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      ...result,
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id);

    return res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      user,
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};