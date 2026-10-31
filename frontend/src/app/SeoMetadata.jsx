import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Morning Star Empowerment Foundation";
const PAGE_METADATA = [
  {
    match: /^\/$/,
    title: "Morning Star Empowerment Foundation | Empowering Communities",
    description:
      "Morning Star Empowerment Foundation works with communities through recovery support, education, livelihoods, agriculture, and environmental care.",
  },
  {
    match: /^\/about\/?$/,
    title: "About Us | Morning Star Empowerment Foundation",
    description:
      "Learn about Morning Star Empowerment Foundation, our purpose, approach, leadership, and commitment to community development.",
  },
  {
    match: /^\/programmes\/?$/,
    title: "Our Programmes | Morning Star Empowerment Foundation",
    description:
      "Explore Morning Star programmes in recovery, education, agriculture, environmental conservation, economic empowerment, and community support.",
  },
  {
    match: /^\/programmes\/([^/]+)\/?$/,
    title: "Programme | Morning Star Empowerment Foundation",
    description:
      "Discover how Morning Star Empowerment Foundation works with communities through its programmes.",
  },
  {
    match: /^\/get-involved\/?$/,
    title: "Get Involved | Morning Star Empowerment Foundation",
    description:
      "Support Morning Star Empowerment Foundation’s community programmes and help create opportunity and lasting change.",
  },
  {
    match: /^\/callback\/?$/,
    title: `Payment status | ${SITE_NAME}`,
    description: "Securely checking a donation payment for Morning Star Empowerment Foundation.",
    robots: "noindex, nofollow, noarchive",
  },
  {
    match: /^\/contact\/?$/,
    title: "Contact Us | Morning Star Empowerment Foundation",
    description:
      "Contact Morning Star Empowerment Foundation to ask about our programmes, partnerships, and community work.",
  },
  {
    match: /^\/insights\/([^/]+)\/?$/,
    title: "Insights | Morning Star Empowerment Foundation",
    description:
      "Read updates and stories from Morning Star Empowerment Foundation’s work with communities.",
  },
  {
    match: /^\/terms\/?$/,
    title: "Terms of Service | Morning Star Empowerment Foundation",
    description: "Terms of service for the Morning Star Empowerment Foundation website.",
  },
  {
    match: /^\/privacy\/?$/,
    title: "Privacy Policy | Morning Star Empowerment Foundation",
    description: "Privacy policy for the Morning Star Empowerment Foundation website.",
  },
];

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

export default function SeoMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
    const metadata = PAGE_METADATA.find(({ match }) => match.test(pathname));

    document.title = isAdmin
      ? `Admin | ${SITE_NAME}`
      : metadata?.title || `Page not found | ${SITE_NAME}`;

    setMeta(
      'meta[name="description"]',
      "content",
      metadata?.description || "Explore Morning Star Empowerment Foundation’s work with communities.",
    );
    setMeta(
      'meta[name="robots"]',
      "content",
      isAdmin
        ? "noindex, nofollow, noarchive"
        : metadata?.robots || "index, follow, max-image-preview:large",
    );
    setMeta('meta[property="og:title"]', "content", document.title);
    setMeta(
      'meta[property="og:url"]',
      "content",
      `https://morningstar-ef.org${pathname}`,
    );
    setMeta(
      'meta[property="og:description"]',
      "content",
      metadata?.description || "Explore Morning Star Empowerment Foundation’s work with communities.",
    );
    setMeta('meta[name="twitter:title"]', "content", document.title);
    setMeta(
      'meta[name="twitter:description"]',
      "content",
      metadata?.description || "Explore Morning Star Empowerment Foundation’s work with communities.",
    );
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `https://morningstar-ef.org${pathname}`;
  }, [pathname]);

  return null;
}
