// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 CI/CD Pipeline Successful!</h1>
    <p>Deployed automatically using Jenkins, Docker, and AWS ECS.</p>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
