import media from "../../../content/media-library.json";

export default function AboutHeroSection() {
  const facilityImage = media.assets.find((asset) => asset.id === "MSEF-03");

  return (
    <section className="bg-[#F8F6EF] px-5 py-14 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#9B6B00]">
            About Morning Star
          </p>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:!text-2xl lg:!text-3xl">
            Working together{" "}
            <span className="font-serif font-normal italic text-[#9B6B00]">
              toward possibility.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl !text-sm leading-7 text-[#526171] md:!text-xl">
            Morning Star Empowerment Foundation is a Kenya-based organization
            headquartered in Mosoriot Town, Nandi County. Our purpose is to
            reduce poverty and improve livelihoods by helping individuals,
            families, and communities build skills, self-reliance, economic
            opportunity, health, and environmental responsibility.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-[#627080]">
            Mosoriot Town <span className="mx-2 text-[#DAA520]">/</span> Nandi
            County, Kenya
          </p>
        </div>
        <figure className="relative m-0 min-h-[270px] overflow-hidden bg-[#E4E3DE] sm:min-h-[380px]">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={facilityImage.optimizedUrl}
            alt={facilityImage.alt}
            fetchPriority="high"
          />
          <figcaption className="absolute bottom-0 left-0 bg-[#001F3F]/90 px-4 py-3 text-xs text-white">
            Morning Star Empowerment Foundation
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
