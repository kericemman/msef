import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { apiRequest } from "../../services/api.js";
import InsightSubscriptionSection from "./InsightSubscriptionSection.jsx";

function sanitizeArticleBody(html) {
  const safe = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "height",
      "loading",
      "referrerpolicy",
      "sandbox",
      "src",
      "title",
      "width",
    ],
  });
  const parsed = new DOMParser().parseFromString(safe, "text/html");
  parsed.querySelectorAll("iframe").forEach((frame) => {
    try {
      const url = new URL(frame.getAttribute("src") || "");
      const validEmbed =
        url.protocol === "https:" &&
        url.hostname === "www.youtube-nocookie.com" &&
        /^\/embed\/[A-Za-z0-9_-]{11}$/.test(url.pathname);
      if (!validEmbed) {
        frame.remove();
        return;
      }
      frame.setAttribute("title", "YouTube video");
      frame.setAttribute("loading", "lazy");
      frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      frame.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      );
      frame.setAttribute("allowfullscreen", "");
      frame.setAttribute(
        "sandbox",
        "allow-scripts allow-same-origin allow-presentation allow-popups",
      );
    } catch {
      frame.remove();
    }
  });
  parsed.querySelectorAll("img").forEach((image) => {
    try {
      const url = new URL(image.getAttribute("src") || "");
      if (url.protocol !== "https:" || url.hostname !== "res.cloudinary.com") {
        image.remove();
        return;
      }
      image.setAttribute("loading", "lazy");
      image.setAttribute("decoding", "async");
    } catch {
      image.remove();
    }
  });
  return parsed.body.innerHTML;
}

export default function InsightDetailPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { slug } = useParams();
  const [insight, setInsight] = useState(null);
  const [relatedInsights, setRelatedInsights] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    let active = true;
    apiRequest(`/content/insights/${encodeURIComponent(slug)}`)
      .then(({ item }) => {
        if (active) {
          setInsight(item);
          setState("ready");
        }
        apiRequest("/content/insights")
          .then(({ items = [] }) => {
            if (!active) return;
            const others = items.filter((entry) => entry.slug !== item.slug);
            others.sort(
              (left, right) =>
                Number(right.category === item.category) -
                Number(left.category === item.category),
            );
            setRelatedInsights(others.slice(0, 3));
          })
          .catch(() => {
            if (active) setRelatedInsights([]);
          });
      })
      .catch(() => {
        if (active) setState("missing");
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (state === "loading")
    return (
      <main className="min-h-[50vh] bg-[#F8F6EF] px-5 py-20 text-center text-[#001F3F]">
        Loading insight…
      </main>
    );
  if (state === "missing")
    return (
      <main className="min-h-[50vh] bg-[#F8F6EF] px-5 py-20 text-center text-[#001F3F]">
        <h1 className="text-2xl font-semibold md:text-2xl lg:text-3xl">
          Insight not found
        </h1>
        <Link
          className="mt-6 inline-flex underline decoration-[#DAA520] underline-offset-4"
          to="/"
        >
          Return to the home page
        </Link>
      </main>
    );

  const richBody = sanitizeArticleBody(insight.body);

  return (
    <main className="bg-[#F8F6EF] px-5 py-12 text-[#001F3F] sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <article className="mx-auto max-w-4xl">
        <Link
          to="/#insights"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-[#526171] underline decoration-[#DAA520] underline-offset-4"
        >
          ← Back to insights
        </Link>
        <header className="mt-8 border-b border-[#001F3F]/15 pb-8">
          {insight.category && (
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#8a6812] sm:text-sm">
              {insight.category}
            </p>
          )}
          <h1 className="text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
            {insight.title}
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#435365] md:text-xl md:leading-8">
            {insight.excerpt}
          </p>
        </header>
        {insight.image?.url && (
          <img
            src={insight.image.url}
            alt={insight.image.alt || ""}
            className="mt-8 max-h-[34rem] w-full rounded-2xl object-cover"
          />
        )}
        {/<[a-z][\s\S]*>/i.test(insight.body) ? (
          <div
            className="mt-8 text-sm leading-8 text-[#35475a] md:text-xl md:leading-9 lg:[&_p]:text-lg [&_a]:!text-[#07518A] [&_a]:underline [&_a]:decoration-[#07518A]/50 [&_a:hover]:!text-[#003B66] [&_a:visited]:!text-[#07518A] [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[#DAA520] [&_blockquote]:pl-5 [&_blockquote]:italic [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-semibold [&_iframe]:my-7 [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:rounded-xl [&_img]:my-7 [&_img]:h-auto [&_img]:max-h-[40rem] [&_img]:w-full [&_img]:rounded-xl [&_li]:my-1 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-7 [&_p]:mb-5 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-7"
            dangerouslySetInnerHTML={{ __html: richBody }}
          />
        ) : (
          <div className="mt-8 space-y-5 text-sm leading-8 text-[#35475a] md:text-xl md:leading-9 lg:text-lg">
            {insight.body.split(/\n{2,}/).map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</p>
            ))}
          </div>
        )}
      </article>
      {relatedInsights.length > 0 && (
        <section
          aria-labelledby="related-insights-heading"
          className="mx-auto mt-16 max-w-6xl border-t border-[#001F3F]/15 pt-10 sm:mt-20 sm:pt-12"
        >
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8a6812]">
                Keep reading
              </p>
              <h2
                id="related-insights-heading"
                className="text-xl font-semibold md:text-2xl"
              >
                Related insights
              </h2>
            </div>
            <Link
              to="/#insights"
              className="inline-flex min-h-10 items-center text-sm font-semibold text-[#07518A] underline underline-offset-4 hover:text-[#003B66]"
            >
              All insights{" "}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedInsights.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden border border-[#001F3F]/10 bg-white"
              >
                {item.image?.url && (
                  <img
                    src={item.image.url}
                    alt={item.image.alt || ""}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                )}
                <div className="p-5">
                  {item.category && (
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#8a6812]">
                      {item.category}
                    </p>
                  )}
                  <h3 className="text-lg font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#526171]">
                    {item.excerpt}
                  </p>
                  <Link
                    to={`/insights/${item.slug}`}
                    className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#07518A] underline decoration-[#07518A]/40 underline-offset-4 hover:text-[#003B66]"
                  >
                    Read insight <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      <InsightSubscriptionSection />
    </main>
  );
}
