const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// POST /login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Always read the latest data
  const dataPath = path.join(__dirname, 'users.json');
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});