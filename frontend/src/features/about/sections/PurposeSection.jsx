const peopleWeServe = [
  "Young people and young adults",
  "Farmers and agribusiness entrepreneurs",
  "People and families affected by poverty or substance use",
  "School leavers and women",
  "Vulnerable households, small-scale traders, and community groups",
  "Communities affected by environmental degradation and climate change",
];

export default function PurposeSection() {
  return (
    <section className="bg-[#001F3F] px-5 py-14 text-white sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#DAA520]">
            Our purpose
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:!text-2xl lg:!text-3xl">
            Opportunity that reaches{" "}
            <span className="font-serif font-normal italic text-[#DAA520]">
              the community.
            </span>
          </h2>
          <p className="mt-5 !text-sm leading-7 text-white/75 md:!text-xl">
            We aim to promote sustainable livelihoods, improve access to skills
            and opportunities, support vulnerable groups, and encourage economic
            independence and community development.
          </p>
        </div>
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.1em] text-white/90">
            Who we work to serve
          </h3>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {peopleWeServe.map((person, index) => (
              <li
                className="flex gap-4 border-t border-white/20 py-4"
                key={person}
              >
                <span className="font-mono text-xs text-[#DAA520]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="!text-sm leading-6 text-white/85 md:!text-base">
                  {person}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
