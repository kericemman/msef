# Integrations

MongoDB, Resend, Cloudinary uploads/delivery, and Paystack checkout/verification are wired into the current implementation. Production credentials remain outside this repository. Production VPS settings are documented in `VPS_DEPLOYMENT.md`.

## MongoDB — application data

- MongoDB stores contact enquiries, donation records, and admin-managed testimonial and insight content.
- `MONGODB_URI` is provided as an environment placeholder in `backend/.env.example`; use a local URI for development and a managed MongoDB URI in deployment.
- Keep credentials in the backend environment only. Never expose the URI to the frontend or commit real credentials.
- Contact forms collect a minimal set of fields and record consent. The admin dashboard can delete stored enquiries; no automatic retention schedule is implemented yet. Do not submit or store sensitive medical histories.
- Admin access uses a single configured administrator, bcrypt password hash, signed HttpOnly cookie, login rate limit, origin check, and authenticated API endpoints.

## Resend — email

- Resend sends contact notifications to the Foundation, enquiry receipts to the sender, newsletter subscription confirmations, new-insight updates, and donation receipts after Paystack verification.
- Keep `RESEND_API_KEY` on the server. Never put it in frontend code, a `VITE_` variable, source control, or a Cloudinary URL.
- Newsletter consent and subscription status are recorded in MongoDB. Subscribers receive insight announcements and have a signed unsubscribe link in update emails.
- Contact forms should collect only the minimum needed to respond. Do not solicit medical details in the general form.
- Configure a verified sender and the contact recipient in the backend environment. Enquiry receipt send status is recorded; failures are logged and shown to the submitter.

## Cloudinary — images

- The user will provide the candidate assets. Review and approve those files before upload.
- Track intake, permissions, approval, alt text, Cloudinary IDs, and delivery URLs in `ASSET_REGISTER.md`; follow `ASSET_WORKFLOW.md`.
- The 12 supplied originals have been uploaded to the configured Cloudinary account. The local credentials belong in ignored `backend/.env`; `backend/.env.example` contains only blank placeholders.
- Upload approved files into a consistent Cloudinary folder structure (for example, `msef/site/hero`, `msef/site/programmes`, and `msef/site/team`).
- Use Cloudinary delivery URLs with automatic format/quality and responsive width transformations where appropriate.
- Store public delivery URLs and image alt text with approved page content. The admin dashboard requests signed upload parameters; API secrets stay on the backend while the browser uploads approved media directly to Cloudinary.
- Do not upload existing legacy images or use guessed Cloudinary URLs.

## Environment placeholders

The backend `.env.example` may name required variables, but must contain no real values. Copy it to `.env` locally; `.env` is ignored by Git. The frontend may use `VITE_API_BASE_URL`; it must never contain provider secrets.

## Decisions still needed in later phases

- Confirm production Resend domain verification and successful recipient delivery.
- Contact-message retention duration and operational access policy.
- Production Cloudinary delivery settings and admin upload workflow.
- Paystack reconciliation beyond callback verification (no webhook reconciliation is currently configured).
