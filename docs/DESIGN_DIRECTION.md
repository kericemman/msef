# Phase 4 — Design direction

**Status: proposed visual system.** This direction preserves MSEF’s existing colors and is based on the Foundation Profile, the proposed sitemap, and a review of the legacy stylesheet. It guides later implementation; no frontend UI is being built in this phase.

## Design goal

Create a welcoming, trustworthy, community-centered nonprofit website that makes MSEF’s five programme areas easy to understand. The visual tone should feel human and grounded, with clear information hierarchy, real approved community imagery, and generous space. Avoid looking like a clinic-only site, a financial product, or a generic corporate template.

## Brand palette

Keep the existing palette as the source of truth:

| Color | Hex | Recommended role |
| --- | --- | --- |
| Navy blue | `#001F3F` | Main headings, navigation, primary buttons, footer, text on light backgrounds |
| Goldenrod | `#DAA520` | Small highlights, rules, icons, labels, decorative details |
| Orange | `#FF8C00` | Select secondary accents, active states, small decorative details |
| White | `#FFFFFF` | Main page and card backgrounds |
| Light gray | `#F5F5F5` | Alternate section backgrounds and subtle panels |
| Dark gray | `#333333` | Paragraphs and supporting text |

### Contrast guidance

Measured contrast ratios for the existing colors:

| Foreground on background | Ratio | Use |
| --- | ---: | --- |
| Navy on white | 16.56:1 | Suitable for normal text |
| Dark gray on white | 12.63:1 | Suitable for normal text |
| Navy on light gray | 15.19:1 | Suitable for normal text |
| Goldenrod on white | 2.24:1 | Accent only; not normal-size text or a text-bearing button fill |
| Orange on white | 2.33:1 | Accent only; not normal-size text or a text-bearing button fill |

Use navy or dark gray for text on white/light gray. Use white text on navy. Goldenrod and orange can remain visible in borders, shapes, illustrations, and icon details; do not rely on them alone to communicate meaning. If gold or orange must carry text or serve as a button background, derive and check a darker accessible shade while retaining the existing hue family. Verify actual component pairs during implementation.

## Typography

- Start from the legacy site’s Poppins sans-serif family for headings and body copy to retain some visual continuity.
- Use a readable system sans-serif fallback if the web font cannot load; content must not depend on a third-party font service.
- Body text: 16px minimum on desktop and mobile, line-height around 1.5–1.7.
- Use a clear type scale with one page H1, section H2s, and subordinate H3s. Avoid coloring every heading gold or orange; navy is the default heading color.
- Keep paragraphs concise, line lengths comfortable, and bold emphasis selective.

## Layout and imagery

- Use a mobile-first responsive grid with a readable content width; avoid fixed-width page layouts and horizontal overflow.
- Establish consistent section spacing and alignment across pages. Alternate white and light gray sections to support scanning.
- Home page flow: clear hero and primary action, Foundation introduction, five programme summaries, community approach, then a final contact/partnership action.
- Programme pages should share a repeatable structure: page title, short purpose statement, programme focus, careful availability/claims language, and a relevant contact action.
- Use supplied and approved assets from Cloudinary when available. Prefer authentic, respectful community and programme photography; avoid stock imagery that implies unconfirmed services, facilities, qualifications, or beneficiaries.
- Reserve image aspect ratios to prevent layout shifts; use responsive optimized formats and meaningful alt text. Decorative images should have empty alt text.
- Use restrained borders and soft depth only where they clarify grouping. Avoid gradients, excessive card grids, and decorative motion that competes with content.

## Navigation and interactions

- Keep the main navigation limited to Home, About, Programmes, Get involved, and Contact, subject to sitemap approval.
- On small screens, use a clearly labeled menu button with keyboard support, visible focus, and an adequately sized touch target.
- Buttons and links need distinct hover, focus, active, and disabled states. Never make hover the only way to reveal content.
- Prefer simple static content over a carousel. Use testimonials only if MSEF supplies and approves real quotes, names/roles, and image permissions.
- Keep motion subtle and nonessential; respect `prefers-reduced-motion` and leave important content visible without animation.
- Use descriptive link labels and SVG icons with accessible names; do not use emoji as interface icons.

## Accessibility and responsive review targets

- Meet WCAG AA contrast for text and controls; visible keyboard focus must remain clear against each surface.
- Use semantic landmarks, a skip link, logical heading order, labeled form controls, helpful inline errors, and keyboard-operable navigation.
- Keep touch targets at least 44 × 44 CSS pixels where practical, with clear spacing between adjacent actions.
- Review layouts at 375px, 768px, 1024px, and 1440px widths; support browser zoom and avoid horizontal scrolling.
- Do not communicate status by color alone. Provide text, labels, or icon-plus-text cues.

## Legacy references

The existing stylesheet defines Poppins and the six brand colors. It also contains several competing colors and font choices across pages. This new direction keeps the colors the user asked to retain and consolidates typography and hierarchy rather than carrying inconsistent legacy styling forward.

## Design-tool search note

The UI/UX Pro Max design-system search returned unrelated palettes and font recommendations for this organization on two queries. Those outputs were discarded. This document uses the skill’s general accessibility and responsive-design defaults, adapted to MSEF’s actual brand colors and legacy Poppins styling.
