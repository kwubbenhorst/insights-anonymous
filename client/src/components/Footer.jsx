// This file contains code for the footer component which appears on all pages of the application. The footer just contains a credit to the development team and year of creation 
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="footer-text">
        Built with ❤️ by
        {' '}
        <a href="https://github.com/tchan128" target="_blank" rel="noopener noreferrer">Tiffany</a>,
        {' '}
        <a href="https://github.com/ae-andre" target="_blank" rel="noopener noreferrer">Andre</a>,
        {' '}
        <a href="https://github.com/Jasmineleeyt" target="_blank" rel="noopener noreferrer">Jasmine</a>, and
        {' '}
        <a href="https://github.com/kwubbenhorst" target="_blank" rel="noopener noreferrer">Karla</a>
        {' '}
        ©2024 All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;