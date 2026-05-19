import { useEffect, useMemo, useState } from "react";
import { getCalendar, getTips } from "../api";
import { TipCard } from "../components/TipCard";
import { usePreferences } from "../context/PreferencesContext";
import { formatDeadlineLabel, formatShortDate, getDaysRemaining } from "../utils/date";

const initialFilters = {
  college: "",
  branch: "",
  urgency: "",
};

export const HomePage = () => {
  const [tips, setTips] = useState([]);
  const [calendarItems, setCalendarItems] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const { preferences } = usePreferences();

  useEffect(() => {
    Promise.all([getTips(), getCalendar()]).then(([tipData, calendarData]) => {
      setTips(tipData.filter((tip) => tip.status === "approved"));
      setCalendarItems(calendarData);
    });
  }, []);

  const colleges = [...new Set(tips.map((tip) => tip.college))];
  const branches = [...new Set(tips.map((tip) => tip.branch))];

  const filteredTips = useMemo(
    () =>
      tips.filter((tip) => {
        const collegeMatch = !filters.college || tip.college === filters.college;
        const branchMatch = !filters.branch || tip.branch === filters.branch;
        const urgencyMatch = !filters.urgency || tip.urgency === filters.urgency;
        return collegeMatch && branchMatch && urgencyMatch;
      }),
    [filters, tips]
  );

  const criticalCount = useMemo(
    () =>
      tips.filter(
        (tip) =>
          tip.urgency === "Critical" &&
          getDaysRemaining(tip.deadlineDate) <= 7 &&
          (!preferences.branch || tip.branch === preferences.branch)
      ).length,
    [preferences.branch, tips]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="space-y-6">
        <div className="border border-amber/40 bg-[#16213b] p-5">
          <p className="text-xs uppercase tracking-[0.28em] text-amber">Proactive Nudge</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl text-paper">
                {criticalCount} critical deadlines in your branch this week
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-paper/75">
                Senior-verified intel surfaces before windows close, especially for students who do not have insider networks yet.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border border-paper/10 bg-white/[0.03] p-4 md:grid-cols-3">
          {[
            { key: "college", label: "College", options: colleges },
            { key: "branch", label: "Branch", options: branches },
            { key: "urgency", label: "Urgency", options: ["Critical", "Soon", "FYI"] },
          ].map((filter) => (
            <label key={filter.key} className="space-y-2 text-sm text-paper/75">
              <span className="block text-xs uppercase tracking-[0.22em] text-paper/50">{filter.label}</span>
              <select
                value={filters[filter.key]}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, [filter.key]: event.target.value }))
                }
                className="w-full border border-paper/15 bg-ink px-3 py-3 text-paper outline-none focus:border-amber"
              >
                <option value="">All {filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
          {!filteredTips.length && (
            <div className="border border-dashed border-paper/20 p-8 text-center text-paper/65">
              No tips match this filter set yet.
            </div>
          )}
        </div>
      </section>

      <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
        <div className="border border-paper/15 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-amber">Academic Calendar</p>
          <h2 className="mt-3 font-display text-2xl">Upcoming This Month</h2>
          <div className="mt-5 space-y-4">
            {calendarItems.map((item) => (
              <div key={item.id} className="border-t border-paper/10 pt-4 first:border-t-0 first:pt-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-paper">{item.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-paper/55">
                      {item.college} · {item.branch}
                    </p>
                  </div>
                  <div className="text-right text-sm text-amber">
                    <div>{formatShortDate(item.deadlineDate)}</div>
                    <div className="text-xs text-paper/60">{formatDeadlineLabel(item.deadlineDate)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
