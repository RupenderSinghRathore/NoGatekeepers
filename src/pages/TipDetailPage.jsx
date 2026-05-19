import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTipById, getTips, verifyTip } from "../api";
import { BranchTag, CollegeTag } from "../components/Tags";
import { UrgencyBadge } from "../components/UrgencyBadge";
import { VerificationBar } from "../components/VerificationBar";
import { TipCard } from "../components/TipCard";
import { formatDeadlineLabel, formatShortDate } from "../utils/date";

export const TipDetailPage = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);
  const [allTips, setAllTips] = useState([]);

  useEffect(() => {
    Promise.all([getTipById(id), getTips()]).then(([detail, tips]) => {
      setTip(detail);
      setAllTips(tips.filter((item) => item.status === "approved"));
    });
  }, [id]);

  const relatedTips = useMemo(() => {
    if (!tip) {
      return [];
    }

    return allTips
      .filter((item) => item.id !== tip.id && (item.branch === tip.branch || item.college === tip.college))
      .slice(0, 3);
  }, [allTips, tip]);

  if (!tip) {
    return <div className="border border-paper/10 p-8 text-paper/70">Loading tip...</div>;
  }

  const handleVerify = async () => {
    const updatedTip = await verifyTip(tip.id);
    setTip(updatedTip);
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
      <article className="border border-paper/15 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-amber/30 bg-amber/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-amber">
            {tip.category}
          </span>
          <CollegeTag college={tip.college} />
          <BranchTag branch={tip.branch} />
          <UrgencyBadge urgency={tip.urgency} />
        </div>

        <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{tip.title}</h2>

        <div className="mt-5 flex flex-wrap items-center gap-6 border-y border-paper/10 py-4 text-sm text-paper/65">
          <div>{tip.postedBy}</div>
          <div>Deadline: {formatShortDate(tip.deadlineDate)}</div>
          <div className="text-amber">{formatDeadlineLabel(tip.deadlineDate)}</div>
        </div>

        <div className="mt-6 space-y-6">
          <p className="text-base leading-8 text-paper/80">{tip.description}</p>
          <div className="border-l-2 border-amber pl-4">
            <p className="text-xs uppercase tracking-[0.25em] text-amber">What most people miss</p>
            <p className="mt-3 text-base leading-8 text-paper/80">{tip.whatMostPeopleMiss}</p>
          </div>
          <VerificationBar score={tip.credibilityScore} />
        </div>

        <section className="mt-10 border-t border-paper/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-2xl">Peer Verification</h3>
              <p className="mt-1 text-sm text-paper/65">{tip.verificationCount} students have backed this field note.</p>
            </div>
            <button
              type="button"
              onClick={handleVerify}
              className="border border-amber px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber transition hover:bg-amber hover:text-ink"
            >
              Verify This Tip
            </button>
          </div>

          <div className="mt-6 grid gap-3">
            {tip.verifiedBy.map((verifier, index) => (
              <div key={`${verifier.name}-${index}`} className="border border-paper/10 p-4 text-sm text-paper/70">
                <span className="font-semibold text-paper">{verifier.name}</span>
                <span className="ml-2">{verifier.year} · {verifier.branch}</span>
              </div>
            ))}
          </div>
        </section>
      </article>

      <aside className="space-y-6">
        <div className="border border-paper/15 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.28em] text-amber">Related Tips</p>
          <div className="mt-4 space-y-4">
            {relatedTips.map((relatedTip) => (
              <TipCard key={relatedTip.id} tip={relatedTip} compact />
            ))}
            {!relatedTips.length && (
              <p className="text-sm text-paper/60">No close-match tips yet.</p>
            )}
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex border border-paper/15 px-4 py-3 text-sm uppercase tracking-[0.18em] text-paper/75 transition hover:border-paper/35 hover:text-paper"
        >
          Back to Feed
        </Link>
      </aside>
    </div>
  );
};
