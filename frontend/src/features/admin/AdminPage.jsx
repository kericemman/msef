import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api.js";
import AdminLoginPanel from "./sections/AdminLoginPanel.jsx";
import AdminDashboard from "./sections/AdminDashboard.jsx";

export default function AdminPage() {
  const [authState, setAuthState] = useState("checking");
  const [user, setUser] = useState(null);
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    let active = true;
    apiRequest("/admin/auth/session")
      .then(({ user: adminUser }) => {
        if (active) {
          setUser(adminUser);
          setAuthState("signed-in");
        }
      })
      .catch((error) => {
        if (!active) return;
        if (error.status === 401) setAuthState("signed-out");
        else {
          setSessionError(error.message);
          setAuthState("error");
        }
      });
    return () => {
      active = false;
    };
  }, []);

  async function signIn(credentials) {
    const result = await apiRequest("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setUser(result.user);
    setSessionError("");
    setAuthState("signed-in");
  }

  async function signOut() {
    try {
      await apiRequest("/admin/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setAuthState("signed-out");
    }
  }

  if (authState === "checking")
    return (
      <main className="grid min-h-screen place-items-center bg-[#F5F5F5] text-sm text-[#526171]">
        Checking admin session…
      </main>
    );
  if (authState === "error")
    return (
      <main className="grid min-h-screen place-items-center bg-[#F5F5F5] p-5">
        <div className="max-w-md rounded-2xl bg-white p-7 text-center shadow-lg">
          <h1 className="text-xl font-semibold text-[#001F3F]">
            Admin service unavailable
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#526171]">
            {sessionError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 min-h-11 rounded-full bg-[#001F3F] px-5 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </main>
    );
  if (authState === "signed-out") return <AdminLoginPanel onSignIn={signIn} />;
  return <AdminDashboard user={user} onSignOut={signOut} />;
}
