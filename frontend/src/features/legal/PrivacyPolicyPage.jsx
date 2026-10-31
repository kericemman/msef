import { Link } from "react-router-dom";
import { useEffect } from "react";

const sections = [
  {
    title: "Information you provide",
    paragraphs: [
      "When you send an enquiry, we receive your name, email address, optional phone number, enquiry topic, and message. The contact form asks for your permission to use those details to respond.",
      "When you make a donation, the checkout form collects your name and email address, your chosen amount, and an optional phone number. The payment provider processes your payment details. MSEF receives payment status and a transaction reference so it can confirm and account for the donation.",
      "If you subscribe to insight updates, we store your email address and subscription status so we can email you when a new insight is published. Each update includes an unsubscribe link, and you may opt out at any time.",
    ],
  },
  {
    title: "How we use information",
    paragraphs: [
      "We use enquiry details to respond and follow up, and donation details to initiate and verify payments, provide donation support, and maintain appropriate financial records. We use information submitted to the website to operate, protect, and improve these services.",
      "If a testimonial or photograph is published, the name, attribution, quote, or image provided for that item may be visible to anyone visiting the website. The Foundation should obtain permission before publishing identifiable stories or photographs.",
    ],
  },
  {
    title: "Service providers",
    paragraphs: [
      "The website uses MongoDB to store enquiries, donation records, published content, and insight email subscriptions; Resend to deliver enquiry notifications and subscribed insight updates; Paystack to process payments; and Cloudinary to host images uploaded for website content. These providers process information as needed to provide their services and may process it in locations outside Kenya under their own arrangements and privacy terms.",
    ],
  },
  {
    title: "Storage and retention",
    paragraphs: [
      "We keep information for as long as it is needed to handle the purpose for which it was collected, support the Foundation’s records, meet applicable obligations, and address disputes or security issues. Retention periods may differ for enquiries, payment records, and published content.",
    ],
  },
  {
    title: "Cookies and security",
    paragraphs: [
      "The public website does not use cookies for advertising or cross-site tracking. A necessary, HttpOnly session cookie is used when an administrator signs in to the private dashboard.",
      "We use reasonable safeguards for information handled through the site. No online transmission or storage system can be guaranteed completely secure.",
    ],
  },
  {
    title: "Your choices and data rights",
    paragraphs: [
      "You may contact us to request access to personal information we hold about you, ask us to correct inaccurate information, object to its use, or request deletion where applicable. We may need to verify your identity and retain some records where an obligation or legitimate record-keeping need applies.",
      "You can also choose not to provide optional information, such as a phone number, or not to submit a form. Information marked as required is needed for that form or service to work.",
    ],
  },
  {
    title: "Children and sensitive information",
    paragraphs: [
      "Please do not include medical histories or other sensitive personal information in the website contact form. A parent, guardian, or authorized representative should contact us about a child’s personal information or a published story involving a child.",
    ],
  },
  {
    title: "Updates and contact",
    paragraphs: [
      "We may update this policy when our website or information practices change. The update date appears at the top of this page. For privacy questions or requests, contact Morning Star Empowerment Foundation using the details below.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="bg-[#F8F6EF] px-5 py-12 text-[#001F3F] sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <article className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-[#526171] underline decoration-[#DAA520] underline-offset-4"
        >
          ← Return to the website
        </Link>
        <header className="mt-8 border-b border-[#001F3F]/15 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a6812] sm:text-sm">
            Foundation information
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[#667687]">
            Last updated: 26 October 2026
          </p>
          <p className="mt-5 text-sm leading-7 text-[#435365] md:text-xl md:leading-8">
            This policy describes the personal information collected through the
            Morning Star Empowerment Foundation website and how it is used.
          </p>
        </header>
        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold md:text-2xl">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-[#35475a] md:text-lg md:leading-8">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <section className="mt-10 rounded-2xl bg-white p-5 sm:p-7">
          <h2 className="text-xl font-semibold md:text-2xl">
            Contact us about privacy
          </h2>
          <address className="mt-3 space-y-1 text-sm leading-7 text-[#526171] not-italic md:text-lg">
            <p>Morning Star Empowerment Foundation</p>
            <p>Mosoriot Town, Nandi County, Kenya</p>
            <p>
              <a
                className="underline decoration-[#DAA520] underline-offset-4"
                href="mailto:info@morningstar-e-foundation.org"
              >
                info@morningstar-e-foundation.org
              </a>
            </p>
            <p>
              <a
                className="underline decoration-[#DAA520] underline-offset-4"
                href="tel:+254742935769"
              >
                0742 935 769
              </a>
            </p>
          </address>
        </section>
        <p className="mt-6 text-xs leading-5 text-[#667687]">
          This page explains the website’s current information practices. It
          does not confirm regulatory registration or replace a review of the
          Foundation’s complete privacy obligations.
        </p>
      </article>
    </main>
  );
}
