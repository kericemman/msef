const statements = [
  {
    number: "01",
    title: "Our vision",
    text: "To build empowered, healthy, educated, economically independent, and environmentally responsible communities free from extreme poverty.",
  },
  {
    number: "02",
    title: "Our mission",
    text: "To elevate people from poverty through modern agriculture, youth empowerment, rehabilitation and counseling, vocational education, environmental conservation, and sustainable economic development.",
  },
];

export default function MissionVisionSection() {
  return (
    <section className="px-5 py-14 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-2xl">
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#9B6B00]">
            What guides us
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:!text-2xl lg:!text-3xl">
            A shared vision.{" "}
            <span className="font-serif font-normal italic text-[#9B6B00]">
              A practical mission.
            </span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {statements.map((item) => (
            <article
              className="border-t-2 border-[#DAA520] bg-[#F8F6EF] p-6 sm:p-8"
              key={item.number}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs text-[#9B6B00]">
                  {item.number}
                </span>
                <span className="h-px w-12 bg-[#DAA520]/70" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
              <p className="!text-sm leading-7 text-[#526171] md:!text-xl">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
