import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import * as taskService from "../services/taskService";
import { matchesDueFilter } from "../utils/taskUtils";
import "./Tasks.css";

const STATUS_FILTERS = ["All", "Today", "Upcoming", "Completed", "Overdue"];
const PRIORITY_FILTERS = ["All", "High", "Medium", "Low"];
const CATEGORY_FILTERS = ["All", "College", "Assignment", "Project", "Exam", "Personal", "Other"];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function loadTasks() {
      setLoading(true);
      setError(null);
      try {
        const fetched = await taskService.getTasks();
        setTasks(fetched);
      } catch {
        setError("Couldn't load your tasks. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    // Optimistic update so the checkbox feels instant; rolled back on failure.
    setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t)));
    try {
      await taskService.updateTaskStatus(task._id, newStatus);
    } catch {
      setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
      setError("Couldn't update that task's status. Please try again.");
    }
  };

  const handleDelete = async (task) => {
    const confirmed = window.confirm(`Delete "${task.title}"? This can't be undone.`);
    if (!confirmed) return;

    const previousTasks = tasks;
    setTasks((prev) => prev.filter((t) => t._id !== task._id));
    try {
      await taskService.deleteTask(task._id);
    } catch {
      setTasks(previousTasks);
      setError("Couldn't delete that task. Please try again.");
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.trim().toLowerCase());
      const matchesStatus = matchesDueFilter(task, status);
      const matchesPriority = priority === "All" || task.priority === priority;
      const matchesCategory = category === "All" || task.category === category;
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, search, status, priority, category]);

  return (
    <div>
      <div className="tasks-header">
        <div>
          <h2>Tasks</h2>
          <p className="page-subtitle">Everything you need to get done.</p>
        </div>
        <Link to="/tasks/new" className="btn btn-primary">
          + New Task
        </Link>
      </div>

      <div className="card filters-bar">
        <input
          type="search"
          placeholder="Search tasks by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          {PRIORITY_FILTERS.map((p) => (
            <option key={p} value={p}>{p === "All" ? "All priorities" : p}</option>
          ))}
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORY_FILTERS.map((c) => (
            <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>
          ))}
        </select>
      </div>

      {error && <p className="error-text" style={{ marginBottom: "var(--space-4)" }}>{error}</p>}

      {loading ? (
        <p className="page-subtitle">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="card empty-state">
          <h3>No tasks yet</h3>
          <p className="page-subtitle">Create your first task to get started.</p>
          <Link to="/tasks/new" className="btn btn-outline">Create your first task</Link>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="card empty-state">
          <h3>No tasks match your filters</h3>
          <p className="page-subtitle">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
