const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// CREATE task
app.post("/tasks", (req, res) => {
  const { title, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    priority: priority || "med", // ✅ FIX: support priority
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// UPDATE task (toggle + optional title/priority update)
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, priority } = req.body;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Toggle completion
  task.completed = !task.completed;

  // Optional updates
  if (title !== undefined && title.trim() !== "") {
    task.title = title.trim();
  }

  if (priority !== undefined) {
    task.priority = priority;
  }

  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const exists = tasks.some(t => t.id === id);
  if (!exists) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));