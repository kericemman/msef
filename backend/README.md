# Backend

Node.js/Express API for the Morning Star Empowerment Foundation site. Contact enquiries and newsletter subscriptions are stored in MongoDB and sent through Resend. Donation checkout is initialized and verified server-side with Paystack; confirmed donations receive an email receipt. The admin dashboard uses signed HttpOnly session cookies.

## Folder guide

- `src/config/` — environment and provider configuration.
- `src/controllers/` — HTTP request and response handling.
- `src/integrations/` — provider adapters for Resend and Cloudinary.
- `src/models/` — MongoDB models, including donation records.
- `src/middleware/` — request validation, security, and consistent errors.
- `src/routes/` — API endpoint registration.
- `src/services/` — application and business logic.
- `src/validators/` — request payload validation.

## Local setup

```sh
cp .env.example .env
npm install
npm run dev
```

Set `MONGODB_URI`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_RECIPIENT` in `backend/.env`. Set `PAYSTACK_SECRET_KEY` before accepting donations; use a Paystack test secret during local development. Paystack returns to `/callback`; the backend verifies transactions directly with Paystack before marking donations complete. Provider secrets stay on the backend; never put them in `VITE_` variables.

## Admin dashboard

The dashboard is available at `http://localhost:5173/admin`. It uses an HttpOnly session cookie, rate-limited sign-in, and same-origin checks. There is no default administrator account.

1. Run `npm run admin:hash` in an interactive terminal and set the printed bcrypt hash as `ADMIN_PASSWORD_HASH` in `backend/.env`.
2. Set `ADMIN_EMAIL` to the administrator's email.
3. Set `JWT_SECRET` to a random secret of at least 32 characters. For example, generate one with `openssl rand -hex 32`.
4. Keep `ADMIN_COOKIE_SAME_SITE=strict`. The production frontend and API share `https://morningstar-ef.org`, so the admin session stays same-site and secure.
5. Start MongoDB and run `npm run dev` in `backend/`, then run `npm run dev` in `frontend/`.

The authenticated dashboard can review enquiries, donations, and subscribers, and manage testimonials and insights. Only published content is returned by the public API. The Insights editor requests signed upload parameters from `POST /api/admin/cloudinary/insight-signature`; the browser uploads images directly to Cloudinary, so `CLOUDINARY_API_SECRET` remains on the backend. Set Cloudinary credentials in `backend/.env` for image uploads. For VPS production setup, follow `docs/VPS_DEPLOYMENT.md`.
