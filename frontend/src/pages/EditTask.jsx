import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import * as taskService from "../services/taskService";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function loadTask() {
      setLoading(true);
      setLoadError(null);
      try {
        const fetched = await taskService.getTask(id);
        if (!cancelled) setTask(fetched);
      } catch (err) {
        if (!cancelled) {
          setLoadError(
            err.response?.status === 404
              ? "This task doesn't exist or was already deleted."
              : "Couldn't load this task. Please try again."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadTask();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleUpdate = async (updatedTask) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      await taskService.updateTask(id, updatedTask);
      navigate("/tasks");
    } catch (err) {
      setSubmitError(err.response?.data?.error || "Couldn't save changes. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="page-subtitle">Loading task...</p>;
  }

  if (loadError) {
    return <p className="error-text">{loadError}</p>;
  }

  return (
    <div>
      <h2>Edit Task</h2>
      <p className="page-subtitle">Update the details below.</p>
      <TaskForm
        initialValues={task}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
        submitting={submitting}
        serverError={submitError}
      />
    </div>
  );
}
