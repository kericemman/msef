import { useRef } from "react";
import Icon from "../../../components/Icon.jsx";

function TestimonialCarousel({ items, children }) {
  const trackRef = useRef(null);

  function slide(direction) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector("[data-testimonial-card]");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 16;
    const distance = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <div className="mt-7">
      <div className="mb-4 flex justify-end gap-2">
          <button
            aria-label="Scroll testimonials backward"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#C9D2D8] bg-white text-lg text-[#001F3F] transition hover:border-[#9B6B00] hover:text-[#9B6B00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B6B00]"
            onClick={() => slide(-1)}
            type="button"
          >
            <Icon name="arrow-left" />
          </button>
          <button
            aria-label="Scroll testimonials forward"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#C9D2D8] bg-white text-lg text-[#001F3F] transition hover:border-[#9B6B00] hover:text-[#9B6B00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B6B00]"
            onClick={() => slide(1)}
            type="button"
          >
            <Icon name="arrow-right" />
          </button>
      </div>

      <div
        aria-label="Testimonials"
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 scroll-smooth sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [scrollbar-width:thin] [scrollbar-color:#C9D2D8_transparent]"
        ref={trackRef}
        role="region"
        tabIndex={0}
      >
        {items.map((item) => (
          <div
            className="w-[min(84vw,25rem)] shrink-0 snap-start sm:w-[min(60vw,25rem)] lg:w-[calc((100%-2rem)/3)]"
            data-testimonial-card
            key={item.id}
          >
            {children(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ item, isVideo }) {
  return (
    <figure className="h-full overflow-hidden rounded-sm border border-[#E1DBCC] bg-white shadow-sm">
      {isVideo && item.video?.provider === "youtube" && (
        <iframe
          src={item.video.url}
          title={`Video testimonial from ${item.name}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full bg-black"
        />
      )}
      {isVideo && item.video?.provider === "cloudinary" && (
        <video
          src={item.video.url}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full bg-black"
        />
      )}

      <div className="p-5 sm:p-6">
        {!isVideo && (
          <blockquote className="min-h-28 font-serif text-lg leading-relaxed text-[#001F3F] sm:text-xl">
            “{item.quote}”
          </blockquote>
        )}
        <figcaption
          className={`${isVideo ? "" : "mt-5 border-t border-[#E5E8EA] pt-4"} flex min-h-12 items-center gap-3`}
        >
          {item.image?.url && (
            <img
              src={item.image.url}
              alt={item.image.alt || ""}
              loading="lazy"
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
          )}
          <span>
            <span className="block text-sm font-semibold text-[#001F3F]">
              {item.name}
            </span>
            {item.role && (
              <span className="mt-1 block text-xs text-[#627080]">
                {item.role}
              </span>
            )}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

export default function TestimonialsSection({ testimonials = [] }) {
  const videoTestimonials = testimonials.filter((item) => item.format === "video");
  const writtenTestimonials = testimonials.filter((item) => item.format !== "video");

  return (
    <section
      className="bg-[#F8F6EF] px-5 py-16 text-[#001F3F] sm:px-8 md:py-20"
      id="testimonials"
    >
      <div className="mx-auto max-w-7xl">
        <header className="max-w-2xl">
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#9B6B00]">
            04 / Testimonials
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:!text-2xl lg:!text-3xl">
            Stories of{" "}
            <span className="font-serif font-normal italic text-[#9B6B00]">
              change.
            </span>
          </h2>
          <p className="mt-4 max-w-xl !text-sm leading-7 text-[#526171] md:!text-xl">
            Hear from the people and partners who are part of this work.
          </p>
        </header>

        {videoTestimonials.length > 0 && (
          <TestimonialCarousel items={videoTestimonials}>
            {(item) => <TestimonialCard item={item} isVideo />}
          </TestimonialCarousel>
        )}

        {writtenTestimonials.length > 0 && (
          <TestimonialCarousel items={writtenTestimonials}>
            {(item) => <TestimonialCard item={item} isVideo={false} />}
          </TestimonialCarousel>
        )}

        {testimonials.length === 0 && (
          <div className="mt-8 flex min-h-44 items-center gap-5 border border-dashed border-[#C9B984] bg-white/70 px-6 py-7 sm:min-h-52 sm:px-9">
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#DAA520]/15 font-serif text-3xl text-[#9B6B00]"
              aria-hidden="true"
            >
              “
            </span>
            <p className="!text-sm leading-7 text-[#627080] md:!text-xl">
              Community stories will appear here as they are shared.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
