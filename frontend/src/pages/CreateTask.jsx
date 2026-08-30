import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import * as taskService from "../services/taskService";

export default function CreateTask() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (task) => {
    setError(null);
    setSubmitting(true);
    try {
      await taskService.createTask(task);
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't create the task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>New Task</h2>
      <p className="page-subtitle">Add something to your list.</p>
      <TaskForm
        onSubmit={handleCreate}
        submitLabel="Create Task"
        submitting={submitting}
        serverError={error}
      />
    </div>
  );
}
