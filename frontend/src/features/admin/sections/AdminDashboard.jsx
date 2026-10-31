import { lazy, Suspense, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminOverview from "./AdminOverview.jsx";
import AdminMessages from "./AdminMessages.jsx";
import AdminDonations from "./AdminDonations.jsx";
import AdminContentManager from "./AdminContentManager.jsx";
import AdminNewsletterSubscribers from "./AdminNewsletterSubscribers.jsx";
import Icon from "../../../components/Icon.jsx";
const AdminInsights = lazy(() => import("./AdminInsights.jsx"));

const sections = [
  { id: "overview", label: "Overview", icon: "layout-dashboard" },
  { id: "messages", label: "Enquiries", icon: "mail" },
  { id: "donations", label: "Donations", icon: "hand-coins" },
  { id: "subscribers", label: "Insight subscribers", icon: "users" },
  { id: "testimonials", label: "Testimonials", icon: "quote" },
  { id: "insights", label: "Insights", icon: "file-text" },
];

const sectionTitles = {
  overview: ["Workspace", "Overview"],
  messages: ["Communications", "Enquiries"],
  donations: ["Giving", "Donations"],
  subscribers: ["Communications", "Insight subscribers"],
  testimonials: ["Website content", "Testimonials"],
  insights: ["Website content", "Insights"],
};

export default function AdminDashboard({ user, onSignOut }) {
  const [active, setActive] = useState("overview");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const insightEditor = location.pathname.match(
    /^\/admin\/insights\/(new|[a-f\d]{24})\/?$/i,
  );

  function navigateTo(sectionId) {
    setActive(sectionId);
    setError("");
    setSidebarOpen(false);
    if (insightEditor) navigate("/admin");
  }

  async function handleSignOut() {
    try {
      await onSignOut();
    } catch (err) {
      setError(err.message || "Could not sign out cleanly.");
    }
  }

  const [eyebrow, title] = sectionTitles[active];
  const isInsightEditor = Boolean(insightEditor);
  const activeSection = isInsightEditor ? "insights" : active;
  const pageEyebrow = isInsightEditor ? "Website content" : eyebrow;
  const pageTitle = isInsightEditor
    ? insightEditor[1] === "new"
      ? "New insight"
      : "Edit insight"
    : title;

  return (
    <main className="min-h-screen bg-[#F3F5F7] text-[#001F3F]">
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-[#00152b]/50 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[17rem] flex-col bg-[#001F3F] text-white transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex min-h-24 items-center gap-3 border-b border-white/10 px-6">
          <span
            aria-hidden="true"
            className="grid h-11 w-11 place-items-center rounded-2xl bg-[#DAA520] text-xl font-black text-[#001F3F]"
          >
            M
          </span>
          <div>
            <p className="text-sm font-bold leading-5">Morning Star</p>
            <p className="text-xs text-white/60">Foundation admin</p>
          </div>
          <button
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto grid h-10 w-10 place-items-center rounded-xl text-xl text-white/70 hover:bg-white/10 lg:hidden"
          >
          <Icon name="close" size={18} />
          </button>
        </div>
        <div className="px-4 pt-7">
          <p className="px-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/45">
            Workspace
          </p>
          <nav aria-label="Admin sections" className="mt-3 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => navigateTo(section.id)}
                aria-current={activeSection === section.id ? "page" : undefined}
                className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520] ${activeSection === section.id ? "bg-white text-[#001F3F]" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-8 w-8 place-items-center rounded-lg text-lg ${activeSection === section.id ? "bg-[#F8F2DF] text-[#8a6812]" : "text-white/80"}`}
                >
                  <Icon name={section.icon} size={18} />
                </span>
                {section.label}
                {section.id === "messages" && active !== "messages" && (
                  <span className="ml-auto rounded-full bg-[#DAA520] px-2 py-0.5 text-[0.65rem] font-bold text-[#001F3F]">
                    Inbox
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t border-white/10 p-4">
          <div className="mb-3 rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-white/50">Signed in as</p>
            <p className="mt-1 truncate text-sm font-medium">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520]"
          >
            <span aria-hidden="true" className="text-lg">
              <Icon name="log-out" size={18} />
            </span>{" "}
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[17rem]">
        <header className="sticky top-0 z-20 border-b border-[#001F3F]/10 bg-white/95 px-4 py-4 backdrop-blur sm:px-7 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                aria-label="Open navigation"
                onClick={() => setSidebarOpen(true)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#001F3F]/10 text-xl lg:hidden"
              >
                <Icon name="menu" size={20} />
              </button>
              <div className="min-w-0">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.17em] text-[#8a6812]">
                  {pageEyebrow}
                </p>
                <h1 className="truncate text-xl font-semibold sm:text-2xl">
                  {pageTitle}
                </h1>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden max-w-[14rem] truncate text-sm text-[#526171] sm:block">
                {user.email}
              </span>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden min-h-10 items-center rounded-full border border-[#001F3F]/15 px-4 text-sm font-semibold hover:bg-[#F8F6EF] sm:inline-flex"
              >
                View site <Icon name="arrow-up-right" size={16} />
              </a>
              <button
                onClick={handleSignOut}
                className="min-h-10 rounded-full bg-[#001F3F] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0b385f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520] sm:hidden"
              >
                Exit
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
          {error && (
            <p
              role="status"
              className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900"
            >
              {error}
            </p>
          )}
          {isInsightEditor && (
            <Suspense
              fallback={
                <p className="text-sm text-[#526171]">
                  Loading article editor…
                </p>
              }
            >
              <AdminInsights
                fullScreen
                articleId={insightEditor[1]}
                onClose={() => {
                  setActive("insights");
                  navigate("/admin");
                }}
              />
            </Suspense>
          )}
          {!isInsightEditor && active === "overview" && (
            <AdminOverview onNavigate={navigateTo} />
          )}
          {!isInsightEditor && active === "messages" && (
            <AdminMessages onError={setError} />
          )}
          {!isInsightEditor && active === "donations" && <AdminDonations />}
          {!isInsightEditor && active === "subscribers" && (
            <AdminNewsletterSubscribers />
          )}
          {!isInsightEditor && active === "testimonials" && (
            <AdminContentManager type="testimonials" />
          )}
          {!isInsightEditor && active === "insights" && (
            <Suspense
              fallback={
                <p className="text-sm text-[#526171]">Loading insights…</p>
              }
            >
              <AdminInsights
                onOpenEditor={(id) => navigate(`/admin/insights/${id}`)}
              />
            </Suspense>
          )}
        </div>
      </div>
    </main>
  );
}
