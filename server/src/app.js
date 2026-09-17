import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import ragRoutes from "./routes/ragRoutes.js";
import streamRoutes from "./routes/streamRoutes.js";

dotenv.config();

const app = express();

// MIDDLEWARE

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// HEALTH CHECK

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🧠 Prajñā AI Server is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    uptime: `${Math.floor(process.uptime())} seconds`,
    timestamp: new Date().toISOString(),
  });
});

// API ROUTES  ← both routes BEFORE 404 handler

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/rag", ragRoutes);
app.use("/api/stream", streamRoutes);

// 404 HANDLER  ← always after ALL routes

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ERROR HANDLER  ← always last

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('🔴 Error:', err);
  }
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;