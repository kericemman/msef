# Frontend

React + Vite public website. Run `npm install`, then `npm run dev` from this folder. Production output is written to `dist/`.

## Where things live

- `src/app/` — route table and app composition.
- `src/app/layouts/` — shared page shell layouts.
- `src/components/` — reusable site header, footer, and presentation components.
- `src/content/` — reviewed copy, programme data, and `media-library.json` with Cloudinary delivery URLs.
- `src/features/` — page-specific sections grouped by page or capability.
- `src/services/` — API and media helpers.
- `src/styles/` — brand tokens and global styles.
- `public/` — static files that do not come from Cloudinary.

The frontend includes the public website, Paystack donation flow with a `/callback` return route, Contact form, newsletter signup, and a separate admin area at `/admin`. The dashboard uses the backend's secure HttpOnly session cookie to review enquiries, donations, and subscribers and manage testimonials and insights. Published testimonials and insights load from the public API and appear on the Home page; each insight has a detail route. The default API path is `/api`; Vite proxies this to the local backend on port `5005` during development. Set `VITE_SITE_URL=https://morningstar-ef.org` when making a production build to generate the domain sitemap.
