import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navigation.css';

const Navigation = ({ movieName }) => {
  return (
    <div className='rmdb-navigation'>
      <div className='rmdb-navigation-content'>
        <Link to='/'>
          <p>Home</p>
        </Link>
        <p>/</p>
        <p>{movieName}</p>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  movieName: PropTypes.string.isRequired,
};

export default Navigation;
