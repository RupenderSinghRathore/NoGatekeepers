import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Feed" },
  { to: "/nudges", label: "My Nudges" },
  { to: "/admin", label: "Admin" },
];

export const Layout = () => (
  <div className="min-h-screen bg-ink text-paper">
    <header className="border-b border-paper/10 bg-ink/95">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl">No GateKeepers</h1>
        </div>
        <nav className="flex flex-wrap gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `border px-4 py-2 text-sm uppercase tracking-[0.18em] transition ${
                  isActive
                    ? "border-amber bg-amber text-ink"
                    : "border-paper/15 text-paper/75 hover:border-paper/35 hover:text-paper"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Outlet />
    </main>
  </div>
);
