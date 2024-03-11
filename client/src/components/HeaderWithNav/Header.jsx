// This file contains code for the whole header component, comprising an h1 with my name, and the nav component imported from the Nav.jsx file.  The Header with nav appears at the top of every page of the application.
import React from 'react';
import Nav from './Nav';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <h1>Insights Anonymous</h1>
        <Nav />
      </div>
    </header>
  );
};

export default Header;