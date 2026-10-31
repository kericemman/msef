# Asset register

Tracks the 12 image files supplied for the MSEF rebuild. All 12 originals have been uploaded to the configured Cloudinary account. Exact source URLs and IDs are listed below; page-sized optimized crop URLs and alt-text drafts are in [`frontend/src/content/media-library.json`](../frontend/src/content/media-library.json).

The optimized crop URLs are Cloudinary delivery transformations; originals remain unchanged. Preview them at the intended page sizes during frontend implementation. Group photographs use uncropped or conservative renditions so people are not cut out.

## Status key

- `ready for upload` — supplied and visually catalogued; not yet uploaded.
- `needs clarification` — asset context, identity, rights/consent, or suitable use needs confirmation.
- `uploaded` — original uploaded; exact source and optimized delivery URLs are in the media manifest.
- `hold from public display` — do not use in the public site until the listed issue is resolved.

## Asset inventory

| ID | Original filename | Dimensions | Proposed use and crop/render plan | Cloudinary folder | Status / public-use note |
| --- | --- | ---: | --- | --- | --- |
| MSEF-01 | `WhatsApp Image 2026-10-21 at 08.34.53.jpeg` | 1280 × 1072 | Group outside the Foundation sign. Keep all people and sign visible; optimized crop removes the bottom camera strip. | `msef/site/about` | Uploaded; confirm group photo permission before public display. |
| MSEF-02 | `WhatsApp Image 2026-10-21 at 08.50.18.jpeg` | 1122 × 1402 | Individual formal portrait; optimized to 4:5 while preserving headroom and shoulders. | `msef/site/team` | Uploaded; confirm person’s name, role, and portrait permission before caption/public display. |
| MSEF-03 | `WhatsApp Image 2026-10-21 at 08.51.01.jpeg` | 1600 × 1200 | Exterior/facility photograph with rehabilitation-centre signage. 4:3 rendition retains the full building sign. | `msef/site/about` | Uploaded; hold from public display until facility and current service status are confirmed. |
| MSEF-04 | `WhatsApp Image 2026-10-21 at 08.54.52.jpeg` | 1200 × 1600 | Interior bed/facility image. Kept in portrait ratio to preserve room context. | `msef/site/programmes/youth-and-recovery` | Uploaded; hold from public display until facility/service status and context are confirmed. |
| MSEF-05 | `WhatsApp Image 2026-10-21 at 08.56.40.jpeg` | 720 × 540 | Small group photo in branded shirts. Kept 4:3; do not upscale beyond source resolution. | `msef/site/team` | Uploaded; confirm identities/roles and informed permission, especially if any people are minors or service beneficiaries. |
| MSEF-06 | `WhatsApp Image 2026-10-21 at 09.04.00.jpeg` | 1599 × 720 | Wide farm and farmer crop, composed for a 16:9 banner. | `msef/site/programmes/agriculture` | Uploaded; confirm permission and that the image represents MSEF-related work. |
| MSEF-07 | `WhatsApp Image 2026-10-21 at 09.04.06.jpeg` | 1280 × 960 | Group in formal attire. Kept 4:3 without cutting people at either edge. | `msef/site/programmes/youth-and-recovery` | Uploaded; confirm event context, participant permission, and any minors before public display. |
| MSEF-08 | `WhatsApp Image 2026-10-21 at 09.05.43.jpeg` | 1280 × 960 | Group in cultural attire. Kept 4:3 without a decontextualized portrait crop. | `msef/site/programmes/youth-and-recovery` | Uploaded; confirm event context, informed consent, safeguarding, and public-use suitability before display. |
| MSEF-09 | `WhatsApp Image 2026-10-21 at 09.18.31.jpeg` | 1280 × 960 | Community tree-planting photo. Original 4:3 frame preserved; not rotated to avoid cutting people or the sapling. | `msef/site/programmes/environment` | Uploaded; confirm participant permission and event context. |
| MSEF-10 | `WhatsApp Image 2026-10-21 at 09.18.32.jpeg` | 960 × 1095 | Speaker portrait. Optimized to 4:5 with face-focused crop. | `msef/site/team` | Uploaded; confirm person’s identity/role and permission before public caption/display. |
| MSEF-11 | `WhatsApp Image 2026-10-21 at 09.18.40.jpeg` | 2892 × 4160 | Tall exterior and group image. Optimized to 3:4, trimming excess foreground while retaining building and group. | `msef/site/about` | Uploaded; confirm event/current facility context and group permission before public display. |
| MSEF-12 | `WhatsApp Image 2026-10-21 at 12.18.42.jpeg` | 1269 × 1240 | Foundation logo artwork. The header/footer use a small centered emblem crop, with the Foundation name set as live text. | `msef/site/shared` | Applied at the user's request. The JPEG contains a checkerboard background and 3D lettering; use a clean transparent/vector master when available for a polished full logo. |

## Upload record

| Date | Asset ID | Cloudinary IDs and URLs | Delivery check |
| --- | --- | --- | --- |
| 2026-10-23 | MSEF-01 to MSEF-12 | Exact public IDs, source URLs, and optimized URLs are recorded per asset in `frontend/src/content/media-library.json`. | All 12 optimized URLs returned HTTP 200. Review crop composition in the actual page layouts during frontend implementation. |

## Alt text drafts

Finalize these with the approved placement and image context; use empty alt text where the image is purely decorative.

| ID | Draft description |
| --- | --- |
| MSEF-01 | MSEF team members standing together outside a building with a Morning Star Empowerment Foundation sign. |
| MSEF-02 | Portrait of an MSEF representative. *(Name and role to be confirmed.)* |
| MSEF-03 | Exterior of a building identified by its sign as the Morning Star rehabilitation and counseling centre. *(Publish only after current status is confirmed.)* |
| MSEF-04 | Interior room showing beds and medical equipment. *(Publish only after service and facility context is confirmed.)* |
| MSEF-05 | MSEF team members standing together outdoors. *(Confirm names/roles and consent.)* |
| MSEF-06 | Farmer standing in a cultivated maize field. |
| MSEF-07 | A group of young men and adults standing together outdoors. *(Confirm event context and ages before publishing.)* |
| MSEF-08 | Community members wearing traditional clothing at an outdoor gathering. *(Confirm context and consent before publishing.)* |
| MSEF-09 | Community members planting a young tree outside a building. |
| MSEF-10 | MSEF representative speaking into a microphone at an event. *(Confirm name and role.)* |
| MSEF-11 | Group standing outside a Morning Star Foundation building. *(Confirm context and permission.)* |
| MSEF-12 | Morning Star Empowerment Foundation logo artwork. *(Used as a small cropped emblem in the site header/footer; replace with a clean master for final branding.)* |
