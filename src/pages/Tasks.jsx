import React, { useEffect, useState } from "react";
import taskServices from "../services/taskServices";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editing, setEditing] = useState(null);

  const loadTasks = async () => {
    const res = await taskServices.getAllTasks();
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    await taskServices.createTask({ title, deadline });
    setTitle("");
    setDeadline("");
    loadTasks();
  };

  const updateTask = async () => {
    await taskServices.updateTask(editing._id, { title: editing.title, deadline: editing.deadline });
    setEditing(null);
    loadTasks();
  };

  const deleteTask = async (id) => {
    await taskServices.deleteTask(id);
    loadTasks();
  };

  return (
    <div className="container mt-4">
      {/* Add task */}
      <div className="card shadow p-3 mb-3">
        <form className="row g-2" onSubmit={addTask}>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100">Add Task</button>
          </div>
        </form>
      </div>

      {/* Filter buttons */}
      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-secondary" onClick={loadTasks}>All</button>
        <button className="btn btn-warning" onClick={async () => setTasks((await taskServices.getPendingTasks()).data.tasks)}>Pending</button>
        <button className="btn btn-success" onClick={async () => setTasks((await taskServices.getCompletedTasks()).data.tasks)}>Completed</button>
        <button className="btn btn-info" onClick={async () => setTasks((await taskServices.getOldestTasks()).data.tasks)}>Oldest</button>
      </div>

      {/* Task list */}
      {tasks.map((t) => (
        <div className="card p-3 mb-2" key={t._id}>
          <div className="d-flex justify-content-between">
            <div>
              <h5>{t.title}</h5>
              <p className="text-muted mb-1">
                Created: {new Date(t.createdAt).toLocaleString()}
              </p>
              <p className="text-muted mb-1">
                Deadline: {t.deadline ? new Date(t.deadline).toLocaleDateString() : "None"}
              </p>

              <span className={`badge ${t.completed ? "bg-success" : "bg-warning"}`}>
                {t.completed ? "Completed" : "Pending"}
              </span>
            </div>

            <div className="d-flex flex-column gap-2">
              <button
                className="btn btn-sm btn-outline-success"
                onClick={async () => {
                  await taskServices.updateTask(t._id, { completed: !t.completed });
                  loadTasks();
                }}
              >
                {t.completed ? "Mark Pending" : "Mark Done"}
              </button>

              <button className="btn btn-sm btn-outline-primary" onClick={() => setEditing(t)}>
                Edit
              </button>

              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(t._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Edit section */}
      {editing && (
        <div className="card p-3 mt-3">
          <h5>Edit Task</h5>
          <input
            className="form-control mb-2"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
          />
          <input
            className="form-control mb-2"
            type="date"
            value={editing.deadline?.split("T")[0] || ""}
            onChange={(e) => setEditing({ ...editing, deadline: e.target.value })}
          />
          <button className="btn btn-success me-2" onClick={updateTask}>Save</button>
          <button className="btn btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
