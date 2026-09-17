// src/utils/logger.js

const logger = {
  info: (message, data = '') => {
    console.log(`ℹ️  [INFO] ${new Date().toISOString()} - ${message}`, data);
  },
  error: (message, data = '') => {
    console.error(`❌ [ERROR] ${new Date().toISOString()} - ${message}`, data);
  },
  warn: (message, data = '') => {
    console.warn(`⚠️  [WARN] ${new Date().toISOString()} - ${message}`, data);
  },
  success: (message, data = '') => {
    console.log(`✅ [SUCCESS] ${new Date().toISOString()} - ${message}`, data);
  },
};

export default logger;