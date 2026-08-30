import { Link } from "react-router-dom";
import PriorityBadge from "./PriorityBadge";
import { formatDueDate, isOverdue } from "../utils/taskUtils";
import "./TaskCard.css";

const PRIORITY_COLOR_VAR = {
  High: "var(--color-priority-high)",
  Medium: "var(--color-priority-medium)",
  Low: "var(--color-priority-low)",
};

export default function TaskCard({ task, onToggleStatus, onDelete }) {
  const overdue = isOverdue(task);
  const isDone = task.status === "Completed";

  return (
    <div
      className="task-card card"
      style={{ "--badge-color": PRIORITY_COLOR_VAR[task.priority] || PRIORITY_COLOR_VAR.Medium }}
    >
      <div className="task-card-main">
        <label className="task-checkbox-wrap" aria-label={isDone ? "Mark as pending" : "Mark as completed"}>
          <input
            type="checkbox"
            className="task-checkbox"
            checked={isDone}
            onChange={() => onToggleStatus(task)}
          />
        </label>

        <div className="task-card-body">
          <div className="task-card-title-row">
            <h3 className={isDone ? "task-title task-title-done" : "task-title"}>{task.title}</h3>
            <PriorityBadge priority={task.priority} />
          </div>

          {task.description && <p className="task-card-desc">{task.description}</p>}

          <div className="task-card-meta">
            <span className="task-tag">{task.category}</span>
            {task.dueDate && (
              <span className={overdue ? "task-due task-due-overdue" : "task-due"}>
                {overdue ? "Overdue \u2022 " : "Due "}
                {formatDueDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-card-actions">
        <Link to={`/tasks/${task._id}/edit`} className="btn btn-outline btn-sm">
          Edit
        </Link>
        <button className="btn btn-sm btn-danger-text" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </div>
  );
}
