const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files from the React App
app.use(express.static(path.join(__dirname, 'client/build')));

// Import Routes
const reportsRoute = require('./routes/reports');
app.use('/reports', reportsRoute);

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
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
  console.log(`Production: ${process.env.NODE_ENV ? 'true' : 'false'}`);
});
