import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as taskService from "../services/taskService";
import { computeTaskStats, formatDueDate } from "../utils/taskUtils";
import "./Dashboard.css";

const CATEGORY_COLOR = "var(--color-primary)";
const PRIORITY_COLOR = {
  High: "var(--color-priority-high)",
  Medium: "var(--color-priority-medium)",
  Low: "var(--color-priority-low)",
};

function BreakdownBar({ label, count, max, color }) {
  const width = max ? Math.round((count / max) * 100) : 0;
  return (
    <div className="breakdown-row">
      <span className="breakdown-label">{label}</span>
      <div className="breakdown-track">
        <div className="breakdown-fill" style={{ width: `${width}%`, background: color }} />
      </div>
      <span className="breakdown-count">{count}</span>
    </div>
  );
}

function TaskMiniList({ tasks, emptyText }) {
  if (tasks.length === 0) {
    return <p className="page-subtitle">{emptyText}</p>;
  }
  return (
    <ul className="mini-task-list">
      {tasks.map((task) => (
        <li key={task._id}>
          <Link to={`/tasks/${task._id}/edit`}>{task.title}</Link>
          <span className="mini-task-date">{formatDueDate(task.dueDate)}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTasks() {
      setLoading(true);
      setError(null);
      try {
        const fetched = await taskService.getTasks();
        setTasks(fetched);
      } catch {
        setError("Couldn't load your dashboard. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  if (loading) {
    return <p className="page-subtitle">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  const stats = computeTaskStats(tasks);
  const maxCategoryCount = Math.max(1, ...Object.values(stats.byCategory));
  const maxPriorityCount = Math.max(1, ...Object.values(stats.byPriority));

  return (
    <div>
      <h2>Dashboard</h2>
      <p className="page-subtitle">A quick look at where things stand.</p>

      {stats.total === 0 ? (
        <div className="card empty-state">
          <h3>No tasks yet</h3>
          <p className="page-subtitle">Create a task to start seeing your stats here.</p>
          <Link to="/tasks/new" className="btn btn-outline">Create your first task</Link>
        </div>
      ) : (
        <>
          <div className="stat-grid">
            <div className="card stat-card">
              <span className="stat-label">Total tasks</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="card stat-card">
              <span className="stat-label">Completed</span>
              <span className="stat-value" style={{ color: "var(--color-success)" }}>{stats.completed}</span>
            </div>
            <div className="card stat-card">
              <span className="stat-label">Pending</span>
              <span className="stat-value" style={{ color: "var(--color-warning)" }}>{stats.pending}</span>
            </div>
            <div className="card stat-card">
              <span className="stat-label">Overdue</span>
              <span className="stat-value" style={{ color: "var(--color-danger)" }}>{stats.overdue}</span>
            </div>
          </div>

          <div className="card" style={{ marginTop: "var(--space-5)" }}>
            <h3>Completion rate</h3>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${stats.completionRate}%` }} />
            </div>
            <p className="page-subtitle">{stats.completionRate}% of tasks completed</p>
          </div>

          <div className="dashboard-grid">
            <div className="card">
              <h3>By category</h3>
              {Object.entries(stats.byCategory).map(([category, count]) => (
                <BreakdownBar key={category} label={category} count={count} max={maxCategoryCount} color={CATEGORY_COLOR} />
              ))}
            </div>

            <div className="card">
              <h3>By priority</h3>
              {["High", "Medium", "Low"].map((p) => (
                <BreakdownBar key={p} label={p} count={stats.byPriority[p]} max={maxPriorityCount} color={PRIORITY_COLOR[p]} />
              ))}
            </div>
          </div>

          <div className="dashboard-grid" style={{ marginTop: "var(--space-5)" }}>
            <div className="card">
              <h3>Overdue</h3>
              <TaskMiniList tasks={stats.overdueTasks} emptyText="Nothing overdue — you're on top of things." />
            </div>

            <div className="card">
              <h3>Upcoming</h3>
              <TaskMiniList tasks={stats.upcoming} emptyText="Nothing due soon." />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
