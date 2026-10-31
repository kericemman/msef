const contactDetails = [
  {
    label: "Call us",
    value: "0742935769",
    href: "tel:+254742935769",
    detail: "Speak with us directly",
    icon: "phone",
  },
  {
    label: "Email us",
    value: "info@morningstar-ef.org",
    href: "mailto:info@morningstar-ef.org",
    detail: "Send us your enquiry",
    icon: "email",
  },
  {
    label: "Visit us",
    value: "Mosoriot Town, Nandi County, Kenya",
    href: "https://maps.google.com/?q=Mosoriot+Town%2C+Nandi+County%2C+Kenya",
    detail: "Operations office",
    icon: "location",
  },
];

function ContactIcon({ type }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (type === "phone")
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        aria-hidden="true"
        {...common}
      >
        <path d="M7 3.5h3l1.5 4-2 1.5a15 15 0 0 0 5.5 5.5l1.5-2 4 1.5v3c0 1.1-.9 2-2 2A16.5 16.5 0 0 1 5 5.5c0-1.1.9-2 2-2Z" />
      </svg>
    );
  if (type === "email")
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        aria-hidden="true"
        {...common}
      >
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" {...common}>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export default function ContactDetailsSection() {
  return (
    <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {contactDetails.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-[#001F3F]/10 bg-white p-5 shadow-[0_10px_28px_rgba(0,31,63,0.04)] sm:p-6"
          >
            <div
              className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-[#F8F6EF] text-[#001F3F]"
              aria-hidden="true"
            >
              <ContactIcon type={item.icon} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6812] sm:text-sm">
              {item.label}
            </p>
            <a
              href={item.href}
              target={item.href.startsWith("https://") ? "_blank" : undefined}
              rel={item.href.startsWith("https://") ? "noreferrer" : undefined}
              className="mt-2 inline-block break-words text-base font-semibold leading-6 text-[#001F3F] underline decoration-[#DAA520] decoration-2 underline-offset-4 hover:text-[#405773] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DAA520] sm:text-lg"
            >
              {item.value}
            </a>
            <p className="mt-2 text-sm text-[#667687]">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
