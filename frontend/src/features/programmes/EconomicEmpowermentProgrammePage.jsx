import { Link } from "react-router-dom";
import media from "../../content/media-library.json";
import { programmes } from "../../content/programmes.js";
import { economicEmpowermentProgrammeContent as content } from "../../content/economic-empowerment-programme-content.js";
import Icon from "../../components/Icon.jsx";

const programme = programmes.find((item) => item.slug === "economic-empowerment");
const financialLearningImage = media.assets.find((asset) => asset.id === "MSEF-14");

export default function EconomicEmpowermentProgrammePage() {
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
                Discuss an economic partnership <Icon name="arrow-up-right" size={16} />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#001F3F]/20 px-5 py-3 text-sm font-semibold text-[#001F3F] transition hover:bg-white"
                to="/get-involved"
              >
                Support economic opportunity
              </Link>
            </div>
          </div>

          {financialLearningImage && (
            <figure className="m-0">
              <img
                className="block aspect-[4/3] w-full rounded-sm object-cover shadow-[0_22px_55px_rgba(0,31,63,0.14)]"
                src={financialLearningImage.optimizedUrl}
                alt={financialLearningImage.alt}
              />
              
            </figure>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8C6200]">
            Knowledge, planning, and opportunity
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
            A pathway toward stronger financial confidence and livelihoods.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#526171] md:text-xl md:leading-8">
            The programme connects financial learning with enterprise, community-led initiatives, and responsible investment approaches.
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
              Practical knowledge and responsible community initiatives.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#526171] md:text-xl md:leading-8">
              Morning Star’s profile identifies financial literacy, budgeting, business planning, entrepreneurship, income generation, collective savings, and responsible investment.
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
                More people able to pursue sustainable economic opportunity.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/80 md:text-xl md:leading-8">
                These are intended programme contributions, not guarantees of income, investment returns, or access to credit.
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
          
          <div>
            <h2 className="text-lg font-semibold">Savings, credit, and lending</h2>
            <div className="mt-4 grid gap-4  bg-white p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6 sm:p-6">
              <p className="text-3xl font-semibold leading-none tracking-tight text-[#001F3F] md:text-4xl">
                {content.tableBankingImpact.figure}
              </p>
              <div>
                <h3 className="text-base font-semibold text-[#001F3F]">
                  {content.tableBankingImpact.label}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#526171]">
                  {content.tableBankingImpact.description}
                </p>
              
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section className="border-t border-[#001F3F]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
              Interested in financial literacy or enterprise partnerships?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#526171] md:text-base">
              Contact Morning Star to discuss community priorities and current economic empowerment initiatives.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-sm bg-[#DAA520] px-5 py-3 text-sm font-semibold text-[#001F3F] transition hover:bg-[#E9BB3C]"
            to="/contact"
          >
            Contact the Foundation <Icon name="arrow-up-right" size={16} />
          </Link>
        </div>
      </section>

      <div className="bg-[#F5F5F5]">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-5 py-5 text-sm font-semibold sm:px-8 lg:px-12">
          <Link className="hover:text-[#8C6200]" to="/programmes/environment">
            <Icon name="arrow-left" size={16} /> Previous programme: Environment
          </Link>
          <Link className="hover:text-[#8C6200]" to="/programmes/other-services">
            Next programme: Other services <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
