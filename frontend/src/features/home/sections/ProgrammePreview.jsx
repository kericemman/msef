import { Link } from "react-router-dom";
import { programmes } from "../../../content/programmes.js";
import Arrow from "../../../components/Arrow.jsx";

export default function ProgrammePreview() {
  return (
    <section
      className="bg-[#F5F5F5] px-5 py-10 text-[#001F3F] sm:px-8 md:py-24"
      id="programmes"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#9B6B00]">
              02 / Our programs
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:!text-2xl lg:!text-3xl">
              Specific objectives.
              <br />
              <span className="font-serif font-normal italic text-[#9B6B00]">
                Shared opportunity.
              </span>
            </h2>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden border border-[#D9DEE1] bg-[#D9DEE1] sm:grid-cols-2 lg:grid-cols-5">
          {programmes.slice(0, 5).map((programme) => (
            <Link
              className="group flex min-h-64 flex-col bg-white p-5 transition-colors hover:bg-[#001F3F] hover:text-white sm:p-6"
              key={programme.slug}
              to={`/programmes/${programme.slug}`}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#9B6B00]">
                  {programme.number}
                </span>
                <span
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#DAA520] text-[#9B6B00] transition-colors group-hover:bg-[#DAA520] group-hover:text-[#001F3F]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
              <h3 className="mb-3 !text-base font-semibold leading-snug tracking-tight sm:!text-lg">
                {programme.title}
              </h3>
              <p className="!text-sm leading-6 text-[#627080] transition-colors group-hover:text-white/75 md:!text-base">
                {programme.shortDescription}
              </p>
              <span className="mt-auto border-t border-[#E5E8EA] pt-4 text-xs font-semibold uppercase tracking-widest text-[#9B6B00] group-hover:border-white/20">
                Explore area <span className="ml-2">→</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-7 flex justify-end">
          <Link
            className="inline-flex min-h-11 items-center gap-3 border-b border-[#DAA520] pb-2 text-sm font-semibold transition-colors hover:text-[#9B6B00]"
            to="/programmes"
          >
            View all programs <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
