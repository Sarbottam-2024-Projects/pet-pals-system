require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routers/routers');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(router);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'petlist.html'));
});

app.get('/pet-details.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'pet-details.html'));
});

// Server
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
