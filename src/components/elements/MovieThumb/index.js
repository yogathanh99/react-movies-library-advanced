import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './MovieThumb.css';

const MovieThumb = props => {
  const { image, clickable, movieId, movieName } = props;
  return (
    <div className='rmdb-moviethumb'>
      {clickable ? (
        <Link to={{ pathname: `/${movieId}`, movieName: `${movieName}` }}>
          <img src={image} alt='movie' />
        </Link>
      ) : (
        <img src={image} alt='movie' />
      )}
    </div>
  );
};

MovieThumb.propTypes = {
  image: PropTypes.string.isRequired,
  clickable: PropTypes.bool,
  movieId: PropTypes.number,
  movideName: PropTypes.string,
};

export default MovieThumb;
