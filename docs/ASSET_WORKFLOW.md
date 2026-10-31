# Phase 5 — Asset preparation workflow

**Status: 12 originals uploaded; delivery renditions prepared.** The user supplied 12 images and explicitly requested upload. The originals are in Cloudinary; exact IDs and URLs are in `ASSET_REGISTER.md` and `frontend/src/content/media-library.json`. The media manifest contains optimized responsive renditions with conservative crops. Files in `legacy/previous-site/public/assets/` remain separate historical material and were not included in this upload request.

## 1. Asset intake

For each asset, record its original filename and intended use. Prefer the original, highest-quality file. Tell us if it is a logo, photograph, illustration, document, or other media, and identify the page/programme it supports.

Before publication, confirm that MSEF has permission to use it on the public website. For identifiable people, confirm informed image consent and any restrictions on names, location, or context. Use extra care with minors, people seeking recovery support, and other vulnerable people. Do not use imagery that could expose sensitive personal information or imply an unconfirmed service, facility, qualification, or outcome.

The user's upload request authorizes uploading the 12 supplied source images once Cloudinary is configured. Public display on the website is still tracked separately where context, identity, consent, current service status, or logo approval needs confirmation.

## 2. Review and approval

Review every file for:

- Relevance to an approved page and accurate representation of MSEF’s current work.
- Image rights, model consent, and any limits on use.
- Image quality, crop options, legibility (for logos/graphics), and visible personal or sensitive information.
- A clear purpose: hero, programme, team, location, or supporting graphic.
- A concise, accurate alt-text description; use empty alt text for purely decorative images.

Mark each item `pending`, `approved`, `rejected`, or `needs clarification` in `ASSET_REGISTER.md`. Approval is an explicit MSEF/user decision; asset receipt alone is not publication approval.

## 3. Naming and Cloudinary organization

Upload requires valid values for `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in `backend/.env`. They are configured locally and must not be pasted into chat or committed. The matching fields in `.env.example` are blank placeholders and are not sufficient to authenticate.

- Keep the supplied original filename in the intake register; use lowercase, descriptive, hyphenated names for public IDs.
- Proposed folder scheme: `msef/site/home`, `msef/site/programmes/agriculture`, `msef/site/programmes/youth-and-recovery`, `msef/site/programmes/education-and-skills`, `msef/site/programmes/environment`, `msef/site/programmes/economic-empowerment`, `msef/site/about`, `msef/site/team`, and `msef/site/shared`.
- Upload only assets explicitly approved for upload; the user has authorized uploading all 12 supplied images. Publication review remains separate. Record Cloudinary public ID and the actual secure delivery URL after upload. Never guess URLs.
- Use Cloudinary automatic format and quality (`f_auto,q_auto`) with responsive width/crop parameters appropriate to the placement. Avoid upscaling small originals; preserve a useful crop/focal point.
- Keep API secrets and signed upload credentials on the backend. Public delivery URLs can be used by the frontend after review.

## 4. Content and implementation handoff

For each asset, record the destination page/section, intended aspect ratio or crop, alt text, credit/caption if required, and Cloudinary delivery URL. The exact source and optimized URLs are stored in `frontend/src/content/media-library.json`; keep `ASSET_REGISTER.md` as the project-wide review/audit trail. Preview optimized renditions at their intended placements during frontend implementation.

Before implementation, confirm that each image matches the approved copy and does not present an aspirational objective as a currently operating programme. If no approved image is available, use a neutral layout treatment until one is supplied; do not silently substitute a legacy image or unrelated stock photograph.

## 5. Handoff criteria

Phase 5 can be marked complete when:

1. The received assets have been reviewed and their permissions/status recorded.
2. MSEF has approved the assets selected for public use.
3. Assets selected for use have been uploaded to the intended Cloudinary folders.
4. The register and media manifest include exact public IDs, delivery URLs, placement, and alt text/captions.
5. Any copy or sitemap dependencies exposed by the assets are resolved or explicitly deferred.

The 12 originals are uploaded and the media manifest is prepared. Public-use confirmations noted in the register should be resolved before those particular images are placed on public pages.
