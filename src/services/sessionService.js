// src\services\sessionService.js
const sessions = {};

function storeSession(token, data) {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  sessions[token] = { ...data, expiresAt };
  return Promise.resolve();
}

function getSession(token) {
  const session = sessions[token];
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    delete sessions[token];
    return null;
  }
  return session;
}

module.exports = { storeSession, getSession }; 