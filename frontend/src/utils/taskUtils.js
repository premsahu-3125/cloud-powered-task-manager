// Cloudant stores dueDate as a plain "YYYY-MM-DD" string with no time or
// timezone component. Using `new Date("2026-08-30")` directly parses it as
// UTC midnight, which can silently shift to the previous day once
// converted to a local timezone behind UTC. Parsing the components by hand
// avoids that and always gives local midnight on the intended date.
export function parseDateOnly(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isOverdue(task) {
  if (!task.dueDate || task.status === "Completed") return false;
  return parseDateOnly(task.dueDate) < startOfToday();
}

export function isDueToday(task) {
  if (!task.dueDate) return false;
  return parseDateOnly(task.dueDate).getTime() === startOfToday().getTime();
}

export function isUpcoming(task) {
  if (!task.dueDate || task.status === "Completed") return false;
  return parseDateOnly(task.dueDate) > startOfToday();
}

export function formatDueDate(dueDate) {
  if (!dueDate) return null;
  return parseDateOnly(dueDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Drives the Tasks page's status filter. "All" matches everything.
export function matchesDueFilter(task, filter) {
  switch (filter) {
    case "Today":
      return isDueToday(task);
    case "Upcoming":
      return isUpcoming(task);
    case "Overdue":
      return isOverdue(task);
    case "Completed":
      return task.status === "Completed";
    default:
      return true;
  }
}

// Powers the Dashboard: totals, completion rate, and breakdowns by
// category/priority — all derived from the same task list the Tasks page
// already fetches, so the two pages can never disagree with each other.
export function computeTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = total - completed;
  const overdue = tasks.filter(isOverdue).length;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  const byCategory = {};
  const byPriority = { High: 0, Medium: 0, Low: 0 };

  tasks.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + 1;
    if (byPriority[t.priority] !== undefined) byPriority[t.priority] += 1;
  });

  const upcoming = tasks
    .filter(isUpcoming)
    .sort((a, b) => parseDateOnly(a.dueDate) - parseDateOnly(b.dueDate))
    .slice(0, 5);

  const overdueTasks = tasks
    .filter(isOverdue)
    .sort((a, b) => parseDateOnly(a.dueDate) - parseDateOnly(b.dueDate))
    .slice(0, 5);

  return { total, completed, pending, overdue, completionRate, byCategory, byPriority, upcoming, overdueTasks };
}
