const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashed],
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: "User already exists" });
        }
        res.json({ message: "User created successfully" });
      },
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
// LOGIN
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (results.length === 0) {
        return res.status(400).json({ error: "User not found" });
      }

      const user = results[0];

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(400).json({ error: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.json({ token });
    },
  );
});
