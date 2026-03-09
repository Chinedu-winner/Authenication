const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@test.com" && password === "123456") {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});