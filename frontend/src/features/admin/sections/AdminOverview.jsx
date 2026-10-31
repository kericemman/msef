import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../../../services/api.js";

const currency = (amount, code = "KES") =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(amount || 0);

export default function AdminOverview({ onNavigate }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await apiRequest("/admin/dashboard");
      setData(result);
      setUpdatedAt(new Date());
    } catch (err) {
      setError(err.message || "Could not load overview data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (error && !data)
    return (
      <section className="rounded-2xl border border-red-200 bg-white p-6">
        <p role="alert" className="text-sm text-red-800">
          {error}
        </p>
        <button
          onClick={refresh}
          className="mt-4 min-h-10 rounded-full bg-[#001F3F] px-4 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </section>
    );
  if (!data) return <p className="text-sm text-[#526171]">Loading overview…</p>;

  const stats = data.stats;
  const received = stats.donatedByCurrency || [];
  const cards = [
    {
      label: "New enquiries",
      value: stats.newMessages,
      detail: "Need a response",
      icon: "✉",
      section: "messages",
      tint: "bg-[#E8F1F8] text-[#07518A]",
    },
    {
      label: "Total enquiries",
      value: stats.totalMessages,
      detail: "All messages received",
      icon: "▤",
      section: "messages",
      tint: "bg-[#F3ECFC] text-[#6741A5]",
    },
    {
      label: "Pending donations",
      value: stats.pendingDonations,
      detail: "Awaiting confirmation",
      icon: "◷",
      section: "donations",
      tint: "bg-[#FFF3D6] text-[#8a6812]",
    },
    {
      label: "Completed donations",
      value: stats.successfulDonations,
      detail: "Verified by Paystack",
      icon: "✓",
      section: "donations",
      tint: "bg-[#E6F4EC] text-[#247447]",
    },
  ];

  return (
    <div>
      <section className="flex flex-col gap-5 rounded-3xl bg-[#001F3F] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E2B83F]">
            Your foundation at a glance
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
            Good work starts with a clear picture.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
            Review community enquiries, follow donations, and keep your website
            stories current from one place.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            onClick={() => onNavigate("messages")}
            className="min-h-11 rounded-full bg-[#DAA520] px-5 text-sm font-bold text-[#001F3F] transition-colors hover:bg-[#edc44f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Open enquiries <span aria-hidden="true">→</span>
          </button>
          <button
            onClick={refresh}
            disabled={loading}
            className="min-h-11 rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "↻ Refresh"}
          </button>
        </div>
      </section>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[#35475a]">Activity summary</p>
        <p aria-live="polite" className="text-xs text-[#667687]">
          {loading
            ? "Updating…"
            : updatedAt
              ? `Updated ${updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              : ""}
        </p>
      </div>
      {error && (
        <p
          role="status"
          className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900"
        >
          Refresh failed: {error}
        </p>
      )}

      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <button
            type="button"
            key={card.label}
            onClick={() => onNavigate(card.section)}
            className="group rounded-2xl border border-[#001F3F]/10 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#DAA520]/70 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520]"
          >
            <span
              className={`grid h-11 w-11 place-items-center rounded-xl text-lg font-bold ${card.tint}`}
            >
              {card.icon}
            </span>
            <span className="mt-4 flex items-end justify-between gap-2">
              <span>
                <span className="block text-sm text-[#526171]">
                  {card.label}
                </span>
                <span className="mt-1 block text-3xl font-semibold tabular-nums">
                  {card.value ?? 0}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="pb-1 text-xl text-[#8a6812] transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
            <span className="mt-2 block text-xs text-[#667687]">
              {card.detail}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-[#001F3F]/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8a6812]">
                Inbox
              </p>
              <h2 className="mt-1 text-lg font-semibold">Latest enquiries</h2>
            </div>
            <button
              onClick={() => onNavigate("messages")}
              className="min-h-9 rounded-full px-3 text-sm font-semibold text-[#001F3F] hover:bg-[#F8F6EF]"
            >
              View all →
            </button>
          </div>
          {data.latestMessages.length ? (
            <div className="mt-4 divide-y divide-[#001F3F]/10">
              {data.latestMessages.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => onNavigate("messages")}
                  className="flex w-full flex-col gap-2 py-3 text-left transition-colors hover:bg-[#FAFBFC] sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-[#1d3348]">
                      {item.subject}
                    </span>
                    <span className="mt-1 block truncate text-sm text-[#667687]">
                      {item.name} · {item.email}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-[#667687]">
                    <span
                      className={`rounded-full px-2.5 py-1 capitalize ${item.adminStatus === "new" || !item.adminStatus ? "bg-[#FFF3D6] text-[#805d08]" : "bg-[#EEF1F4] text-[#526171]"}`}
                    >
                      {item.adminStatus || "new"}
                    </span>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-[#F6F8FA] p-5 text-center">
              <p className="font-semibold">No enquiries yet</p>
              <p className="mt-1 text-sm text-[#667687]">
                New messages from the website will appear here.
              </p>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-[#001F3F]/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8a6812]">
                Giving
              </p>
              <h2 className="mt-1 text-lg font-semibold">
                Confirmed donations
              </h2>
            </div>
            <button
              onClick={() => onNavigate("donations")}
              className="min-h-9 rounded-full px-3 text-sm font-semibold text-[#001F3F] hover:bg-[#F8F6EF]"
            >
              Records →
            </button>
          </div>
          {received.length ? (
            <div className="mt-5 space-y-4">
              {received.map((item) => (
                <div key={item.currency}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-xl font-semibold">
                      {currency(item.amount, item.currency)}
                    </p>
                    <p className="text-xs text-[#667687]">
                      {item.count} verified contribution
                      {item.count === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EDF0F2]">
                    <div
                      className="h-full rounded-full bg-[#DAA520]"
                      style={{
                        width: `${Math.max(10, Math.min(100, (item.amount / Math.max(...received.map((entry) => entry.amount), 1)) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-[#F6F8FA] p-5 text-center">
              <span
                aria-hidden="true"
                className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#FFF3D6] text-lg text-[#8a6812]"
              >
                ♡
              </span>
              <p className="mt-3 font-semibold">No confirmed donations yet</p>
              <p className="mt-1 text-sm text-[#667687]">
                Verified donations will be summarized here.
              </p>
            </div>
          )}
          <button
            onClick={() => onNavigate("donations")}
            className="mt-5 min-h-11 w-full rounded-xl border border-[#001F3F]/15 text-sm font-semibold transition-colors hover:bg-[#F8F6EF]"
          >
            Manage donation records
          </button>
        </section>
      </div>

      <section className="mt-4 rounded-2xl border border-[#001F3F]/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8a6812]">
              Quick access
            </p>
            <h2 className="mt-1 text-lg font-semibold">
              Keep your website up to date
            </h2>
          </div>
          <p className="text-sm text-[#667687]">
            Manage public stories that build trust and share progress.
          </p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => onNavigate("testimonials")}
            className="flex min-h-20 items-center gap-4 rounded-xl border border-[#001F3F]/10 p-4 text-left transition-colors hover:border-[#DAA520]/70 hover:bg-[#FFFCF4]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#F8F2DF] text-lg text-[#8a6812]">
              ❞
            </span>
            <span className="flex-1">
              <span className="block font-semibold">Testimonials</span>
              <span className="mt-1 block text-sm text-[#667687]">
                Manage community voices
              </span>
            </span>
            <span className="text-lg text-[#8a6812]">→</span>
          </button>
          <button
            onClick={() => onNavigate("insights")}
            className="flex min-h-20 items-center gap-4 rounded-xl border border-[#001F3F]/10 p-4 text-left transition-colors hover:border-[#DAA520]/70 hover:bg-[#FFFCF4]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#E8F1F8] text-lg text-[#07518A]">
              ▤
            </span>
            <span className="flex-1">
              <span className="block font-semibold">Insights</span>
              <span className="mt-1 block text-sm text-[#667687]">
                Publish news and updates
              </span>
            </span>
            <span className="text-lg text-[#8a6812]">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
