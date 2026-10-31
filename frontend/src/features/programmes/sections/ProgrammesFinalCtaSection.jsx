import { Link } from "react-router-dom";
import Icon from "../../../components/Icon.jsx";

export default function ProgrammesFinalCtaSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-2xl border border-white/15 bg-[#00172E] p-6 text-white shadow-[0_18px_44px_rgba(0,31,63,0.14)] sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#DAA520] sm:text-sm">
            Let’s work together
          </p>
          <h2 className="text-2xl font-semibold leading-tight text-white md:text-2xl lg:text-3xl">
            Interested in our work?
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/75 md:text-xl md:leading-8">
            Get in touch to learn more about our programme areas, explore a
            partnership, or share a community priority.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#DAA520] px-6 py-3.5 text-sm font-bold text-[#001F3F] transition-colors hover:bg-[#edbd42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Contact the Foundation <Icon name="arrow-up-right" size={16} />
        </Link>
      </div>
    </section>
  );
}
