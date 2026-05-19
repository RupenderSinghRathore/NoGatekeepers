import { useEffect, useMemo, useState } from "react";
import { flagTip, getTips, reviewTip } from "../api";
import { AdminGate } from "../components/AdminGate";

export const AdminPage = () => {
  const [tips, setTips] = useState([]);

  const loadTips = () => getTips().then(setTips);

  useEffect(() => {
    loadTips();
  }, []);

  const pendingTips = useMemo(() => tips.filter((tip) => tip.status === "pending"), [tips]);
  const stats = useMemo(
    () => ({
      totalTips: tips.filter((tip) => tip.status === "approved").length,
      verificationsToday: tips.reduce((sum, tip) => sum + Math.min(tip.verificationCount, 3), 0),
      activeUsers: 124,
    }),
    [tips]
  );

  const handleReview = async (id, status) => {
    await reviewTip(id, status);
    loadTips();
  };

  const handleFlag = async (id) => {
    await flagTip(id);
    loadTips();
  };

  return (
    <AdminGate>
      <div className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber">Admin Panel</p>
          <h2 className="mt-3 font-display text-4xl">Moderation and signal quality</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Total Tips", value: stats.totalTips },
            { label: "Verifications Today", value: stats.verificationsToday },
            { label: "Active Users", value: stats.activeUsers },
          ].map((stat) => (
            <div key={stat.label} className="border border-paper/15 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-paper/55">{stat.label}</p>
              <p className="mt-3 font-display text-4xl">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden border border-paper/15 bg-white/[0.03]">
          <div className="border-b border-paper/10 px-5 py-4">
            <h3 className="font-display text-2xl">Pending Tips</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-paper/10 text-xs uppercase tracking-[0.2em] text-paper/55">
                <tr>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Campus</th>
                  <th className="px-5 py-4">Urgency</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingTips.map((tip) => (
                  <tr key={tip.id} className="border-b border-paper/10 align-top last:border-b-0">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-paper">{tip.title}</div>
                      <div className="mt-2 max-w-md text-paper/65">{tip.whatMostPeopleMiss}</div>
                    </td>
                    <td className="px-5 py-4 text-paper/75">{tip.category}</td>
                    <td className="px-5 py-4 text-paper/75">{tip.college} · {tip.branch}</td>
                    <td className="px-5 py-4 text-paper/75">{tip.urgency}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleReview(tip.id, "approved")}
                          className="border border-emerald-400/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-emerald-200"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReview(tip.id, "rejected")}
                          className="border border-red-400/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-red-200"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFlag(tip.id)}
                          className="border border-amber/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-amber"
                        >
                          Flag
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!pendingTips.length && (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-paper/60">
                      No pending tips right now.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminGate>
  );
};
