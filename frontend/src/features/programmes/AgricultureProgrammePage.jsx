import { Link } from "react-router-dom";
import { programmes } from "../../content/programmes.js";
import { agricultureProgrammeContent as content } from "../../content/agriculture-programme-content.js";
import { useEffect } from "react";
const programme = programmes.find((item) => item.slug === "agriculture");

export default function AgricultureProgrammePage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <main className="bg-white text-[#001F3F]">
      <section className="bg-[#F8F6EF]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-12 lg:py-20">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#627080]"
            >
              <Link className="font-semibold text-[#8C6200] hover:underline" to="/programmes">
                Programmes
              </Link>
              <span aria-hidden="true">/</span>
              <span>{programme.title}</span>
            </nav>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#8C6200]">
              Programme area {programme.number}
            </p>
            <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
              {content.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#46596B] md:text-xl md:leading-8">
              {content.introduction}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-[#001F3F] px-5 py-3 text-sm font-semibold text-white "
                to="/contact"
              >
                Ask about this programme <span aria-hidden="true">↗</span>
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#001F3F]/20 px-5 py-3 text-sm font-semibold text-[#001F3F] transition hover:bg-white"
                to="/get-involved"
              >
                Explore ways to support
              </Link>
            </div>
           
          </div>

          {programme.image && (
            <figure className="m-0">
              <img
                className="block aspect-[4/3] w-full rounded-sm object-cover shadow-[0_22px_55px_rgba(0,31,63,0.14)]"
                src={programme.image.optimizedUrl}
                alt={programme.image.alt}
              />
              
            </figure>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8C6200]">
            From planting to marketing
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
            A connected pathway for stronger farming livelihoods.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#526171] md:text-xl md:leading-8">
            The programme looks across the agricultural journey, linking practical knowledge in the field with how crops are preserved, prepared, and brought to market.
          </p>
        </div>

        <ol className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {content.pathway.map((step) => (
            <li
              className="flex min-h-52 flex-col border-t-2 border-[#DAA520] bg-[#F8F6EF] p-5"
              key={step.number}
            >
              <span className="text-xs font-bold tracking-[0.16em] text-[#8C6200]">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#526171]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#F5F5F5]">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-12">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8C6200]">
              What Morning Star is working to advance
            </p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
              Practical knowledge, sustainable production, and opportunity.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#526171] md:text-xl md:leading-8">
              The Foundation’s profile describes a broad approach to agriculture: strengthen how food is grown, reduce avoidable losses, and improve the opportunities available along the value chain.
            </p>
          </div>

          <div className="divide-y divide-[#001F3F]/15 border-y border-[#001F3F]/15">
            {content.workAreas.map((area, index) => (
              <article className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr] sm:gap-4" key={area.title}>
                <span className="pt-1 text-xs font-bold tracking-[0.12em] text-[#8C6200]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{area.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#526171] md:text-base">
                    {area.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="rounded-sm bg-[#001F3F] px-6 py-9 text-white sm:px-9 md:py-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C75E]">
            The change we want to see
          </p>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
                Farming that can support resilient communities.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/80 md:text-xl md:leading-8">
                These are the intended contributions of the programme, not measured results or guarantees.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {content.intendedChange.map((item) => (
                <article className="border-t border-[#F0C75E]/70 pt-4" key={item.title}>
                  <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/75">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#001F3F]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
              Interested in agriculture and agribusiness?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#526171] md:text-base">
              Contact Morning Star to discuss community priorities, partnerships, and which activities are currently available.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-sm bg-[#DAA520] px-5 py-3 text-sm font-semibold text-[#001F3F] transition hover:bg-[#E9BB3C]"
            to="/contact"
          >
            Contact the Foundation <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <div className="bg-[#F5F5F5]">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-5 py-5 text-sm font-semibold sm:px-8 lg:px-12">
          <Link className="hover:text-[#8C6200]" to="/programmes">
            ← All programmes
          </Link>
          <Link className="hover:text-[#8C6200]" to="/programmes/youth-and-recovery">
            Next programme: Youth empowerment →
          </Link>
        </div>
      </div>
    </main>
  );
}
