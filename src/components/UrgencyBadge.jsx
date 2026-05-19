const styles = {
  Critical: "border-red-400/40 bg-red-950/70 text-red-200",
  Soon: "border-amber-400/40 bg-amber-950/40 text-amber-200",
  FYI: "border-emerald-400/40 bg-emerald-950/40 text-emerald-200",
};

const icons = {
  Critical: "Critical",
  Soon: "Soon",
  FYI: "FYI",
};

export const UrgencyBadge = ({ urgency }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${styles[urgency]}`}
  >
    {icons[urgency]}
  </span>
);
