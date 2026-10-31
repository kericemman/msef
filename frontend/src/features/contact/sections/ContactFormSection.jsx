import { useState } from "react";
import { apiRequest } from "../../../services/api.js";
const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
};

export default function ContactFormSection() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  function updateField(event) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    try {
      const result = await apiRequest("/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setFeedback({
        type: result.confirmationEmailSent === false ? "warning" : "success",
        message:
          result.message ||
          "Your enquiry has been sent to Morning Star Empowerment Foundation. We’ll use the contact details you provided to follow up.",
      });
      setForm(initialForm);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          (error instanceof TypeError && error.message === "Failed to fetch"
            ? "The enquiry service could not be reached. Please try again or email info@morningstar-ef.org."
            : error.message) ||
          "The contact service could not be reached. Please email starmorning2010@gmail.com.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className="px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"
      id="contact-form"
    >
      <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl bg-[#001F3F] p-5 text-white sm:p-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12 lg:p-12">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#DAA520] sm:text-sm">
            Send a message
          </p>
          <h2 className="text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl">
            How can we help?
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/75 md:text-xl md:leading-8">
            Fill in the form and the Foundation will get back to you. Please
            don’t include medical histories or other sensitive personal
            information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-5 text-[#001F3F] sm:p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold sm:col-span-2">
              Full name
              <input
                name="name"
                type="text"
                autoComplete="name"
                minLength="2"
                maxLength="120"
                required
                value={form.name}
                onChange={updateField}
                className="mt-2 min-h-12 w-full rounded-xl border border-[#001F3F]/20 px-4 py-3 text-base font-normal outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
              />
            </label>
            <label className="text-sm font-semibold">
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength="254"
                required
                value={form.email}
                onChange={updateField}
                className="mt-2 min-h-12 w-full rounded-xl border border-[#001F3F]/20 px-4 py-3 text-base font-normal outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
              />
            </label>
            <label className="text-sm font-semibold">
              Phone{" "}
              <span className="font-normal text-[#667687]">(optional)</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength="30"
                value={form.phone}
                onChange={updateField}
                className="mt-2 min-h-12 w-full rounded-xl border border-[#001F3F]/20 px-4 py-3 text-base font-normal outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
              />
            </label>
            <label className="text-sm font-semibold sm:col-span-2">
              What is your enquiry about?
              <select
                name="subject"
                required
                value={form.subject}
                onChange={updateField}
                className="mt-2 min-h-12 w-full rounded-xl border border-[#001F3F]/20 bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
              >
                <option value="" disabled>
                  Select a topic
                </option>
                <option value="Programme enquiry">Programme enquiry</option>
                <option value="Partnership">Partnership</option>
                <option value="Volunteering">Volunteering</option>
                <option value="Donation">Donation</option>
                <option value="General enquiry">General enquiry</option>
              </select>
            </label>
            <label className="text-sm font-semibold sm:col-span-2">
              Message
              <textarea
                name="message"
                rows="5"
                minLength="10"
                maxLength="5000"
                required
                value={form.message}
                onChange={updateField}
                className="mt-2 w-full resize-y rounded-xl border border-[#001F3F]/20 px-4 py-3 text-base font-normal outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
              />
            </label>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#435365]">
            <input
              name="consent"
              type="checkbox"
              required
              checked={form.consent}
              onChange={updateField}
              className="mt-1 h-4 w-4 shrink-0 accent-[#001F3F]"
            />
            <span>
              I agree that MSEF may use these details to respond to my enquiry.
            </span>
          </label>

          {feedback && (
            <p
              role={feedback.type === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`mt-5 rounded-xl px-4 py-3 text-sm leading-6 ${feedback.type === "success" ? "bg-emerald-50 text-emerald-800" : feedback.type === "warning" ? "bg-amber-50 text-amber-900" : "bg-red-50 text-red-800"}`}
            >
              {feedback.message}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#DAA520] px-6 py-3 text-sm font-bold text-[#001F3F] transition-colors hover:bg-[#edbd42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending message…" : "Send message"}{" "}
            {!submitting && <span aria-hidden="true">↗</span>}
          </button>
        </form>
      </div>
    </section>
  );
}
