import express from "express";
const router = express.Router();

// Example login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "user" && password === "1234") {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Example register route
router.post("/register", (req, res) => {
  res.json({ success: true, message: "User registered (demo only)" });
});

export default router;
