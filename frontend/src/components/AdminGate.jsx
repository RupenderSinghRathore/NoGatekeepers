import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export const AdminGate = ({ children }) => {
  const { isAuthenticated, login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated) {
    return children;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = login(password);
    setError(isValid ? "" : "Incorrect password.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 px-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md border border-paper/15 bg-[#111b31] p-8 shadow-editorial"
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute right-4 top-4 text-paper/60 transition hover:text-paper"
          aria-label="Close admin access"
        >
          X
        </button>
        <p className="text-xs uppercase tracking-[0.3em] text-amber">Administrative Access</p>
        <h2 className="mt-3 font-display text-3xl text-paper">Campus Desk Control</h2>
        <p className="mt-3 text-sm leading-7 text-paper/70">
          This frontend uses a temporary client-side password wall until backend auth is wired.
        </p>
        <label className="mt-6 block text-xs uppercase tracking-[0.2em] text-paper/60">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full border border-paper/15 bg-transparent px-4 py-3 text-paper outline-none ring-0 placeholder:text-paper/30 focus:border-amber"
          placeholder="Enter admin password"
        />
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full border border-amber bg-amber px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:bg-transparent hover:text-amber"
        >
          Enter Desk
        </button>
      </form>
    </div>
  );
};
