import media from "../../../content/media-library.json";
import Arrow from "../../../components/Arrow.jsx";

export default function HeroSection() {
  const heroImage = media.assets.find((asset) => asset.id === "MSEF-13");

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">
          <span /> MORNING STAR EMPOWERMENT FOUNDATION
        </p>
        <h1 className="!text-2xl md:!text-2xl lg:!text-3xl">
          Empowering People <span>•</span>
          <br />
          <em>
            Transforming Communities <span>•</span>
            <br />
            Elevating Lives
          </em>
        </h1>
        <p className="hero-lede !text-sm md:!text-xl">
          Morning Star Empowerment Foundation works to reduce poverty and
          improve livelihoods by empowering individuals, families, and
          communities to become self-reliant, healthy, skilled, economically
          productive, and environmentally responsible.
        </p>
        <div className="hero-actions">
          <a className="button button-gold" href="#programmes">
            Explore our programmes <Arrow />
          </a>
          <a className="text-link" href="#about">
            About the Foundation <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-photo-wrap">
          <img
            className="hero-photo"
            src={heroImage.optimizedUrl}
            alt={heroImage.alt}
            fetchpriority="high"
          />
        </div>
      </div>
    </section>
  );
}
