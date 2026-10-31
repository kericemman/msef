import { Link } from "react-router-dom";
import { useEffect } from "react";
import Icon from "../../components/Icon.jsx";
const sections = [
  {
    title: "Using this website",
    paragraphs: [
      "This website shares information about Morning Star Empowerment Foundation (MSEF), its community programmes, and ways to contact or support the Foundation. By using the site, you agree to use it lawfully and respectfully.",
      "Please do not interfere with the site, attempt unauthorized access, submit malicious material, or use the forms to send unlawful, misleading, or harmful content.",
    ],
  },
  {
    title: "Programme information",
    paragraphs: [
      "Website descriptions are general information about the Foundation’s work. Programme availability, eligibility, locations, and delivery may change. Contact the Foundation to confirm current details before making plans or decisions.",
      "Information on this website is not medical, counselling, legal, or financial advice and does not replace advice from a suitably qualified professional.",
    ],
  },
  {
    title: "Donations and payments",
    paragraphs: [
      "Donations are voluntary and are processed through Paystack. The payment provider will display the available payment methods and its own terms during checkout. MSEF does not receive or store full payment card details through this website.",
      "A donation is recorded as complete only after payment verification. If you have a question about a payment or need assistance, contact the Foundation with the payment reference and the email used at checkout.",
    ],
  },
  {
    title: "Website content and intellectual property",
    paragraphs: [
      "Unless otherwise stated, site text, identity, and other materials are provided by or for MSEF. You may share links to public pages. Ask the Foundation before reproducing substantial content, photographs, or other materials, and respect the rights and consent of people shown in images or stories.",
    ],
  },
  {
    title: "External services and links",
    paragraphs: [
      "The site may link to third-party services, including payment and media services. Those services operate under their own terms and privacy notices. MSEF is not responsible for the availability or content of external websites.",
    ],
  },
  {
    title: "Changes and contact",
    paragraphs: [
      "We may update these terms as the website or Foundation services change. The date shown above indicates the latest update to this page.",
    ],
  },
];

export default function TermsPage() {
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
          <Icon name="arrow-left" size={16} /> Return to the website
        </Link>
        <header className="mt-8 border-b border-[#001F3F]/15 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a6812] sm:text-sm">
            Foundation information
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[#667687]">
            Last updated: 26 October 2026
          </p>
          <p className="mt-5 text-sm leading-7 text-[#435365] md:text-xl md:leading-8">
            These terms explain the basic conditions for using the Morning Star
            Empowerment Foundation website.
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
        <p className="mt-10 border-t border-[#001F3F]/15 pt-6 text-sm leading-7 text-[#526171]">
          Questions about these terms?{" "}
          <Link
            to="/contact"
            className="font-semibold text-[#001F3F] underline decoration-[#DAA520] underline-offset-4"
          >
            Contact the Foundation
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
