import "./PriorityBadge.css";

const PRIORITY_COLORS = {
  High: "var(--color-priority-high)",
  Medium: "var(--color-priority-medium)",
  Low: "var(--color-priority-low)",
};

export default function PriorityBadge({ priority = "Medium" }) {
  return (
    <span
      className="priority-badge"
      style={{ "--badge-color": PRIORITY_COLORS[priority] || PRIORITY_COLORS.Medium }}
    >
      <span className="priority-dot" />
      {priority}
    </span>
  );
}
