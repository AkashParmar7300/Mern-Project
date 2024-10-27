import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MovieList.css'; // Importing CSS file

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies', {
        params: { genre, rating, page },
      });
      setMovies(response.data.movies);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [genre, rating, page]);

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">Movie List</h1>

      <div className="filters">
        <label>
          Genre:
          <select value={genre} onChange={(e) => setGenre(e.target.value)} className="filter-select">
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
          </select>
        </label>

        <label>
          Minimum Rating:
          <input
            type="number"
            value={rating}
            placeholder="Min Rating"
            onChange={(e) => setRating(e.target.value)}
            className="filter-input"
          />
        </label>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <h3 className="movie-title">{movie.title}</h3>
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <p className="movie-details">
              <strong>Director:</strong> {movie.director} <br />
              <strong>Release Year:</strong> {movie.releaseYear} <br />
              <strong>Genre:</strong> {movie.genre} <br />
              <strong>Rating:</strong> {movie.rating}
            </p>
            <Link to={`/update/${movie._id}`} className="edit-link">Edit</Link>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info"> Page {page} of {totalPages} </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
