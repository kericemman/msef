import { useEffect, useState } from "react";
import { apiRequest } from "../../../services/api.js";

const formatAmount = (amount, currency = "KES") =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount || 0);

export default function AdminDonations() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    apiRequest(`/admin/donations${filter === "all" ? "" : `?status=${filter}`}`)
      .then((result) => {
        if (active) setItems(result.items || []);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [filter]);

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6812]">
            Payments
          </p>
          <h2 className="mt-2 text-2xl font-semibold md:text-2xl lg:text-3xl">
            Donation records
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
            <option value="pending">Pending</option>
            <option value="success">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </label>
      </div>
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}
      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#001F3F]/10 bg-white shadow-sm">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-[#F8F6EF] text-xs uppercase tracking-wide text-[#526171]">
            <tr>
              <th className="px-4 py-3 font-semibold">Donor</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Receipt email</th>
              <th className="px-4 py-3 font-semibold">Reference</th>
              <th className="px-4 py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#001F3F]/10">
            {!loading &&
              items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4">
                    <span className="block font-semibold">
                      {item.donorName}
                    </span>
                    <a
                      href={`mailto:${item.email}`}
                      className="mt-1 block text-xs text-[#526171] underline decoration-[#DAA520] underline-offset-2"
                    >
                      {item.email}
                    </a>
                  </td>
                  <td className="px-4 py-4 font-semibold">
                    {formatAmount(item.amount, item.currency)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-[#F8F6EF] px-3 py-1 capitalize">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-[#526171]">
                    {item.receiptEmailSentAt
                      ? `Sent ${new Date(item.receiptEmailSentAt).toLocaleDateString()}`
                      : item.status === "success"
                        ? "Not sent"
                        : "After payment"}
                  </td>
                  <td className="px-4 py-4 font-mono text-xs">
                    {item.reference}
                  </td>
                  <td className="px-4 py-4 text-[#526171]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            {!loading && !items.length && (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-8 text-center text-[#526171]"
                >
                  No donation records in this view.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-8 text-center text-[#526171]"
                >
                  Loading donation records…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-5 text-[#667687]">
        Payment statuses are verified by the backend against Paystack. Pending
        records are not counted as completed donations.
      </p>
    </section>
  );
}
