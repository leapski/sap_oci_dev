# OCI PunchOut Catalog

## Quick Start
1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file:
   ```env
   JWT_SECRET=dev_secret
   PORT=3000
   ```
3. Start the server:
   ```sh
   node src/app.js
   ```

## How to Use
- **PunchOut Setup:**
  - POST `/functions/punchout-setup` with form fields:
    - USERNAME: `testuser`
    - PASSWORD: `testpass`
    - HOOK_URL: (any URL)
    - BUYERID: (any string)
- **Catalog:**
   /functions/catalog?token=...
  - Open the redirect URL from the setup response in your browser.
  - Browse products, use "Add to Cart" to post to your HOOK_URL.

## Testing
- Use curl/Postman for setup and catalog endpoints.
- All data is stored in SQLite


Sample CURL for:

curl --location 'http://localhost:3000/functions/punchout-setup' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'USERNAME=testuser' \
--data-urlencode 'PASSWORD=testpass' \
--data-urlencode 'HOOK_URL=http://localhost:3000/hook' \
--data-urlencode 'BUYERID=buyer1'