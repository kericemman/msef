export default function ProgrammesHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#001F3F] px-5 pb-16 pt-16 text-white sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-36 h-[28rem] w-[28rem] rounded-full border border-[#DAA520]/20 sm:-right-8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-20 h-[21rem] w-[21rem] rounded-full border border-[#DAA520]/20"
      />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#DAA520] sm:text-sm">
          Our programmes
        </p>
        <h1 className="max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-2xl lg:text-3xl">
          Practical programmes.
          <br />
          <span className="text-[#DAA520]">Connected pathways.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-white/80 md:text-xl md:leading-8">
          Our programme areas respond to connected challenges: livelihoods,
          skills, youth wellbeing, environmental change, and economic
          opportunity. Together with communities and partners, we aim to create
          practical ways for people to learn, participate, and build for the
          future.
        </p>
        <div className="mt-9 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/65 sm:text-sm">
          <span className="h-px w-10 bg-[#DAA520]" />
          Five areas of focus
        </div>
      </div>
    </section>
  );
}
