# Phase 2 — Requirements and sitemap

**Status: proposed for review.** This document translates the supplied Foundation Profile and the legacy website into a practical first-release scope. “Confirm” marks details that must be verified before they become public copy or functional commitments.

## 1. Purpose and positioning

The website should introduce Morning Star Empowerment Foundation (MSEF) as the umbrella organization, explain its five programme areas in plain language, establish trust through transparent organizational information, and help visitors take an appropriate next step. The existing rehabilitation-focused site is a reference source; it does not define the scope of the rebuilt site.

## 2. Audiences and their needs

| Audience | What they need to understand or do | Appropriate next step |
| --- | --- | --- |
| Community members and families | What programmes are offered, whom they are intended to serve, and how to make an enquiry | Contact MSEF by phone or general enquiry form |
| Young people and people seeking recovery support | Whether relevant support is available and how to ask about it safely | Call the Foundation; do not submit medical histories online |
| Partners, professionals, and community organizations | MSEF’s purpose, programme scope, and how to discuss collaboration | Partnership enquiry |
| Donors and other supporters | The Foundation’s work and how to discuss support | Contact MSEF; no online payment is assumed |
| General public and prospective stakeholders | Mission, vision, location, governance, and programme approach | Explore programmes or contact MSEF |

Audience priority is a planning recommendation, not a user-confirmed ranking: community members seeking programme information first, then prospective partners and supporters.

## 3. Site goals and success criteria

- Make the Foundation’s identity and five programme areas easy to understand from the homepage.
- Give each programme a clear description and a relevant contact route without promising unverified services or outcomes.
- Make contact information easy to find on every page.
- Provide a safe, minimal general enquiry form after its backend flow and privacy handling are agreed.
- Work on mobile and desktop, be keyboard accessible, and use readable contrast while retaining the navy, goldenrod, and orange palette.
- Keep page content maintainable separately from layout and components.

## 4. Proposed first-release sitemap

### Main navigation

1. **Home** (`/`) — Short introduction, five programme summaries, approach, and clear links to programmes and contact.
2. **About** (`/about`) — Mission, vision, objectives, people served, operating approach, and governance/accountability information that MSEF can verify.
3. **Programmes** (`/programmes`) — Overview and links to the five programme pages:
   - Agriculture and agribusiness (`/programmes/agriculture`)
   - Youth empowerment and recovery (`/programmes/youth-and-recovery`)
   - Education, skills, and vocational training (`/programmes/education-and-skills`)
   - Environment and climate resilience (`/programmes/environment`)
   - Economic empowerment (`/programmes/economic-empowerment`)
4. **Get involved** (`/get-involved`) — Partnership and support pathways, with no unverified donation or payment process.
5. **Contact** (`/contact`) — Confirmed public contact details, office location, and a minimal general enquiry form if approved.

### Footer links

- Privacy notice (required before collecting personal information through a form; content and responsible entity to be confirmed).
- Accessibility/contact route for reporting access barriers.
- Social links only for accounts MSEF confirms it controls and wants to publish.

### Page relationship

```text
Home
├── About
├── Programmes
│   ├── Agriculture and agribusiness
│   ├── Youth empowerment and recovery
│   ├── Education, skills, and vocational training
│   ├── Environment and climate resilience
│   └── Economic empowerment
├── Get involved
└── Contact
```

## 5. Calls to action

- **Explore our programmes** — primary homepage action.
- **Contact the Foundation** — general questions and programme enquiries.
- **Discuss a partnership** — organizations and professionals.
- **Discuss supporting our work** — supporters; route to contact until MSEF confirms an approved giving method.
- Recovery-related enquiries should use a confirmed phone/contact route. The site must not present itself as an emergency service or collect sensitive health histories through the general form.

## 6. First-release scope and exclusions

### Included in planning scope

- Public information pages listed above.
- A minimal contact enquiry, subject to Phase 4 decisions on consent, recipient, storage, spam controls, and retention.
- Clear links to the public phone and email once reconfirmed.

### Not assumed for first release

- Online donations, payment processing, or donor accounts.
- User accounts, member portals, appointment booking, or case management.
- Scholarship applications, loan/credit applications, or collection of financial data.
- Medical intake, counselling records, or sensitive personal information in a website form.
- Newsletter subscription until audience, consent, list ownership, and retention are decided.
- A Resources/blog section until articles are reviewed and approved.
- Claims of accredited qualifications, guaranteed outcomes, or current service availability without confirmation.

## 7. Legacy content disposition

- Use rehabilitation and counselling material only as source material for the youth and recovery programme; confirm what services are currently available and approve safeguarding/clinical language.
- Review legacy articles individually for accuracy, relevance, and health claims before deciding whether to publish a Resources section.
- Treat legacy scholarship, donation/payment, sauna, massage, and gym content as out of scope until MSEF confirms these are current offerings.
- Do not carry over old forms, payment links, or integrations without confirming destinations, ownership, and data handling.

## 8. Requirements carried into later phases

- **Copy (Phase 3):** Verify public organization/registration description, programme names and availability, outcomes, governance details, contact formatting, and any referral guidance.
- **Design (Phase 4):** Keep `#001F3F`, `#DAA520`, `#FF8C00`, `#FFFFFF`, `#F5F5F5`, and `#333333`; check actual text/background contrast.
- **Assets (Phase 5):** Use newly supplied and approved images; upload approved images to Cloudinary and use delivery URLs. Do not use legacy images by default.
- **Backend (Phases 7–8):** If the contact form is approved, define minimal fields, validation, email recipient, whether enquiries are persisted in MongoDB, consent text, retention/deletion policy, spam/rate controls, and access to stored submissions. Resend sends email; MongoDB persistence is a separate explicit data-handling decision.

## 9. Decisions needed to approve Phase 2

1. Approve this five-programme site structure and the proposed first-release pages, or identify changes.
2. Confirm whether the recommended priority—community members first, then partners/supporters—matches MSEF’s priorities.
3. Confirm whether each of the five programme areas is currently active and publicly describable.
4. Confirm the desired recovery/counselling enquiry route and whether any dedicated referral information should appear.
5. Confirm whether Resources, scholarships, online donations, or legacy gym/sauna/massage services belong in the launch scope.
6. Confirm the public contact details: Mosoriot Town, Nandi County, Kenya; 0742935769; starmorning2010@gmail.com.
7. Confirm the public registration wording and which governance/accountability details may be published.
8. Decide whether the first release should include a contact form; if yes, approve a minimal general enquiry form and decide later-phase retention/storage details before implementation.

Until these are answered, the sitemap is a proposed scope and must not be treated as approved public copy or a promise that a programme is available.
