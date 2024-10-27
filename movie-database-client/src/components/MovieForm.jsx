import React, { useState } from 'react';
import axios from 'axios';

const MovieForm = () => {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    releaseYear: '',
    genre: '',
    rating: '',
    image: '', // Image URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/movies', movie);
      alert('Movie added successfully');
      setMovie({ title: '', director: '', releaseYear: '', genre: '', rating: '', image: '' }); // Clear form
    } catch (error) {
      alert('Error adding movie');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <input type="text" name="director" placeholder="Director" onChange={handleChange} required />
      <input type="number" name="releaseYear" placeholder="Release Year" onChange={handleChange} required />
      <input type="text" name="genre" placeholder="Genre" onChange={handleChange} required />
      <input type="number" name="rating" placeholder="Rating" onChange={handleChange} required />
      <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;