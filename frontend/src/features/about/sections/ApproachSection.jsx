const approachItems = [
  "Community mobilization and participation",
  "Training, mentorship, and capacity building",
  "Partnerships with government institutions, development agencies, and other stakeholders",
  "Resource mobilization, fundraising, and responsible financial management",
  "Community projects and demonstration sites",
  "Monitoring, evaluation, and reporting on programme results",
  "Inclusion, transparency, accountability, and sustainability",
];

export default function ApproachSection() {
  return (
    <section className="px-5 py-14 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#9B6B00]">
            Our approach
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:!text-2xl lg:!text-3xl">
            Progress built{" "}
            <span className="font-serif font-normal italic text-[#9B6B00]">
              together.
            </span>
          </h2>
          <p className="mt-5 max-w-md !text-sm leading-7 text-[#526171] md:!text-xl">
            We bring communities and partners together around practical
            training, mentorship, capacity building, community projects, and
            demonstration activities.
          </p>
        </div>
        <ol className="grid gap-x-8 sm:grid-cols-2">
          {approachItems.map((item, index) => (
            <li
              className="flex gap-4 border-t border-[#D9DEE1] py-5"
              key={item}
            >
              <span className="pt-1 font-mono text-xs text-[#9B6B00]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="!text-sm leading-6 text-[#455565] md:!text-base">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
