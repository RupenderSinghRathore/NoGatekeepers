const tagBase = "inline-flex items-center rounded-full border border-paper/15 px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-paper/75";

export const BranchTag = ({ branch }) => <span className={tagBase}>{branch}</span>;

export const CollegeTag = ({ college }) => <span className={tagBase}>{college}</span>;
