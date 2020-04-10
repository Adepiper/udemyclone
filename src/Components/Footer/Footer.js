import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer>
        <Link to='/'>Piperland</Link>
        <p>Copyright &copy; {getYear()}, Piperland, Inc</p>
      </footer>
    </div>
  );
}

function getYear() {
  let year = new Date().getFullYear();
  return year;
}

export default Footer;
