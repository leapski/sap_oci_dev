const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>PunchOut Setup Test</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding-top: 100px; background: #f7f8fa; }
        button { background-color: #2d8cf0; color: white; border: none; padding: 14px 28px; font-size: 16px; border-radius: 8px; cursor: pointer; }
        button:hover { background-color: #1a6fc2; }
      </style>
    </head>
    <body>
      <h1>PunchOut Setup Test</h1>
      <button onclick="callPunchout()">Start PunchOut</button>

      <script>
        async function callPunchout() {
          const res = await fetch('/functions/punchout-setup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              USERNAME: 'testuser',
              PASSWORD: 'testpass',
              HOOK_URL: '/hook',
              BUYERID: 'buyer123'
            })
          });

          if (!res.ok) {
            const errorText = await res.text();
            alert('Error: ' + errorText);
            return;
          }

          // Get the redirect URL from the response text
          const text = await res.text();
          const match = text.match(/url=([^'"]+)/);
          if (match && match[1]) {
            window.location.href = match[1];
          } else {
            alert('No redirect found in response.');
          }
        }
      </script>
    </body>
    </html>
  `);
});

module.exports = router;
