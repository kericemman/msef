import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../../services/api.js";
import Icon from "../../components/Icon.jsx";
const PRESET_AMOUNTS = [200, 500, 1000, 3000, 5000, 10000];
const formatAmount = (amount) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);

export default function GetInvolvedPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [amountChoice, setAmountChoice] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);
  const amount = useMemo(
    () =>
      amountChoice === "custom" ? Number(customAmount) : Number(amountChoice),
    [amountChoice, customAmount],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");
    if (!reference) return;

    let active = true;
    let verified = false;
    setNotice({ type: "info", text: "Checking your payment securely…" });
    apiRequest(`/donations/verify?reference=${encodeURIComponent(reference)}`)
      .then((result) => {
        verified = true;
        if (active)
          setNotice(
            result.status === "success"
              ? {
                    type: result.receiptEmailSent ? "success" : "warning",
                    text: result.receiptEmailSent
                      ? `Thank you. Your donation of ${formatAmount(result.amount)} has been confirmed. A receipt email has been sent.`
                      : `Your donation of ${formatAmount(result.amount)} is confirmed, but we could not send the receipt email. Contact Morning Star with reference ${reference}.`,
                }
              : result.status === "failed"
                ? {
                    type: "error",
                    text: `Paystack did not confirm this donation. If you were charged, contact Morning Star and include reference ${reference}.`,
                  }
                : {
                    type: "info",
                    text: `Your payment status is still being confirmed. Please contact Morning Star and include reference ${reference} before trying again.`,
                  },
          );
      })
      .catch((error) => {
        if (active)
          setNotice({
            type: "error",
            text: `${error.message || "We could not verify your payment yet."} Your payment has not been confirmed. Please refresh to check again, or contact Morning Star with reference ${reference}.`,
          });
      })
      .finally(() => {
        if (!active || !verified) return;
        params.delete("reference");
        params.delete("trxref");
        const query = params.toString();
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
        );
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice(null);
    if (!Number.isSafeInteger(amount) || amount < 3) {
      setNotice({
        type: "error",
        text: "Enter a whole-number donation amount of at least KES 3.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const result = await apiRequest("/donations/initialize", {
        method: "POST",
        body: JSON.stringify({ donorName, email, phone, amount }),
      });
      window.location.assign(result.authorizationUrl);
    } catch (error) {
      setNotice({
        type: "error",
        text:
          error.message ||
          "The donation service could not be reached. Please try again.",
      });
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-[#F8F6EF] text-[#001F3F]">
      <section className="relative overflow-hidden bg-[#001F3F] px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full border border-[#DAA520]/20"
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#DAA520] sm:text-sm">
            Get involved
          </p>
          <h1 className="max-w-4xl text-2xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
            Your support can help
            <br />
            <span className="text-[#DAA520]">open new possibilities.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-white/80 md:text-xl md:leading-8">
            Partner with Morning Star Empowerment Foundation to support
            community development, youth empowerment, family wellbeing, and
            sustainable livelihoods.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="pt-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#8a6812] sm:text-sm">
              Make a donation
            </p>
            <h2 className="text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
              Choose an amount that works for you.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#435365] md:text-xl md:leading-8">
              Every contribution helps strengthen work with communities. Select
              a suggested amount or enter a custom amount in Kenyan shillings.
            </p>
            <div className="mt-8 rounded-2xl border border-[#001F3F]/10 bg-white p-5 sm:p-6">
              <p className="text-sm font-semibold text-[#001F3F]">
                Secure checkout
              </p>
              <p className="mt-2 text-sm leading-6 text-[#586879]">
                Your payment is processed by Paystack. Card and other available
                payment methods are shown at checkout.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-5 shadow-[0_18px_55px_rgba(0,31,63,0.08)] sm:p-8 lg:p-10"
          >
            <fieldset>
              <legend className="text-lg font-semibold text-[#001F3F]">
                Select donation amount{" "}
                <span className="text-[#9B6B00]">(KES)</span>
              </legend>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    aria-pressed={amountChoice === String(preset)}
                    onClick={() => setAmountChoice(String(preset))}
                    className={`rounded-xl border px-3 py-3.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520] sm:text-base ${amountChoice === String(preset) ? "border-[#001F3F] bg-[#001F3F] text-white" : "border-[#001F3F]/15 bg-white text-[#001F3F] hover:border-[#001F3F]/50 hover:bg-[#F8F6EF]"}`}
                  >
                    {preset.toLocaleString("en-KE")}
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-pressed={amountChoice === "custom"}
                onClick={() => setAmountChoice("custom")}
                className={`mt-3 w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520] ${amountChoice === "custom" ? "border-[#001F3F] bg-[#001F3F] text-white" : "border-[#001F3F]/15 text-[#001F3F] hover:bg-[#F8F6EF]"}`}
              >
                Enter a custom amount
              </button>
              {amountChoice === "custom" && (
                <label className="mt-3 block text-sm font-semibold text-[#001F3F]">
                  Custom amount (KES)
                  <input
                    type="number"
                    min="3"
                    step="1"
                    inputMode="numeric"
                    required
                    value={customAmount}
                    onChange={(event) => setCustomAmount(event.target.value)}
                    placeholder="Enter amount"
                    className="mt-2 w-full rounded-xl border border-[#001F3F]/20 bg-white px-4 py-3 text-base font-normal text-[#001F3F] outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
                  />
                </label>
              )}
            </fieldset>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-[#001F3F] sm:col-span-2">
                Full name
                <input
                  type="text"
                  autoComplete="name"
                  minLength="2"
                  maxLength="120"
                  required
                  value={donorName}
                  onChange={(event) => setDonorName(event.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-[#001F3F]/20 px-4 py-3 text-base font-normal outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
                />
              </label>
              <label className="text-sm font-semibold text-[#001F3F]">
                Email address
                <input
                  type="email"
                  autoComplete="email"
                  maxLength="254"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-[#001F3F]/20 px-4 py-3 text-base font-normal outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
                />
              </label>
              <label className="text-sm font-semibold text-[#001F3F]">
                Phone{" "}
                <span className="font-normal text-[#667687]">(optional)</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  maxLength="30"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+254…"
                  className="mt-2 w-full rounded-xl border border-[#001F3F]/20 px-4 py-3 text-base font-normal outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
                />
              </label>
            </div>

            {notice && (
              <p
                role={notice.type === "error" ? "alert" : "status"}
                aria-live="polite"
                className={`mt-5 rounded-xl px-4 py-3 text-sm leading-6 ${notice.type === "success" ? "bg-emerald-50 text-emerald-800" : notice.type === "warning" ? "bg-amber-50 text-amber-900" : notice.type === "info" ? "bg-blue-50 text-blue-800" : "bg-red-50 text-red-800"}`}
              >
                {notice.text}
              </p>
            )}

            <button
              type="submit"
              disabled={
                submitting || !Number.isSafeInteger(amount) || amount < 3
              }
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#DAA520] px-6 py-4 text-sm font-bold text-[#001F3F] transition-colors hover:bg-[#edbd42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#001F3F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Connecting to Paystack…"
                : `Continue with ${Number.isSafeInteger(amount) && amount > 0 ? formatAmount(amount) : "donation"}`}
              {!submitting && <Icon name="arrow-up-right" size={16} />}
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-[#667687]">
              By continuing, you’ll be redirected to Paystack’s secure checkout
              to complete your donation.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
