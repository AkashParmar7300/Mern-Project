// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import EditMovie from './components/EditMovie';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add" element={<MovieForm />} />
          <Route path="/update/:id" element={<EditMovie />} /> {/* Corrected to use `element` */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
