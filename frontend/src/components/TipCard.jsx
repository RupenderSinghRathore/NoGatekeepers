import { Link } from "react-router-dom";
import { DeadlineCountdown } from "./DeadlineCountdown";
import { UrgencyBadge } from "./UrgencyBadge";
import { BranchTag, CollegeTag } from "./Tags";

export const TipCard = ({ tip, compact = false }) => (
  <article className="border border-paper/15 bg-white/5 p-5 transition hover:border-amber/50 hover:bg-white/[0.07]">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-amber/30 bg-amber/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-amber">
          {tip.category}
        </span>
        <CollegeTag college={tip.college} />
        <BranchTag branch={tip.branch} />
      </div>
      <UrgencyBadge urgency={tip.urgency} />
    </div>

    <Link to={`/tip/${tip.id}`} className="group block">
      <h3 className="font-display text-2xl leading-tight text-paper transition group-hover:text-amber">
        {tip.title}
      </h3>
    </Link>

    {!compact && <p className="mt-3 text-sm leading-7 text-paper/75">{tip.description}</p>}

    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-4 text-sm text-paper/70">
      <div>
        <div className="font-semibold text-paper">{tip.postedBy}</div>
        <div>✓ {tip.verificationCount} verified</div>
      </div>
      <DeadlineCountdown deadlineDate={tip.deadlineDate} />
    </div>
  </article>
);
