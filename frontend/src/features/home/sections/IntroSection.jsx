import { Link } from "react-router-dom";
import Arrow from "../../../components/Arrow.jsx";
import media from "../../../content/media-library.json";

export default function IntroSection() {
  const aboutImage = media.assets.find((asset) => asset.id === "MSEF-01");

  return (
    <section
      className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 text-[#001F3F] sm:px-8 md:gap-14 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-12"
      id="about"
    >
      <div className="relative min-h-[360px] overflow-hidden rounded-sm bg-[#F5F5F5] sm:min-h-[460px]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={aboutImage.optimizedUrl}
          alt={aboutImage.alt}
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#001F3F]/90 to-transparent px-6 pb-6 pt-24 text-white sm:px-8 sm:pb-8">
          <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[#DAA520]">
              01 / About us
            </span>
            <p className="!text-sm font-medium md:!text-xl">
              Morning Star Empowerment Foundation
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-white/40 px-3 py-2 text-xs">
            Mosoriot, Kenya
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#9B6B00]">
          Who we are
        </p>
        <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:!text-2xl lg:!text-3xl">
          Empowering individuals,{" "}
          <span className="font-serif font-normal italic text-[#9B6B00]">
            families, and communities.
          </span>
        </h2>
        <p className="mt-5 max-w-2xl !text-sm leading-7 text-[#526171] md:!text-xl">
          Morning Star Empowerment Foundation is a Kenya-based Public Benefit
          Organization (PBO) headquartered in Mosoriot Town, Nandi County.
        </p>

        <div className="mt-9 grid gap-4 border-y border-[#D9DEE1] py-6 sm:grid-cols-2 sm:gap-6">
          <article className="sm:border-r sm:border-[#D9DEE1] sm:pr-6">
            <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#9B6B00]">
              Our vision
            </h3>
            <p className="!text-sm leading-7 text-[#455565] md:!text-xl">
              To build empowered, healthy, educated, economically independent,
              and environmentally responsible communities free from extreme
              poverty.
            </p>
          </article>
          <article className="sm:pl-1">
            <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#9B6B00]">
              Our mission
            </h3>
            <p className="!text-sm leading-7 text-[#455565] md:!text-xl">
              To elevate people from poverty through modern agriculture, youth
              empowerment, rehabilitation and counseling, vocational education,
              environmental conservation, and sustainable economic development.
            </p>
          </article>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-semibold tracking-tight">05</span>
            <span className="max-w-28 text-xs leading-5 text-[#627080]">
              programme areas in the Foundation Profile
            </span>
          </div>
          <Link
            className="inline-flex min-h-11 items-center gap-3 border-b border-[#DAA520] pb-2 text-sm font-semibold transition-colors hover:text-[#9B6B00]"
            to="/about"
          >
            Read about our mission and vision <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
