import Icon from "../../../components/Icon.jsx";

export default function DirectorMessageSection() {
  return (
    <section className="bg-[#F8F6EF] px-5 py-14 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-white shadow-[0_18px_55px_rgba(0,31,63,0.08)] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative min-h-[22rem] bg-[#001F3F] sm:min-h-[28rem] lg:min-h-full">
          <img
            src="https://res.cloudinary.com/gfkhcjc0/image/upload/c_fill,w_1000,h_1200,g_face,f_auto,q_auto/v1792744526/msef/site/team/representative-speaking.jpg"
            alt="Pr. Stephen Rotich speaking at a public event"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00172E]/85 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8">
            <p className="text-lg font-semibold">Pr. Stephen Rotich</p>
            <p className="mt-1 text-sm text-white/75 md:text-base">
              Director, Morning Star Empowerment Foundation
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#9B6B00] sm:text-sm">
            A message to the public
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#001F3F] md:text-2xl lg:text-3xl">
            A shared commitment to{" "}
            <span className="font-serif font-normal italic text-[#9B6B00]">
              lasting change.
            </span>
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#435365] md:text-xl md:leading-8">
            <p>
              Morning Star Empowerment Foundation is committed to transforming
              lives, empowering youth, supporting vulnerable families, promoting
              modern and climate-smart agriculture, protecting the environment,
              and combating poverty and substance abuse through education,
              mentorship, rehabilitation, environmental conservation, and
              community development.
            </p>
            <p>
              I call on parents, leaders, government institutions, partners, and
              well-wishers to join us in building a stronger, healthier,
              self-reliant, and environmentally responsible society. Together,
              we can restore hope, create opportunities, address the effects of
              climate change, protect our natural resources, and ensure no one
              is left behind. Let us be the change our communities and planet
              need.
            </p>
          </div>
          <a
            href="tel:+254723638257"
            className="mt-7 inline-flex w-fit items-center gap-3 text-sm font-bold text-[#001F3F] border-b-2 border-[#9B6B00] pb-1 transition-colors hover:text-[#9B6B00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9B6B00]"
          >
            Connect with Director{" "}
            <span aria-hidden="true" className="text-[#9B6B00]">
              <Icon name="arrow-up-right" size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
