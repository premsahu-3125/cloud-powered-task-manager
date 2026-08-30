import { useState } from "react";
import "./TaskForm.css";

const CATEGORIES = ["College", "Assignment", "Project", "Exam", "Personal", "Other"];
const PRIORITIES = ["Low", "Medium", "High"];

const emptyTask = {
  title: "",
  description: "",
  priority: "Medium",
  category: "College",
  dueDate: "",
  status: "Pending",
};

// `initialValues` lets EditTask reuse this for a pre-filled form.
// `onSubmit` receives the form data. `submitting` disables the button while
// a request is in flight; `serverError` shows a message from a failed API
// call (separate from the client-side "title is required" check below).
export default function TaskForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Task",
  submitting = false,
  serverError = null,
}) {
  const [task, setTask] = useState({ ...emptyTask, ...initialValues });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((t) => ({ ...t, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      setError("Title is required.");
      return;
    }
    setError(null);
    onSubmit?.(task);
  };

  return (
    <form className="task-form card" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={task.title}
          onChange={handleChange}
          placeholder="e.g. Complete DSA Assignment"
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={task.description}
          onChange={handleChange}
          placeholder="Add any details that will help you later..."
        />
      </div>

      <div className="task-form-row">
        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={task.priority} onChange={handleChange}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={task.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      {initialValues?.status && (
        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={task.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}
      {serverError && <p className="error-text">{serverError}</p>}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
