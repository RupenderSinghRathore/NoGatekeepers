const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const getDaysRemaining = (deadlineDate) => {
  const now = new Date();
  const deadline = new Date(deadlineDate);
  const diff = deadline.setHours(23, 59, 59, 999) - now.getTime();

  return Math.max(0, Math.ceil(diff / MS_PER_DAY));
};

export const formatDeadlineLabel = (deadlineDate) => {
  const days = getDaysRemaining(deadlineDate);

  if (days === 0) {
    return "Closes today";
  }

  if (days === 1) {
    return "1 day left";
  }

  return `${days} days left`;
};

export const formatShortDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

export const urgencyWeight = {
  Critical: 0,
  Soon: 1,
  FYI: 2,
};
