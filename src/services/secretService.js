// src\services\secretService.js
async function validateCredentials(username, password) {
  return username === 'testuser' && password === 'testpass';
}

module.exports = { validateCredentials }; 