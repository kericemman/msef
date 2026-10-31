import { Link } from "react-router-dom";
import media from "../../content/media-library.json";
import { programmes } from "../../content/programmes.js";
import { youthRecoveryProgrammeContent as content } from "../../content/youth-recovery-programme-content.js";
import { useEffect } from "react";


const programme = programmes.find((item) => item.slug === "youth-and-recovery");
const communityImage = media.assets.find((asset) => asset.id === "MSEF-08");

export default function YouthRecoveryProgrammePage() {
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
                Ask about recovery support <span aria-hidden="true">↗</span>
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#001F3F]/20 px-5 py-3 text-sm font-semibold text-[#001F3F] transition hover:bg-white"
                to="/get-involved"
              >
                Support youth wellbeing
              </Link>
            </div>
          </div>

          {communityImage && (
            <figure className="m-0">
              <img
                className="block aspect-[4/3] w-full rounded-sm object-cover shadow-[0_22px_55px_rgba(0,31,63,0.14)]"
                src={communityImage.optimizedUrl}
                alt={communityImage.alt}
              />
             
            </figure>
          )}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12"
        id="services"
      >
        <div className="mb-9 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8C6200]">
            Four areas of support
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
            A programme that brings recovery and youth development together.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#526171] md:text-xl md:leading-8">
            The previous rehabilitation site described inpatient care, outpatient support, and counselling. Morning Star’s Foundation profile adds a wider focus on prevention, mentorship, and opportunities for young people.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {content.services.map((service) => (
            <article
              className="flex h-full flex-col border border-[#001F3F]/10 bg-white p-6 shadow-[0_12px_34px_rgba(0,31,63,0.05)] sm:p-8"
              id={service.id}
              key={service.id}
            >
              <div className="flex items-start justify-between gap-5 border-b border-[#001F3F]/10 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8C6200]">
                    {service.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug md:text-2xl">
                    {service.title}
                  </h3>
                </div>
                <span className="shrink-0 text-sm font-bold tracking-[0.12em] text-[#8C6200]">
                  {service.number}
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-[#526171] md:text-base">
                {service.introduction}
              </p>

              <ul className="mt-4 space-y-3 p-0">
                {service.highlights.map((highlight) => (
                  <li
                    className="flex list-none items-start gap-3 text-sm leading-6 text-[#435467] md:text-base"
                    key={highlight}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#DAA520]/15 text-[10px] font-bold leading-none text-[#8C6200]"
                    >
                      ✓
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8C6200]">
              The change this work aims to support
            </p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
              Recovery can strengthen lives, families, and community connection.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {content.impact.map((item) => (
              <article
                className="border-t-2 border-[#DAA520] bg-white p-6 sm:p-7"
                key={item.title}
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#526171] md:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#627080]">
            These are intended contributions, not measured results or guarantees.
          </p>
        </div>
      </section>

     

      <section className="border-t border-[#001F3F]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
              Ask about inpatient, outpatient, counselling, or youth programmes.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#526171] md:text-base">
              Contact Morning Star to discuss current availability and the right next step.
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
          <Link className="hover:text-[#8C6200]" to="/programmes/agriculture">
            ← Previous programme: Agriculture
          </Link>
          <Link className="hover:text-[#8C6200]" to="/programmes/education-and-skills">
            Next programme: Education and skills →
          </Link>
        </div>
      </div>
    </main>
  );
}
