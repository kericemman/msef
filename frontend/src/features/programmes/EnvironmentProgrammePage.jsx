import { Link } from "react-router-dom";
import media from "../../content/media-library.json";
import { programmes } from "../../content/programmes.js";
import { environmentProgrammeContent as content } from "../../content/environment-programme-content.js";
import { useEffect } from "react";


const programme = programmes.find((item) => item.slug === "environment");
const treePlantingImage = media.assets.find((asset) => asset.id === "MSEF-09");

export default function EnvironmentProgrammePage() {
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
              <Link
                className="font-semibold text-[#8C6200] hover:underline"
                to="/programmes"
              >
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
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-[#001F3F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12395F]"
                to="/contact"
              >
                Discuss an environmental partnership{" "}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#001F3F]/20 px-5 py-3 text-sm font-semibold text-[#001F3F] transition hover:bg-white"
                to="/get-involved"
              >
                Get involved
              </Link>
            </div>
          </div>

          {treePlantingImage && (
            <figure className="m-0">
              <img
                className="block aspect-[4/3] w-full rounded-sm object-cover shadow-[0_22px_55px_rgba(0,31,63,0.14)]"
                src={treePlantingImage.optimizedUrl}
                alt={treePlantingImage.alt}
              />
              <figcaption className="mt-3 text-xs text-[#627080]">
                Community members planting a young tree.
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8C6200]">
            From local priorities to practical action
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
            Caring for land, water, and community environments together.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#526171] md:text-xl md:leading-8">
            The programme brings together conservation, environmental learning, and climate resilience, with activities shaped by the needs of each community.
          </p>
        </div>

        <ol className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
          <div className="mb-9 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8C6200]">
              Programme focus areas
            </p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
              Practical ways to protect resources and respond to change.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#526171] md:text-xl md:leading-8">
              Morning Star’s profile identifies activities ranging from tree planting and agroforestry to waste reduction, water stewardship, and suitable renewable-energy approaches.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {content.focusAreas.map((area, index) => (
              <article
                className="border border-[#001F3F]/10 bg-white p-6 sm:p-8"
                key={area.title}
              >
                <div className="flex items-start justify-between gap-5">
                  <h3 className="text-lg font-semibold md:text-xl">{area.title}</h3>
                  <span className="shrink-0 text-xs font-bold tracking-[0.14em] text-[#8C6200]">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#526171] md:text-base">
                  {area.description}
                </p>
                <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
                  {area.tags.map((tag) => (
                    <li
                      className="rounded-full border border-[#001F3F]/15 bg-[#F8F6EF] px-3 py-1.5 text-xs font-medium text-[#435467]"
                      key={tag}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
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
                Communities equipped to care for the places they call home.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/80 md:text-xl md:leading-8">
                These are the programme’s intended contributions, not measured results or guarantees.
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

      <section className="border-y border-[#DAA520]/30 bg-[#F8F6EF]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:px-8 md:grid-cols-[auto_1fr] md:items-start md:gap-6 lg:px-12">
          <span aria-hidden="true" className="text-xl text-[#8C6200]">
            ✳
          </span>
          <div>
            <h2 className="text-lg font-semibold">Activities and partnerships</h2>
            <p className="mt-2 text-sm leading-7 text-[#526171]">
              {content.availabilityNote}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#001F3F]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
              Interested in a conservation or climate partnership?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#526171] md:text-base">
              Contact Morning Star to discuss community priorities, current projects, and possible collaboration.
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
          <Link className="hover:text-[#8C6200]" to="/programmes/education-and-skills">
            ← Previous programme: Education and skills
          </Link>
          <Link className="hover:text-[#8C6200]" to="/programmes/economic-empowerment">
            Next programme: Economic empowerment →
          </Link>
        </div>
      </div>
    </main>
  );
}
