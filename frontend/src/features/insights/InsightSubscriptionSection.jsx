import { useState } from "react";
import { apiRequest } from "../../services/api.js";

export default function InsightSubscriptionSection() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const result = await apiRequest("/newsletter", {
        method: "POST",
        body: JSON.stringify({ email, consent }),
      });
      setStatus(result.confirmationEmailSent === false ? "email-warning" : "success");
      setMessage(
        result.message ||
          "Success! You’re on the list. We’ll email you when Morning Star publishes a new insight.",
      );
      setEmail("");
      setConsent(false);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "We couldn’t complete your subscription. Please try again.");
    }
  }

  return (
    <section
      aria-labelledby="insight-subscribe-heading"
      className="mx-auto mt-12 w-full max-w-6xl min-w-0 border-t border-[#001F3F]/15 pt-8 sm:mt-20 sm:pt-12"
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 rounded-2xl bg-[#001F3F] p-4 text-white sm:gap-8 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-12">
        <div className="min-w-0">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C75E]">
            Stay connected
          </p>
          <h2
            id="insight-subscribe-heading"
            className="break-words text-xl font-semibold leading-tight md:text-2xl lg:text-3xl"
          >
            Get new stories in your inbox.
          </h2>
          <p className="mt-4 max-w-prose text-sm leading-7 text-white/80 md:text-base">
            Subscribe for occasional updates when Morning Star publishes a new insight.
            You can unsubscribe at any time.
          </p>
        </div>

        <form className="min-w-0 space-y-4" onSubmit={handleSubmit}>
          <label
            className="block text-sm font-medium"
            htmlFor="insight-subscribe-email"
          >
            Email address
          </label>
          <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row">
            <input
              autoComplete="email"
              className="min-h-12 w-full min-w-0 flex-1 rounded-md border border-white/30 bg-white px-3 text-base text-[#001F3F] outline-none focus:border-[#F0C75E] focus:ring-2 focus:ring-[#F0C75E]/40 sm:px-4"
              id="insight-subscribe-email"
              maxLength={254}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "submitting") {
                  setStatus("idle");
                  setMessage("");
                }
              }}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
            <button
              className="min-h-12 w-full shrink-0 rounded-md bg-[#F0C75E] px-5 font-semibold text-[#001F3F] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              disabled={status === "submitting"}
              type="submit"
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
          <label className="flex min-w-0 items-start gap-3 text-sm leading-6 text-white/80">
            <input
              checked={consent}
              className="mt-1 h-4 w-4 shrink-0 accent-[#F0C75E]"
              onChange={(event) => {
                setConsent(event.target.checked);
                if (status !== "submitting") {
                  setStatus("idle");
                  setMessage("");
                }
              }}
              required
              type="checkbox"
            />
            <span className="min-w-0 break-words">
              I agree to receive email updates about new Morning Star insights. My
              email will only be used for these updates.
            </span>
          </label>
          {message && (
            <p
              aria-live="polite"
              className={`break-words text-sm [overflow-wrap:anywhere] ${status === "error" ? "text-red-200" : status === "email-warning" ? "text-amber-200" : "text-[#F0C75E]"}`}
              role={status === "error" || status === "email-warning" ? "alert" : "status"}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
