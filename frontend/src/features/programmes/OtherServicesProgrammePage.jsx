import { Link } from "react-router-dom";
import media from "../../content/media-library.json";
import { programmes } from "../../content/programmes.js";
import { otherServicesProgrammeContent as content } from "../../content/other-services-programme-content.js";

const programme = programmes.find((item) => item.slug === "other-services");
const collaborationImage = media.assets.find((asset) => asset.id === "MSEF-17");

export default function OtherServicesProgrammePage() {
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
                Discuss a community need <span aria-hidden="true">↗</span>
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#001F3F]/20 px-5 py-3 text-sm font-semibold text-[#001F3F] transition hover:bg-white"
                to="/get-involved"
              >
                Explore partnership
              </Link>
            </div>
          </div>

          {collaborationImage && (
            <figure className="m-0">
              <img
                className="block aspect-[4/3] w-full rounded-sm object-contain shadow-[0_22px_55px_rgba(0,31,63,0.1)]"
                src={collaborationImage.optimizedUrl}
                alt={collaborationImage.alt}
              />
              <figcaption className="mt-3 text-xs text-[#627080]">
                An illustration of people working together.
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8C6200]">
            How a conversation can move forward
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
            Listen first. Build a response together.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#526171] md:text-xl md:leading-8">
            Additional support depends on what a community needs and what Morning Star and its partners can responsibly provide.
          </p>
        </div>

        <ol className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {content.approach.map((step) => (
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
              What we can discuss
            </p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
              Ideas connected to the Foundation’s purpose.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#526171] md:text-xl md:leading-8">
              This area leaves room for community priorities and collaboration without presenting unconfirmed activities as available services.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {content.discussionAreas.map((area, index) => (
              <article
                className="flex h-full flex-col border border-[#001F3F]/10 bg-white p-6 sm:p-8"
                key={area.title}
              >
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8C6200]">
                  0{index + 1} · {area.label}
                </span>
                <h3 className="mt-5 text-lg font-semibold md:text-xl">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#526171] md:text-base">
                  {area.description}
                </p>
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
                Community responses that fit real needs and shared capacity.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/80 md:text-xl md:leading-8">
                These are intended contributions of a responsive, partnership-led approach, not a promise of specific services.
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
            <h2 className="text-lg font-semibold">Specific services and availability</h2>
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
              Have a community need or partnership idea?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#526171] md:text-base">
              Get in touch to discuss the need, possible collaborators, and a responsible next step.
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
          <Link className="hover:text-[#8C6200]" to="/programmes/economic-empowerment">
            ← Previous programme: Economic empowerment
          </Link>
          <Link className="hover:text-[#8C6200]" to="/programmes">
            All programmes →
          </Link>
        </div>
      </div>
    </main>
  );
}
