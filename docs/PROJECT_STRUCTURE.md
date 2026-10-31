# Project structure

The Git repository root is this folder: `MorningStar_Rehab/`. The folder `../backend/` that previously sat beside the repository is being moved here so the frontend, backend, and project documentation live in one version-controlled project.

```text
MorningStar_Rehab/
├── README.md                 Project overview and setup entry point
├── docs/
│   ├── PHASE_PLAN.md          Ordered work plan and current phase
│   ├── CONTENT_GUIDE.md       Source-of-truth and copy guardrails
│   ├── CONTENT_DRAFT.md       Phase 3 page-by-page website copy draft
│   ├── BRAND_GUIDE.md         Existing palette and brand constraints
│   ├── DESIGN_DIRECTION.md    Phase 4 visual system and accessibility direction
│   ├── ASSET_WORKFLOW.md      Phase 5 asset review and Cloudinary process
│   ├── ASSET_REGISTER.md      12 supplied assets, crop guidance, and URL inventory
│   ├── INTEGRATIONS.md        Resend and Cloudinary setup decisions
│   ├── SITEMAP_DRAFT.md       Phase 2 requirements and sitemap proposal
│   └── PROJECT_STRUCTURE.md   Folder map (this file)
├── frontend/
│   ├── public/                Static files and Cloudinary asset references
│   └── src/
│       ├── app/               App entry, route definitions, global providers
│       ├── components/        Shared layout and reusable UI
│       ├── content/            Reviewed page copy and Cloudinary media manifest
│       ├── features/           Page-specific feature modules
│       ├── services/           API client and Cloudinary URL helpers
│       └── styles/             Brand tokens, global styles, page styles
├── backend/
│   └── src/
│       ├── config/             Environment and service configuration
│       ├── controllers/        HTTP request handling
│       ├── integrations/       Resend and Cloudinary adapters (later phase)
│       ├── middleware/         Validation, security, and error handling
│       ├── routes/             Versioned API route registration
│       ├── services/           Business logic
│       └── validators/         Request schemas
└── legacy/
    └── previous-site/          Preserved existing website; reference only
```

## Where to make changes

- Website pages and visual components belong under `frontend/src/`.
- Approved copy belongs under `frontend/src/content/`, not embedded in large UI files.
- API endpoints belong in `backend/src/routes/`; controllers should call services rather than contain integration logic.
- Email sending belongs in a backend Resend integration. API keys must never use a `VITE_` prefix.
- Image delivery should use approved Cloudinary URLs stored with content metadata. Upload credentials remain backend-only.
- Old rehabilitation site files are retained in `legacy/previous-site/`; do not add new features there.
