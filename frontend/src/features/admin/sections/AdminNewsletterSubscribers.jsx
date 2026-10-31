import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../../../services/api.js";

export default function AdminNewsletterSubscribers() {
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({ active: 0, unsubscribed: 0 });
  const [filter, setFilter] = useState("active");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    apiRequest(`/admin/newsletter/subscribers?status=${filter}`)
      .then((result) => {
        if (!mounted) return;
        setItems(result.items || []);
        setCounts(result.counts || { active: 0, unsubscribed: 0 });
      })
      .catch((requestError) => {
        if (mounted) setError(requestError.message || "Could not load subscribers.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [filter]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) => item.email.toLowerCase().includes(query));
  }, [items, search]);

  async function removeSubscriber(item) {
    const confirmed = window.confirm(
      `Permanently remove ${item.email} from the subscriber list?`,
    );
    if (!confirmed) return;

    setNotice("");
    setError("");
    try {
      await apiRequest(`/admin/newsletter/subscribers/${item.id}`, {
        method: "DELETE",
      });
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setCounts((current) => ({
        ...current,
        [item.active ? "active" : "unsubscribed"]: Math.max(
          0,
          current[item.active ? "active" : "unsubscribed"] - 1,
        ),
      }));
      setNotice("Subscriber permanently removed.");
    } catch (requestError) {
      setError(requestError.message || "Could not remove this subscriber.");
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6812]">
            Communications
          </p>
          <h2 className="mt-2 text-2xl font-semibold md:text-2xl lg:text-3xl">
            Insight subscribers
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#526171]">
            View people who signed up for insight emails, check their status, or remove an address.
          </p>
        </div>
        <label className="text-sm font-semibold">
          Show
          <select
            className="ml-3 min-h-11 rounded-lg border border-[#001F3F]/15 bg-white px-3 font-normal"
            onChange={(event) => setFilter(event.target.value)}
            value={filter}
          >
            <option value="active">Active ({counts.active})</option>
            <option value="unsubscribed">Unsubscribed ({counts.unsubscribed})</option>
            <option value="all">All subscribers ({counts.active + counts.unsubscribed})</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#001F3F]/10 bg-white p-5">
          <p className="text-sm text-[#526171]">Active subscribers</p>
          <p className="mt-2 text-3xl font-semibold">{counts.active}</p>
        </div>
        <div className="rounded-2xl border border-[#001F3F]/10 bg-white p-5">
          <p className="text-sm text-[#526171]">Unsubscribed</p>
          <p className="mt-2 text-3xl font-semibold">{counts.unsubscribed}</p>
        </div>
      </div>

      {error && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
          {notice}
        </p>
      )}

      <div className="mt-6 rounded-2xl border border-[#001F3F]/10 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-semibold">Email list</h3>
          <label className="text-sm text-[#526171]">
            <span className="sr-only">Search subscribers</span>
            <input
              className="min-h-10 w-full rounded-lg border border-[#001F3F]/15 px-3 text-[#001F3F] sm:w-72"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by email"
              type="search"
              value={search}
            />
          </label>
        </div>

        {loading && <p className="py-8 text-sm text-[#526171]">Loading subscribers…</p>}
        {!loading && filteredItems.length === 0 && (
          <p className="py-8 text-sm text-[#526171]">
            {search ? "No subscribers match that search." : "No subscribers in this view."}
          </p>
        )}
        {!loading && filteredItems.length > 0 && (
          <div className="mt-4 divide-y divide-[#001F3F]/10">
            {filteredItems.map((item) => (
              <article
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                key={item.id}
              >
                <div className="min-w-0">
                  <a
                    className="break-all font-medium text-[#07518A] underline decoration-[#07518A]/30 underline-offset-2"
                    href={`mailto:${item.email}`}
                  >
                    {item.email}
                  </a>
                  <p className="mt-1 text-xs text-[#667687]">
                    Subscribed {new Date(item.subscribedAt).toLocaleDateString()}
                    {item.unsubscribedAt &&
                      ` · Unsubscribed ${new Date(item.unsubscribedAt).toLocaleDateString()}`}
                  </p>
                  <p className="mt-1 text-xs text-[#667687]">
                    Confirmation email: {item.confirmationEmailStatus || "not recorded"}
                    {item.confirmationSentAt &&
                      ` · Sent ${new Date(item.confirmationSentAt).toLocaleString()}`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${item.active ? "bg-emerald-50 text-emerald-800" : "bg-[#F3F5F7] text-[#526171]"}`}
                  >
                    {item.active ? "Active" : "Unsubscribed"}
                  </span>
                  <button
                    className="min-h-10 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-700 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={() => removeSubscriber(item)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
