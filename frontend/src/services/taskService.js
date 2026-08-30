import api from "./api";

export async function getTasks() {
  const { data } = await api.get("/tasks");
  return data.tasks;
}

export async function getTask(id) {
  const { data } = await api.get(`/tasks/${id}`);
  return data.task;
}

export async function createTask(task) {
  const { data } = await api.post("/tasks", task);
  return data.task;
}

export async function updateTask(id, task) {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data.task;
}

export async function updateTaskStatus(id, status) {
  const { data } = await api.patch(`/tasks/${id}/status`, { status });
  return data.task;
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
}
