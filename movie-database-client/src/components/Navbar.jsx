// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#282c34', color: 'white' }}>
      <Link to="/" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>
        Movie List
      </Link>
      <Link to="/add" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>
        Add Movies
      </Link>
    </nav>
  );
};

export default Navbar;
