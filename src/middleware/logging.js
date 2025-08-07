// src\middleware\logging.js
function loggingMiddleware(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
}

module.exports = { loggingMiddleware }; 