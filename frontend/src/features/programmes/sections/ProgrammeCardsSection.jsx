import { Link } from "react-router-dom";
import { programmes } from "../../../content/programmes.js";
import Icon from "../../../components/Icon.jsx";

export default function ProgrammeCardsSection() {
  return (
    <section
      aria-label="Programme areas"
      className="px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col gap-4 border-b border-[#001F3F]/15 pb-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#8a6812] sm:text-sm">
              Where we focus
            </p>
            <h2 className="text-2xl font-semibold leading-tight text-[#001F3F] md:text-2xl lg:text-3xl">
              Explore our programme areas
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {programmes.map((programme) => (
            <article
              key={programme.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#001F3F]/10 bg-white shadow-[0_12px_32px_rgba(0,31,63,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,31,63,0.12)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#dce3e8]">
                <img
                  src={programme.previewImage.optimizedUrl}
                  alt={programme.previewImage.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#001F3F]/90 px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-white">
                  {programme.number}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-xl font-semibold leading-snug text-[#001F3F]">
                  {programme.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#435365] md:text-lg">
                  {programme.shortDescription}
                </p>
                {programme.slug !== "other-services" ? (
                  <Link
                    to={`/programmes/${programme.slug}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-[#DAA520] pb-1 text-sm font-bold text-[#001F3F] transition-colors hover:text-[#8a6812] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DAA520]"
                    aria-label={`Explore ${programme.title}`}
                  >
                    Explore programme{" "}
                    <span
                      aria-hidden="true"
                      className="text-base transition-transform group-hover:translate-x-1"
                    >
                      <Icon name="arrow-up-right" size={16} />
                    </span>
                  </Link>
                ) : (
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-[#DAA520] pb-1 text-sm font-bold text-[#001F3F] transition-colors hover:text-[#8a6812] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DAA520]"
                  >
                    Contact us{" "}
                    <span
                      aria-hidden="true"
                      className="text-base transition-transform group-hover:translate-x-1"
                    >
                      <Icon name="arrow-up-right" size={16} />
                    </span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
