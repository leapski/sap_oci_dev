// src\middleware\auth.js
const jwt = require('jsonwebtoken');
const { getSession } = require('../services/sessionService');

function verifyJWT(req, res, next) {
  const token = req.query.token || req.body.token || req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('Missing token');
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    const sessionData = getSession(token);
    if (!sessionData) return res.status(401).send('Session expired or invalid');
    req.sessionData = sessionData;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
}

module.exports = { verifyJWT }; 