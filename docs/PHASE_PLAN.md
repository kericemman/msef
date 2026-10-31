# Website rebuild — 10 phases

Work proceeds in order. A phase is complete when its listed decisions or deliverables are documented and reviewed. Frontend page implementation starts only in Phase 6, after requirements, copy, and assets are ready.

1. **Project foundation** — Confirm the single repository root, readable frontend/backend/docs structure, legacy archive, Git hygiene, and setup documentation. Preserve the existing brand colors.
2. **Requirements and sitemap** — Define audiences, site goals, navigation, page list, calls to action, and scope for legacy content. Record unresolved owner decisions.
3. **Content approval** — Draft and approve page copy from the Foundation Profile; verify contact details, registration wording, programme status, and claims.
4. **Design direction** — Confirm logo, palette usage, typography, visual style, responsive behavior, and accessibility requirements.
5. **Asset preparation** — Receive and review supplied assets; approve, upload to Cloudinary, organize delivery URLs, and prepare accessible descriptions.
6. **Frontend implementation** — Build the approved responsive pages and components, using approved copy, brand direction, and Cloudinary assets.
7. **Backend and MongoDB** — Implement the API, MongoDB connection and models, request validation, security controls, and safe errors for approved features.
8. **Integrations** — Configure Resend email and Cloudinary delivery/upload workflows; keep credentials on the backend and document deployment configuration.
9. **Review and launch preparation** — Review content, accessibility, responsive layouts, links, forms, performance, security basics, builds, and deployment settings.
10. **Deployment and maintenance** — Deploy the site and API, connect production services, verify the live experience, and document routine updates and operations.

## Current checkpoint

**Phases 6–9 — Implementation and launch preparation (in progress).** The public Vite/React site and MongoDB-backed API are implemented. Paystack uses API verification on the `/callback` return route, Resend sends enquiry/newsletter/donation confirmations, and Cloudinary signed uploads are available to the admin dashboard. The API binds to loopback for the supplied Nginx reverse proxy, applies global and route-specific rate limits, and requires secure production origins/secrets at startup. A production build and backend syntax check pass. VPS files and deployment steps are in `docs/VPS_DEPLOYMENT.md`. The local backend environment still uses local URLs and a Paystack test key; replace them with production HTTPS origins and a live key on the VPS. DNS, TLS issuance, VPS firewall, production MongoDB access, Resend delivery, and live Paystack transactions must be verified on the server before launch. Confirm public claims and programme availability before launch.
