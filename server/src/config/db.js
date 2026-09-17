// src/config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');

    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    console.log(`📦 Database Name: ${connection.connection.name}`);

  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;  