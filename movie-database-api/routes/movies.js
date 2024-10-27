const express = require('express');
const Movie = require('../models/Movie'); // Import the Movie model

const router = express.Router();

// Create a movie
router.post('/', async (req, res) => {
  const { title, director, releaseYear, genre, rating, image } = req.body;
  try {
    const newMovie = new Movie({ title, director, releaseYear, genre, rating, image });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create movie', details: err.message });
  }
});

// Get movies with filtering and pagination
router.get('/', async (req, res) => {
  const { genre, rating, page = 1, limit = 10 } = req.query;
  const query = {};
  
  // Add filters based on genre and rating
  if (genre) query.genre = genre;
  if (rating) query.rating = { $gte: rating }; // Filter by minimum rating

  try {
    const movies = await Movie.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Movie.countDocuments(query);
    
    res.json({
      movies,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve movies', details: err.message });
  }
});
// Update a movie by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, director, releaseYear, genre, rating, image } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, director, releaseYear, genre, rating, image },
      { new: true } // Returns the updated document
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update movie', details: err.message });
  }
});

module.exports = router;
