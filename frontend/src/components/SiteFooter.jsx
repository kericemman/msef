import { Link } from "react-router-dom";
import Arrow from "./Arrow.jsx";

const navigation = [
  { label: "About us", to: "/about" },
  { label: "Our programmes", to: "/programmes" },
  { label: "Get involved", to: "/get-involved" },
  { label: "Contact", to: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer
      className="site-footer !bg-[#00172E] text-white"
      style={{ backgroundColor: "#00172E" }}
      id="contact"
    >
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-11 sm:px-8 sm:pt-14 lg:px-12">
        <div className="grid gap-9 border-b border-white/15 pb-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:pb-12">
          <div>
            <Link
              className="inline-block border-l-2 border-[#DAA520] pl-4"
              to="/"
              aria-label="Morning Star Empowerment Foundation home"
            >
              <span className="block text-sm font-semibold tracking-[0.12em]">
                MORNING STAR
              </span>
              <span className="mt-1 block text-xs tracking-[0.08em] text-white/65">
                EMPOWERMENT FOUNDATION
              </span>
            </Link>
            <p className="mt-5 max-w-sm !text-sm leading-6 text-white/75 md:!text-base">
              Empowering people. Transforming communities. Elevating lives.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/65">
              Mosoriot Town, Nandi County, Kenya
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-4 text-sm font-semibold text-white">Explore</h2>
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    className="inline-flex min-h-10 items-center text-sm text-white/65 transition-colors hover:text-[#DAA520]"
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">Contact</h2>
            <address className="space-y-3 not-italic text-sm leading-6 text-white/70">
              <a
                className="block transition-colors hover:text-[#DAA520]"
                href="tel:+254742935769"
              >
                0742 935 769
              </a>
              <a
                className="block break-all transition-colors hover:text-[#DAA520]"
                href="mailto:info@morningstar-ef.org"
              >
                info@morningstar-ef.org
              </a>
              <span className="block">Mosoriot Town, Nandi County, Kenya</span>
            </address>
            <Link
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#DAA520] px-4 text-sm font-semibold text-[#001F3F] transition-colors hover:bg-[#E8B83D]"
              to="/contact"
            >
              Contact the Foundation <Arrow />
            </Link>
          </div>

          <nav aria-label="Legal information">
            <h2 className="mb-4 text-sm font-semibold text-white">
              Information
            </h2>
            <ul className="space-y-1">
              <li>
                <Link
                  className="inline-flex min-h-10 items-center text-sm text-white/65 transition-colors hover:text-[#DAA520]"
                  to="/terms"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="inline-flex min-h-10 items-center text-sm text-white/65 transition-colors hover:text-[#DAA520]"
                  to="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Morning Star Empowerment Foundation
          </span>
          <span>Community first. Always.</span>
        </div>
      </div>
    </footer>
  );
}
