const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routes
const reportsRoute = require('./routes/reports');
app.use('/reports', reportsRoute);

// Connect to DB
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to MongoDB cluster!')
);

// Serve static files from the React App
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Listen
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
