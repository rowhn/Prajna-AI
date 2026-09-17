// src/server.js — FINAL VERSION

import dotenv from 'dotenv';
dotenv.config();
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']); // this runs AFTER all imports above resolve

connectDB();

import mongoose from 'mongoose';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log('');
      console.log('🚀 ================================');
      console.log(`🧠  Prajñā AI Server Started`);
      console.log('🚀 ================================');
      console.log(`📡  Port      : ${PORT}`);
      console.log(`🌍  Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗  URL       : http://localhost:${PORT}`);
      console.log('🚀 ================================');
      console.log('');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('unhandledRejection', (reason) => {
  console.error('🔴 Unhandled Promise Rejection:', reason);
  process.exit(1);
});

startServer();