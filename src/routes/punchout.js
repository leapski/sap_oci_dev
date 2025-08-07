// src\routes\punchout.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { validateCredentials } = require('../services/secretService');
const { storeSession } = require('../services/sessionService');

const router = express.Router();

router.post('/punchout-setup', async (req, res) => {
  const { USERNAME, PASSWORD, HOOK_URL, BUYERID } = req.body;

  if (!USERNAME || !PASSWORD || !HOOK_URL || !BUYERID) {
    return res.status(400).send('Missing required OCI fields');
  }
  
  const valid = await validateCredentials(USERNAME, PASSWORD);
  if (!valid) {
    return res.status(401).send('Invalid credentials');
  }

  const payload = {
    buyerId: BUYERID,
    hookUrl: HOOK_URL,
    timestamp: Date.now(),
    ip: req.ip,
    userAgent: req.headers['user-agent']
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '30m' });

  await storeSession(token, payload);

  res.send(`<html><head><meta http-equiv='refresh' content='0;url=/functions/catalog?token=${token}' /></head><body>Redirecting...</body></html>`);
});

module.exports = router; 