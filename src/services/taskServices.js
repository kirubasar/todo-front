import { protectedInstance } from "./instance";

const taskServices = {
  createTask: (data) => protectedInstance.post("/tasks/add", data),
  getAllTasks: () => protectedInstance.get("/tasks/all"),
  getPendingTasks: () => protectedInstance.get("/tasks/pending"),
  getCompletedTasks: () => protectedInstance.get("/tasks/completed"),
  getOldestTasks: () => protectedInstance.get("/tasks/oldest"),
  updateTask: (id, data) => protectedInstance.put(`/tasks/update/${id}`, data),
  deleteTask: (id) => protectedInstance.delete(`/tasks/delete/${id}`),
};

export default taskServices;
