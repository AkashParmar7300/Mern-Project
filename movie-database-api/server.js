const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const movieRoutes = require('./routes/movies'); // Importing movie routes

const app = express(); // Create Express app
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

const PORT = process.env.PORT || 5000; // Define port

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { // Use MONGODB_URI here
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected')) // Log success message
.catch(err => console.error('MongoDB connection error:', err)); // Log any connection error

// Routes
app.use('/api/movies', movieRoutes); // Use movie routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start message
});
