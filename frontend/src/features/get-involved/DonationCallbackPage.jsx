import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../services/api.js";
import Icon from "../../components/Icon.jsx";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DonationCallbackPage() {
  const [result, setResult] = useState({ status: "checking" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");
    if (!reference) {
      setResult({
        status: "unknown",
        message: "We didn’t receive a payment reference, so the payment could not be checked.",
      });
      return;
    }

    let active = true;
    apiRequest(`/donations/verify?reference=${encodeURIComponent(reference)}`)
      .then((payment) => {
        if (active) setResult({ ...payment, reference });
      })
      .catch((error) => {
        if (active)
          setResult({
            status: "unknown",
            reference,
            message:
              error.message ||
              "We couldn’t confirm the payment status right now. Please check again or contact Morning Star with your payment reference.",
          });
      });

    return () => {
      active = false;
    };
  }, []);

  const isSuccess = result.status === "success";
  const isFailed = result.status === "failed";

  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#F8F6EF] px-5 py-16 text-[#001F3F] sm:px-8">
      <section
        aria-live="polite"
        className="w-full max-w-2xl rounded-3xl bg-white p-7 text-center shadow-[0_18px_55px_rgba(0,31,63,0.08)] sm:p-12"
      >
        <span
          aria-hidden="true"
          className={`mx-auto grid h-16 w-16 place-items-center rounded-full text-3xl font-semibold ${isSuccess ? "bg-emerald-50 text-emerald-700" : isFailed ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}
        >
          <Icon
            className={result.status === "checking" ? "animate-spin" : ""}
            name={
              result.status === "checking"
                ? "refresh"
                : isSuccess
                  ? "circle-check"
                  : isFailed
                    ? "circle-alert"
                    : "info"
            }
            size={28}
          />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#8a6812]">
          Donation payment
        </p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
          {result.status === "checking"
            ? "Checking your payment"
            : result.status === "pending"
              ? "Payment is still processing"
            : isSuccess
              ? "Thank you for your support"
              : isFailed
                ? "Payment not confirmed"
                : "Payment status needs checking"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#526171] md:text-lg">
          {result.status === "checking"
            ? "We’re securely confirming the transaction with Paystack. Please keep this page open for a moment."
            : result.status === "pending"
              ? `Paystack has not completed processing yet. Please wait a moment and check again before starting another donation.${result.reference ? ` Reference: ${result.reference}.` : ""}`
            : isSuccess
              ? `Your donation of ${formatAmount(result.amount)} has been confirmed.${result.receiptEmailSent ? " A receipt email has been sent to the address entered at checkout." : " We couldn’t send a receipt email; contact us if you need help."}`
              : isFailed
                ? `Paystack did not confirm this donation. If you were charged, contact Morning Star and include reference ${result.reference}.`
                : `${result.message || "We couldn’t confirm your payment yet."}${result.reference ? ` Please contact Morning Star and include reference ${result.reference}.` : ""}`}
        </p>
        {result.reference && (
          <p className="mt-4 break-all font-mono text-xs text-[#667687]">
            Reference: {result.reference}
          </p>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {(result.status === "pending" || result.status === "unknown") && (
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#DAA520] px-6 text-sm font-semibold text-[#001F3F] hover:bg-[#edbd42]"
              onClick={() => window.location.reload()}
              type="button"
            >
              Check payment again
            </button>
          )}
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#001F3F] px-6 text-sm font-semibold text-white hover:bg-[#0b385f]"
            to="/"
          >
            Return home
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#001F3F]/20 px-6 text-sm font-semibold text-[#001F3F] hover:bg-[#F8F6EF]"
            to="/contact"
          >
            Contact Morning Star
          </Link>
        </div>
      </section>
    </main>
  );
}
