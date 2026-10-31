# Morning Star Empowerment Foundation

This is the single project root for the MSEF website and API.

## Project map

- `docs/` — project phases, content drafts and guardrails, brand, structure, and integration decisions.
- `frontend/` — public website, Paystack callback, email forms, and admin dashboard.
- `backend/` — Express API, MongoDB data models, Resend email delivery, Cloudinary signing, and Paystack verification.
- `legacy/previous-site/` — preserved existing rehabilitation-focused website for reference.

Start with [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) to locate files and [`docs/PHASE_PLAN.md`](docs/PHASE_PLAN.md) to follow the sequence. Phase 2 requirements and proposed navigation are in [`docs/SITEMAP_DRAFT.md`](docs/SITEMAP_DRAFT.md); Phase 3 copy is drafted in [`docs/CONTENT_DRAFT.md`](docs/CONTENT_DRAFT.md); Phase 4 design direction is in [`docs/DESIGN_DIRECTION.md`](docs/DESIGN_DIRECTION.md); Phase 5 asset intake is tracked in [`docs/ASSET_WORKFLOW.md`](docs/ASSET_WORKFLOW.md) and [`docs/ASSET_REGISTER.md`](docs/ASSET_REGISTER.md). The existing palette is recorded in [`docs/BRAND_GUIDE.md`](docs/BRAND_GUIDE.md); MongoDB, Resend, and Cloudinary are documented in [`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md).

## VPS deployment

The site is prepared for `https://morningstar-ef.org`, with Nginx serving the frontend and proxying `/api/` to the loopback-only backend. Paystack returns to `/callback`. See [`docs/VPS_DEPLOYMENT.md`](docs/VPS_DEPLOYMENT.md), [`nginx-morningstar-ef.org.conf`](nginx-morningstar-ef.org.conf), and [`msef-api.service`](msef-api.service) for the deployment setup.

## Local secrets

Keep real values in local/server `.env` files, which are ignored by Git. Resend and Cloudinary credentials must remain backend-only. The frontend may use public Cloudinary delivery URLs after assets are approved and uploaded.
# msef
