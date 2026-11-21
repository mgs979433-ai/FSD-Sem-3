const express = require('express');
const app = express();

// student data

let students = [
  { id: 1, name: "Shahid Madani", branch: "CSE" },
  { id: 2, name: "Salaar Shahid", branch: "IT" }
];

// GET route
app.get('/students', (req, res) => {
  res.json(students);
});

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/students');
});