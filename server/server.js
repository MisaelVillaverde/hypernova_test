const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv/config');

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routes
const reportsRoute = require('./routes/reports');
app.use('/reports', reportsRoute);

// Routes
app.get('/', (req, res) => {
  res.send('Home');
});

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to MongoDB cluster!')
);

// Listen
app.listen(4000, () => {
  console.log('server running on localhost:4000');
});
