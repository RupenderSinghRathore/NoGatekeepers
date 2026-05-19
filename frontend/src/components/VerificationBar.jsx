export const VerificationBar = ({ score }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-paper/60">
      <span>Credibility</span>
      <span>{score}%</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-paper/10">
      <div className="h-full rounded-full bg-amber transition-all" style={{ width: `${score}%` }} />
    </div>
  </div>
);
