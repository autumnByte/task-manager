require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db");
const auth = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

// AUTH ROUTES
app.use("/auth", require("./routes/auth"));

/* ===========================
   TASK ROUTES (PROTECTED)
=========================== */

// GET all tasks (user-specific)
app.get("/tasks", auth, (req, res) => {
  console.log("USER:", req.user);
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }
      res.json(results);
    },
  );
});

// CREATE task
app.post("/tasks", auth, (req, res) => {
  const { title, priority, due, notes } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  db.query(
    `INSERT INTO tasks (title, priority, due, notes, completed, user_id)
     VALUES (?, ?, ?, ?, false, ?)`,
    [title.trim(), priority || "med", due || null, notes || "", req.user.id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }

      res.status(201).json({
        id: result.insertId,
        title,
        priority,
        due,
        notes,
        completed: false,
      });
    },
  );
});

// UPDATE task (toggle + edit)
app.patch("/tasks/:id", auth, (req, res) => {
  const { id } = req.params;
  const { title, priority, due, notes, completed } = req.body || {};

  // First get current task
  db.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [id, req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (results.length === 0)
        return res.status(404).json({ error: "Task not found" });

      const task = results[0];

      const newCompleted =
        completed !== undefined ? completed : !task.completed;

      db.query(
        `UPDATE tasks 
         SET title = ?, priority = ?, due = ?, notes = ?, completed = ?
         WHERE id = ? AND user_id = ?`,
        [
          title ?? task.title,
          priority ?? task.priority,
          due ?? task.due,
          notes ?? task.notes,
          newCompleted,
          id,
          req.user.id,
        ],
        (err2) => {
          if (err2) return res.status(500).json({ error: "DB error" });

          res.json({ message: "Task updated" });
        },
      );
    },
  );
});

// DELETE task
app.delete("/tasks/:id", auth, (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "DB error" });

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json({ message: "Deleted successfully" });
    },
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
