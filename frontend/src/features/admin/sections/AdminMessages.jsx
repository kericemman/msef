import { useEffect, useState } from "react";
import { apiRequest } from "../../../services/api.js";

const statusOptions = ["new", "replied", "archived"];

export default function AdminMessages({ onError }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadMessages() {
    setLoading(true);
    try {
      const result = await apiRequest(
        `/admin/messages${filter === "all" ? "" : `?status=${filter}`}`,
      );
      setItems(result.items || []);
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, [filter]);

  async function updateStatus(id, status) {
    setMessage("");
    try {
      const result = await apiRequest(`/admin/messages/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setItems((current) =>
        current.map((item) => (item.id === id ? result.item : item)),
      );
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteItem(item) {
    if (!window.confirm(`Permanently delete the enquiry from ${item.name}?`))
      return;
    try {
      await apiRequest(`/admin/messages/${item.id}`, { method: "DELETE" });
      setItems((current) => current.filter((entry) => entry.id !== item.id));
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6812]">
            Inbox
          </p>
          <h2 className="mt-2 text-2xl font-semibold md:text-2xl lg:text-3xl">
            Website enquiries
          </h2>
        </div>
        <label className="text-sm font-semibold">
          Filter by status
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="ml-3 min-h-11 rounded-lg border border-[#001F3F]/15 bg-white px-3 font-normal"
          >
            <option value="all">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>
      {message && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800"
        >
          {message}
        </p>
      )}
      <div className="mt-5 space-y-4">
        {loading && (
          <p className="text-sm text-[#526171]">Loading enquiries…</p>
        )}
        {!loading && items.length === 0 && (
          <p className="rounded-2xl bg-white p-6 text-sm text-[#526171]">
            No enquiries in this view.
          </p>
        )}
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-[#001F3F]/10 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold">{item.subject}</h3>
                  <span className="rounded-full bg-[#F8F6EF] px-3 py-1 text-xs capitalize text-[#435365]">
                    {item.adminStatus || "new"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#526171]">
                  {item.name} ·{" "}
                  <a
                    className="underline decoration-[#DAA520] underline-offset-2"
                    href={`mailto:${item.email}`}
                  >
                    {item.email}
                  </a>
                  {item.phone && (
                    <>
                      {" "}
                      ·{" "}
                      <a
                        className="underline decoration-[#DAA520] underline-offset-2"
                        href={`tel:${item.phone}`}
                      >
                        {item.phone}
                      </a>
                    </>
                  )}
                </p>
                <p className="mt-1 text-xs text-[#667687]">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <label className="sr-only" htmlFor={`status-${item.id}`}>
                  Update status for enquiry from {item.name}
                </label>
                <select
                  id={`status-${item.id}`}
                  value={item.adminStatus || "new"}
                  onChange={(event) =>
                    updateStatus(item.id, event.target.value)
                  }
                  className="min-h-11 rounded-lg border border-[#001F3F]/15 bg-white px-3 text-sm capitalize"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => deleteItem(item)}
                  className="min-h-11 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-700 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-5 whitespace-pre-wrap border-t border-[#001F3F]/10 pt-4 text-sm leading-7 text-[#35475a]">
              {item.message}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
