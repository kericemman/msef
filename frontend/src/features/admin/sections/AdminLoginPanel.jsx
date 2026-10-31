import { useState } from "react";

export default function AdminLoginPanel({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await onSignIn({ email, password });
    } catch (err) {
      setError(err.message || "Sign-in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#001F3F] px-5 py-12 text-[#001F3F]">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-9"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a6812]">
          Morning Star Empowerment Foundation
        </p>
        <h1 className="mt-4 text-2xl font-semibold md:text-2xl lg:text-3xl">
          Admin sign in
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#526171]">
          Sign in to manage website content and review enquiries and donations.
        </p>
        <label className="mt-7 block text-sm font-semibold">
          Email address
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-xl border border-[#001F3F]/20 px-4 py-3 text-base font-normal outline-none focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Password
          <span className="relative mt-2 block">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-[#001F3F]/20 px-4 py-3 pr-20 text-base font-normal outline-none focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-3 my-auto min-h-10 rounded-lg px-2 text-sm font-semibold text-[#001F3F] underline decoration-[#DAA520] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </span>
        </label>
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 min-h-12 w-full rounded-full bg-[#001F3F] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0b385f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DAA520] disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <a
          href="/"
          className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-[#526171] underline decoration-[#DAA520] underline-offset-4"
        >
          Return to the website
        </a>
      </form>
    </main>
  );
}
