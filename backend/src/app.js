const express = require('express');
const cors = require('cors');
const aiRoutes = require('./Routes/ai.routes.js');

const app = express();

// ✅ Enable CORS for your frontend (Vite runs on 5173)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // optional: only needed if using cookies/auth headers
}));

app.use(express.json());

// ✅ Basic health check route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// ✅ Your AI API routes
app.use('/ai', aiRoutes);

module.exports = app;
