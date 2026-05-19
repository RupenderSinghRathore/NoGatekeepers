import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getTips } from "../api";
import { usePreferences } from "../context/PreferencesContext";
import { formatDeadlineLabel, urgencyWeight } from "../utils/date";
import { UrgencyBadge } from "../components/UrgencyBadge";

export const NudgesPage = () => {
  const { preferences, setPreferences } = usePreferences();
  const [tips, setTips] = useState([]);

  useEffect(() => {
    getTips().then((data) => setTips(data.filter((tip) => tip.status === "approved")));
  }, []);

  const nudges = useMemo(
    () =>
      tips
        .filter((tip) => {
          if (!preferences.college && !preferences.branch) {
            return true;
          }

          const collegeMatch = !preferences.college || tip.college === preferences.college;
          const branchMatch = !preferences.branch || tip.branch === preferences.branch;
          return collegeMatch && branchMatch;
        })
        .sort((a, b) => urgencyWeight[a.urgency] - urgencyWeight[b.urgency]),
    [preferences.branch, preferences.college, tips]
  );

  return (
    <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="border border-paper/15 bg-white/[0.03] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-amber">Preference Signal</p>
        <h2 className="mt-3 font-display text-3xl">Set your campus profile once</h2>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-paper/55">College</span>
            <input
              value={preferences.college}
              onChange={(event) =>
                setPreferences((current) => ({ ...current, college: event.target.value }))
              }
              className="w-full border border-paper/15 bg-ink px-4 py-3 text-paper outline-none focus:border-amber"
              placeholder="Example: NIT Trichy"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-paper/55">Branch</span>
            <input
              value={preferences.branch}
              onChange={(event) =>
                setPreferences((current) => ({ ...current, branch: event.target.value }))
              }
              className="w-full border border-paper/15 bg-ink px-4 py-3 text-paper outline-none focus:border-amber"
              placeholder="Example: CSE"
            />
          </label>
          <p className="text-sm leading-7 text-paper/65">
            Preferences live in localStorage, so students do not need accounts just to receive timely nudges.
          </p>
        </div>
      </aside>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber">My Nudges</p>
          <h2 className="mt-3 font-display text-4xl">Warnings before the window closes</h2>
        </div>

        {nudges.map((tip) => (
          <div key={tip.id} className="border border-paper/15 bg-white/[0.03] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <UrgencyBadge urgency={tip.urgency} />
                  <span className="text-xs uppercase tracking-[0.18em] text-paper/55">
                    {tip.college} · {tip.branch}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl leading-tight">{tip.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-paper/75">{tip.whatMostPeopleMiss}</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-sm font-semibold text-amber">{formatDeadlineLabel(tip.deadlineDate)}</div>
                <Link to={`/tip/${tip.id}`} className="mt-3 inline-flex border border-paper/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper/70 transition hover:border-amber hover:text-amber">
                  Open Tip
                </Link>
              </div>
            </div>
          </div>
        ))}
        {!nudges.length && <div className="border border-dashed border-paper/20 p-8 text-paper/60">No nudges match your current campus profile.</div>}
      </section>
    </div>
  );
};
