import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditMovie = () => {
  const { id } = useParams(); // Get movie ID from URL
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    releaseYear: '',
    genre: '',
    rating: '',
    image: '',
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/movies/${id}`, movie);
      navigate('/'); // Redirect to movie list page after updating
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <div>
      <h1>Edit Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
          placeholder="Director"
        />
        <input
          type="number"
          name="releaseYear"
          value={movie.releaseYear}
          onChange={handleChange}
          placeholder="Release Year"
        />
        <input
          type="text"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          placeholder="Genre"
        />
        <input
          type="number"
          name="rating"
          value={movie.rating}
          onChange={handleChange}
          placeholder="Rating"
        />
        <input
          type="text"
          name="image"
          value={movie.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMovie;
