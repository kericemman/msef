import { Link } from "react-router-dom";
import Arrow from "../../../components/Arrow.jsx";

export default function InsightsSection({ insights = [] }) {
  return (
    <section
      className="px-5 py-16 text-[#001F3F] sm:px-8 md:py-24"
      id="insights"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between md:mb-12">
          <div>
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#9B6B00]">
              05 / Insights
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:!text-2xl lg:!text-3xl">
              Ideas for{" "}
              <span className="font-serif font-normal italic text-[#9B6B00]">
                lasting change.
              </span>
            </h2>
          </div>
          <p className="max-w-md !text-sm leading-7 text-[#526171] md:!text-xl">
            News, stories, and perspectives from Morning Star Empowerment
            Foundation.
          </p>
        </div>

        {insights.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((item) => (
              <article
                className="group overflow-hidden border border-[#E2E6E8] bg-white"
                key={item.id}
              >
                {item.image?.url && (
                  <img
                    className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    src={item.image.url}
                    alt={item.image.alt || ""}
                    loading="lazy"
                  />
                )}
                <div className="p-5 sm:p-6">
                  {item.category && (
                    <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#9B6B00]">
                      {item.category}
                    </p>
                  )}
                  <h3 className="!text-lg font-semibold leading-snug md:!text-xl">
                    {item.title}
                  </h3>
                  {/* <p className="mt-3 !text-sm leading-7 text-[#627080] md:!text-base">
                    {item.excerpt}
                  </p> */}
                  <Link
                    className="mt-5 inline-flex min-h-11 items-center gap-3 border-b border-[#DAA520] pb-2 text-sm font-semibold transition-colors hover:text-[#9B6B00]"
                    to={`/insights/${item.slug}`}
                  >
                    Read story <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-48 flex-col justify-center border-y border-[#D9DEE1] py-8 sm:min-h-56 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div>
              <h3 className="!text-xl font-semibold md:!text-2xl">
                New perspectives are on the way.
              </h3>
              <p className="mt-3 max-w-xl !text-sm leading-7 text-[#627080] md:!text-xl">
                Stories and updates from the Foundation will be published here.
              </p>
            </div>
            <span
              className="mt-6 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#F8F6EF] text-xl text-[#9B6B00] sm:mt-0"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
