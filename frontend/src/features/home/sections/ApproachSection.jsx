import { Link } from "react-router-dom";
import Arrow from "../../../components/Arrow.jsx";
import media from "../../../content/media-library.json";

const approachSteps = [
  "Community mobilization and participation",
  "Training, mentorship, and capacity building",
  "Partnerships with government institutions, development agencies, and other stakeholders",
  "Resource mobilization, fundraising, and responsible financial management",
  "Community projects and demonstration sites",
  "Monitoring, evaluation, and reporting on programme results",
  "Inclusion, transparency, accountability, and sustainability",
];

export default function ApproachSection() {
  const approachImage = media.assets.find((asset) => asset.id === "MSEF-05");

  return (
    <section
      className="px-5 py-16 text-[#001F3F] sm:px-8 md:py-24"
      id="approach"
    >
      <div className="mx-auto grid max-w-7xl overflow-hidden bg-[#001F3F] text-white lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative flex min-h-80 flex-col justify-between overflow-hidden p-7 sm:min-h-[28rem] sm:p-10 lg:min-h-full">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={approachImage.optimizedUrl}
            alt={approachImage.alt}
            loading="lazy"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#00172E]/95 via-[#00172E]/55 to-[#00172E]/25"
            aria-hidden="true"
          />
          <span className="relative z-10 font-mono text-xs uppercase tracking-[0.18em] text-white/85">
            03 / How we work
          </span>
          <div className="relative z-10">
            <span className="block font-serif text-6xl italic leading-none text-white sm:text-7xl">
              Together
            </span>
            <span className="mt-3 block max-w-xs text-sm leading-6 text-white/85">
              Participation, practical learning, and shared responsibility.
            </span>
          </div>
          <span className="relative z-10 mt-10 h-px w-16 bg-[#DAA520]" />
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#DAA520]">
            Our implementation approach
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:!text-2xl lg:!text-3xl">
            How we{" "}
            <span className="font-serif font-normal italic text-[#DAA520]">
              work.
            </span>
          </h2>
          <p className="mt-4 !text-sm leading-7 text-white/75 md:!text-xl">
            The Foundation’s implementation approach includes:
          </p>
          <ol className="mt-7 grid gap-x-8 sm:grid-cols-2">
            {approachSteps.map((step, index) => (
              <li
                className="flex gap-4 border-t border-white/15 py-4"
                key={step}
              >
                <span className="pt-1 font-mono text-xs text-[#DAA520]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="!text-sm leading-6 text-white/90 md:!text-base">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <Link
            className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-[#DAA520] pb-2 text-sm font-semibold text-white transition-colors hover:text-[#DAA520]"
            to="/about"
          >
            More about the Foundation <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
