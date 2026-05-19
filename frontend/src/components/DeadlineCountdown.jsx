import { formatDeadlineLabel } from "../utils/date";

export const DeadlineCountdown = ({ deadlineDate }) => (
  <div className="text-sm font-semibold text-amber">
    {formatDeadlineLabel(deadlineDate)}
  </div>
);
